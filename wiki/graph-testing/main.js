import { Main as Graph } from "@components/graph/src/export.js";
import { create } from "@mocha/html.js";

/** 
 * @plugin using the network graph component directly inside an article page! 
 */
export default function(){
    /** Create network graph that will load alongside the web-system */

    /** This selector element is where the Graph component will attach, the target HTML location container */
    const parent = document.querySelector("main > article.main > section.body");
    
    /** @todo Created a temporary container so the network graph always sizes correctly to the surrounding HTML layout. */
    const container = create("div").css("graph-container").inlinecss("width: 100%; height: 300px;").atstart(parent);

    /** here we instantiate the graph with the config */
    new Graph({ 
        inside: container, 
        mode: 'debug',
    });
}