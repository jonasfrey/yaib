
let f_n_wrapped = function(
    n_value, 
    n_min, 
    n_max
){
    const n_range = n_max - n_min;
    return (((n_value - n_min) % n_range) + n_range) % n_range + n_min;
}

let f_n_clamped = function(
    n_value, 
    n_min, 
    n_max
){
    return Math.min(Math.max(n_value, n_min), n_max)
}
export {
    f_n_wrapped, 
    f_n_clamped
}
export * from './created_dynamic_generated.js'