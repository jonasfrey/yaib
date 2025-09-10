// a component for selecting a folder


import { createApp, ref, onUpdated, reactive} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

export const select_folder_component = {
    props: ['s_path_abs'],
    template: await f_o_html_from_o_js(
        {
            class: "component", 
            a_o: [

            ]
        },;
    ).innerText,
    setup(props) {
        const b_select_folder_overlay = ref(props.b_select_folder_overlay);
        const b_manipulate_filtered_files = ref(props.b_manipulate_filtered_files);
        const f_load_files = props.f_load_files;

        return {
            b_select_folder_overlay,
            f_load_files,
            b_manipulate_filtered_files,
        }
    }
};