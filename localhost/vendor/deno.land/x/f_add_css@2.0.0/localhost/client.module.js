import {
    O_vec4
}from "https://deno.land/x/vector@0.9/mod.js"
let f_b_valid_url = function(string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
  }

let f_s_css_prefixed = function(
    s_css,
    s_prefix
){
    s_css = s_css.replace(/(\r\n|\n|\r)/gm, "");
    let a_s_css = s_css.split("{")
    // console.log(s_css)
    a_s_css = a_s_css.filter(s=>s.trim()!='');
    s_css = a_s_css.map(
        function(s, n_idx){

            let n_idx_start = s.indexOf("}");
            let s_sub = s.substring(n_idx_start+1);

            if(s_sub.trim() != ''){
                s = s.replace(s_sub, s_sub.split(",").map(s=>`${s_prefix} ${s}`).join(","))
            }
            return s 
        }
    ).join("{")
    // console.log(s_css)

    return s_css;
    // return s_css.split("}").filter(s=>s.trim()!='').map(s=>`${s}}`.split(",").map(s=>`${s_prefix} ${s}`).join(',')).flat().join('\n')
}

let f_add_css = function(
    v_s_css_or_s_url, 
    v_null_or_o_document = null
){
    let s_css = null; 
    let s_url = null; 
    let o_document = null;

    if(typeof v_s_css_or_s_url == 'string'){
        if(f_b_valid_url(v_s_css_or_s_url)){
            s_url = v_s_css_or_s_url; 
        }else{
            s_css = v_s_css_or_s_url
        }
    }
    if(v_null_or_o_document){
        
        o_document = v_null_or_o_document
    }else{
        o_document = document
    }
    let o_el = null;
    if(s_css){
        var o_el_style = o_document.createElement("style")
        o_el_style.innerHTML = s_css
        o_el = o_el_style
    }else{
        o_el = o_document.createElement("link");
        o_el.rel = "stylesheet"
        o_el.href = s_url
        o_el.crossorigin="anonymous"; 
    }

    // o_document.head.appendChild(o_el)
    o_document.head.insertBefore(o_el, o_document.head.firstChild);// this way the css will not overwrite
}

let f_s_hsla = function(o_hsla){
    return `hsla(${360*o_hsla?.[0]} ${o_hsla?.[1]*100}% ${o_hsla?.[2]*100}% / ${o_hsla?.[3]})`
}



let o_variables = {

    o_hsla__fg:                 new O_vec4(.0, .0, .8, .93), 
    o_hsla__fg_hover:           new O_vec4(.0, .0, .9, .93), 
    o_hsla__fg_active:          new O_vec4(.0, .0, .9, .93), 
    o_hsla__fg_active_hover:    new O_vec4(.0, .0, .9, .93), 
    
    o_hsla__bg:                 new O_vec4(.0, .0, .1, .93), 
    o_hsla__bg_hover:           new O_vec4(.0, .0, .2, .93), 
    o_hsla__bg_active:          new O_vec4(.0, .0, .15, .93), 
    o_hsla__bg_active_hover:    new O_vec4(.0, .0, .2, .93), 

    o_hsla_addition_vector_hover: new O_vec4(0.,0.,0.1,0.0),
    o_hsla_addition_vector_active: new O_vec4(0.,0.,0.1,0.0),
    n_rem_font_size_base: 1.6,
    a_n_factor_heading_font_size: [
        2.,1.8,1.6,1.4,1.2, 1.
    ],
    a_n_factor_heading_margin_botton: [
        1., 0.8, .6, .4, .2, .1
    ],

    o_hsla_primary: new O_vec4(0.5, .85, 0.8,0.9), 
    o_hsla_secondary: new O_vec4(0.1, .85, 0.8,0.9),
    n_rem_padding_interactive_elements: 1.,
    n_rem_border_size_interactive_elements: 0.00,
    n_px_border_clickable_with_border: 1,
    n_px_border_radius: 2,
    s_border_style: 'dotted', 
    n_nor_line_height_p: 1.5,
    n_rem_margin_bottom_interactive_elements: 0.2
};

