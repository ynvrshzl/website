/** 
 * these imports are available from inside the codeblocks... 
 * meaning any markdown article has access to these!
 */
import { create as create, component } from "@mocha/html.js";
import { main as query } from '@mocha/query.js';
import { database } from "@sys/database.js";
import { heap } from "@sys/heap.js";

/** 
 * temporary container so frontend can easily call "article" as a valid element selector
*/
const article = document.querySelector("article section.body");

/** 
 * run javascript code inside markdown codeblocks 
 */
export const main = {
    init(){
        window.addEventListener("article-rendered", main.refresh);
    },
    /**
     * find the codeblock in the current article
     * for now, this only supports (1) codeblock.
     * multi-codeblock support would require tracking
     * it's position in the document (complexity-increase +20%)
     * wait for the article to complete it's rendering process, 
     * before executing the javascript inside codeblocks.
     */
    refresh(){
        const codeblock = document.querySelector("main article").querySelector("pre > code[class=language-js]");
        codeblock?.remove();
        eval(codeblock?.innerText);
    }
}