
import { 
    f_n_wrapped,
    f_n_clamped
} from './module.js'

class O_vec1{
    constructor(
        n_x
    ){

        if(typeof n_x === 'object'){
            let o = n_x
            n_x = o.n_x
        }

        
                
                this.n_x = (typeof n_x === 'number') ? n_x : 0
                
    }
    toString(){
        return '('+this.n_x.toString()+')'
    }
    
                    get x(){
                        return this.n_x
                    }
                    set x(v){
                        this.n_x = v
                    }
                    

                    get 0(){
                        return this.n_x
                    }
                    set 0(v){
                        this.n_x = v
                    }
                    

    get a_n_comp(){
        return [
            this.n_x
        ]
    }
    
}
O_vec1.n_tau = Math.PI * 2

    O_vec1.prototype.comps_to_int = 
        function(){
            
                    let b_all = arguments.length == 0
                    let a_v_arg = Array.from(arguments);
                    
            return new O_vec1(
                        (b_all || a_v_arg?.some(v=>["n_x","x","0"].includes(v))) ? parseInt(this.n_x): this.n_x
                    )
        }

        
    O_vec1.prototype.to_int = O_vec1.prototype.comps_to_int
    
    

    O_vec1.prototype.add = 
        function(v){
            const o_vec = (typeof v == 'number') ? new O_vec1(...arguments) : v
            return new O_vec1(
                        this.n_x + o_vec.n_x
                    )
        }

        
    
    
    

    O_vec1.prototype.sub = 
        function(v){
            const o_vec = (typeof v == 'number') ? new O_vec1(...arguments) : v
            return new O_vec1(
                        this.n_x - o_vec.n_x
                    )
        }

        
    O_vec1.prototype.subtract = O_vec1.prototype.sub
    
    

    O_vec1.prototype.mul = 
        function(v){
            const o_vec = (typeof v == 'number') ? new O_vec1(...arguments) : v
            return new O_vec1(
                        this.n_x * o_vec.n_x
                    )
        }

        
    O_vec1.prototype.multiply = O_vec1.prototype.mul
    
    

    O_vec1.prototype.div = 
        function(v){
            const o_vec = (typeof v == 'number') ? new O_vec1(...arguments) : v
            return new O_vec1(
                        this.n_x / o_vec.n_x
                    )
        }

        
    O_vec1.prototype.divide = O_vec1.prototype.div
    
    

    O_vec1.prototype.comps_to_int = 
        function(){
            
                    let b_all = arguments.length == 0
                    let a_v_arg = Array.from(arguments);
                    
            return new O_vec1(
                        (b_all || a_v_arg?.some(v=>["n_x","x","0"].includes(v))) ? parseInt(this.n_x): this.n_x
                    )
        }

        
    O_vec1.prototype.to_int = O_vec1.prototype.comps_to_int
    
    

    O_vec1.prototype.abs = 
        function(){
            
                    let b_all = arguments.length == 0
                    let a_v_arg = Array.from(arguments);
                    
            return new O_vec1(
                        (b_all || a_v_arg?.some(v=>["n_x","x","0"].includes(v))) ? Math.abs(this.n_x): this.n_x
                    )
        }

        
    O_vec1.prototype.absolute = O_vec1.prototype.abs
    
    

    O_vec1.prototype.norm = 
        function(){
            
                    const n_length = this.length();
                    
            return new O_vec1(
                        this.n_x / n_length
                    )
        }

        
    O_vec1.prototype.normalize = O_vec1.prototype.norm
    
    

    O_vec1.prototype.fract = 
        function(){
            
            return new O_vec1(
                        this.n_x % 1
                    )
        }

        
    
    
    

    O_vec1.prototype.mod = 
        function(v){
            
                    const o_vec = (typeof v == 'number') ? new O_vec1(...arguments) : v
                    
            return new O_vec1(
                        this.n_x % o_vec.n_x
                    )
        }

        
    
    
    

    O_vec1.prototype.clamp = 
        function(
                    o_vec_min, 
                    o_vec_max
                    ){
            
            return new O_vec1(
                        
                                    f_n_clamped(
                                        this.n_x, 
                                        o_vec_min.n_x,
                                        o_vec_max.n_x,
                                    )
                    )
        }

        
    O_vec1.prototype.clamp_minmax = O_vec1.prototype.clamp
    
    

    O_vec1.prototype.wrap = 
        function(
                    o_vec_min, 
                    o_vec_max
                    ){
            
            return new O_vec1(
                        
                                    f_n_wrapped(
                                        this.n_x, 
                                        o_vec_min.n_x,
                                        o_vec_max.n_x,
                                    )
                    )
        }

        
    O_vec1.prototype.wrap_minmax = O_vec1.prototype.wrap
    
    

    O_vec1.prototype.comps_to_inteq = 
        function(){
            
                    let b_all = arguments.length == 0
                    let a_v_arg = Array.from(arguments);
                    
            
                        this.n_x=(b_all || a_v_arg?.some(v=>["n_x","x","0"].includes(v))) ? parseInt(this.n_x): this.n_x
                        return this
                    
        }

        
    O_vec1.prototype.to_inteq = O_vec1.prototype.comps_to_inteq
    
    

    O_vec1.prototype.addeq = 
        function(v){
            const o_vec = (typeof v == 'number') ? new O_vec1(...arguments) : v
            
                        this.n_x=this.n_x + o_vec.n_x
                        return this
                    
        }

        
    
    
    

    O_vec1.prototype.subeq = 
        function(v){
            const o_vec = (typeof v == 'number') ? new O_vec1(...arguments) : v
            
                        this.n_x=this.n_x - o_vec.n_x
                        return this
                    
        }

        
    O_vec1.prototype.subtracteq = O_vec1.prototype.subeq
    
    

    O_vec1.prototype.muleq = 
        function(v){
            const o_vec = (typeof v == 'number') ? new O_vec1(...arguments) : v
            
                        this.n_x=this.n_x * o_vec.n_x
                        return this
                    
        }

        
    O_vec1.prototype.multiplyeq = O_vec1.prototype.muleq
    
    

    O_vec1.prototype.diveq = 
        function(v){
            const o_vec = (typeof v == 'number') ? new O_vec1(...arguments) : v
            
                        this.n_x=this.n_x / o_vec.n_x
                        return this
                    
        }

        
    O_vec1.prototype.divideeq = O_vec1.prototype.diveq
    
    

    O_vec1.prototype.comps_to_inteq = 
        function(){
            
                    let b_all = arguments.length == 0
                    let a_v_arg = Array.from(arguments);
                    
            
                        this.n_x=(b_all || a_v_arg?.some(v=>["n_x","x","0"].includes(v))) ? parseInt(this.n_x): this.n_x
                        return this
                    
        }

        
    O_vec1.prototype.to_inteq = O_vec1.prototype.comps_to_inteq
    
    

    O_vec1.prototype.abseq = 
        function(){
            
                    let b_all = arguments.length == 0
                    let a_v_arg = Array.from(arguments);
                    
            
                        this.n_x=(b_all || a_v_arg?.some(v=>["n_x","x","0"].includes(v))) ? Math.abs(this.n_x): this.n_x
                        return this
                    
        }

        
    O_vec1.prototype.absoluteeq = O_vec1.prototype.abseq
    
    

    O_vec1.prototype.normeq = 
        function(){
            
                    const n_length = this.length();
                    
            
                        this.n_x=this.n_x / n_length
                        return this
                    
        }

        
    O_vec1.prototype.normalizeeq = O_vec1.prototype.normeq
    
    

    O_vec1.prototype.fracteq = 
        function(){
            
            
                        this.n_x=this.n_x % 1
                        return this
                    
        }

        
    
    
    

    O_vec1.prototype.modeq = 
        function(v){
            
                    const o_vec = (typeof v == 'number') ? new O_vec1(...arguments) : v
                    
            
                        this.n_x=this.n_x % o_vec.n_x
                        return this
                    
        }

        
    
    
    

    O_vec1.prototype.clampeq = 
        function(
                    o_vec_min, 
                    o_vec_max
                    ){
            
            
                        this.n_x=
                                    f_n_clamped(
                                        this.n_x, 
                                        o_vec_min.n_x,
                                        o_vec_max.n_x,
                                    )
                        return this
                    
        }

        
    O_vec1.prototype.clamp_minmaxeq = O_vec1.prototype.clampeq
    
    

    O_vec1.prototype.wrapeq = 
        function(
                    o_vec_min, 
                    o_vec_max
                    ){
            
            
                        this.n_x=
                                    f_n_wrapped(
                                        this.n_x, 
                                        o_vec_min.n_x,
                                        o_vec_max.n_x,
                                    )
                        return this
                    
        }

        
    O_vec1.prototype.wrap_minmaxeq = O_vec1.prototype.wrapeq
    
    

    O_vec1.prototype.to_index = 
            function(o_scl){
                return (
                (parseInt(this.n_x) % parseInt(o_scl.n_x))
                )
            }

            
    O_vec1.prototype.to_idx = O_vec1.prototype.to_index
    
    

    O_vec1.prototype.from_index = 
            function(n_idx){
                n_idx = parseInt(n_idx)

                return new O_vec1(
                (n_idx % parseInt(this.n_x))
                )
            }

            
    O_vec1.prototype.from_idx = O_vec1.prototype.from_index
    
    

    O_vec1.prototype.compsadd = 
                        function(){
                            return 0
                            + this.n_x
                        }
                    
    
    
    

    O_vec1.prototype.compssub = 
                        function(){
                            return 0
                            - this.n_x
                        }
                    
    
    
    

    O_vec1.prototype.compsmul = 
                        function(){
                            return 1
                            * this.n_x
                        }
                    
    
    
    

    O_vec1.prototype.compsdiv = 
                        function(){
                            return 1
                            / this.n_x
                        }
                    
    
    
    

    O_vec1.prototype.dot = 
            function(v){
                const o_vec = (typeof v == 'number') ? new O_vec1(...arguments) : v
                return this.n_x * o_vec.n_x
            }

            
    O_vec1.prototype.dotproduct = O_vec1.prototype.dot
    
    

    O_vec1.prototype.len = 
            function(){
                return Math.sqrt(this.n_x * this.n_x)
            }

            
    O_vec1.prototype.length = O_vec1.prototype.len
    
    

    O_vec1.prototype.clone = 
            function(){
                return new O_vec1(
                    this.n_x
                )

            }

            
    O_vec1.prototype.cln = O_vec1.prototype.clone
    
    

    O_vec1.prototype.sangle = 
            function(v){
                const o_vec = (typeof v == 'number') ? new O_vec1(...arguments) : v
                return Math.acos(
                    this.dot(o_vec)/(this.length()*o_vec.length())
                )
            }

            
    O_vec1.prototype.smallestangle = O_vec1.prototype.sangle
O_vec1.prototype.shortestangle = O_vec1.prototype.sangle
    O_vec1.prototype.sangle_deg = function(){
                    return (O_vec1.prototype.sangle.call(this,...arguments)/O_vec1.n_tau)*360
                }
O_vec1.prototype.smallestangle_deg = function(){
                    return (O_vec1.prototype.sangle.call(this,...arguments)/O_vec1.n_tau)*360
                }
O_vec1.prototype.shortestangle_deg = function(){
                    return (O_vec1.prototype.sangle.call(this,...arguments)/O_vec1.n_tau)*360
                }
    

    O_vec1.prototype.cross = 
                    function(v){
                        const o_vec = (typeof v == 'number') ? new O_vec1(...arguments) : v
        
                        const o_vec_a = new O_vec1(
                            this.n_x
                        )
                        const o_vec_b = new O_vec1(
                            o_vec.n_x
                        )
                        const o_vec_c = new O_vec1(
                            this.n_x
                        )
                        const o_vec_d = new O_vec1(
                            o_vec.n_x
                        )
                        
                                    return new O_vec1(
                                    this.n_x = o_vec_a.n_x * o_vec_b.n_x - o_vec_c.n_x * o_vec_d.n_x
                                    )
                                    
                    }
        
                    
    O_vec1.prototype.crossproduct = O_vec1.prototype.cross
    
    

    O_vec1.prototype.crosseq = 
                    function(v){
                        const o_vec = (typeof v == 'number') ? new O_vec1(...arguments) : v
        
                        const o_vec_a = new O_vec1(
                            this.n_x
                        )
                        const o_vec_b = new O_vec1(
                            o_vec.n_x
                        )
                        const o_vec_c = new O_vec1(
                            this.n_x
                        )
                        const o_vec_d = new O_vec1(
                            o_vec.n_x
                        )
                        
                                    this.n_x = o_vec_a.n_x * o_vec_b.n_x - o_vec_c.n_x * o_vec_d.n_x
                                    return this
                                    
                    }
        
                    
    O_vec1.prototype.crossproducteq = O_vec1.prototype.crosseq
    
    

export {O_vec1}
    

class O_vec2{
    constructor(
        n_x,
n_y
    ){

        if(typeof n_x === 'object'){
            let o = n_x
            n_x = o.n_x
n_y = o.n_y
        }

        
                
                this.n_x = (typeof n_x === 'number') ? n_x : 0
                

                
                this.n_y = (typeof n_y === 'number') ? n_y : this.n_x
                
    }
    toString(){
        return '('+this.n_x.toString()+','+this.n_y.toString()+')'
    }
    
