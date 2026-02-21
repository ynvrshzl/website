import { Main as NetworkGraph } from "@components/graph/src/system.js";
import { create } from "@lib/mochascript/src/html.js";

/** 
 * @plugin using the network graph component directly inside an article page! 
 */
export default function(){
    const target = document.querySelector("main > article.main > section.body");
    const container = create("div").css("graph-container").in(target);
    /** here we instantiate the graph with the config */
    new NetworkGraph({ 
        inside: container, 
        mode: 'debug',
    });
}