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
export {
    f_o_folderinfo,
    f_o_toast,
    f_b_img_file,
    f_b_video_file
}