
// this script only uses the libraries so that they can be 'installed' (files that are downloaded)
// with the deno command deno run -A download-modules.js and the config 
// deno.json -> {vendor: "true"}
// this will create a folder 'vendor' with the required javascript files in it
// afterwards the scripts can be imported from that folder so 
// import {a} from './vendor/deno.land/x/somemodule/mod.js'
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