                    get x(){
                        return this.n_x
                    }
                    set x(v){
                        this.n_x = v
                    }
                    

                    get 0(){
                        return this.n_x
                    }
                    set 0(v){
                        this.n_x = v
                    }
                    

                    get y(){
                        return this.n_y
                    }
                    set y(v){
                        this.n_y = v
                    }
                    

                    get 1(){
                        return this.n_y
                    }
                    set 1(v){
                        this.n_y = v
                    }
                    

    get a_n_comp(){
        return [
            this.n_x,
this.n_y
        ]
    }
    get xx(){
                    return new O_vec2(
                        this.n_x,this.n_x
                    )
                }
get xy(){
                    return new O_vec2(
                        this.n_x,this.n_y
                    )
                }
get yx(){
                    return new O_vec2(
                        this.n_y,this.n_x
                    )
                }
get yy(){
                    return new O_vec2(
                        this.n_y,this.n_y
                    )
                }
}
O_vec2.n_tau = Math.PI * 2

    O_vec2.prototype.comps_to_int = 
        function(){
            
                    let b_all = arguments.length == 0
                    let a_v_arg = Array.from(arguments);
                    
            return new O_vec2(
                        (b_all || a_v_arg?.some(v=>["n_x","x","0"].includes(v))) ? parseInt(this.n_x): this.n_x,(b_all || a_v_arg?.some(v=>["n_y","y","1"].includes(v))) ? parseInt(this.n_y): this.n_y
                    )
        }

        
    O_vec2.prototype.to_int = O_vec2.prototype.comps_to_int
    
    

    O_vec2.prototype.add = 
        function(v){
            const o_vec = (typeof v == 'number') ? new O_vec2(...arguments) : v
            return new O_vec2(
                        this.n_x + o_vec.n_x,this.n_y + o_vec.n_y
                    )
        }

        
    
    
    

    O_vec2.prototype.sub = 
        function(v){
            const o_vec = (typeof v == 'number') ? new O_vec2(...arguments) : v
            return new O_vec2(
                        this.n_x - o_vec.n_x,this.n_y - o_vec.n_y
                    )
        }

        
    O_vec2.prototype.subtract = O_vec2.prototype.sub
    
    

    O_vec2.prototype.mul = 
        function(v){
            const o_vec = (typeof v == 'number') ? new O_vec2(...arguments) : v
            return new O_vec2(
                        this.n_x * o_vec.n_x,this.n_y * o_vec.n_y
                    )
        }

        
    O_vec2.prototype.multiply = O_vec2.prototype.mul
    
    

    O_vec2.prototype.div = 
        function(v){
            const o_vec = (typeof v == 'number') ? new O_vec2(...arguments) : v
            return new O_vec2(
                        this.n_x / o_vec.n_x,this.n_y / o_vec.n_y
                    )
        }

        
    O_vec2.prototype.divide = O_vec2.prototype.div
    
    

    O_vec2.prototype.comps_to_int = 
        function(){
            
                    let b_all = arguments.length == 0
                    let a_v_arg = Array.from(arguments);
                    
            return new O_vec2(
                        (b_all || a_v_arg?.some(v=>["n_x","x","0"].includes(v))) ? parseInt(this.n_x): this.n_x,(b_all || a_v_arg?.some(v=>["n_y","y","1"].includes(v))) ? parseInt(this.n_y): this.n_y
                    )
        }

        
    O_vec2.prototype.to_int = O_vec2.prototype.comps_to_int
    
    

    O_vec2.prototype.abs = 
        function(){
            
                    let b_all = arguments.length == 0
                    let a_v_arg = Array.from(arguments);
                    
            return new O_vec2(
                        (b_all || a_v_arg?.some(v=>["n_x","x","0"].includes(v))) ? Math.abs(this.n_x): this.n_x,(b_all || a_v_arg?.some(v=>["n_y","y","1"].includes(v))) ? Math.abs(this.n_y): this.n_y
                    )
        }

        
    O_vec2.prototype.absolute = O_vec2.prototype.abs
    
    

    O_vec2.prototype.norm = 
        function(){
            
                    const n_length = this.length();
                    
            return new O_vec2(
                        this.n_x / n_length,this.n_y / n_length
                    )
        }

        
    O_vec2.prototype.normalize = O_vec2.prototype.norm
    
    

    O_vec2.prototype.fract = 
        function(){
            
            return new O_vec2(
                        this.n_x % 1,this.n_y % 1
                    )
        }

        
    
    
    

    O_vec2.prototype.mod = 
        function(v){
            
                    const o_vec = (typeof v == 'number') ? new O_vec2(...arguments) : v
                    
            return new O_vec2(
                        this.n_x % o_vec.n_x,this.n_y % o_vec.n_y
                    )
        }

        
    
    
    

    O_vec2.prototype.clamp = 
        function(
                    o_vec_min, 
                    o_vec_max
                    ){
            
            return new O_vec2(
                        
                                    f_n_clamped(
                                        this.n_x, 
                                        o_vec_min.n_x,
                                        o_vec_max.n_x,
                                    ),
                                    f_n_clamped(
                                        this.n_y, 
                                        o_vec_min.n_y,
                                        o_vec_max.n_y,
                                    )
                    )
        }

        
    O_vec2.prototype.clamp_minmax = O_vec2.prototype.clamp
    
    

    O_vec2.prototype.wrap = 
        function(
                    o_vec_min, 
                    o_vec_max
                    ){
            
            return new O_vec2(
                        
                                    f_n_wrapped(
                                        this.n_x, 
                                        o_vec_min.n_x,
                                        o_vec_max.n_x,
                                    ),
                                    f_n_wrapped(
                                        this.n_y, 
                                        o_vec_min.n_y,
                                        o_vec_max.n_y,
                                    )
                    )
        }

        
    O_vec2.prototype.wrap_minmax = O_vec2.prototype.wrap
    
    

    O_vec2.prototype.comps_to_inteq = 
        function(){
            
                    let b_all = arguments.length == 0
                    let a_v_arg = Array.from(arguments);
                    
            
                        this.n_x=(b_all || a_v_arg?.some(v=>["n_x","x","0"].includes(v))) ? parseInt(this.n_x): this.n_x;this.n_y=(b_all || a_v_arg?.some(v=>["n_y","y","1"].includes(v))) ? parseInt(this.n_y): this.n_y
                        return this
                    
        }

        
    O_vec2.prototype.to_inteq = O_vec2.prototype.comps_to_inteq
    
    

    O_vec2.prototype.addeq = 
        function(v){
            const o_vec = (typeof v == 'number') ? new O_vec2(...arguments) : v
            
                        this.n_x=this.n_x + o_vec.n_x;this.n_y=this.n_y + o_vec.n_y
                        return this
                    
        }

        
    
    
    

    O_vec2.prototype.subeq = 
        function(v){
            const o_vec = (typeof v == 'number') ? new O_vec2(...arguments) : v
            
                        this.n_x=this.n_x - o_vec.n_x;this.n_y=this.n_y - o_vec.n_y
                        return this
                    
        }

        
    O_vec2.prototype.subtracteq = O_vec2.prototype.subeq
    
    

    O_vec2.prototype.muleq = 
        function(v){
            const o_vec = (typeof v == 'number') ? new O_vec2(...arguments) : v
            
                        this.n_x=this.n_x * o_vec.n_x;this.n_y=this.n_y * o_vec.n_y
                        return this
                    
        }

        
    O_vec2.prototype.multiplyeq = O_vec2.prototype.muleq
    
    

    O_vec2.prototype.diveq = 
        function(v){
            const o_vec = (typeof v == 'number') ? new O_vec2(...arguments) : v
            
                        this.n_x=this.n_x / o_vec.n_x;this.n_y=this.n_y / o_vec.n_y
                        return this
                    
        }

        
    O_vec2.prototype.divideeq = O_vec2.prototype.diveq
    
    

    O_vec2.prototype.comps_to_inteq = 
        function(){
            
                    let b_all = arguments.length == 0
                    let a_v_arg = Array.from(arguments);
                    
            
                        this.n_x=(b_all || a_v_arg?.some(v=>["n_x","x","0"].includes(v))) ? parseInt(this.n_x): this.n_x;this.n_y=(b_all || a_v_arg?.some(v=>["n_y","y","1"].includes(v))) ? parseInt(this.n_y): this.n_y
                        return this
                    
        }

        
    O_vec2.prototype.to_inteq = O_vec2.prototype.comps_to_inteq
    
    

    O_vec2.prototype.abseq = 
        function(){
            
                    let b_all = arguments.length == 0
                    let a_v_arg = Array.from(arguments);
                    
            
                        this.n_x=(b_all || a_v_arg?.some(v=>["n_x","x","0"].includes(v))) ? Math.abs(this.n_x): this.n_x;this.n_y=(b_all || a_v_arg?.some(v=>["n_y","y","1"].includes(v))) ? Math.abs(this.n_y): this.n_y
                        return this
                    
        }

        
    O_vec2.prototype.absoluteeq = O_vec2.prototype.abseq
    
    

    O_vec2.prototype.normeq = 
        function(){
            
                    const n_length = this.length();
                    
            
                        this.n_x=this.n_x / n_length;this.n_y=this.n_y / n_length
                        return this
                    
        }

        
    O_vec2.prototype.normalizeeq = O_vec2.prototype.normeq
    
    

    O_vec2.prototype.fracteq = 
        function(){
            
            
                        this.n_x=this.n_x % 1;this.n_y=this.n_y % 1
                        return this
                    
        }

        
    
    
    

    O_vec2.prototype.modeq = 
        function(v){
            
                    const o_vec = (typeof v == 'number') ? new O_vec2(...arguments) : v
                    
            
                        this.n_x=this.n_x % o_vec.n_x;this.n_y=this.n_y % o_vec.n_y
                        return this
                    
        }

        
    
    
    

    O_vec2.prototype.clampeq = 
        function(
                    o_vec_min, 
                    o_vec_max
                    ){
            
            
                        this.n_x=
                                    f_n_clamped(
                                        this.n_x, 
                                        o_vec_min.n_x,
                                        o_vec_max.n_x,
                                    );this.n_y=
                                    f_n_clamped(
                                        this.n_y, 
                                        o_vec_min.n_y,
                                        o_vec_max.n_y,
                                    )
                        return this
                    
        }

        
    O_vec2.prototype.clamp_minmaxeq = O_vec2.prototype.clampeq
    
    

    O_vec2.prototype.wrapeq = 
        function(
                    o_vec_min, 
                    o_vec_max
                    ){
            
            
                        this.n_x=
                                    f_n_wrapped(
                                        this.n_x, 
                                        o_vec_min.n_x,
                                        o_vec_max.n_x,
                                    );this.n_y=
                                    f_n_wrapped(
                                        this.n_y, 
                                        o_vec_min.n_y,
                                        o_vec_max.n_y,
                                    )
                        return this
                    
        }

        
    O_vec2.prototype.wrap_minmaxeq = O_vec2.prototype.wrapeq
    
    

    O_vec2.prototype.to_index = 
            function(o_scl){
                return (
                (parseInt(this.n_x) % parseInt(o_scl.n_x))
+ (parseInt(this.n_y) * parseInt(o_scl.n_x))
                )
            }

            
    O_vec2.prototype.to_idx = O_vec2.prototype.to_index
    
    

    O_vec2.prototype.from_index = 
            function(n_idx){
                n_idx = parseInt(n_idx)

                return new O_vec2(
                (n_idx % parseInt(this.n_x)),
parseInt(n_idx / parseInt(this.n_x))
                )
            }

            
    O_vec2.prototype.from_idx = O_vec2.prototype.from_index
    
    

    O_vec2.prototype.compsadd = 
                        function(){
                            return 0
                            + this.n_x
+ this.n_y
                        }
                    
    
    
    

    O_vec2.prototype.compssub = 
                        function(){
                            return 0
                            - this.n_x
- this.n_y
                        }
                    
    
    
    

    O_vec2.prototype.compsmul = 
                        function(){
                            return 1
                            * this.n_x
* this.n_y
                        }
                    
    
    
    

    O_vec2.prototype.compsdiv = 
                        function(){
                            return 1
                            / this.n_x
/ this.n_y
                        }
                    
    
    
    

    O_vec2.prototype.dot = 
            function(v){
                const o_vec = (typeof v == 'number') ? new O_vec2(...arguments) : v
                return this.n_x * o_vec.n_x+
this.n_y * o_vec.n_y
            }

            
    O_vec2.prototype.dotproduct = O_vec2.prototype.dot
    
    

    O_vec2.prototype.len = 
            function(){
                return Math.sqrt(this.n_x * this.n_x+this.n_y * this.n_y)
            }

            
    O_vec2.prototype.length = O_vec2.prototype.len
    
    

    O_vec2.prototype.clone = 
            function(){
                return new O_vec2(
                    this.n_x,this.n_y
                )

            }

            
    O_vec2.prototype.cln = O_vec2.prototype.clone
    
    

    O_vec2.prototype.sangle = 
            function(v){
                const o_vec = (typeof v == 'number') ? new O_vec2(...arguments) : v
                return Math.acos(
                    this.dot(o_vec)/(this.length()*o_vec.length())
                )
            }

            
    O_vec2.prototype.smallestangle = O_vec2.prototype.sangle
