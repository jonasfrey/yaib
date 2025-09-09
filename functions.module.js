
let s_path_abs_file_current = new URL(import.meta.url).pathname;
let s_path_abs_folder_current = s_path_abs_file_current.split('/').slice(0, -1).join('/');

import { basename,extname } from "https://deno.land/std/path/mod.ts";
import { ensureFile } from "https://deno.land/std/fs/mod.ts";

let f_o_command = async function(a_s_part) {
  const [s_program, ...a_s_arg] = a_s_part;

  const proc = new Deno.Command(s_program, {
    args: a_s_arg,
    stdin: "null",
    stdout: "piped",
    stderr: "piped",
  });

  const { code, stdout, stderr } = await proc.output();

  return {
    code,
    success: code === 0,
    stdout: new TextDecoder().decode(stdout),
    stderr: new TextDecoder().decode(stderr),
  };
}

let f_v_objectfromjsonensured = async function(s_path){
    let v_expected = null;
    let s_name_fileorfolder = basename(s_path);
    if(s_name_fileorfolder.startsWith('o_')){
        v_expected = {};
    }
    if(s_name_fileorfolder.startsWith('a_')){
        v_expected = [];
    }
    let v = null;
    let b_exists = false;
    try {
        const stats = await Deno.lstat(s_path);
        b_exists = true;
    } catch (err) {
        if (!(err instanceof Deno.errors.NotFound)) {
        throw err;
        }
        await Deno.writeTextFile(JSON.stringify(v_expected));
        v = v_expected;
    }
    if(b_exists){

        let s_json = await Deno.readTextFile(
            s_path
        );
        v = JSON.parse(s_json);
    
    }

    return v; 

}
let f_save_jsonstrinigfied = async function(s_path, v){
    await Deno.writeTextFile(
        s_path, 
        JSON.stringify(v, null, 4)
    )
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
        await f_o_command(args);

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
    await f_o_command(concatArgs);

    // we remove the temp files
    for(let s_path_file_new of a_s_path_file_new){
        await Deno.remove(s_path_file_new);
    }
    // we remove the list file
    await Deno.remove(s_path_file_list);
    return s_path_file_combined_new
}
let f_s_path_gif_from_video = async function(s_path_file_video){
    // use ffmpeg to convert a video to a gif
    let s_name_file = s_path_file_video.split('/').pop();
    let s_name_file_no_extension = s_name_file.split('.').slice(0, -1).join('.');
    let s_path_folder_file = s_path_file_video.split('/').slice(0, -1).join('/');
    let s_path_file_gif = `${s_path_folder_file}/${s_name_file_no_extension}.gif`;
    const args = [
        "ffmpeg","-y",
        "-i", s_path_file_video,
        "-vf", "fps=10,scale=1080:-1:flags=lanczos",
        "-loop", "0",
        s_path_file_gif
    ];
    await f_o_command(args);
    return s_path_file_gif
}


export {
    f_v_objectfromjsonensured,
    f_save_jsonstrinigfied,
    f_o_command,
    f_s_path_file_exported_video,
    f_s_path_gif_from_video
}