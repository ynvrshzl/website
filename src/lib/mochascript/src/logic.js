/*

app().if().unit(x).lt(3).then().run("hello").otherwise().do

if (x < 3 ) {
    console.log(hello);
} else {
    return;
}

*/


/** contains building blocks for logic gates and boolean maths */
export const main = {
    /** check if x is true */
    is(x){
        return x;
    },
    /** logic gates */
    or(x){},
    and(){},
    xor(){},
    xnor(){},
    /** this only runs after a condition is true... */
    do(){},
    /** equivalent of boolean else */
    otherwise(){},
    /** strict boolean if statement. */
    onlyif(){
    },
    if(){},   
}