O_vec2.prototype.shortestangle = O_vec2.prototype.sangle
    O_vec2.prototype.sangle_deg = function(){
                    return (O_vec2.prototype.sangle.call(this,...arguments)/O_vec2.n_tau)*360
                }
O_vec2.prototype.smallestangle_deg = function(){
                    return (O_vec2.prototype.sangle.call(this,...arguments)/O_vec2.n_tau)*360
                }
O_vec2.prototype.shortestangle_deg = function(){
                    return (O_vec2.prototype.sangle.call(this,...arguments)/O_vec2.n_tau)*360
                }
    

    O_vec2.prototype.hangle = 
            function(v){
                const o_vec = (typeof v == 'number') ? new O_vec2(...arguments) : v
                let o_vec_diff = this.sub(o_vec);
                return Math.atan2(
                    o_vec_diff.n_x,
                    o_vec_diff.n_y
                )
            }

            
    O_vec2.prototype.horizontalangle = O_vec2.prototype.hangle
    O_vec2.prototype.hangle_deg = function(){
                    return (O_vec2.prototype.hangle.call(this,...arguments)/O_vec2.n_tau)*360
                }
O_vec2.prototype.horizontalangle_deg = function(){
                    return (O_vec2.prototype.hangle.call(this,...arguments)/O_vec2.n_tau)*360
                }
    

    O_vec2.prototype.cross = 
                    function(v){
                        const o_vec = (typeof v == 'number') ? new O_vec2(...arguments) : v
        
                        const o_vec_a = new O_vec2(
                            this.n_y,this.n_x
                        )
                        const o_vec_b = new O_vec2(
                            o_vec.n_x,o_vec.n_y
                        )
                        const o_vec_c = new O_vec2(
                            this.n_x,this.n_y
                        )
                        const o_vec_d = new O_vec2(
                            o_vec.n_y,o_vec.n_x
                        )
                        
                                    return new O_vec2(
                                    this.n_x = o_vec_a.n_x * o_vec_b.n_x - o_vec_c.n_x * o_vec_d.n_x,
this.n_y = o_vec_a.n_y * o_vec_b.n_y - o_vec_c.n_y * o_vec_d.n_y
                                    )
                                    
                    }
        
                    
    O_vec2.prototype.crossproduct = O_vec2.prototype.cross
    
    

    O_vec2.prototype.crosseq = 
                    function(v){
                        const o_vec = (typeof v == 'number') ? new O_vec2(...arguments) : v
        
                        const o_vec_a = new O_vec2(
                            this.n_y,this.n_x
                        )
                        const o_vec_b = new O_vec2(
                            o_vec.n_x,o_vec.n_y
                        )
                        const o_vec_c = new O_vec2(
                            this.n_x,this.n_y
                        )
                        const o_vec_d = new O_vec2(
                            o_vec.n_y,o_vec.n_x
                        )
                        
                                    this.n_x = o_vec_a.n_x * o_vec_b.n_x - o_vec_c.n_x * o_vec_d.n_x,
this.n_y = o_vec_a.n_y * o_vec_b.n_y - o_vec_c.n_y * o_vec_d.n_y
                                    return this
                                    
                    }
        
                    
    O_vec2.prototype.crossproducteq = O_vec2.prototype.crosseq
    
    

export {O_vec2}
    

class O_vec3{
    constructor(
        n_x,
n_y,
n_z
    ){

        if(typeof n_x === 'object'){
            let o = n_x
            n_x = o.n_x
n_y = o.n_y
n_z = o.n_z
        }

        
                
                this.n_x = (typeof n_x === 'number') ? n_x : 0
                

                
                this.n_y = (typeof n_y === 'number') ? n_y : this.n_x
                

                
                this.n_z = (typeof n_z === 'number') ? n_z : this.n_y
                
    }
    toString(){
        return '('+this.n_x.toString()+','+this.n_y.toString()+','+this.n_z.toString()+')'
    }
    
                    get x(){
                        return this.n_x
                    }
                    set x(v){
                        this.n_x = v
                    }
                    

                    get 0(){
                        return this.n_x
                    }
                    set 0(v){
                        this.n_x = v
                    }
                    

                    get y(){
                        return this.n_y
                    }
                    set y(v){
                        this.n_y = v
                    }
                    

                    get 1(){
                        return this.n_y
                    }
                    set 1(v){
                        this.n_y = v
                    }
                    

                    get z(){
                        return this.n_z
                    }
                    set z(v){
                        this.n_z = v
                    }
                    

                    get 2(){
                        return this.n_z
                    }
                    set 2(v){
                        this.n_z = v
                    }
                    

    get a_n_comp(){
        return [
            this.n_x,
this.n_y,
this.n_z
        ]
    }
    get xxx(){
                    return new O_vec3(
                        this.n_x,this.n_x,this.n_x
                    )
                }
get xxy(){
                    return new O_vec3(
                        this.n_x,this.n_x,this.n_y
                    )
                }
get xxz(){
                    return new O_vec3(
                        this.n_x,this.n_x,this.n_z
                    )
                }
get xyx(){
                    return new O_vec3(
                        this.n_x,this.n_y,this.n_x
                    )
                }
get xyy(){
                    return new O_vec3(
                        this.n_x,this.n_y,this.n_y
                    )
                }
get xyz(){
                    return new O_vec3(
                        this.n_x,this.n_y,this.n_z
                    )
                }
get xzx(){
                    return new O_vec3(
                        this.n_x,this.n_z,this.n_x
                    )
                }
get xzy(){
                    return new O_vec3(
                        this.n_x,this.n_z,this.n_y
                    )
                }
get xzz(){
                    return new O_vec3(
                        this.n_x,this.n_z,this.n_z
                    )
                }
get yxx(){
                    return new O_vec3(
                        this.n_y,this.n_x,this.n_x
                    )
                }
get yxy(){
                    return new O_vec3(
                        this.n_y,this.n_x,this.n_y
                    )
                }
get yxz(){
                    return new O_vec3(
                        this.n_y,this.n_x,this.n_z
                    )
                }
get yyx(){
                    return new O_vec3(
                        this.n_y,this.n_y,this.n_x
                    )
                }
get yyy(){
                    return new O_vec3(
                        this.n_y,this.n_y,this.n_y
                    )
                }
get yyz(){
                    return new O_vec3(
                        this.n_y,this.n_y,this.n_z
                    )
                }
get yzx(){
                    return new O_vec3(
                        this.n_y,this.n_z,this.n_x
                    )
                }
get yzy(){
                    return new O_vec3(
                        this.n_y,this.n_z,this.n_y
                    )
                }
get yzz(){
                    return new O_vec3(
                        this.n_y,this.n_z,this.n_z
                    )
                }
get zxx(){
                    return new O_vec3(
                        this.n_z,this.n_x,this.n_x
                    )
                }
get zxy(){
                    return new O_vec3(
                        this.n_z,this.n_x,this.n_y
                    )
                }
get zxz(){
                    return new O_vec3(
                        this.n_z,this.n_x,this.n_z
                    )
                }
get zyx(){
                    return new O_vec3(
                        this.n_z,this.n_y,this.n_x
                    )
                }
get zyy(){
                    return new O_vec3(
                        this.n_z,this.n_y,this.n_y
                    )
                }
get zyz(){
                    return new O_vec3(
                        this.n_z,this.n_y,this.n_z
                    )
                }
get zzx(){
                    return new O_vec3(
                        this.n_z,this.n_z,this.n_x
                    )
                }
get zzy(){
                    return new O_vec3(
                        this.n_z,this.n_z,this.n_y
                    )
                }
get zzz(){
                    return new O_vec3(
                        this.n_z,this.n_z,this.n_z
                    )
                }
}
O_vec3.n_tau = Math.PI * 2

    O_vec3.prototype.comps_to_int = 
        function(){
            
                    let b_all = arguments.length == 0
                    let a_v_arg = Array.from(arguments);
                    
            return new O_vec3(
                        (b_all || a_v_arg?.some(v=>["n_x","x","0"].includes(v))) ? parseInt(this.n_x): this.n_x,(b_all || a_v_arg?.some(v=>["n_y","y","1"].includes(v))) ? parseInt(this.n_y): this.n_y,(b_all || a_v_arg?.some(v=>["n_z","z","2"].includes(v))) ? parseInt(this.n_z): this.n_z
                    )
        }

        
    O_vec3.prototype.to_int = O_vec3.prototype.comps_to_int
    
    

    O_vec3.prototype.add = 
        function(v){
            const o_vec = (typeof v == 'number') ? new O_vec3(...arguments) : v
            return new O_vec3(
                        this.n_x + o_vec.n_x,this.n_y + o_vec.n_y,this.n_z + o_vec.n_z
                    )
        }

        
    
    
    

    O_vec3.prototype.sub = 
        function(v){
            const o_vec = (typeof v == 'number') ? new O_vec3(...arguments) : v
            return new O_vec3(
                        this.n_x - o_vec.n_x,this.n_y - o_vec.n_y,this.n_z - o_vec.n_z
                    )
        }

        
    O_vec3.prototype.subtract = O_vec3.prototype.sub
    
    

    O_vec3.prototype.mul = 
        function(v){
            const o_vec = (typeof v == 'number') ? new O_vec3(...arguments) : v
            return new O_vec3(
                        this.n_x * o_vec.n_x,this.n_y * o_vec.n_y,this.n_z * o_vec.n_z
                    )
        }

        
    O_vec3.prototype.multiply = O_vec3.prototype.mul
    
    

    O_vec3.prototype.div = 
        function(v){
            const o_vec = (typeof v == 'number') ? new O_vec3(...arguments) : v
            return new O_vec3(
                        this.n_x / o_vec.n_x,this.n_y / o_vec.n_y,this.n_z / o_vec.n_z
                    )
        }

        
    O_vec3.prototype.divide = O_vec3.prototype.div
    
    

    O_vec3.prototype.comps_to_int = 
        function(){
            
                    let b_all = arguments.length == 0
                    let a_v_arg = Array.from(arguments);
                    
            return new O_vec3(
                        (b_all || a_v_arg?.some(v=>["n_x","x","0"].includes(v))) ? parseInt(this.n_x): this.n_x,(b_all || a_v_arg?.some(v=>["n_y","y","1"].includes(v))) ? parseInt(this.n_y): this.n_y,(b_all || a_v_arg?.some(v=>["n_z","z","2"].includes(v))) ? parseInt(this.n_z): this.n_z
                    )
        }

        
    O_vec3.prototype.to_int = O_vec3.prototype.comps_to_int
    
    

    O_vec3.prototype.abs = 
        function(){
            
                    let b_all = arguments.length == 0
                    let a_v_arg = Array.from(arguments);
                    
            return new O_vec3(
                        (b_all || a_v_arg?.some(v=>["n_x","x","0"].includes(v))) ? Math.abs(this.n_x): this.n_x,(b_all || a_v_arg?.some(v=>["n_y","y","1"].includes(v))) ? Math.abs(this.n_y): this.n_y,(b_all || a_v_arg?.some(v=>["n_z","z","2"].includes(v))) ? Math.abs(this.n_z): this.n_z
                    )
        }

        
    O_vec3.prototype.absolute = O_vec3.prototype.abs
    
    

    O_vec3.prototype.norm = 
        function(){
            
                    const n_length = this.length();
                    
            return new O_vec3(
                        this.n_x / n_length,this.n_y / n_length,this.n_z / n_length
                    )
        }

        
    O_vec3.prototype.normalize = O_vec3.prototype.norm
    
    

    O_vec3.prototype.fract = 
        function(){
            
            return new O_vec3(
                        this.n_x % 1,this.n_y % 1,this.n_z % 1
                    )
        }

        
    
    
    

    O_vec3.prototype.mod = 
        function(v){
            
                    const o_vec = (typeof v == 'number') ? new O_vec3(...arguments) : v
                    
            return new O_vec3(
                        this.n_x % o_vec.n_x,this.n_y % o_vec.n_y,this.n_z % o_vec.n_z
                    )
        }

        
    
    
    

    O_vec3.prototype.clamp = 
        function(
                    o_vec_min, 
                    o_vec_max
                    ){
            
            return new O_vec3(
                        
                                    f_n_clamped(
                                        this.n_x, 
                                        o_vec_min.n_x,
                                        o_vec_max.n_x,
                                    ),
                                    f_n_clamped(
                                        this.n_y, 
                                        o_vec_min.n_y,
                                        o_vec_max.n_y,
                                    ),
                                    f_n_clamped(
                                        this.n_z, 
                                        o_vec_min.n_z,
                                        o_vec_max.n_z,
                                    )
                    )
        }

        
    O_vec3.prototype.clamp_minmax = O_vec3.prototype.clamp
    
    

    O_vec3.prototype.wrap = 
        function(
                    o_vec_min, 
                    o_vec_max
                    ){
            
            return new O_vec3(
                        
                                    f_n_wrapped(
                                        this.n_x, 
                                        o_vec_min.n_x,
                                        o_vec_max.n_x,
                                    ),
                                    f_n_wrapped(
                                        this.n_y, 
                                        o_vec_min.n_y,
                                        o_vec_max.n_y,
                                    ),
                                    f_n_wrapped(
                                        this.n_z, 
                                        o_vec_min.n_z,
                                        o_vec_max.n_z,
                                    )
                    )
        }

        
    O_vec3.prototype.wrap_minmax = O_vec3.prototype.wrap
    
    

    O_vec3.prototype.comps_to_inteq = 
        function(){
            
                    let b_all = arguments.length == 0
                    let a_v_arg = Array.from(arguments);
                    
            
                        this.n_x=(b_all || a_v_arg?.some(v=>["n_x","x","0"].includes(v))) ? parseInt(this.n_x): this.n_x;this.n_y=(b_all || a_v_arg?.some(v=>["n_y","y","1"].includes(v))) ? parseInt(this.n_y): this.n_y;this.n_z=(b_all || a_v_arg?.some(v=>["n_z","z","2"].includes(v))) ? parseInt(this.n_z): this.n_z
                        return this
                    
        }

        
    O_vec3.prototype.to_inteq = O_vec3.prototype.comps_to_inteq
    
    

    O_vec3.prototype.addeq = 
        function(v){
            const o_vec = (typeof v == 'number') ? new O_vec3(...arguments) : v
            
                        this.n_x=this.n_x + o_vec.n_x;this.n_y=this.n_y + o_vec.n_y;this.n_z=this.n_z + o_vec.n_z
                        return this
                    
        }

        
    
    
    

    O_vec3.prototype.subeq = 
        function(v){
            const o_vec = (typeof v == 'number') ? new O_vec3(...arguments) : v
            
                        this.n_x=this.n_x - o_vec.n_x;this.n_y=this.n_y - o_vec.n_y;this.n_z=this.n_z - o_vec.n_z
                        return this
                    
        }

        
    O_vec3.prototype.subtracteq = O_vec3.prototype.subeq
    
    

    O_vec3.prototype.muleq = 
        function(v){
            const o_vec = (typeof v == 'number') ? new O_vec3(...arguments) : v
            
                        this.n_x=this.n_x * o_vec.n_x;this.n_y=this.n_y * o_vec.n_y;this.n_z=this.n_z * o_vec.n_z
                        return this
                    
        }

        
    O_vec3.prototype.multiplyeq = O_vec3.prototype.muleq
    
    

    O_vec3.prototype.diveq = 
        function(v){
            const o_vec = (typeof v == 'number') ? new O_vec3(...arguments) : v
            
                        this.n_x=this.n_x / o_vec.n_x;this.n_y=this.n_y / o_vec.n_y;this.n_z=this.n_z / o_vec.n_z
                        return this
                    
        }

        
    O_vec3.prototype.divideeq = O_vec3.prototype.diveq
    
    

    O_vec3.prototype.comps_to_inteq = 
        function(){
            
                    let b_all = arguments.length == 0
                    let a_v_arg = Array.from(arguments);
                    
            
                        this.n_x=(b_all || a_v_arg?.some(v=>["n_x","x","0"].includes(v))) ? parseInt(this.n_x): this.n_x;this.n_y=(b_all || a_v_arg?.some(v=>["n_y","y","1"].includes(v))) ? parseInt(this.n_y): this.n_y;this.n_z=(b_all || a_v_arg?.some(v=>["n_z","z","2"].includes(v))) ? parseInt(this.n_z): this.n_z
                        return this
                    
        }

        
    O_vec3.prototype.to_inteq = O_vec3.prototype.comps_to_inteq
    
    

    O_vec3.prototype.abseq = 
        function(){
            
                    let b_all = arguments.length == 0
                    let a_v_arg = Array.from(arguments);
                    
            
                        this.n_x=(b_all || a_v_arg?.some(v=>["n_x","x","0"].includes(v))) ? Math.abs(this.n_x): this.n_x;this.n_y=(b_all || a_v_arg?.some(v=>["n_y","y","1"].includes(v))) ? Math.abs(this.n_y): this.n_y;this.n_z=(b_all || a_v_arg?.some(v=>["n_z","z","2"].includes(v))) ? Math.abs(this.n_z): this.n_z
                        return this
                    
        }

        
    O_vec3.prototype.absoluteeq = O_vec3.prototype.abseq
    
    

    O_vec3.prototype.normeq = 
        function(){
            
                    const n_length = this.length();
                    
            
                        this.n_x=this.n_x / n_length;this.n_y=this.n_y / n_length;this.n_z=this.n_z / n_length
                        return this
                    
        }

        
    O_vec3.prototype.normalizeeq = O_vec3.prototype.normeq
    
    

    O_vec3.prototype.fracteq = 
        function(){
            
            
                        this.n_x=this.n_x % 1;this.n_y=this.n_y % 1;this.n_z=this.n_z % 1
                        return this
                    
        }

        
    
    
    

    O_vec3.prototype.modeq = 
        function(v){
            
                    const o_vec = (typeof v == 'number') ? new O_vec3(...arguments) : v
                    
            
                        this.n_x=this.n_x % o_vec.n_x;this.n_y=this.n_y % o_vec.n_y;this.n_z=this.n_z % o_vec.n_z
                        return this
                    
        }

        
    
    
    

    O_vec3.prototype.clampeq = 
        function(
                    o_vec_min, 
                    o_vec_max
                    ){
            
            
                        this.n_x=
                                    f_n_clamped(
                                        this.n_x, 
                                        o_vec_min.n_x,
                                        o_vec_max.n_x,
                                    );this.n_y=
                                    f_n_clamped(
                                        this.n_y, 
                                        o_vec_min.n_y,
                                        o_vec_max.n_y,
                                    );this.n_z=
                                    f_n_clamped(
                                        this.n_z, 
                                        o_vec_min.n_z,
                                        o_vec_max.n_z,
                                    )
                        return this
                    
        }

        
    O_vec3.prototype.clamp_minmaxeq = O_vec3.prototype.clampeq
    
    

    O_vec3.prototype.wrapeq = 
        function(
                    o_vec_min, 
                    o_vec_max
                    ){
            
            
                        this.n_x=
                                    f_n_wrapped(
                                        this.n_x, 
                                        o_vec_min.n_x,
                                        o_vec_max.n_x,
                                    );this.n_y=
                                    f_n_wrapped(
                                        this.n_y, 
                                        o_vec_min.n_y,
                                        o_vec_max.n_y,
                                    );this.n_z=
                                    f_n_wrapped(
                                        this.n_z, 
                                        o_vec_min.n_z,
                                        o_vec_max.n_z,
                                    )
                        return this
                    
        }

        
    O_vec3.prototype.wrap_minmaxeq = O_vec3.prototype.wrapeq
    
    

    O_vec3.prototype.to_index = 
            function(o_scl){
                return (
                (parseInt(this.n_x) % parseInt(o_scl.n_x))
+ (parseInt(this.n_y) * parseInt(o_scl.n_x))
+ (parseInt(this.n_z) * parseInt(o_scl.n_x) * parseInt(o_scl.n_y))
                )
            }

            
    O_vec3.prototype.to_idx = O_vec3.prototype.to_index
    
    

    O_vec3.prototype.from_index = 
            function(n_idx){
                n_idx = parseInt(n_idx)

                return new O_vec3(
                (n_idx % parseInt(this.n_x)),
parseInt(n_idx / parseInt(this.n_x)),
parseInt(n_idx / parseInt(this.n_x) * parseInt(this.n_y))
                )
            }

            
    O_vec3.prototype.from_idx = O_vec3.prototype.from_index
    
    

    O_vec3.prototype.compsadd = 
                        function(){
                            return 0
                            + this.n_x
+ this.n_y
+ this.n_z
                        }
                    
    
    
    

    O_vec3.prototype.compssub = 
                        function(){
                            return 0
                            - this.n_x
- this.n_y
- this.n_z
                        }
                    
    
    
    

    O_vec3.prototype.compsmul = 
                        function(){
                            return 1
                            * this.n_x
* this.n_y
* this.n_z
                        }
                    
    
    
    

    O_vec3.prototype.compsdiv = 
                        function(){
                            return 1
                            / this.n_x
/ this.n_y
/ this.n_z
                        }
                    
    
    
    

    O_vec3.prototype.dot = 
            function(v){
                const o_vec = (typeof v == 'number') ? new O_vec3(...arguments) : v
                return this.n_x * o_vec.n_x+
this.n_y * o_vec.n_y+
this.n_z * o_vec.n_z
            }

            
    O_vec3.prototype.dotproduct = O_vec3.prototype.dot
    
    

    O_vec3.prototype.len = 
            function(){
                return Math.sqrt(this.n_x * this.n_x+this.n_y * this.n_y+this.n_z * this.n_z)
            }

            
    O_vec3.prototype.length = O_vec3.prototype.len
    
    

    O_vec3.prototype.clone = 
            function(){
                return new O_vec3(
                    this.n_x,this.n_y,this.n_z
                )

            }

            
    O_vec3.prototype.cln = O_vec3.prototype.clone
    
    

    O_vec3.prototype.sangle = 
            function(v){
                const o_vec = (typeof v == 'number') ? new O_vec3(...arguments) : v
                return Math.acos(
                    this.dot(o_vec)/(this.length()*o_vec.length())
                )
            }

            
    O_vec3.prototype.smallestangle = O_vec3.prototype.sangle
