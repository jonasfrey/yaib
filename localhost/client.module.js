
import {
    f_add_css,
    f_s_css_prefixed,
    o_variables, 
    f_s_css_from_o_variables
} from "https://deno.land/x/f_add_css@2.0.0/mod.js"

import {
    f_o_html_from_o_js,
} from "https://deno.land/x/handyhelpers@5.4.2/mod.js"


import { createApp, ref, onUpdated, reactive} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'


import {
    f_b_img_file,
    f_b_video_file
} from "./functions.module.js"
f_add_css(
    `   
    #app{
        /* a nice almost black gradient background*/
        background: radial-gradient(circle, rgba(30,30,30,1) 0%, rgba(10,10,10,1) 100%);
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        color:  rgba(255,255,255,0.8);
    }
    #inputs{
        display: flex;
        flex-wrap: wrap;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        background-color: rgba(255,255,255,0.8);
        padding: 0.5rem;
        border-radius: 0.5rem;
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
    }
    .file_container{
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
    }
    .file_container img,
    .file_container video{
        width: 100%;
        height: 100%;
        object-fit: contain;       /* like background-size: contain */
        object-position: center; /* like background-position: center */
        display: block;
    }

    #settings{
        position: absolute;
        top: 3rem;
        left: 0;
        z-index: 1;
        background-color: rgba(255,255,255,0.8);
        padding: 0.5rem;
        border-radius: 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        max-height: 80vh;
        overflow-y: auto;
    }


    .overlay{
        /* an overlay centered with blurred background*/
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0,0,0,0.5);
        backdrop-filter: blur(5px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10;
    }
    .select_folder{
        display: flex;
        flex-direction: column;
    }
    .folder_list{
        background-color: rgba(255,255,255,0.8);
        padding: 1rem;
        display:flex;
        flex-direction: column;
        gap: 0.5rem;
        max-height: 80vh;
        overflow-y: auto;
    }
    .flex_row{
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        align-items: center;
    }
    .flex_col{
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    .image_info{
        position:absolute;
        top:0; 
        right:0;
        z-index:1;
        background-color: rgba(22,22,22,0.8);
        padding: 0.5rem;
        border-radius: 0.5rem;

    }
    `
);

import { 
    f_o_folderinfo,
    f_o_toast
 } from "./functions.module.js";

let f_o_tag = function(
    n_id,
    n_idx,
    s_name, 
    s_shortcut, 
    s_color, 
    b_filter = false

){
    return {
        n_id,
        n_idx,
        s_name, 
        s_shortcut, 
        s_color, 
        b_filter
    }
}
let f_o_file = function(
    {
        a_s_name, 
        a_n_id_tag,
    }
){
    return { 
        a_s_name,
        a_n_id_tag
    }
}
let f_o_filemeta = function(
    s_path_file_abs, 
    a_n_id_tag
){
    return {
        s_path_file_abs, 
        a_n_id_tag
    }
}

let a_o_tag_default = [
        f_o_tag(1, 0, 'greenery', 'a', '#00ff00'),
        f_o_tag(2, 1, 'red', 's', '#ff0000'),
        f_o_tag(3, 2, 'water', 'd', '#0000ff')
    ]
let f_o_meta = function(){
    return {
        a_o_filemeta: [], 
        a_o_tag: a_o_tag_default
    }
}
let o_state = reactive({

    o_tag: null,
    a_o_file: [],
    a_o_file_filtered: [],
    o_file: null,
    o_filemeta: null,
    o_meta: f_o_meta(),
    b_show_settings: false,
    b_show_shortcut_help: false, 
    s_path_file_current: '',
    o_folderinfo: null,
    o_folderinfo_prev: null,
    s_path_meta_json: '',
    s_loadingstate_info: '',    
    b_select_folder_overlay: false,
    n_id_timeout_saving: null,
    a_o_toast: [],
}) 

globalThis.o_state = o_state


