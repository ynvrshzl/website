import { create } from "@lib/mochascript/src/html.js";
import { Main as Graph } from "./src/system.js";

/**
 * here, we intialize the network graph.  * the reason we create a separate {main} object * is becusae the web-system requires all * components to be structured this way.  
 */
export const main = {
    /** 
     * create network graph that will load alongside the web-system 
     */
    init(){
        const parent = document.querySelector("main aside.left-sidebar section");
        const container = create("div").css("graph-container").atstart(parent);
        /** here we instantiate the graph with the config */
        new Graph({ 
            inside: container, 
            mode: 'local',
        });
    }   
}