O_vec3.prototype.shortestangle = O_vec3.prototype.sangle
    O_vec3.prototype.sangle_deg = function(){
                    return (O_vec3.prototype.sangle.call(this,...arguments)/O_vec3.n_tau)*360
                }
O_vec3.prototype.smallestangle_deg = function(){
                    return (O_vec3.prototype.sangle.call(this,...arguments)/O_vec3.n_tau)*360
                }
O_vec3.prototype.shortestangle_deg = function(){
                    return (O_vec3.prototype.sangle.call(this,...arguments)/O_vec3.n_tau)*360
                }
    

    O_vec3.prototype.cross = 
                    function(v){
                        const o_vec = (typeof v == 'number') ? new O_vec3(...arguments) : v
        
                        const o_vec_a = new O_vec3(
                            this.n_y,this.n_z,this.n_x
                        )
                        const o_vec_b = new O_vec3(
                            o_vec.n_z,o_vec.n_x,o_vec.n_y
                        )
                        const o_vec_c = new O_vec3(
                            this.n_z,this.n_x,this.n_y
                        )
                        const o_vec_d = new O_vec3(
                            o_vec.n_y,o_vec.n_z,o_vec.n_x
                        )
                        
                                    return new O_vec3(
                                    this.n_x = o_vec_a.n_x * o_vec_b.n_x - o_vec_c.n_x * o_vec_d.n_x,
this.n_y = o_vec_a.n_y * o_vec_b.n_y - o_vec_c.n_y * o_vec_d.n_y,
this.n_z = o_vec_a.n_z * o_vec_b.n_z - o_vec_c.n_z * o_vec_d.n_z
                                    )
                                    
                    }
        
                    
    O_vec3.prototype.crossproduct = O_vec3.prototype.cross
    
    

    O_vec3.prototype.crosseq = 
                    function(v){
                        const o_vec = (typeof v == 'number') ? new O_vec3(...arguments) : v
        
                        const o_vec_a = new O_vec3(
                            this.n_y,this.n_z,this.n_x
                        )
                        const o_vec_b = new O_vec3(
                            o_vec.n_z,o_vec.n_x,o_vec.n_y
                        )
                        const o_vec_c = new O_vec3(
                            this.n_z,this.n_x,this.n_y
                        )
                        const o_vec_d = new O_vec3(
                            o_vec.n_y,o_vec.n_z,o_vec.n_x
                        )
                        
                                    this.n_x = o_vec_a.n_x * o_vec_b.n_x - o_vec_c.n_x * o_vec_d.n_x,
this.n_y = o_vec_a.n_y * o_vec_b.n_y - o_vec_c.n_y * o_vec_d.n_y,
this.n_z = o_vec_a.n_z * o_vec_b.n_z - o_vec_c.n_z * o_vec_d.n_z
                                    return this
                                    
                    }
        
                    
    O_vec3.prototype.crossproducteq = O_vec3.prototype.crosseq
    
    

export {O_vec3}
    

class O_vec4{
    constructor(
        n_x,
n_y,
n_z,
n_w
    ){

        if(typeof n_x === 'object'){
            let o = n_x
            n_x = o.n_x
n_y = o.n_y
n_z = o.n_z
n_w = o.n_w
        }

        
                
                this.n_x = (typeof n_x === 'number') ? n_x : 0
                

                
                this.n_y = (typeof n_y === 'number') ? n_y : this.n_x
                

                
                this.n_z = (typeof n_z === 'number') ? n_z : this.n_y
                

                
                this.n_w = (typeof n_w === 'number') ? n_w : this.n_z
                
    }
    toString(){
        return '('+this.n_x.toString()+','+this.n_y.toString()+','+this.n_z.toString()+','+this.n_w.toString()+')'
    }
    
                    get x(){
                        return this.n_x
                    }
                    set x(v){
                        this.n_x = v
                    }
                    

                    get 0(){
                        return this.n_x
                    }
                    set 0(v){
                        this.n_x = v
                    }
                    

                    get y(){
                        return this.n_y
                    }
                    set y(v){
                        this.n_y = v
                    }
                    

                    get 1(){
                        return this.n_y
                    }
                    set 1(v){
                        this.n_y = v
                    }
                    

                    get z(){
                        return this.n_z
                    }
                    set z(v){
                        this.n_z = v
                    }
                    

                    get 2(){
                        return this.n_z
                    }
                    set 2(v){
                        this.n_z = v
                    }
                    

                    get w(){
                        return this.n_w
                    }
                    set w(v){
                        this.n_w = v
                    }
                    

