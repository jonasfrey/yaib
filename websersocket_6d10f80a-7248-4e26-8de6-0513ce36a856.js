
import {
    f_websersocket_serve,
    f_v_before_return_response__fileserver
} from "https://deno.land/x/websersocket@5.0.0/mod.js"

import {
    O_ws_client
} from "./classes.module.js"
import { ensureDir } from "https://deno.land/std@0.224.0/fs/ensure_dir.ts";

import { f_o_config } from "./functions.module.js";
import {
    f_a_o_entry__from_s_path
} from "https://deno.land/x/handyhelpers@5.0.0/mod.js"

let s_path_abs_file_current = new URL(import.meta.url).pathname;
let s_path_abs_folder_current = s_path_abs_file_current.split('/').slice(0, -1).join('/');
const b_deno_deploy = Deno.env.get("DENO_DEPLOYMENT_ID") !== undefined;

let a_o_ws_client = []

import { 
    f_o_folderinfo,
    f_b_img_file,
    f_b_video_file,
    f_s_path_file_exported_video
 } from './localhost/functions.module.js';

// const o_kv = await Deno.openKv();
// let o_config = await f_o_config();
// console.log({o_config});

// let s_path_abs_folder_cached_shaders = './folder_to_ensure';
// if(!b_deno_deploy){
//     await ensureDir(s_path_abs_folder_cached_shaders)// deno deploy is read only...
// }

let f_o_server_response = function(
    o_server_error, // an object describing the error
    o_meta // a generic object with any metadata you want to send back
){
    return {
        o_server_error, 
        o_meta
    }
}
let f_o_server_error = function(
    s, // a string describing the error, '' if no error
    n, // an error number, 0 if no error

){
    return {
        s, 
        n, 
    }
}

