/**
 * Copyright Hazl, Websystems (c) 2026 All Rights Reserved.
 * Open ["readme.md"](./readme.md) for information on this script. 
 * Most of the code is temporary but provides an idea on how to script 
*/
let readme;

/** Module dependencies */
import { source } from "./src/map.js";
import { create } from "@mocha/html.js";


const article = document.querySelector("main article .body");

/**
 * Export main function to websystem module loader. Required for dynamic pages.
 */
export default function main(){
    create("h1").content("Touch Typing").attach(article)
    create("h2").content("Playground Enviornment").attach(article)
    create("p").content("Welcome to the Youniversity: Touch Typing playground enviornment!").attach(article)
    create("img").attr("src", "https://images.pexels.com/photos/8946860/pexels-photo-8946860.jpeg").attach(article)
    render_tests();
    focus_on_first_box();
};

function focus_on_first_box(){
    article.querySelectorAll("textarea")[0].focus();
};

function render_tests(){
    
    /** each test section */
    source.forEach(test => {
        const h1 = create("h1").content(test.title).attach(article).inlinecss("margin-block-start: 200px");
        const description = create("p").content(test.description).attach(article);
        const container = create("div").attach(article);
        
        // loop through each [pattern]
        test.patterns.forEach((pattern) => {
            create("pre").content(pattern).attach(container);
            create("textarea").css("touch-typing", "input").set({ rows: 1, placeholder: "[tab]" }).attach(container);
        });
    });
};