function compose(...fns){
    return function(value){
        return fns.reduceRight(function(result,fn){
            return fn(result)
        },value)
    }
}