let f_o_response_try_and_catch_response = async function(
    f_async, // an async function that returns some metadata
){
    let o_server_error = f_o_server_error('', 0);
    let o_meta = {};
    try {
        o_meta = await f_async();
    } catch (error) {
        o_server_error.s = error.message;
        o_server_error.n = error.code;
    }
    let o = f_o_server_response(
        o_server_error, 
        o_meta
    )
    return new Response(
        JSON.stringify(o), 
        { 
            headers: {
                'Content-type': "application/json"
            }
        }
    );  

}
let f_handler = async function(o_request){

    // websocket 'request' handling here
    if(o_request.headers.get('Upgrade') == 'websocket'){

        const {
            socket: o_socket,
            response: o_response
        } = Deno.upgradeWebSocket(o_request);
        let o_ws_client = new O_ws_client(
            crypto.randomUUID(),
            o_socket
        )
        a_o_ws_client.push(o_ws_client);

        o_socket.addEventListener("open", (o_e) => {
            console.log({
                o_e, 
                s: 'o_socket.open called'
            })
        });

        o_socket.addEventListener("message", async (o_e) => {
            console.log({
                o_e, 
                s: 'o_socket.message called'
            })
            let v_data = o_e.data;
            a_o_ws_client
                .filter(o=>o!=o_ws_client)  // send to all other clients, comment out to send to all clients
                .forEach(o=>{
                    o.o_socket.send('message was received from a client')

                })
        });
        o_socket.addEventListener("close", async (o_e) => {
            a_o_ws_client.splice(a_o_ws_client.indexOf(o_ws_client), 1);
            console.log({
                o_e, 
                s: 'o_socket.close called'
            })
        });

        return o_response;
    }
    // normal http request handling here
    let o_url = new URL(o_request.url);
    if(o_url.pathname == '/'){
        return new Response(
            await Deno.readTextFile(
                `${s_path_abs_folder_current}/localhost/client.html`
            ),
            { 
                headers: {
                    'Content-type': "text/html"
                }
            }
        );  
    }
    if(o_url.pathname == '/folderinfo'){
        
        let o = f_o_response_try_and_catch_response(
            async function(){
                let o_data = await o_request.json();
                let o_folderinfo = f_o_folderinfo(o_data?.s_path_abs.trim());
                let a_o = await f_a_o_entry__from_s_path(o_folderinfo.s_path_abs.trim());

                console.log(a_o);
                o_folderinfo.n_items = a_o.length;
                o_folderinfo.a_o_entry_image = a_o.filter(o=>{
                    return f_b_img_file(o.name);
                });
                o_folderinfo.a_o_entry_video = a_o.filter(o=>{
                    return f_b_video_file(o.name);
                });
                o_folderinfo.a_o_entry_folder = a_o.filter(o=>{
                    return o.isFile === false && o.isDirectory === true;
                });
                return o_folderinfo

            }
        )
        return o;


    }
    if(o_url.pathname == '/exportvideo'){
        let o = f_o_response_try_and_catch_response(
            async function(){
                let o_data = await o_request.json();
                let s_path_video_new = await f_s_path_file_exported_video(o_data);
                return {
                    s_path_video_new
                }
            }
        )
        return o;
    }

    if(o_url.pathname.startsWith('/filerequest')){

        let s_path_abs = `/${o_url.pathname.replace('/filerequest/', '')}`;
        s_path_abs = decodeURIComponent(s_path_abs);
        console.log({s_path_abs})
        let o_file = await Deno.stat(s_path_abs);
        console.log({o_file})
        let o_file_handle = await Deno.open(s_path_abs, {read: true});
        let o_map = {
            'jpg': "image/jpeg",
            'jpeg': "image/jpeg",
            'png': "image/png",
            'gif': "image/gif",
            'webp': "image/webp",
            'bmp': "image/bmp",

            'mp4': "video/mp4",
            'mov': "video/quicktime",
            'avi': "video/x-msvideo",
            'mkv': 'video/x-matroska'

        }
        let s_mime = o_map[s_path_abs.split('.').pop()] || 'application/octet-stream';
         // Add HTTP Range support so the browser can seek in the video
 const s_range = o_request.headers.get('range');
 if (s_range) {
   // Example: "bytes=START-END"
   const m = /bytes=(\d*)-(\d*)/.exec(s_range);
   let n_start = 0;
   let n_end = o_file.size - 1;
   if (m) {
     if (m[1] !== "") n_start = Number(m[1]);
     if (m[2] !== "") n_end = Number(m[2]);
   }
   // sanity clamp
   n_start = Math.max(0, Math.min(n_start, o_file.size - 1));
   n_end = Math.max(n_start, Math.min(n_end, o_file.size - 1));
   const n_len = n_end - n_start + 1;

   await o_file_handle.seek(n_start, Deno.SeekMode.Start);

   let n_remaining = n_len;
   const rs = new ReadableStream({
     async pull(controller) {
       const chunk = new Uint8Array(Math.min(64 * 1024, n_remaining));
       const n = await o_file_handle.read(chunk);
       if (n === null || n === 0) {
         controller.close();
         o_file_handle.close();
         return;
       }
       n_remaining -= n;
       controller.enqueue(chunk.subarray(0, n));
       if (n_remaining <= 0) {
         controller.close();
         o_file_handle.close();
       }
     },
     cancel() { try { o_file_handle.close(); } catch {} }
   });

   return new Response(rs, {
     status: 206,
     headers: {
       'Content-Type': s_mime,
       'Accept-Ranges': 'bytes',
       'Content-Length': n_len.toString(),
       'Content-Range': `bytes ${n_start}-${n_end}/${o_file.size}`,
     }
   });
 }


        return new Response(o_file_handle.readable, { 
            headers: {
                'Content-Type': s_mime,
                'Content-Length': o_file.size.toString(),
                'Accept-Ranges': 'bytes',
            }
        });
    }
    if(o_url.pathname.startsWith('/readtextfile')){

        let o = f_o_response_try_and_catch_response(
            async function(){
                let o_data = await o_request.json();
                let s_text = await Deno.readTextFile(o_data.s_path_abs);  

                return {
                    s_text
                }
            }
        )
        return o;
    }

    
    if(o_url.pathname.startsWith('/writetextfile')){

        let o = f_o_response_try_and_catch_response(
        async function(){
                let o_data = await o_request.json();
                await Deno.writeTextFile(o_data.s_path_abs, o_data.s_text);  

                return {
                    b_writte: true
                }
            }
        )
        return o;

    }

    return f_v_before_return_response__fileserver(
        o_request,
        `${s_path_abs_folder_current}/localhost/`
    )

}

let s_name_host = Deno.hostname(); // or maybe some ip adress 112.35.8.13
let b_development = s_name_host != 'the_server_name_here';
let s_name_host2 = (b_development) ? 'localhost': s_name_host;
// let o_info_certificates = {
//     s_path_certificate_file: './self_signed_cert_6d10f80a-7248-4e26-8de6-0513ce36a856.crt',
//     s_path_key_file: './self_signed_key_6d10f80a-7248-4e26-8de6-0513ce36a856.key'
// }
await f_websersocket_serve(
    [
        {
            n_port: 8080,
            b_https: false,
            s_hostname: s_name_host,
            f_v_before_return_response: f_handler
        },
        ...[
            (!b_deno_deploy) ? {
                // ...o_info_certificates,
                n_port: 8443,
                b_https: true,
                s_hostname: s_name_host,
                f_v_before_return_response: f_handler
            } : false
        ].filter(v=>v)   
    ]
);