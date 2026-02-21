const events = [
    "hashchange",
    'click',
    'article-rendered',
    'markdown-ready'
];
export function register({event, callback}){
    event.push(callback)
}
export const main = {
    init(){
        this.stackify();
        this.hook();
    },
    /** 
     * create an empty array so external members can push to the event. 
     * essentially we create a template for each event 
     * "<event>": [ function, function, function ]
    */
    stackify(){
        events.forEach((event) => {
            const stack = Array.from;
            const object = Object.assign(event, stack);
        });
    },
    /** 
     * hooks each event from the list to the actual window global events.
     * note, we are using 'window' as the global event target
     * this events bus essentially routes global events.
     * but using event.target, can specify specific parts of the browser.
     */
    hook(){
        events.forEach(event => {
            window.addEventListener(event, stack)
        });
    }
}
