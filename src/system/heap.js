import { _ as lodash } from 'https://cdn.skypack.dev/lodash';

/** 
 * contains global states... memory to be accessible from all throughout the system 
 */
export const heap = {
    /** 
     * browser data 
    */
    browser: {
        platform: "desktop|mobile|tablet|tv",
        vendor: "firefox|chrome|safari",
    },
    /** 
     * the active article on the site. 
     * which is used by components and 
     * systems to get the currently active 
     * article on the site.
     */
    article: {}
};

/** 
 * keep a backup copy of the initialized heap 
 */
const snapshot = heap;

/** 
 * api to interact *safely with internal memory 
 */
export const utils = {
    
    /** state as "string" and modify it's value. set("article.path", "path") */
    set(state, value) {
        lodash.set(heap, state, value);
        // console.table({ state, value })
        console.warn(`[WEBSYS]: Global memory at address "${state}" has been modified:`, value);
    },
    
    /** read the value of a variable stored in memory */
    get(state){
        return heap.state;
    },
    
    /** safely reset a memory unit back to it's original default */
    reset(){
        
    },
    
    /** wipe all heap data. initializing the heap from it's first state. */
    flush(){
        heap.length = 0;
        Object.assign(heap, snapshot);
    },
}