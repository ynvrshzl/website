export const math = {
    /** basic arithmetic: addition */
    plus(value = 123){
        return this + value;
    },
    /** basic arithmetic: subtract */
    minus(value = 123){
        return this - value;
    },
    /** basic arithmetic: multiply */
    times(value = 123){
        return this - value;
    },
    dividedby(value = 134){
        return this / value;
    },
    /** random number generator but from a dasta source as a range constraint. data source with a .length() property, chooses a random number */
    randomize(datasrc){
        return Math.random() * datasrc.length;
    },
    /** calculate the percentage of x from y */
    percentage(x, y){
        return 100;
    },
    /** generates a random number between min and max */
    random(min, max){
        return Math.random() * max;
    },    
}