                    get 3(){
                        return this.n_w
                    }
                    set 3(v){
                        this.n_w = v
                    }
                    

    get a_n_comp(){
        return [
            this.n_x,
this.n_y,
this.n_z,
this.n_w
        ]
    }
    get xxxx(){
                    return new O_vec4(
                        this.n_x,this.n_x,this.n_x,this.n_x
                    )
                }
get xxxy(){
                    return new O_vec4(
                        this.n_x,this.n_x,this.n_x,this.n_y
                    )
                }
get xxxz(){
                    return new O_vec4(
                        this.n_x,this.n_x,this.n_x,this.n_z
                    )
                }
get xxxw(){
                    return new O_vec4(
                        this.n_x,this.n_x,this.n_x,this.n_w
                    )
                }
get xxyx(){
                    return new O_vec4(
                        this.n_x,this.n_x,this.n_y,this.n_x
                    )
                }
get xxyy(){
                    return new O_vec4(
                        this.n_x,this.n_x,this.n_y,this.n_y
                    )
                }
get xxyz(){
                    return new O_vec4(
                        this.n_x,this.n_x,this.n_y,this.n_z
                    )
                }
get xxyw(){
                    return new O_vec4(
                        this.n_x,this.n_x,this.n_y,this.n_w
                    )
                }
get xxzx(){
                    return new O_vec4(
                        this.n_x,this.n_x,this.n_z,this.n_x
                    )
                }
get xxzy(){
                    return new O_vec4(
                        this.n_x,this.n_x,this.n_z,this.n_y
                    )
                }
get xxzz(){
                    return new O_vec4(
                        this.n_x,this.n_x,this.n_z,this.n_z
                    )
                }
get xxzw(){
                    return new O_vec4(
                        this.n_x,this.n_x,this.n_z,this.n_w
                    )
                }
get xxwx(){
                    return new O_vec4(
                        this.n_x,this.n_x,this.n_w,this.n_x
                    )
                }
get xxwy(){
                    return new O_vec4(
                        this.n_x,this.n_x,this.n_w,this.n_y
                    )
                }
get xxwz(){
                    return new O_vec4(
                        this.n_x,this.n_x,this.n_w,this.n_z
                    )
                }
get xxww(){
                    return new O_vec4(
                        this.n_x,this.n_x,this.n_w,this.n_w
                    )
                }
get xyxx(){
                    return new O_vec4(
                        this.n_x,this.n_y,this.n_x,this.n_x
                    )
                }
get xyxy(){
                    return new O_vec4(
                        this.n_x,this.n_y,this.n_x,this.n_y
                    )
                }
get xyxz(){
                    return new O_vec4(
                        this.n_x,this.n_y,this.n_x,this.n_z
                    )
                }
get xyxw(){
                    return new O_vec4(
                        this.n_x,this.n_y,this.n_x,this.n_w
                    )
                }
get xyyx(){
                    return new O_vec4(
                        this.n_x,this.n_y,this.n_y,this.n_x
                    )
                }
get xyyy(){
                    return new O_vec4(
                        this.n_x,this.n_y,this.n_y,this.n_y
                    )
                }
get xyyz(){
                    return new O_vec4(
                        this.n_x,this.n_y,this.n_y,this.n_z
                    )
                }
get xyyw(){
                    return new O_vec4(
                        this.n_x,this.n_y,this.n_y,this.n_w
                    )
                }
get xyzx(){
                    return new O_vec4(
                        this.n_x,this.n_y,this.n_z,this.n_x
                    )
                }
get xyzy(){
                    return new O_vec4(
                        this.n_x,this.n_y,this.n_z,this.n_y
                    )
                }
get xyzz(){
                    return new O_vec4(
                        this.n_x,this.n_y,this.n_z,this.n_z
                    )
                }
get xyzw(){
                    return new O_vec4(
                        this.n_x,this.n_y,this.n_z,this.n_w
                    )
                }
get xywx(){
                    return new O_vec4(
                        this.n_x,this.n_y,this.n_w,this.n_x
                    )
                }
get xywy(){
                    return new O_vec4(
                        this.n_x,this.n_y,this.n_w,this.n_y
                    )
                }
get xywz(){
                    return new O_vec4(
                        this.n_x,this.n_y,this.n_w,this.n_z
                    )
                }
get xyww(){
                    return new O_vec4(
                        this.n_x,this.n_y,this.n_w,this.n_w
                    )
                }
get xzxx(){
                    return new O_vec4(
                        this.n_x,this.n_z,this.n_x,this.n_x
                    )
                }
get xzxy(){
                    return new O_vec4(
                        this.n_x,this.n_z,this.n_x,this.n_y
                    )
                }
get xzxz(){
                    return new O_vec4(
                        this.n_x,this.n_z,this.n_x,this.n_z
                    )
                }
get xzxw(){
                    return new O_vec4(
                        this.n_x,this.n_z,this.n_x,this.n_w
                    )
                }
get xzyx(){
                    return new O_vec4(
                        this.n_x,this.n_z,this.n_y,this.n_x
                    )
                }
get xzyy(){
                    return new O_vec4(
                        this.n_x,this.n_z,this.n_y,this.n_y
                    )
                }
get xzyz(){
                    return new O_vec4(
                        this.n_x,this.n_z,this.n_y,this.n_z
                    )
                }
get xzyw(){
                    return new O_vec4(
                        this.n_x,this.n_z,this.n_y,this.n_w
                    )
                }
get xzzx(){
                    return new O_vec4(
                        this.n_x,this.n_z,this.n_z,this.n_x
                    )
                }
get xzzy(){
                    return new O_vec4(
                        this.n_x,this.n_z,this.n_z,this.n_y
                    )
                }
get xzzz(){
                    return new O_vec4(
                        this.n_x,this.n_z,this.n_z,this.n_z
                    )
                }
get xzzw(){
                    return new O_vec4(
                        this.n_x,this.n_z,this.n_z,this.n_w
                    )
                }
get xzwx(){
                    return new O_vec4(
                        this.n_x,this.n_z,this.n_w,this.n_x
                    )
                }
get xzwy(){
                    return new O_vec4(
                        this.n_x,this.n_z,this.n_w,this.n_y
                    )
                }
get xzwz(){
                    return new O_vec4(
                        this.n_x,this.n_z,this.n_w,this.n_z
                    )
                }
get xzww(){
                    return new O_vec4(
                        this.n_x,this.n_z,this.n_w,this.n_w
                    )
                }
get xwxx(){
                    return new O_vec4(
                        this.n_x,this.n_w,this.n_x,this.n_x
                    )
                }
get xwxy(){
                    return new O_vec4(
                        this.n_x,this.n_w,this.n_x,this.n_y
                    )
                }
get xwxz(){
                    return new O_vec4(
                        this.n_x,this.n_w,this.n_x,this.n_z
                    )
                }
get xwxw(){
                    return new O_vec4(
                        this.n_x,this.n_w,this.n_x,this.n_w
                    )
                }
get xwyx(){
                    return new O_vec4(
                        this.n_x,this.n_w,this.n_y,this.n_x
                    )
                }
get xwyy(){
                    return new O_vec4(
                        this.n_x,this.n_w,this.n_y,this.n_y
                    )
                }
get xwyz(){
                    return new O_vec4(
                        this.n_x,this.n_w,this.n_y,this.n_z
                    )
                }
get xwyw(){
                    return new O_vec4(
                        this.n_x,this.n_w,this.n_y,this.n_w
                    )
                }
get xwzx(){
                    return new O_vec4(
                        this.n_x,this.n_w,this.n_z,this.n_x
                    )
                }
get xwzy(){
                    return new O_vec4(
                        this.n_x,this.n_w,this.n_z,this.n_y
                    )
                }
get xwzz(){
                    return new O_vec4(
                        this.n_x,this.n_w,this.n_z,this.n_z
                    )
                }
get xwzw(){
                    return new O_vec4(
                        this.n_x,this.n_w,this.n_z,this.n_w
                    )
                }
get xwwx(){
                    return new O_vec4(
                        this.n_x,this.n_w,this.n_w,this.n_x
                    )
                }
get xwwy(){
                    return new O_vec4(
                        this.n_x,this.n_w,this.n_w,this.n_y
                    )
                }
get xwwz(){
                    return new O_vec4(
                        this.n_x,this.n_w,this.n_w,this.n_z
                    )
                }
get xwww(){
                    return new O_vec4(
                        this.n_x,this.n_w,this.n_w,this.n_w
                    )
                }
get yxxx(){
                    return new O_vec4(
                        this.n_y,this.n_x,this.n_x,this.n_x
                    )
                }
get yxxy(){
                    return new O_vec4(
                        this.n_y,this.n_x,this.n_x,this.n_y
                    )
                }
get yxxz(){
                    return new O_vec4(
                        this.n_y,this.n_x,this.n_x,this.n_z
                    )
                }
get yxxw(){
                    return new O_vec4(
                        this.n_y,this.n_x,this.n_x,this.n_w
                    )
                }
get yxyx(){
                    return new O_vec4(
                        this.n_y,this.n_x,this.n_y,this.n_x
                    )
                }
get yxyy(){
                    return new O_vec4(
                        this.n_y,this.n_x,this.n_y,this.n_y
                    )
                }
get yxyz(){
                    return new O_vec4(
                        this.n_y,this.n_x,this.n_y,this.n_z
                    )
                }
get yxyw(){
                    return new O_vec4(
                        this.n_y,this.n_x,this.n_y,this.n_w
                    )
                }
get yxzx(){
                    return new O_vec4(
                        this.n_y,this.n_x,this.n_z,this.n_x
                    )
                }
get yxzy(){
                    return new O_vec4(
                        this.n_y,this.n_x,this.n_z,this.n_y
                    )
                }
get yxzz(){
                    return new O_vec4(
                        this.n_y,this.n_x,this.n_z,this.n_z
                    )
                }
get yxzw(){
                    return new O_vec4(
                        this.n_y,this.n_x,this.n_z,this.n_w
                    )
                }
get yxwx(){
                    return new O_vec4(
                        this.n_y,this.n_x,this.n_w,this.n_x
                    )
                }
get yxwy(){
                    return new O_vec4(
                        this.n_y,this.n_x,this.n_w,this.n_y
                    )
                }
get yxwz(){
                    return new O_vec4(
                        this.n_y,this.n_x,this.n_w,this.n_z
                    )
                }
get yxww(){
                    return new O_vec4(
                        this.n_y,this.n_x,this.n_w,this.n_w
                    )
                }
get yyxx(){
                    return new O_vec4(
                        this.n_y,this.n_y,this.n_x,this.n_x
                    )
                }
get yyxy(){
                    return new O_vec4(
                        this.n_y,this.n_y,this.n_x,this.n_y
                    )
                }
get yyxz(){
                    return new O_vec4(
                        this.n_y,this.n_y,this.n_x,this.n_z
                    )
                }
get yyxw(){
                    return new O_vec4(
                        this.n_y,this.n_y,this.n_x,this.n_w
                    )
                }
get yyyx(){
                    return new O_vec4(
                        this.n_y,this.n_y,this.n_y,this.n_x
                    )
                }
get yyyy(){
                    return new O_vec4(
                        this.n_y,this.n_y,this.n_y,this.n_y
                    )
                }
get yyyz(){
                    return new O_vec4(
                        this.n_y,this.n_y,this.n_y,this.n_z
                    )
                }
get yyyw(){
                    return new O_vec4(
                        this.n_y,this.n_y,this.n_y,this.n_w
                    )
                }
get yyzx(){
                    return new O_vec4(
                        this.n_y,this.n_y,this.n_z,this.n_x
                    )
                }
get yyzy(){
                    return new O_vec4(
                        this.n_y,this.n_y,this.n_z,this.n_y
                    )
                }
get yyzz(){
                    return new O_vec4(
                        this.n_y,this.n_y,this.n_z,this.n_z
                    )
                }
get yyzw(){
                    return new O_vec4(
                        this.n_y,this.n_y,this.n_z,this.n_w
                    )
                }
get yywx(){
                    return new O_vec4(
                        this.n_y,this.n_y,this.n_w,this.n_x
                    )
                }
get yywy(){
                    return new O_vec4(
                        this.n_y,this.n_y,this.n_w,this.n_y
                    )
                }
get yywz(){
                    return new O_vec4(
                        this.n_y,this.n_y,this.n_w,this.n_z
                    )
                }
get yyww(){
                    return new O_vec4(
                        this.n_y,this.n_y,this.n_w,this.n_w
                    )
                }
get yzxx(){
                    return new O_vec4(
                        this.n_y,this.n_z,this.n_x,this.n_x
                    )
                }
get yzxy(){
                    return new O_vec4(
                        this.n_y,this.n_z,this.n_x,this.n_y
                    )
                }
get yzxz(){
                    return new O_vec4(
                        this.n_y,this.n_z,this.n_x,this.n_z
                    )
                }
get yzxw(){
                    return new O_vec4(
                        this.n_y,this.n_z,this.n_x,this.n_w
                    )
                }
get yzyx(){
                    return new O_vec4(
                        this.n_y,this.n_z,this.n_y,this.n_x
                    )
                }
get yzyy(){
                    return new O_vec4(
                        this.n_y,this.n_z,this.n_y,this.n_y
                    )
                }
get yzyz(){
                    return new O_vec4(
                        this.n_y,this.n_z,this.n_y,this.n_z
                    )
                }
get yzyw(){
                    return new O_vec4(
                        this.n_y,this.n_z,this.n_y,this.n_w
                    )
                }
get yzzx(){
                    return new O_vec4(
                        this.n_y,this.n_z,this.n_z,this.n_x
                    )
                }
get yzzy(){
                    return new O_vec4(
                        this.n_y,this.n_z,this.n_z,this.n_y
                    )
                }
get yzzz(){
                    return new O_vec4(
                        this.n_y,this.n_z,this.n_z,this.n_z
                    )
                }
get yzzw(){
                    return new O_vec4(
                        this.n_y,this.n_z,this.n_z,this.n_w
                    )
                }
get yzwx(){
                    return new O_vec4(
                        this.n_y,this.n_z,this.n_w,this.n_x
                    )
                }
get yzwy(){
                    return new O_vec4(
                        this.n_y,this.n_z,this.n_w,this.n_y
                    )
                }
get yzwz(){
                    return new O_vec4(
                        this.n_y,this.n_z,this.n_w,this.n_z
                    )
                }
get yzww(){
                    return new O_vec4(
                        this.n_y,this.n_z,this.n_w,this.n_w
                    )
                }
get ywxx(){
                    return new O_vec4(
                        this.n_y,this.n_w,this.n_x,this.n_x
                    )
                }
get ywxy(){
                    return new O_vec4(
                        this.n_y,this.n_w,this.n_x,this.n_y
                    )
                }
get ywxz(){
                    return new O_vec4(
                        this.n_y,this.n_w,this.n_x,this.n_z
                    )
                }
get ywxw(){
                    return new O_vec4(
                        this.n_y,this.n_w,this.n_x,this.n_w
                    )
                }
get ywyx(){
                    return new O_vec4(
                        this.n_y,this.n_w,this.n_y,this.n_x
                    )
                }
get ywyy(){
                    return new O_vec4(
                        this.n_y,this.n_w,this.n_y,this.n_y
                    )
                }
get ywyz(){
                    return new O_vec4(
                        this.n_y,this.n_w,this.n_y,this.n_z
                    )
                }
get ywyw(){
                    return new O_vec4(
                        this.n_y,this.n_w,this.n_y,this.n_w
                    )
                }
get ywzx(){
                    return new O_vec4(
                        this.n_y,this.n_w,this.n_z,this.n_x
                    )
                }
get ywzy(){
                    return new O_vec4(
                        this.n_y,this.n_w,this.n_z,this.n_y
                    )
                }
get ywzz(){
                    return new O_vec4(
                        this.n_y,this.n_w,this.n_z,this.n_z
                    )
                }
get ywzw(){
                    return new O_vec4(
                        this.n_y,this.n_w,this.n_z,this.n_w
                    )
                }
get ywwx(){
                    return new O_vec4(
                        this.n_y,this.n_w,this.n_w,this.n_x
                    )
                }
get ywwy(){
                    return new O_vec4(
                        this.n_y,this.n_w,this.n_w,this.n_y
                    )
                }
get ywwz(){
                    return new O_vec4(
                        this.n_y,this.n_w,this.n_w,this.n_z
                    )
                }
get ywww(){
                    return new O_vec4(
                        this.n_y,this.n_w,this.n_w,this.n_w
                    )
                }
get zxxx(){
                    return new O_vec4(
                        this.n_z,this.n_x,this.n_x,this.n_x
                    )
                }
get zxxy(){
                    return new O_vec4(
                        this.n_z,this.n_x,this.n_x,this.n_y
                    )
                }
get zxxz(){
                    return new O_vec4(
                        this.n_z,this.n_x,this.n_x,this.n_z
                    )
                }
get zxxw(){
                    return new O_vec4(
                        this.n_z,this.n_x,this.n_x,this.n_w
                    )
                }
get zxyx(){
                    return new O_vec4(
                        this.n_z,this.n_x,this.n_y,this.n_x
                    )
                }
get zxyy(){
                    return new O_vec4(
                        this.n_z,this.n_x,this.n_y,this.n_y
                    )
                }
get zxyz(){
                    return new O_vec4(
                        this.n_z,this.n_x,this.n_y,this.n_z
                    )
                }
get zxyw(){
                    return new O_vec4(
                        this.n_z,this.n_x,this.n_y,this.n_w
                    )
                }
get zxzx(){
                    return new O_vec4(
                        this.n_z,this.n_x,this.n_z,this.n_x
                    )
                }
get zxzy(){
                    return new O_vec4(
                        this.n_z,this.n_x,this.n_z,this.n_y
                    )
                }
get zxzz(){
                    return new O_vec4(
                        this.n_z,this.n_x,this.n_z,this.n_z
                    )
                }
get zxzw(){
                    return new O_vec4(
                        this.n_z,this.n_x,this.n_z,this.n_w
                    )
                }
get zxwx(){
                    return new O_vec4(
                        this.n_z,this.n_x,this.n_w,this.n_x
                    )
                }
get zxwy(){
                    return new O_vec4(
                        this.n_z,this.n_x,this.n_w,this.n_y
                    )
                }
get zxwz(){
                    return new O_vec4(
                        this.n_z,this.n_x,this.n_w,this.n_z
                    )
                }
get zxww(){
                    return new O_vec4(
                        this.n_z,this.n_x,this.n_w,this.n_w
                    )
                }
get zyxx(){
                    return new O_vec4(
                        this.n_z,this.n_y,this.n_x,this.n_x
                    )
                }
get zyxy(){
                    return new O_vec4(
                        this.n_z,this.n_y,this.n_x,this.n_y
                    )
                }
get zyxz(){
                    return new O_vec4(
                        this.n_z,this.n_y,this.n_x,this.n_z
                    )
                }
get zyxw(){
                    return new O_vec4(
                        this.n_z,this.n_y,this.n_x,this.n_w
                    )
                }
get zyyx(){
                    return new O_vec4(
                        this.n_z,this.n_y,this.n_y,this.n_x
                    )
                }
get zyyy(){
                    return new O_vec4(
                        this.n_z,this.n_y,this.n_y,this.n_y
                    )
                }
get zyyz(){
                    return new O_vec4(
                        this.n_z,this.n_y,this.n_y,this.n_z
                    )
                }
get zyyw(){
                    return new O_vec4(
                        this.n_z,this.n_y,this.n_y,this.n_w
                    )
                }
get zyzx(){
                    return new O_vec4(
                        this.n_z,this.n_y,this.n_z,this.n_x
                    )
                }
get zyzy(){
                    return new O_vec4(
                        this.n_z,this.n_y,this.n_z,this.n_y
                    )
                }
get zyzz(){
                    return new O_vec4(
                        this.n_z,this.n_y,this.n_z,this.n_z
                    )
                }
get zyzw(){
                    return new O_vec4(
                        this.n_z,this.n_y,this.n_z,this.n_w
                    )
                }
get zywx(){
                    return new O_vec4(
                        this.n_z,this.n_y,this.n_w,this.n_x
                    )
                }
get zywy(){
                    return new O_vec4(
                        this.n_z,this.n_y,this.n_w,this.n_y
                    )
                }
get zywz(){
                    return new O_vec4(
                        this.n_z,this.n_y,this.n_w,this.n_z
                    )
                }
get zyww(){
                    return new O_vec4(
                        this.n_z,this.n_y,this.n_w,this.n_w
                    )
                }
get zzxx(){
                    return new O_vec4(
                        this.n_z,this.n_z,this.n_x,this.n_x
                    )
                }
get zzxy(){
                    return new O_vec4(
                        this.n_z,this.n_z,this.n_x,this.n_y
                    )
                }
get zzxz(){
                    return new O_vec4(
                        this.n_z,this.n_z,this.n_x,this.n_z
                    )
                }
get zzxw(){
                    return new O_vec4(
                        this.n_z,this.n_z,this.n_x,this.n_w
                    )
                }
get zzyx(){
                    return new O_vec4(
                        this.n_z,this.n_z,this.n_y,this.n_x
                    )
                }
get zzyy(){
                    return new O_vec4(
                        this.n_z,this.n_z,this.n_y,this.n_y
                    )
                }
get zzyz(){
                    return new O_vec4(
                        this.n_z,this.n_z,this.n_y,this.n_z
                    )
                }
get zzyw(){
                    return new O_vec4(
                        this.n_z,this.n_z,this.n_y,this.n_w
                    )
                }
get zzzx(){
                    return new O_vec4(
                        this.n_z,this.n_z,this.n_z,this.n_x
                    )
                }
get zzzy(){
                    return new O_vec4(
                        this.n_z,this.n_z,this.n_z,this.n_y
                    )
                }
get zzzz(){
                    return new O_vec4(
                        this.n_z,this.n_z,this.n_z,this.n_z
                    )
                }
get zzzw(){
                    return new O_vec4(
                        this.n_z,this.n_z,this.n_z,this.n_w
                    )
                }
get zzwx(){
                    return new O_vec4(
                        this.n_z,this.n_z,this.n_w,this.n_x
                    )
                }
get zzwy(){
                    return new O_vec4(
                        this.n_z,this.n_z,this.n_w,this.n_y
                    )
                }
get zzwz(){
                    return new O_vec4(
                        this.n_z,this.n_z,this.n_w,this.n_z
                    )
                }
get zzww(){
                    return new O_vec4(
                        this.n_z,this.n_z,this.n_w,this.n_w
                    )
                }
get zwxx(){
                    return new O_vec4(
                        this.n_z,this.n_w,this.n_x,this.n_x
                    )
                }
get zwxy(){
                    return new O_vec4(
                        this.n_z,this.n_w,this.n_x,this.n_y
                    )
                }
get zwxz(){
                    return new O_vec4(
                        this.n_z,this.n_w,this.n_x,this.n_z
                    )
                }
get zwxw(){
                    return new O_vec4(
                        this.n_z,this.n_w,this.n_x,this.n_w
                    )
                }
get zwyx(){
                    return new O_vec4(
                        this.n_z,this.n_w,this.n_y,this.n_x
                    )
                }
get zwyy(){
                    return new O_vec4(
                        this.n_z,this.n_w,this.n_y,this.n_y
                    )
                }
get zwyz(){
                    return new O_vec4(
                        this.n_z,this.n_w,this.n_y,this.n_z
                    )
                }
get zwyw(){
                    return new O_vec4(
                        this.n_z,this.n_w,this.n_y,this.n_w
                    )
                }
get zwzx(){
                    return new O_vec4(
                        this.n_z,this.n_w,this.n_z,this.n_x
                    )
                }
get zwzy(){
                    return new O_vec4(
                        this.n_z,this.n_w,this.n_z,this.n_y
                    )
                }
get zwzz(){
                    return new O_vec4(
                        this.n_z,this.n_w,this.n_z,this.n_z
                    )
                }
get zwzw(){
                    return new O_vec4(
                        this.n_z,this.n_w,this.n_z,this.n_w
                    )
                }
get zwwx(){
                    return new O_vec4(
                        this.n_z,this.n_w,this.n_w,this.n_x
                    )
                }
get zwwy(){
                    return new O_vec4(
                        this.n_z,this.n_w,this.n_w,this.n_y
                    )
                }
get zwwz(){
                    return new O_vec4(
                        this.n_z,this.n_w,this.n_w,this.n_z
                    )
                }
get zwww(){
                    return new O_vec4(
                        this.n_z,this.n_w,this.n_w,this.n_w
                    )
                }
get wxxx(){
                    return new O_vec4(
                        this.n_w,this.n_x,this.n_x,this.n_x
                    )
                }
get wxxy(){
                    return new O_vec4(
                        this.n_w,this.n_x,this.n_x,this.n_y
                    )
                }
get wxxz(){
                    return new O_vec4(
                        this.n_w,this.n_x,this.n_x,this.n_z
                    )
                }
get wxxw(){
                    return new O_vec4(
                        this.n_w,this.n_x,this.n_x,this.n_w
                    )
                }
get wxyx(){
                    return new O_vec4(
                        this.n_w,this.n_x,this.n_y,this.n_x
                    )
                }
get wxyy(){
                    return new O_vec4(
                        this.n_w,this.n_x,this.n_y,this.n_y
                    )
                }
get wxyz(){
                    return new O_vec4(
                        this.n_w,this.n_x,this.n_y,this.n_z
                    )
                }
get wxyw(){
                    return new O_vec4(
                        this.n_w,this.n_x,this.n_y,this.n_w
                    )
                }
get wxzx(){
                    return new O_vec4(
                        this.n_w,this.n_x,this.n_z,this.n_x
                    )
                }
get wxzy(){
                    return new O_vec4(
                        this.n_w,this.n_x,this.n_z,this.n_y
                    )
                }
get wxzz(){
                    return new O_vec4(
                        this.n_w,this.n_x,this.n_z,this.n_z
                    )
                }
get wxzw(){
                    return new O_vec4(
                        this.n_w,this.n_x,this.n_z,this.n_w
                    )
                }
get wxwx(){
                    return new O_vec4(
                        this.n_w,this.n_x,this.n_w,this.n_x
                    )
                }
get wxwy(){
                    return new O_vec4(
                        this.n_w,this.n_x,this.n_w,this.n_y
                    )
                }
get wxwz(){
                    return new O_vec4(
                        this.n_w,this.n_x,this.n_w,this.n_z
                    )
                }
get wxww(){
                    return new O_vec4(
                        this.n_w,this.n_x,this.n_w,this.n_w
                    )
                }
get wyxx(){
                    return new O_vec4(
                        this.n_w,this.n_y,this.n_x,this.n_x
                    )
                }
get wyxy(){
                    return new O_vec4(
                        this.n_w,this.n_y,this.n_x,this.n_y
                    )
                }
get wyxz(){
                    return new O_vec4(
                        this.n_w,this.n_y,this.n_x,this.n_z
                    )
                }
get wyxw(){
                    return new O_vec4(
                        this.n_w,this.n_y,this.n_x,this.n_w
                    )
                }
get wyyx(){
                    return new O_vec4(
                        this.n_w,this.n_y,this.n_y,this.n_x
                    )
                }
get wyyy(){
                    return new O_vec4(
                        this.n_w,this.n_y,this.n_y,this.n_y
                    )
                }
get wyyz(){
                    return new O_vec4(
                        this.n_w,this.n_y,this.n_y,this.n_z
                    )
                }
get wyyw(){
                    return new O_vec4(
                        this.n_w,this.n_y,this.n_y,this.n_w
                    )
                }
get wyzx(){
                    return new O_vec4(
                        this.n_w,this.n_y,this.n_z,this.n_x
                    )
                }
get wyzy(){
                    return new O_vec4(
                        this.n_w,this.n_y,this.n_z,this.n_y
                    )
                }
get wyzz(){
                    return new O_vec4(
                        this.n_w,this.n_y,this.n_z,this.n_z
                    )
                }
get wyzw(){
                    return new O_vec4(
                        this.n_w,this.n_y,this.n_z,this.n_w
                    )
                }
get wywx(){
                    return new O_vec4(
                        this.n_w,this.n_y,this.n_w,this.n_x
                    )
                }
get wywy(){
                    return new O_vec4(
                        this.n_w,this.n_y,this.n_w,this.n_y
                    )
                }
get wywz(){
                    return new O_vec4(
                        this.n_w,this.n_y,this.n_w,this.n_z
                    )
                }
get wyww(){
                    return new O_vec4(
                        this.n_w,this.n_y,this.n_w,this.n_w
                    )
                }
get wzxx(){
                    return new O_vec4(
                        this.n_w,this.n_z,this.n_x,this.n_x
                    )
                }
get wzxy(){
                    return new O_vec4(
                        this.n_w,this.n_z,this.n_x,this.n_y
                    )
                }
get wzxz(){
                    return new O_vec4(
                        this.n_w,this.n_z,this.n_x,this.n_z
                    )
                }
get wzxw(){
                    return new O_vec4(
                        this.n_w,this.n_z,this.n_x,this.n_w
                    )
                }
get wzyx(){
                    return new O_vec4(
                        this.n_w,this.n_z,this.n_y,this.n_x
                    )
                }
get wzyy(){
                    return new O_vec4(
                        this.n_w,this.n_z,this.n_y,this.n_y
                    )
                }
get wzyz(){
                    return new O_vec4(
                        this.n_w,this.n_z,this.n_y,this.n_z
                    )
                }
get wzyw(){
                    return new O_vec4(
                        this.n_w,this.n_z,this.n_y,this.n_w
                    )
                }
get wzzx(){
                    return new O_vec4(
                        this.n_w,this.n_z,this.n_z,this.n_x
                    )
                }
get wzzy(){
                    return new O_vec4(
                        this.n_w,this.n_z,this.n_z,this.n_y
                    )
                }
get wzzz(){
                    return new O_vec4(
                        this.n_w,this.n_z,this.n_z,this.n_z
                    )
                }
get wzzw(){
                    return new O_vec4(
                        this.n_w,this.n_z,this.n_z,this.n_w
                    )
                }
get wzwx(){
                    return new O_vec4(
                        this.n_w,this.n_z,this.n_w,this.n_x
                    )
                }
get wzwy(){
                    return new O_vec4(
                        this.n_w,this.n_z,this.n_w,this.n_y
                    )
                }
get wzwz(){
                    return new O_vec4(
                        this.n_w,this.n_z,this.n_w,this.n_z
                    )
                }
get wzww(){
                    return new O_vec4(
                        this.n_w,this.n_z,this.n_w,this.n_w
                    )
                }
get wwxx(){
                    return new O_vec4(
                        this.n_w,this.n_w,this.n_x,this.n_x
                    )
                }
get wwxy(){
                    return new O_vec4(
                        this.n_w,this.n_w,this.n_x,this.n_y
                    )
                }
get wwxz(){
                    return new O_vec4(
                        this.n_w,this.n_w,this.n_x,this.n_z
                    )
                }
get wwxw(){
                    return new O_vec4(
                        this.n_w,this.n_w,this.n_x,this.n_w
                    )
                }
get wwyx(){
                    return new O_vec4(
                        this.n_w,this.n_w,this.n_y,this.n_x
                    )
                }
get wwyy(){
                    return new O_vec4(
                        this.n_w,this.n_w,this.n_y,this.n_y
                    )
                }
get wwyz(){
                    return new O_vec4(
                        this.n_w,this.n_w,this.n_y,this.n_z
                    )
                }
get wwyw(){
                    return new O_vec4(
                        this.n_w,this.n_w,this.n_y,this.n_w
                    )
                }
get wwzx(){
                    return new O_vec4(
                        this.n_w,this.n_w,this.n_z,this.n_x
                    )
                }
get wwzy(){
                    return new O_vec4(
                        this.n_w,this.n_w,this.n_z,this.n_y
                    )
                }
get wwzz(){
                    return new O_vec4(
                        this.n_w,this.n_w,this.n_z,this.n_z
                    )
                }
get wwzw(){
                    return new O_vec4(
                        this.n_w,this.n_w,this.n_z,this.n_w
                    )
                }
get wwwx(){
                    return new O_vec4(
                        this.n_w,this.n_w,this.n_w,this.n_x
                    )
                }
get wwwy(){
                    return new O_vec4(
                        this.n_w,this.n_w,this.n_w,this.n_y
                    )
                }
get wwwz(){
                    return new O_vec4(
                        this.n_w,this.n_w,this.n_w,this.n_z
                    )
                }
get wwww(){
                    return new O_vec4(
                        this.n_w,this.n_w,this.n_w,this.n_w
                    )
                }
}
O_vec4.n_tau = Math.PI * 2

    O_vec4.prototype.comps_to_int = 
        function(){
            
                    let b_all = arguments.length == 0
                    let a_v_arg = Array.from(arguments);
                    
            return new O_vec4(
                        (b_all || a_v_arg?.some(v=>["n_x","x","0"].includes(v))) ? parseInt(this.n_x): this.n_x,(b_all || a_v_arg?.some(v=>["n_y","y","1"].includes(v))) ? parseInt(this.n_y): this.n_y,(b_all || a_v_arg?.some(v=>["n_z","z","2"].includes(v))) ? parseInt(this.n_z): this.n_z,(b_all || a_v_arg?.some(v=>["n_w","w","3"].includes(v))) ? parseInt(this.n_w): this.n_w
                    )
        }

        
    O_vec4.prototype.to_int = O_vec4.prototype.comps_to_int
    
    

    O_vec4.prototype.add = 
        function(v){
            const o_vec = (typeof v == 'number') ? new O_vec4(...arguments) : v
            return new O_vec4(
                        this.n_x + o_vec.n_x,this.n_y + o_vec.n_y,this.n_z + o_vec.n_z,this.n_w + o_vec.n_w
                    )
        }

        
    
    
    

    O_vec4.prototype.sub = 
        function(v){
            const o_vec = (typeof v == 'number') ? new O_vec4(...arguments) : v
            return new O_vec4(
                        this.n_x - o_vec.n_x,this.n_y - o_vec.n_y,this.n_z - o_vec.n_z,this.n_w - o_vec.n_w
                    )
        }

        
    O_vec4.prototype.subtract = O_vec4.prototype.sub
    
    

    O_vec4.prototype.mul = 
        function(v){
            const o_vec = (typeof v == 'number') ? new O_vec4(...arguments) : v
            return new O_vec4(
                        this.n_x * o_vec.n_x,this.n_y * o_vec.n_y,this.n_z * o_vec.n_z,this.n_w * o_vec.n_w
                    )
        }

        
    O_vec4.prototype.multiply = O_vec4.prototype.mul
    
    

    O_vec4.prototype.div = 
        function(v){
            const o_vec = (typeof v == 'number') ? new O_vec4(...arguments) : v
            return new O_vec4(
                        this.n_x / o_vec.n_x,this.n_y / o_vec.n_y,this.n_z / o_vec.n_z,this.n_w / o_vec.n_w
                    )
        }

        
    O_vec4.prototype.divide = O_vec4.prototype.div
    
    

    O_vec4.prototype.comps_to_int = 
        function(){
            
                    let b_all = arguments.length == 0
                    let a_v_arg = Array.from(arguments);
                    
            return new O_vec4(
                        (b_all || a_v_arg?.some(v=>["n_x","x","0"].includes(v))) ? parseInt(this.n_x): this.n_x,(b_all || a_v_arg?.some(v=>["n_y","y","1"].includes(v))) ? parseInt(this.n_y): this.n_y,(b_all || a_v_arg?.some(v=>["n_z","z","2"].includes(v))) ? parseInt(this.n_z): this.n_z,(b_all || a_v_arg?.some(v=>["n_w","w","3"].includes(v))) ? parseInt(this.n_w): this.n_w
                    )
        }

        
    O_vec4.prototype.to_int = O_vec4.prototype.comps_to_int
    
    

    O_vec4.prototype.abs = 
        function(){
            
                    let b_all = arguments.length == 0
                    let a_v_arg = Array.from(arguments);
                    
            return new O_vec4(
                        (b_all || a_v_arg?.some(v=>["n_x","x","0"].includes(v))) ? Math.abs(this.n_x): this.n_x,(b_all || a_v_arg?.some(v=>["n_y","y","1"].includes(v))) ? Math.abs(this.n_y): this.n_y,(b_all || a_v_arg?.some(v=>["n_z","z","2"].includes(v))) ? Math.abs(this.n_z): this.n_z,(b_all || a_v_arg?.some(v=>["n_w","w","3"].includes(v))) ? Math.abs(this.n_w): this.n_w
                    )
        }

        
    O_vec4.prototype.absolute = O_vec4.prototype.abs
    
    

    O_vec4.prototype.norm = 
        function(){
            
                    const n_length = this.length();
                    
            return new O_vec4(
                        this.n_x / n_length,this.n_y / n_length,this.n_z / n_length,this.n_w / n_length
                    )
        }

        
    O_vec4.prototype.normalize = O_vec4.prototype.norm
    
    

    O_vec4.prototype.fract = 
        function(){
            
            return new O_vec4(
                        this.n_x % 1,this.n_y % 1,this.n_z % 1,this.n_w % 1
                    )
        }

        
    
    
    

    O_vec4.prototype.mod = 
        function(v){
            
                    const o_vec = (typeof v == 'number') ? new O_vec4(...arguments) : v
                    
            return new O_vec4(
                        this.n_x % o_vec.n_x,this.n_y % o_vec.n_y,this.n_z % o_vec.n_z,this.n_w % o_vec.n_w
                    )
        }

        
    
    
    

    O_vec4.prototype.clamp = 
        function(
                    o_vec_min, 
                    o_vec_max
                    ){
            
            return new O_vec4(
                        
                                    f_n_clamped(
                                        this.n_x, 
                                        o_vec_min.n_x,
                                        o_vec_max.n_x,
                                    ),
                                    f_n_clamped(
                                        this.n_y, 
                                        o_vec_min.n_y,
                                        o_vec_max.n_y,
                                    ),
                                    f_n_clamped(
                                        this.n_z, 
                                        o_vec_min.n_z,
                                        o_vec_max.n_z,
                                    ),
                                    f_n_clamped(
                                        this.n_w, 
                                        o_vec_min.n_w,
                                        o_vec_max.n_w,
                                    )
                    )
        }

        
    O_vec4.prototype.clamp_minmax = O_vec4.prototype.clamp
    
    

    O_vec4.prototype.wrap = 
        function(
                    o_vec_min, 
                    o_vec_max
                    ){
            
            return new O_vec4(
                        
                                    f_n_wrapped(
                                        this.n_x, 
                                        o_vec_min.n_x,
                                        o_vec_max.n_x,
                                    ),
                                    f_n_wrapped(
                                        this.n_y, 
                                        o_vec_min.n_y,
                                        o_vec_max.n_y,
                                    ),
                                    f_n_wrapped(
                                        this.n_z, 
                                        o_vec_min.n_z,
                                        o_vec_max.n_z,
                                    ),
                                    f_n_wrapped(
                                        this.n_w, 
                                        o_vec_min.n_w,
                                        o_vec_max.n_w,
                                    )
                    )
        }

        
    O_vec4.prototype.wrap_minmax = O_vec4.prototype.wrap
    
    

    O_vec4.prototype.comps_to_inteq = 
        function(){
            
                    let b_all = arguments.length == 0
                    let a_v_arg = Array.from(arguments);
                    
            
                        this.n_x=(b_all || a_v_arg?.some(v=>["n_x","x","0"].includes(v))) ? parseInt(this.n_x): this.n_x;this.n_y=(b_all || a_v_arg?.some(v=>["n_y","y","1"].includes(v))) ? parseInt(this.n_y): this.n_y;this.n_z=(b_all || a_v_arg?.some(v=>["n_z","z","2"].includes(v))) ? parseInt(this.n_z): this.n_z;this.n_w=(b_all || a_v_arg?.some(v=>["n_w","w","3"].includes(v))) ? parseInt(this.n_w): this.n_w
                        return this
                    
        }

        
    O_vec4.prototype.to_inteq = O_vec4.prototype.comps_to_inteq
    
    

    O_vec4.prototype.addeq = 
        function(v){
            const o_vec = (typeof v == 'number') ? new O_vec4(...arguments) : v
            
                        this.n_x=this.n_x + o_vec.n_x;this.n_y=this.n_y + o_vec.n_y;this.n_z=this.n_z + o_vec.n_z;this.n_w=this.n_w + o_vec.n_w
                        return this
                    
        }

        
    
    
    

    O_vec4.prototype.subeq = 
        function(v){
            const o_vec = (typeof v == 'number') ? new O_vec4(...arguments) : v
            
                        this.n_x=this.n_x - o_vec.n_x;this.n_y=this.n_y - o_vec.n_y;this.n_z=this.n_z - o_vec.n_z;this.n_w=this.n_w - o_vec.n_w
                        return this
                    
        }

        
    O_vec4.prototype.subtracteq = O_vec4.prototype.subeq
    
    

    O_vec4.prototype.muleq = 
        function(v){
            const o_vec = (typeof v == 'number') ? new O_vec4(...arguments) : v
            
                        this.n_x=this.n_x * o_vec.n_x;this.n_y=this.n_y * o_vec.n_y;this.n_z=this.n_z * o_vec.n_z;this.n_w=this.n_w * o_vec.n_w
                        return this
                    
        }

        
    O_vec4.prototype.multiplyeq = O_vec4.prototype.muleq
    
    

    O_vec4.prototype.diveq = 
        function(v){
            const o_vec = (typeof v == 'number') ? new O_vec4(...arguments) : v
            
                        this.n_x=this.n_x / o_vec.n_x;this.n_y=this.n_y / o_vec.n_y;this.n_z=this.n_z / o_vec.n_z;this.n_w=this.n_w / o_vec.n_w
                        return this
                    
        }

        
    O_vec4.prototype.divideeq = O_vec4.prototype.diveq
    
    

    O_vec4.prototype.comps_to_inteq = 
        function(){
            
                    let b_all = arguments.length == 0
                    let a_v_arg = Array.from(arguments);
                    
            
                        this.n_x=(b_all || a_v_arg?.some(v=>["n_x","x","0"].includes(v))) ? parseInt(this.n_x): this.n_x;this.n_y=(b_all || a_v_arg?.some(v=>["n_y","y","1"].includes(v))) ? parseInt(this.n_y): this.n_y;this.n_z=(b_all || a_v_arg?.some(v=>["n_z","z","2"].includes(v))) ? parseInt(this.n_z): this.n_z;this.n_w=(b_all || a_v_arg?.some(v=>["n_w","w","3"].includes(v))) ? parseInt(this.n_w): this.n_w
                        return this
                    
        }

        
    O_vec4.prototype.to_inteq = O_vec4.prototype.comps_to_inteq
    
    

    O_vec4.prototype.abseq = 
        function(){
            
                    let b_all = arguments.length == 0
                    let a_v_arg = Array.from(arguments);
                    
            
                        this.n_x=(b_all || a_v_arg?.some(v=>["n_x","x","0"].includes(v))) ? Math.abs(this.n_x): this.n_x;this.n_y=(b_all || a_v_arg?.some(v=>["n_y","y","1"].includes(v))) ? Math.abs(this.n_y): this.n_y;this.n_z=(b_all || a_v_arg?.some(v=>["n_z","z","2"].includes(v))) ? Math.abs(this.n_z): this.n_z;this.n_w=(b_all || a_v_arg?.some(v=>["n_w","w","3"].includes(v))) ? Math.abs(this.n_w): this.n_w
                        return this
                    
        }

        
    O_vec4.prototype.absoluteeq = O_vec4.prototype.abseq
    
    

    O_vec4.prototype.normeq = 
        function(){
            
                    const n_length = this.length();
                    
            
                        this.n_x=this.n_x / n_length;this.n_y=this.n_y / n_length;this.n_z=this.n_z / n_length;this.n_w=this.n_w / n_length
                        return this
                    
        }

        
    O_vec4.prototype.normalizeeq = O_vec4.prototype.normeq
    
    

    O_vec4.prototype.fracteq = 
        function(){
            
            
                        this.n_x=this.n_x % 1;this.n_y=this.n_y % 1;this.n_z=this.n_z % 1;this.n_w=this.n_w % 1
                        return this
                    
        }

        
    
    
    

    O_vec4.prototype.modeq = 
        function(v){
            
                    const o_vec = (typeof v == 'number') ? new O_vec4(...arguments) : v
                    
            
                        this.n_x=this.n_x % o_vec.n_x;this.n_y=this.n_y % o_vec.n_y;this.n_z=this.n_z % o_vec.n_z;this.n_w=this.n_w % o_vec.n_w
                        return this
                    
        }

        
    
    
    

    O_vec4.prototype.clampeq = 
        function(
                    o_vec_min, 
                    o_vec_max
                    ){
            
            
                        this.n_x=
                                    f_n_clamped(
                                        this.n_x, 
                                        o_vec_min.n_x,
                                        o_vec_max.n_x,
                                    );this.n_y=
                                    f_n_clamped(
                                        this.n_y, 
                                        o_vec_min.n_y,
                                        o_vec_max.n_y,
                                    );this.n_z=
                                    f_n_clamped(
                                        this.n_z, 
                                        o_vec_min.n_z,
                                        o_vec_max.n_z,
                                    );this.n_w=
                                    f_n_clamped(
                                        this.n_w, 
                                        o_vec_min.n_w,
                                        o_vec_max.n_w,
                                    )
                        return this
                    
        }

        
    O_vec4.prototype.clamp_minmaxeq = O_vec4.prototype.clampeq
    
    

    O_vec4.prototype.wrapeq = 
        function(
                    o_vec_min, 
                    o_vec_max
                    ){
            
            
                        this.n_x=
                                    f_n_wrapped(
                                        this.n_x, 
                                        o_vec_min.n_x,
                                        o_vec_max.n_x,
                                    );this.n_y=
                                    f_n_wrapped(
                                        this.n_y, 
                                        o_vec_min.n_y,
                                        o_vec_max.n_y,
                                    );this.n_z=
                                    f_n_wrapped(
                                        this.n_z, 
                                        o_vec_min.n_z,
                                        o_vec_max.n_z,
                                    );this.n_w=
                                    f_n_wrapped(
                                        this.n_w, 
                                        o_vec_min.n_w,
                                        o_vec_max.n_w,
                                    )
                        return this
                    
        }

        
    O_vec4.prototype.wrap_minmaxeq = O_vec4.prototype.wrapeq
    
    

    O_vec4.prototype.to_index = 
            function(o_scl){
                return (
                (parseInt(this.n_x) % parseInt(o_scl.n_x))
+ (parseInt(this.n_y) * parseInt(o_scl.n_x))
+ (parseInt(this.n_z) * parseInt(o_scl.n_x) * parseInt(o_scl.n_y))
+ (parseInt(this.n_w) * parseInt(o_scl.n_x) * parseInt(o_scl.n_y * parseInt(o_scl.n_z)))
                )
            }

            
    O_vec4.prototype.to_idx = O_vec4.prototype.to_index
    
    

    O_vec4.prototype.from_index = 
            function(n_idx){
                n_idx = parseInt(n_idx)

                return new O_vec4(
                (n_idx % parseInt(this.n_x)),
parseInt(n_idx / parseInt(this.n_x)),
parseInt(n_idx / parseInt(this.n_x) * parseInt(this.n_y)),
parseInt(n_idx / parseInt(this.n_x) * parseInt(this.n_y) * parseInt(this.n_z))
                )
            }

            
    O_vec4.prototype.from_idx = O_vec4.prototype.from_index
    
    

    O_vec4.prototype.compsadd = 
                        function(){
                            return 0
                            + this.n_x
+ this.n_y
+ this.n_z
+ this.n_w
                        }
                    
    
    
    

    O_vec4.prototype.compssub = 
                        function(){
                            return 0
                            - this.n_x
- this.n_y
- this.n_z
- this.n_w
                        }
                    
    
    
    

    O_vec4.prototype.compsmul = 
                        function(){
                            return 1
                            * this.n_x
* this.n_y
* this.n_z
* this.n_w
                        }
                    
    
    
    

    O_vec4.prototype.compsdiv = 
                        function(){
                            return 1
                            / this.n_x
/ this.n_y
/ this.n_z
/ this.n_w
                        }
                    
    
    
    

    O_vec4.prototype.dot = 
            function(v){
                const o_vec = (typeof v == 'number') ? new O_vec4(...arguments) : v
                return this.n_x * o_vec.n_x+
this.n_y * o_vec.n_y+
this.n_z * o_vec.n_z+
this.n_w * o_vec.n_w
            }

            
    O_vec4.prototype.dotproduct = O_vec4.prototype.dot
    
    

    O_vec4.prototype.len = 
            function(){
                return Math.sqrt(this.n_x * this.n_x+this.n_y * this.n_y+this.n_z * this.n_z+this.n_w * this.n_w)
            }

            
    O_vec4.prototype.length = O_vec4.prototype.len
    
    

    O_vec4.prototype.clone = 
            function(){
                return new O_vec4(
                    this.n_x,this.n_y,this.n_z,this.n_w
                )

            }

            
    O_vec4.prototype.cln = O_vec4.prototype.clone
    
    

    O_vec4.prototype.sangle = 
            function(v){
                const o_vec = (typeof v == 'number') ? new O_vec4(...arguments) : v
                return Math.acos(
                    this.dot(o_vec)/(this.length()*o_vec.length())
                )
            }

            
    O_vec4.prototype.smallestangle = O_vec4.prototype.sangle
