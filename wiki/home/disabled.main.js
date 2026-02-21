import { Main as NetworkGraph } from "@components/graph/src/system.js";

/** 
 * @plugin using the network graph component directly inside an article page! 
 */
export default function(){
    const container = document.querySelector("main > article.main > section.body");
    new NetworkGraph({
        inside: container,
        mode: 'global'
    });
}