let f_s_css_from_o_variables = function(o_variables){
    let a_s_selector_state_focus_or_active_or_clicked = [
        '.clicked', 'active', 'focus'
    ]
    let a_s_selector_clickable_with_border = [
        'button', 'input', 'textarea', 'select',
    ]
    let a_s_selector_clickable = [
        ...a_s_selector_clickable_with_border,
        '.clickable', 'iframe'
    ]
    let a_s_state = ['','hover', 'active',];
    return `

        /* http://meyerweb.com/eric/tools/css/reset/ 
        v2.0 | 20110126
        License: none (public domain)
        */

        html, body, div, span, applet, object, iframe,
        h1, h2, h3, h4, h5, h6, p, blockquote, pre,
        a, abbr, acronym, address, big, cite, code,
        del, dfn, em, img, ins, kbd, q, s, samp,
        small, strike, strong, sub, sup, tt, var,
        b, u, i, center,
        dl, dt, dd, ol, ul, li,
        fieldset, form, label, legend,
        table, caption, tbody, tfoot, thead, tr, th, td,
        article, aside, canvas, details, embed, 
        figure, figcaption, footer, header, hgroup, 
        menu, nav, output, ruby, section, summary,
        time, mark, audio, video {
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            font: inherit;
            vertical-align: baseline;
        }
        /* HTML5 display-role reset for older browsers */
        article, aside, details, figcaption, figure, 
        footer, header, hgroup, menu, nav, section {
            display: block;
        }
        body {
            line-height: 1;
        }
        ol, ul {
            list-style: none;
        }
        blockquote, q {
            quotes: none;
        }
        blockquote:before, blockquote:after,
        q:before, q:after {
            content: '';
            content: none;
        }
        table {
            border-collapse: collapse;
            border-spacing: 0;
        }

        html{
            line-heigth: 100%;
            font-size: ${o_variables.n_rem_font_size_base}rem;
            font-family:helvetica;
            background: ${f_s_hsla(o_variables.o_hsla__bg)};
            color: ${f_s_hsla(o_variables.o_hsla__fg)};
        }
        ${o_variables.a_n_factor_heading_font_size.map((n,n_idx)=>{
            let n_factor_margin_bottom = o_variables.a_n_factor_heading_margin_botton[n_idx];
            return `h${n_idx+1}{
                font-size: ${n*o_variables.n_rem_font_size_base}rem;
                margin-bottom: ${n_factor_margin_bottom*o_variables.n_rem_font_size_base}rem
            }`
        }).join('\n')}
        ${a_s_selector_clickable.map(s=>{
            return `
            ${s}{
                margin-bottom: ${o_variables.n_rem_margin_bottom_interactive_elements}rem;
                outline:none;
                padding:${o_variables.n_rem_padding_interactive_elements}rem;
                border-radius:${o_variables.n_px_border_radius}px;
                ${(a_s_selector_clickable_with_border.includes(s)) ? `border-width: ${o_variables.n_px_border_clickable_with_border}px;`: ``}
                ${(a_s_selector_clickable_with_border.includes(s)) ? `border-style: ${o_variables.s_border_style};`: ``}
                background: ${f_s_hsla(o_variables.o_hsla__bg)};
                color: ${f_s_hsla(o_variables.o_hsla__fg)};
                border-color: ${f_s_hsla(o_variables.o_hsla__fg)};
                font-size: inherit;
            }
            ${[`${s}:hover`, `${s}.hovered`].map(s2=>{
                return `
                ${s2}{
                    background: ${f_s_hsla(o_variables.o_hsla__bg_hover)};
                    color: ${f_s_hsla(o_variables.o_hsla__fg_hover)};
                    border-color: ${f_s_hsla(o_variables.o_hsla__fg_hover)};
                    cursor:pointer;
                }
                `
            }).join('\n')}
            ${[`${s}.clicked`, `${s}:focus`, `${s}:active`].map(s2=>{
                return `
                ${s2}{
                    background: ${f_s_hsla(o_variables.o_hsla__bg_active)};
                    color: ${f_s_hsla(o_variables.o_hsla__fg_active)};
                    border-color: ${f_s_hsla(o_variables.o_hsla__fg_active)};
                    cursor:pointer;
                }
                `
            }).join('\n')}
            ${[`${s}.clicked:hover`, `${s}:focus:hover`, `${s}:active:hover`].map(s2=>{
                return `
                ${s2}{
                    background: ${f_s_hsla(o_variables.o_hsla__bg_active_hover)};
                    color: ${f_s_hsla(o_variables.o_hsla__fg_active_hover)};
                    border-color: ${f_s_hsla(o_variables.o_hsla__fg_active_hover)};
                    cursor:pointer;
                }
                `
            }).join('\n')}

            `
        }).join('\n')}
        .position_relative{
            position:relative
        }

        .input{
            display:flex;
        }
        .d_flex{
            display: flex;
            flex-wrap: wrap;
        }
        span{
            display: inline-block;
        }
        p,span{
            line-height:${parseInt(o_variables.n_nor_line_height_p*100)}%;
        }
        ${(new Array(20).fill(0)).map(
            function(n, n_idx){
                let num = (n_idx /10)
                let s_n = num.toString().split('.').join('_');
                return `
                    .p-${s_n}_rem{padding: ${num}rem}
                    .pl-${s_n}_rem{padding-left: ${num}rem}
                    .pr-${s_n}_rem{padding-right: ${num}rem}
                    .pt-${s_n}_rem{padding-top: ${num}rem}
                    .pb-${s_n}_rem{padding-bottom: ${num}rem}
                `
            }
        ).join("\n")} 
    
        ${a_s_state.map(s=>{
            return `
                a${(s!='')?`:${s}`:''}{
                    ${(()=>{
                        let o_vec = o_variables.o_hsla_primary
                        if(s!=''){
                            o_vec = o_vec.add(
                                o_variables[`o_hsla_addition_vector_${s}`]
                            )
                        }
                        // console.log(o_vec)
                        return [
                            (s=='hover')?`text-decoration: underline`:false,
                            (s=='hover')?`cursor: pointer`:false,
                            `color: ${f_s_hsla(o_vec)}`, 
                        ].filter(v=>v).join(';\n')
                    })()}
                }
            `
        }).join('\n')}
    

        `;

};
export {
    o_variables,
    f_s_css_from_o_variables,
    f_add_css, 
    f_s_css_prefixed, 
    f_s_hsla
}