let f_s_style = function(o_style){
    let s_style = `{${Object.keys(o_style).map(s=>{
        return `${s}: \`${o_style[s]}\``
    })}}`;
    return s_style;
}


let o = await f_o_html_from_o_js(
    {
        id: "app",
        // "v-on:pointerdown": "f_pointerdown",
        // "v-on:pointerup": "f_pointerup",
        // "v-on:pointermove": "f_pointermove",
        "v-on:keydown": "f_keydown",
        a_o: [
            {
                id: "toast_container",
                a_o: [
                    {
                        s_tag: "div",
                        'v-for': 'o_toast of a_o_toast',
                        ":class": "`toast ${o_toast.s_class}`",
                        innerText: "{{o_toast.s_message}}",
                    }
                ]
            },
            {
                id: "inputs",
                a_o: [
                    {
                        id: "loadingstate", 
                        style: "width: 100%;background-color: rgba(0,0,0,0.8); color: white; padding: 0.5rem 1rem; border-radius: 0.5rem;",
                        'v-if': "s_loadingstate_info != ''",
                        innerText: "{{s_loadingstate_info}}",
                    },

                    {
                        s_tag: "label", 
                        innerText: "folder path", 
                    },
                    {
                        class: "flex_row",
                        a_o: [
                            {
                                // current folder path
                                s_tag: "span",
                                innerText: "{{o_folderinfo?.s_path_abs || '/'}} ({{o_folderinfo?.n_items || 0}} items, {{o_folderinfo?.a_o_entry_image.length || 0}} images)"
                            },
                            {
                                s_tag: 'button',
                                innerText: 'change folder 📂',
                                'v-on:click':"b_select_folder_overlay = true;", 
                            }, 
                        ]
                    },
                    {
                        class: "overlay select_folder",
                        'v-if': "b_select_folder_overlay",
                        a_o: [
                            {
                                s_tag: "h2",
                                innerText: "Select a folder"
                            },
                            {
                                'v-on:click': "b_select_folder_overlay = false;f_load_files();",
                                s_tag: "button",
                                innerText: "Load files"
                            },
                            {
                                'v-on:click': "b_select_folder_overlay = false;f_load_files_recursive();",
                                s_tag: "button",
                                innerText: "Load files recursively"
                            },
                            {
                                class: 'flex_row',
                                a_o: [
                                    {
                                        s_tag: "button", 
                                        innerText: "⬅️",
                                        'v-on:click': 'f_update_o_folderinfo(o_folderinfo_prev.s_path_abs);',
                                    },
                                    {
                                        s_tag: "span",
                                        innerText: "{{o_folderinfo?.s_path_abs}}"
                                    }
                                ]
                            },
 
                            {
                                s_tag: "span", 
                                innerText: "{{o_folderinfo?.a_o_entry_image.length}} image files"
                            },
                            {
                                class: "folder_list",
                                a_o: [
                                    {
                                        'v-for': 'o_folder of o_folderinfo?.a_o_entry_folder',
                                        s_tag: "a",
                                        href: "#",
                                        innerText: "{{o_folder.name}}",
                                        'v-on:click': 'f_update_o_folderinfo(o_folder.s_path_file);'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        s_tag: "button", 
                        'v-on:click': "b_show_settings = !b_show_settings;",
                        innerText: "⚙️",
                    },
                    
                ]
            },
            {
                class: "image_info",
                a_o: [
                    {
                        id: "file_info", 
                        a_o: [
                            {
                                s_tag: "span", 
                                innerText: 'File: {{o_file?.name}}',
                            }
                        ]
                    },
                    {
                        class: "tags flex_col", 
                        'v-for': 'o_tag2 in o_meta.a_o_tag',
                        a_o: [
                            {
                                s_tag: "span", 
                                ":style": f_s_style({
                                    display: 'inline-block',
                                    padding: '0.2rem 0.5rem',
                                    backgroundColor: '${o_tag2.s_color}',
                                    opacity: '${o_filemeta?.a_n_id_tag.includes(o_tag2.n_id) ? 1 : 0.3}',
                                }), 
                                innerText: '{{o_tag2.s_name}}({{o_tag2.s_shortcut}})',
                            },
                            {
                                s_tag: "span", 
                                innerText: '🔍',
                                ":style": `(o_tag2.b_filter) ? 'opacity: 1;' : 'opacity: 0.3;'`,
                                'v-on:click': `f_update_tag_filter(o_tag2)`,
                            }
                        ]
                    },
                ]
            },
            {
                id: "settings",
                class: "overlay",
                'v-if': "b_show_settings",
                a_o: [
                    {
                        s_tag: "label", 
                        innerText: 'Tags'
                    }, 
                    {
                        'v-for': 'o_tag2 in o_meta.a_o_tag',
                        a_o: [
                            {
                                s_tag: "input", 
                                type: "text", 
                                "v-model": "o_tag2.s_name",
                            }, 
                            {
                                s_tag: "input", 
                                type: "button",
                                "v-model": "o_tag2.s_shortcut",
                                placeholder: 'Shortcut',
                                'v-on:click': `b_show_shortcut_help = true;o_tag = o_tag2;`,
                            }, 
                            {
                                s_tag: 'input', 
                                type: "color",
                                "v-model": "o_tag2.s_color",
                            }, 
                            {
                                s_tag: "button", 
                                innerText: "🗑️",
                                'v-on:click': `o_meta.a_o_tag.splice(o_meta.a_o_tag.indexOf(o_tag2), 1);`,
                            }
                        ]
                    }, 
                    {
                        class: "shortcut_help",
                        'v-if': "b_show_shortcut_help",
                        a_o: [
                            {
                                s_tag: "p",
                                innerText: "Enter Key(combination) for '{{o_tag.s_name}}'"
                            }
                        ]
                    },
                    {
                        s_tag: 'button', 
                        'innerText': '+ Add tag',
                        'v-on:click': `f_add_tag()`,
                    }
                ]
            },
            {
                class: "file_container", 

                a_o: [
                    {
                        s_tag: "img", 
                        "v-if": "o_file && f_b_img_file(o_file.s_path_file)",
                        ":src": "s_path_file_current",
                    },
                    {
                        s_tag: "video", 
                        'controls': "true",
                        "preload" : "auto",
                        "v-if": "o_file && f_b_video_file(o_file.s_path_file)",
                        ":src": "s_path_file_current",
                    }
                ]
            }
        ]
    }, 
    o_state
)

window.onmouseup = function(o_event){
    if(o_event.button == 0){o_state.b_pointer_down_left = false;} 
    if(o_event.button == 1){o_state.b_pointer_down_middle = false;} 
    if(o_event.button == 2){o_state.b_pointer_down_right = false;} 
}
document.body.appendChild(o);




const app = createApp({
    // $nextTick: () => {
    //     debugger
    // // Runs after the DOM has updated
    // // this.accessRenderedElement()
    // },
    async mounted() {
            let o_self = this;
            globalThis.o_self = this;


            // Add window event listeners
            // window.addEventListener('pointerdown', this.f_pointerdown);
            window.addEventListener('pointerup', this.f_pointerup);
            // window.addEventListener('pointermove', this.f_pointermove);
            window.addEventListener('keydown', this.f_keydown);

            await o_self.$nextTick(); 

            o_self.f_update_o_folderinfo('/');
            // console.log(o_folderinfo__populated);

            // o_self.o_meta = await o_self.f_o_meta_data();
            // if(o_self.o_meta?.a_o_tag == undefined){
            //     o_self.o_meta.a_o_tag = a_o_tag_default;
            // }
            // for(let o_tag of o_self.o_meta.a_o_tag){
            //     o_tag.b_filter = false;
            // }



    },
    beforeUnmount() {
        // Clean up event listeners when component is destroyed
        window.removeEventListener('pointerdown', this.f_pointerdown);
        window.removeEventListener('pointerup', this.f_pointerup);
        window.removeEventListener('pointermove', this.f_pointermove);
    },
  methods: {
    f_b_img_file: function(s_path_file){
        return f_b_img_file(s_path_file);
    },
    f_b_video_file: function(s_path_file){
        return f_b_video_file(s_path_file);
    },
    f_load_files_recursive: async function(){
        let o_self = this;
        await this.f_update_o_folderinfo(o_self.o_folderinfo.s_path_abs, true);
        await this.f_load_files();
    },
    f_load_files: async function(){
        //check if json with metadata exists in folder
        
        let o_self = this;

        this.s_path_meta_json = `${o_self.o_folderinfo.s_path_abs}/.yaib_6d10f80a-7248-4e26-8de6-0513ce36a856_o_meta.json`;
        let o_toast = f_o_toast(`Loading files ...`, 'loading');
        o_self.a_o_toast.push(o_toast);
        await o_self.$nextTick();
        let o_meta = null;
        let o_resp = await this.f_o_server_response('/readtextfile',
            {
                s_path_abs: this.s_path_meta_json,
            }, 
            null
        )
        if(o_resp?.o_server_error?.s.toLowerCase().includes('no such file or directory')){ //todo: check OS specific error message
            o_meta = f_o_meta();
        }else{

            o_meta = JSON.parse(o_resp?.o_meta?.s_text);
        }

        o_self.a_o_file = o_self.o_folderinfo.a_o_entry_image.concat(o_self.o_folderinfo.a_o_entry_video);
        o_self.a_o_file_filtered = o_self.a_o_file;
        o_self.f_next_file();
        o_self.a_o_toast = o_self.a_o_toast.filter(o=>o != o_toast);

    },
    f_update_o_folderinfo: async function(s_path_abs, b_recursive = false){
        let o_self = this;
        o_self.o_folderinfo_prev = o_self.o_folderinfo;
        o_self.o_folderinfo = f_o_folderinfo(
            s_path_abs,
        );
        o_self.o_folderinfo.b_recursive = b_recursive;
        let o = await o_self.f_o_server_response(
            '/folderinfo',
            o_self.o_folderinfo
        );
        let o_folderinfo__populated =  o?.o_meta;
        o_self.o_folderinfo = o_folderinfo__populated;
    },
    f_try_to_save: function(){
        let o_self = this;
        clearTimeout(o_self.n_id_timeout_saving);
        o_self.n_id_timeout_saving = setTimeout(async function(){
            o_self.f_o_server_response('/writetextfile',
                {
                    s_path_abs: o_self.s_path_meta_json,
                    s_text: JSON.stringify(o_self.o_meta)
                }
            )
        }, 1000)
    },
    f_next_file: function(){
        let o_self = this;
        let o = o_self.a_o_file_filtered[(o_self.a_o_file_filtered.indexOf(o_self.o_file) + 1) % o_self.a_o_file_filtered.length];
        o_self.o_file = o;

    },
    f_prev_file: function(){
        let o_self = this;
        let o = o_self.a_o_file_filtered[(o_self.a_o_file_filtered.indexOf(o_self.o_file) - 1 + o_self.a_o_file_filtered.length) % o_self.a_o_file_filtered.length];
        o_self.o_file = o;   
    },
    f_s_path_from_o_file: function(o_file){
        return `filerequest${o_file?.s_path_file}`;
    },
    f_pointerup: function(o_event){
        let o_self = this;
        o_self.b_show_shortcut_help = false;

        //if click is outside #settings div
        let o_settings = document.getElementById('settings');
        if(o_settings && !o_settings.contains(o_event.target)){     
            o_self.b_show_settings = false;
        }
    },
    f_update_a_o_file_filtered: function(){
        let o_self = this;
        let a_n_id_tag_filter = o_self.o_meta.a_o_tag.filter(o=>o.b_filter).map(o=>o.n_id);
        let a_o = o_self.a_o_file.filter(o_file=>{
            const b_matches_tag_filter = o_self.f_o_file_matches_tags(o_file, a_n_id_tag_filter);
            // console.log({b_has_image_ending, b_matches_tag_filter})

            return b_matches_tag_filter;
        })
        
        // console.log(a_n_id_tag_filter)
        if(!o_self.o_file){
            o_self.o_file = a_o[0];
        }
        if(!o_self.f_o_file_matches_tags(o_self.o_file, a_n_id_tag_filter)){
            o_self.o_file = a_o[0];
            
        }
        o_self.a_o_file_filtered = a_o;
    },
    f_o_file_matches_tags: function(o_file, a_n_id_tag_filter){
        if(a_n_id_tag_filter.length === 0){return true;}
        return o_file?.o_filemeta?.a_n_id_tag.some(n_id => a_n_id_tag_filter.includes(n_id));
    },
    f_update_tag_filter: function(o_tag2){
        o_tag2.b_filter = !o_tag2.b_filter;
        // check if current o_file is still in filtered list
        let o_self = this;
        o_self.a_o_tag = o_self.a_o_tag; 
        o_self.f_update_a_o_file_filtered();
    },
    f_o_server_response : async function(
        s_path,
        o_request_data = {}, 
        f_error_handler = null
    ){
        let o_resp = await fetch(s_path, {
            method: o_request_data ? 'POST' : 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(o_request_data)
        });
        let o_data = await o_resp.json();
        if(o_data?.o_server_error?.s != ''){

            console.error(o_data.o_server_error.s);
            console.error(o_data.o_server_error.n);
            
        }

        return o_data;
    },


    f_add_tag: function(){
        let o_self = this;
        let n_id_tag_hightest = o_self.o_meta.a_o_tag.reduce((n_acc, o_tag)=>{
            return Math.max(n_acc, o_tag.n_id);
        }, 0);
        let o_tag = f_o_tag(
            n_id_tag_hightest+1, 
            o_self.o_meta.a_o_tag.length, 
            'new tag',
            '',
            '#ff0000'
        )
        o_self.o_meta.a_o_tag.push(o_tag);
    },
    f_keydown: function(o_event){
        let o_self = this;
        // if right arrow key
        if(o_event.key === "ArrowRight"){
            o_self.f_next_file();

        }
        //if left arrow key
        if(o_event.key === "ArrowLeft"){
            o_self.f_prev_file();

        }
        //escape key
        if(o_event.key === "Escape"){
            o_self.b_show_shortcut_help = false;
            o_self.b_show_settings = false;
        }
        if(o_self.b_show_shortcut_help){
            let o_tag = o_self.o_tag;
            if(!o_tag){return;}
            let s_key = o_event.key.toLowerCase();
            if(o_event.ctrlKey){s_key = 'ctrl+' + s_key;}
            if(o_event.shiftKey){s_key = 'shift+' + s_key;}
            if(o_event.altKey){s_key = 'alt+' + s_key;}
            o_tag.s_shortcut = s_key;
            o_self.b_show_shortcut_help = false;
        }
        if(!o_self.b_show_shortcut_help && !o_self.b_show_settings){
            //check if key matches any tag shortcut
            let o_tag = o_self.o_meta.a_o_tag.find(o=>{
                return o.s_shortcut.toLowerCase() == (o_event.ctrlKey ? 'ctrl+' : '') + (o_event.shiftKey ? 'shift+' : '') + (o_event.altKey ? 'alt+' : '') + o_event.key.toLowerCase();
            })
            if(o_tag){
                //add tag
                if(!o_self.o_filemeta.a_n_id_tag.includes(o_tag.n_id)){
                    o_self.o_filemeta.a_n_id_tag.push(o_tag.n_id);
                }else{
                    o_self.o_filemeta.a_n_id_tag = o_self.o_filemeta.a_n_id_tag.filter(n_id=>{n_id != o_tag.n_id})
                }
                o_self.f_try_to_save();
                
            }
            
        }
    },

    f_o_and_handle_server_response: async function(o_resp){
        let o_data = await o_resp.json();
        if(o_data?.o_error?.s != ''){
            console.error(o_data.o_error.s);
        }
        return o_data;
    },

    },

    watch: {
        


        'a_o_file': function(newVal, oldVal) {
            let o_self = this;
            console.log('a_o_file changed:', newVal);
            o_self.s_loadingstate_info = `Updating metadata for ${o_self.a_o_file.length} files...`
            for(let o of o_self.a_o_file){
                if(o.o_filemeta == undefined){
                    let o_filemeta = o_self.o_meta.a_o_filemeta.find(o2=>o2.s_path_file_abs == o?.s_path_file);
                    if(!o_filemeta){
                            o_filemeta = f_o_filemeta(
                                o?.s_path_file,
                                []
                            );
                    }
                    o.o_filemeta = o_filemeta;
                    o_self.o_meta.a_o_filemeta.push(o.o_filemeta);

                }
            }
            o_self.s_loadingstate_info = ''
            o_self.f_update_a_o_file_filtered();
        }, 
        'o_file': function(newVal, oldVal) {
            let o_self = this;
            o_self.s_path_file_current = o_self.f_s_path_from_o_file(o_self.o_file);

            // add tag 
            o_self.o_filemeta = o_self.o_meta.a_o_filemeta.find(o=>o.s_path_file_abs == o_self.o_file?.s_path_file);


            console.log('o_file changed:', newVal);
            let n_idx = o_self.a_o_file.indexOf(o_self.o_file);
            let n_load_before_and_after = 5;        
            // load images before and after
            for(let i = Math.max(0, n_idx - n_load_before_and_after); i <= Math.min(o_self.a_o_file.length - 1, n_idx + n_load_before_and_after); i++){
                let o_file = o_self.a_o_file_filtered[i];
                let img = new Image();
                img.src = o_self.f_s_path_from_o_file(o_file)
            }
        }, 
    },
  data() {
    return o_state
  }
})


// Vue.directive('on-render', {
//     inserted(el, binding) {
//       binding.value(el)
//     }
//   })

// Handle both mouse and touch events



app.mount('#app')

globalThis.o_self = app


