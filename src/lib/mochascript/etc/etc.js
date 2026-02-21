/** only use these methods if needed, 
 * otherwise, they are just for play! */
const experimentals = {
    /** daisy-chain an integer value type */
    value(value){
        return value;
    },
    /** coming soon
     * this basically combines after, inside, before all into one method.
     */
    position(position = "inside|topstart|before"){
        /** map of positions */
        const positions = {
            "inside": () => {},
            "topstart": () => {}
        }
        positions[position]();
    },
    /** add any number of children elements inside a create(node)*/
    multichain(...nodes){
        nodes.forEach(node => this.appendChild(node));
        
        return this;
    },
    /** simple event listener
     * can be `.listen().event("code").callback("even")`
     * or     `.listen("click", callback)`
     */
    listen(event = "", callback = () => {}){
        this.addEventListener(event, callback);
        return this;
    },
    /** add an event listener to another element, but with this element as a target. useful for global window */
    register(){},
    /** remove an event and function from an element */
    detach(event, callback){
        this.removeEventListener(event, callback);
        return this;
    },

    /** this is a planned method that will swtich between object categories like "arithmetic" and "html" once this mega object becomes to heavy to use as a flat structute */
    using(){
        // for example the create("") method uses an object "calculate" with math methods 
        // this is essentially inspired by c++ the "using namespace std" like pseudo pacakges for objects
    },


    /** daisy-chain equivalent of a varaible in javascript. keeps state along with other useful utilities. the variable can be reopened with the entry point: access() */
    assign(variable = ""){
        /** pushes the varaiable key and value to the daisy stack */
        stack.push({variable: this});
        return this;
    },
    /** should probably be an entry point... but it needs to also be a method... hmmmm */
    access(variable = ""){
        return stack[variable];
    },
    

    /** daisy chain an array data type */
    array(){
        return this;
    },


    /** emits a global event that the article has finished rendering so other modules can safely respond afterwards event */
    emit(event = "string"){
        this.dispatchEvent(new Event(string));
    },
    /** sort an array  */
    sort(){},
    /** insert a node inside create("div").chain(create()) */
    chain(node){
        this.appendChild(node);
        return this;
    },
    /** run a miracle sort. */
    miracle(){},

}