O_vec4.prototype.shortestangle = O_vec4.prototype.sangle
    O_vec4.prototype.sangle_deg = function(){
                    return (O_vec4.prototype.sangle.call(this,...arguments)/O_vec4.n_tau)*360
                }
O_vec4.prototype.smallestangle_deg = function(){
                    return (O_vec4.prototype.sangle.call(this,...arguments)/O_vec4.n_tau)*360
                }
O_vec4.prototype.shortestangle_deg = function(){
                    return (O_vec4.prototype.sangle.call(this,...arguments)/O_vec4.n_tau)*360
                }
    

    O_vec4.prototype.cross = 
                    function(v){
                        const o_vec = (typeof v == 'number') ? new O_vec4(...arguments) : v
        
                        const o_vec_a = new O_vec4(
                            this.n_y,this.n_z,this.n_w,this.n_x
                        )
                        const o_vec_b = new O_vec4(
                            o_vec.n_z,o_vec.n_w,o_vec.n_x,o_vec.n_y
                        )
                        const o_vec_c = new O_vec4(
                            this.n_z,this.n_w,this.n_x,this.n_y
                        )
                        const o_vec_d = new O_vec4(
                            o_vec.n_y,o_vec.n_z,o_vec.n_w,o_vec.n_x
                        )
                        
                                    return new O_vec4(
                                    this.n_x = o_vec_a.n_x * o_vec_b.n_x - o_vec_c.n_x * o_vec_d.n_x,
this.n_y = o_vec_a.n_y * o_vec_b.n_y - o_vec_c.n_y * o_vec_d.n_y,
this.n_z = o_vec_a.n_z * o_vec_b.n_z - o_vec_c.n_z * o_vec_d.n_z,
this.n_w = o_vec_a.n_w * o_vec_b.n_w - o_vec_c.n_w * o_vec_d.n_w
                                    )
                                    
                    }
        
                    
    O_vec4.prototype.crossproduct = O_vec4.prototype.cross
    
    

    O_vec4.prototype.crosseq = 
                    function(v){
                        const o_vec = (typeof v == 'number') ? new O_vec4(...arguments) : v
        
                        const o_vec_a = new O_vec4(
                            this.n_y,this.n_z,this.n_w,this.n_x
                        )
                        const o_vec_b = new O_vec4(
                            o_vec.n_z,o_vec.n_w,o_vec.n_x,o_vec.n_y
                        )
                        const o_vec_c = new O_vec4(
                            this.n_z,this.n_w,this.n_x,this.n_y
                        )
                        const o_vec_d = new O_vec4(
                            o_vec.n_y,o_vec.n_z,o_vec.n_w,o_vec.n_x
                        )
                        
                                    this.n_x = o_vec_a.n_x * o_vec_b.n_x - o_vec_c.n_x * o_vec_d.n_x,
this.n_y = o_vec_a.n_y * o_vec_b.n_y - o_vec_c.n_y * o_vec_d.n_y,
this.n_z = o_vec_a.n_z * o_vec_b.n_z - o_vec_c.n_z * o_vec_d.n_z,
this.n_w = o_vec_a.n_w * o_vec_b.n_w - o_vec_c.n_w * o_vec_d.n_w
                                    return this
                                    
                    }
        
                    
    O_vec4.prototype.crossproducteq = O_vec4.prototype.crosseq
    
    

export {O_vec4}
    