import { create } from "@mocha/html.js";
import { Main as Graph } from "./src/export.js";

/** Here, we intialize the network graph, treated as a websystem component. Note that this architecture can be used as both a websystem ui component, and an inline graphic inside markdown codeblocks, using the [code-api]()! The reason we create a separate {main} object * is becusae the web-system requires all * components to be structured this way.  */
export const main = {
    
    /** Create network graph that will load alongside the web-system */
    init(){

        /** This selector element is where the Graph component will attach, the target HTML location container */
        const parent = document.querySelector("main aside.left-sidebar section");
        
        /** @todo Created a temporary container so the network graph always sizes correctly to the surrounding HTML layout. */
        const container = create("div").css("graph-container").atstart(parent);

        /** here we instantiate the graph with the config */
        new Graph({ 
            inside: container, 
            mode: 'local',
        });
    }   
}