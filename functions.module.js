
let s_path_abs_file_current = new URL(import.meta.url).pathname;
let s_path_abs_folder_current = s_path_abs_file_current.split('/').slice(0, -1).join('/');

import { basename,extname } from "https://deno.land/std/path/mod.ts";
import { ensureFile } from "https://deno.land/std/fs/mod.ts";

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


export {
    f_v_objectfromjsonensured,
    f_save_jsonstrinigfied
}