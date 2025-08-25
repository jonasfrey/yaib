
import {
    f_add_css,
    f_s_css_prefixed,
    o_variables, 
    f_s_css_from_o_variables
} from "https://deno.land/x/f_add_css@2.0.0/mod.js"

import {
    f_o_html_from_o_js,
} from "https://deno.land/x/handyhelpers@5.4.2/mod.js"


import { createApp, ref, onUpdated } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'



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
    }
    #inputs{
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
    .image_container{
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
    }
    .image_container img{
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

    `
);

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


let o_state = {
    a_o_tag: [
        f_o_tag(1, 0, 'to sell', 's', '#00ff00'),
        f_o_tag(2, 1, 'sold', 'd', '#ff0000'),
        f_o_tag(3, 2, 'maybe', 'm', '#0000ff'),
    ],
    o_tag: null,
    a_o_file: [],
    o_file: {},
    o_filemeta: null,
    o_meta: {
        a_o_filemeta: []
    },
    b_show_settings: false,
    b_show_shortcut_help: false, 
    s_path_file_current: '',
    s_path_folder: '/home/jf18j492/Desktop/verkaufen'
}

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
                id: "inputs",
                a_o: [

                    {
                        s_tag: "label", 
                        innerText: "folder path", 
                    },
                    {
                        s_tag: "input", 
                        type: "text", 
                        "v-model": "s_path_folder", 
                        style: "width: 300px;",
                        'v-on:change': 'f_updated_s_path_folder',
                    }, 
                    {
                        s_tag: "button", 
                        'v-on:click': "b_show_settings = !b_show_settings;",
                    },
                    {
                        class: "tags", 
                        'v-for': 'o_tag2 in a_o_tag',
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
                                innerText: '{{(o_tag2.b_filter ? "🔍" : "❌")}}',
                                'v-on:click': `o_tag2.b_filter = !o_tag2.b_filter;`,
                            }
                        ]
                    }
                ]
            },

            {
                id: "settings", 
                'v-if': "b_show_settings",
                a_o: [
                    {
                        s_tag: "label", 
                        innerText: 'Tags'
                    }, 
                    {
                        'v-for': 'o_tag2 in a_o_tag',
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
                class: "image_container", 

                a_o: [
                    {
                        s_tag: "img", 
                        "v-if": "o_file",
                        ":src": "s_path_file_current",
                    }
                ]
            }
            // {
            //     class: "inputs", 
            //     a_o: [
            //             {
            //                 s_tag: "button",
            //                 innerText: "{{(b_show_active_layer) ? 'Hide' : 'Show'}} active layer",
            //                 "v-on:click": `b_show_active_layer = !b_show_active_layer;`,
            //             },
            //             {
            //                 s_tag: "button",
            //                 innerText: "🗑️",
            //                 "v-on:click": `f_delete_item`,
            //             },
            //             {
            //                 s_tag: "button",
            //                 innerText: "Layer 🔄",
            //                 "v-on:click": "o_item = a_o_item[(a_o_item.indexOf(o_item) + 1) % a_o_item.length]",
            //             },
            //             {
            //                 s_tag: "button",
            //                 innerText: "+ ✏️",
            //                 "v-on:click": `b_show_text = true;f_push_text()`,
            //             },
            //             {
            //                 s_tag: "button",
            //                 innerText: "edit ✏️",
            //                 "v-on:click": `b_show_text = true;`,
            //             },
            //             {
            //                 "v-if": 'b_show_text',
            //                 s_tag: "div",
            //                 class: "b_show_text",
            //                 style: 'display:flex;flex-direction: column;',
            //                 a_o: [
            //                     {
            //                         s_tag: 'input', 
            //                         type: 'text',
            //                         "v-model": "s_text",
            //                         'v-on:input': "if(o_item){o_item.s_text = s_text;}",
            //                     },
            //                     {
            //                         s_tag: "button",
            //                         innerText: "Font family",
            //                         'v-on:click': `s_font_family = a_s_font_family[(a_s_font_family.indexOf(s_font_family) + 1) % a_s_font_family.length]; if(o_item){o_item.s_font_family = s_font_family;}`,
            //                         ":style": f_s_style({
            //                             fontFamily: '${s_font_family}',
            //                             fontSize: '1.5rem',
            //                             fontWeight: 'bold',
            //                             color: 'black',
            //                             backgroundColor: 'white',
            //                             padding: '0.5rem',
            //                             borderRadius: '0.5rem',
            //                             border: '1px solid black',
            //                         }),
            //                     },
            //                     {
            //                         s_tag: "button",
            //                         innerText: "Colors",
            //                         'v-on:click': `f_update_text_colors`,
            //                         ":style": f_s_style({
            //                             fontFamily: '${s_font_family}',
            //                             fontSize: '1.5rem',
            //                             color: '${o_item?.s_color_font}',
            //                             backgroundColor: '${o_item?.s_color_bg}',
            //                             borderRadius: '0.5rem',
            //                             border: '1px solid black',
            //                         }),
            //                     },
            //                     {
            //                         s_tag: "button",
            //                         innerText: "Close",
            //                         "v-on:click": `b_show_text = false;`
            //                     }
            //                 ]
            //             },
            //             {
            //                 ref: 'fileInput',
            //                 style: 'display:none;',
            //                 s_tag: 'input',
            //                 type:"file",
            //                 accept: "image/*",
            //                 "v-on:change":"f_add_image",
            //             },
            //             {
            //                 s_tag: "button",
            //                 innerText: "Image 📷",
            //                 "v-on:click": 'f_trigger_file_input',
            //             },
            //             {
            //                 s_tag: "button",
            //                 innerText: "🔍 +",
            //                 "v-on:click": "f_scale_up",
            //             },
            //             {
            //                 s_tag: "button",
            //                 innerText: "🔍 -",
            //                 "v-on:click": "f_scale_down",
            //             }, 
            //             {
            //                 s_tag: "button",
            //                 innerText: "▽ Layer",
            //                 "v-on:click": "f_item_layer_down"
            //             },
            //             {
            //                 s_tag: "button",
            //                 innerText: "△ Layer",
            //                 "v-on:click": "f_item_layer_up"
            //             }, 

            //     ]
            // },
            // {
            //     class: 'a_o_item',
            //     a_o: [
            //         {
            //             'v-for': 'o_item2 in a_o_item',
            //             a_o: [
            //                 {
            //                     'v-if': 'o_item2?.s_src_img != ""',
            //                     s_tag: "img",
            //                     ":class":"{item: true,'animated-border': (b_show_active_layer && o_item2 == o_item), 'no-drag': true}",
            //                     ":style": f_s_style({
            //                         position: 'absolute',
            //                         left: '${o_item2.n_trn_x}px',
            //                         top: '${o_item2.n_trn_y}px',
            //                         width: '${o_item2.n_scl_x_px_image * o_item2.n_scl_factor}px',
            //                         height: '${o_item2.n_scl_y_px_image * o_item2.n_scl_factor}px',
            //                         zIndex: '${a_o_item.indexOf(o_item2)}',
            //                     }),
            //                     ":src": 'o_item2?.s_src_img',
            //                 }, 
            //                 {

            //                     'v-if': 'o_item2?.s_text != ""',
            //                     s_tag: "div",
            //                     ":class":"{item: true,'animated-border': (b_show_active_layer && o_item2 == o_item), 'no-drag': true}",
            //                     ":style": f_s_style({
            //                         position: 'absolute',
            //                         left: '${o_item2.n_trn_x}px',
            //                         top: '${o_item2.n_trn_y}px',
            //                         fontSize: '${o_item2.n_size_pixel_outline * o_item2.n_scl_factor}px',
            //                         padding: '${o_item2.n_size_pixel_outline * o_item2.n_scl_factor/4}px',
            //                         fontFamily: '${o_item2.s_font_family}',
            //                         color: '${o_item2.s_color_font}',
            //                         backgroundColor: '${o_item2.s_color_bg}',
            //                         borderRadius: '${o_item2.n_size_pixel_outline * o_item2.n_scl_factor/20}px',
            //                         zIndex: '${a_o_item.indexOf(o_item2)}',
            //                     }),
            //                     "innerText": '{{o_item2.s_text}}',
            //                 }
            //             ]
                        
                        
            //         },

            //     ]
            // }
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
    mounted() {
        globalThis.o_vue = this;
        
        // Add window event listeners
        window.addEventListener('pointerdown', this.f_pointerdown);
        window.addEventListener('pointerup', this.f_pointerup);
        window.addEventListener('pointermove', this.f_pointermove);
        window.addEventListener('keydown', this.f_keydown);
    },
    beforeUnmount() {
        // Clean up event listeners when component is destroyed
        window.removeEventListener('pointerdown', this.f_pointerdown);
        window.removeEventListener('pointerup', this.f_pointerup);
        window.removeEventListener('pointermove', this.f_pointermove);
    },
  methods: {
    f_add_tag: function(){
        let o_self = this;
        let n_id_tag_hightest = o_self.a_o_tag.reduce((n_acc, o_tag)=>{
            return Math.max(n_acc, o_tag.n_id);
        }, 0);
        let o_tag = f_o_tag(
            n_id_tag_hightest+1, 
            o_self.a_o_tag.length, 
            'new tag',
            '',
            '#ff0000'
        )
        o_self.a_o_tag.push(o_tag);
    },
    f_keydown: function(o_event){
        let o_self = this;
        // if right arrow key
        if(o_event.key === "ArrowRight"){
            o_self.o_file = o_self.a_o_file[(o_self.a_o_file.indexOf(o_self.o_file) + 1) % o_self.a_o_file.length];
        }
        //if left arrow key
        if(o_event.key === "ArrowLeft"){
            o_self.o_file = o_self.a_o_file[(o_self.a_o_file.indexOf(o_self.o_file) - 1 + o_self.a_o_file.length) % o_self.a_o_file.length];
        }
        //escape key
        if(o_event.key === "Escape"){
            o_self.b_show_shortcut_help = false;
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
            let o_tag = o_self.a_o_tag.find(o=>{
                return o.s_shortcut.toLowerCase() == (o_event.ctrlKey ? 'ctrl+' : '') + (o_event.shiftKey ? 'shift+' : '') + (o_event.altKey ? 'alt+' : '') + o_event.key.toLowerCase();
            })
            if(o_tag){
                //add tag
                if(!o_self.o_filemeta.a_n_id_tag.includes(o_tag.n_id)){
                    o_self.o_filemeta.a_n_id_tag.push(o_tag.n_id);
                }else{
                    o_self.o_filemeta.a_n_id_tag = o_self.o_filemeta.a_n_id_tag.filter(n_id=>{n_id != o_tag.n_id})
                }
            }
            
        }
    },
    f_s_path_from_o_file: function(o_file){
        let s  = `filerequest${o_file?.s_path_file}`;
        console.log(s)
    },
    f_updated_s_path_folder:async function(){
        let o_resp = await fetch('/f_a_o_entry__from_s_path', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                s_path_folder: this.s_path_folder
            })
        });
        let o_data = await o_resp.json();
        console.log(o_data)
        this.a_o_file = o_data;

    }
    },
    watch: {
        'a_o_file': function(newVal, oldVal) {
            let o_self = this;
            console.log('a_o_file changed:', newVal);
            o_self.o_file = this.a_o_file[0];

        }, 
        'o_file': function(newVal, oldVal) {
            let o_self = this;
            o_self.s_path_file_current = `filerequest${o_self.o_file?.s_path_file}`;

            // add tag 
            o_self.o_filemeta = o_self.o_meta.a_o_filemeta.find(o=>o.s_path_file_abs == o_self.o_file?.s_path_file);
            if(!o_self.o_filemeta){
                o_self.o_filemeta = f_o_filemeta(
                    o_self.o_file?.s_path_file,
                    []
                );
                o_self.o_meta.a_o_filemeta.push(o_self.o_filemeta);
            }
            o_self.o_file.o_filemeta = o_self.o_filemeta;

            console.log('o_file changed:', newVal);
        }, 
        'a_o_tag': {
            deep: true,
            handler(v_new, v_old) {
                let o_self = this;
                let a_n_id_tag_filter = o_self.a_o_tag.filter(o=>o.b_filter).map(o=>o.n_id);
                o_self.a_o_file_filtered = o_self.a_o_file.filter(o_file=>{
                    return o_file.o_filemeta.a_n_id_tag.some(n_id=>a_n_id_tag_filter.includes(n_id));
                })
            }
        }
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

window.onpointer