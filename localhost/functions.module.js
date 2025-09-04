// here should be functions that really are only functions
// they take arguments do something and return something
// they should not depend on runtime data from the runtime scope
// for example
// do 
// let f_n_sum = function(n_1, n_2){
//     return n_1 + n_2
// }
// // don't 
// let n_base = 10
// let f_n_sum_dont = function(n_1){
//     return n_base + n_1
// }
// export {
//     f_n_sum
// }
let f_o_toast = function(
    s_message, 
    s_class
){
    return {
        s_message,
        s_class
    }
}
let f_o_folderinfo = function(
    
    s_path_abs, 
    n_size, 
    n_items, 
    a_o_entry_folder, 
    a_o_entry_image, 
    a_o_entry_video, 
    b_recursive = false,
    
){
    return {
        s_path_abs, 
        n_size, 
        n_items, 
        a_o_entry_folder,  
        a_o_entry_image,
        a_o_entry_video,
        b_recursive
    }

}
let f_b_img_file = function(s_path){
    return s_path.match(/\.(jpg|jpeg|png|gif)$/i);
}
let f_b_video_file = function(s_path){
    return s_path.match(/\.(mp4|mkv|webm|mov|avi)$/i);
}

let f_run_command = async function (cmd){
  const process = Deno.run({
    cmd,
    stdout: "piped",
    stderr: "piped",
  });

  const status = await process.status();
  
  if (!status.success) {
    const stderr = new TextDecoder().decode(await process.stderrOutput());
    throw new Error(`Command failed: ${cmd.join(" ")}\n${stderr}`);
  }
}


let f_s_path_file_exported_video = async function(
    o_filemeta
){

    // let o_filemeta_example = {
    //     "s_path_file_abs": "/full/path/to/video.mp4",
    //     "a_n_id_tag": [],
    //     "a_o_timestampsection_video": [
    //         {
    //             "n_ms_start": 15689.444,
    //             "n_ms_end": 29680.895,
    //             "a_n_id_tag": []
    //         },
    //         {
    //             "n_ms_start": 40751.801999999996,
    //             "n_ms_end": 50056.798,
    //             "a_n_id_tag": []
    //         },
    //         {
    //             "n_ms_start": 65814.16,
    //             "n_ms_end": 75798.351,
    //             "a_n_id_tag": []
    //         }
    //     ]
    // };
    // o_filemeta = o_filemeta_example;

    let s_name_file = o_filemeta.s_path_file_abs.split('/').pop();
    let s_name_file_no_extension = s_name_file.split('.').slice(0, -1).join('.');
    let s_path_folder_file = o_filemeta.s_path_file_abs.split('/').slice(0, -1).join('/');
    let s_extension = s_name_file.split('.').pop();

    //assuming ffmpeg is installed. we create a video consisting of all sections present in the array
    let a_s_path_file_new = []
    for(let o_timestampsection_video of o_filemeta.a_o_timestampsection_video){
        // we create single temporary clips
        let s_path_file_new = `${s_path_folder_file}/${s_name_file_no_extension}_${o_timestampsection_video.n_ms_start}.${s_extension}`;
        const isMp4 = /\.mp4$/i.test(s_path_file_new);
        const ss = (o_timestampsection_video.n_ms_start / 1000).toString();
        const to = (o_timestampsection_video.n_ms_end / 1000).toString();
        const args = isMp4
        ? [
            "ffmpeg","-y",
            "-i", o_filemeta.s_path_file_abs,
            "-ss", ss, "-to", to,
            "-map","0:v:0","-map","0:a:0?",
            "-c:v","libx264","-pix_fmt","yuv420p","-preset","fast","-crf","22",
            "-c:a","aac",
            "-movflags","+faststart",
            s_path_file_new
            ]
        : [
            "ffmpeg","-y",
            "-ss", ss, "-to", to,
            "-i", o_filemeta.s_path_file_abs,
            "-c","copy",
            s_path_file_new
            ];
        await f_run_command(args);

        a_s_path_file_new.push(s_path_file_new);
    }
    
    let s_text_textfile = a_s_path_file_new.map(s_path_file_new=>{  
        return `file '${s_path_file_new}'\n`;
    }).join('');
    //now we concatenate the clips
    let s_path_file_list = `${s_path_folder_file}/${s_name_file_no_extension}_list.txt`;
    await Deno.writeTextFile(s_path_file_list, s_text_textfile);
    // we use ffmpeg to combine the clips to one video file
    let s_path_file_combined_new = `${s_path_folder_file}/${s_name_file_no_extension}_final.${s_extension}`;

    const isMp4Concat = /\.mp4$/i.test(s_path_file_combined_new);
    const concatArgs = isMp4Concat
      ? [
          "ffmpeg","-y",
          "-f","concat","-safe","0",
          "-i", s_path_file_list,
          "-map","0:v:0","-map","0:a:0?",
          "-c:v","libx264","-pix_fmt","yuv420p","-preset","fast","-crf","22",
          "-c:a","aac",
          "-movflags","+faststart",
          s_path_file_combined_new
        ]
      : [
          "ffmpeg","-y",
          "-f","concat","-safe","0",
          "-i", s_path_file_list,
          "-c","copy",
          s_path_file_combined_new
        ];
    await f_run_command(concatArgs);

    // we remove the temp files
    for(let s_path_file_new of a_s_path_file_new){
        await Deno.remove(s_path_file_new);
    }
    // we remove the list file
    await Deno.remove(s_path_file_list);
    return s_path_file_combined_new
}
export {
    f_o_folderinfo,
    f_o_toast,
    f_b_img_file,
    f_b_video_file,
    f_s_path_file_exported_video
}