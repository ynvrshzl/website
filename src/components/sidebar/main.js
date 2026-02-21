import { heap as database } from "@sys/heap.js";

const nodes = {
    container: document.querySelector("main > aside.left-sidebar"),
    title: document.querySelector("main > aside.left-sidebar .title"),
    description: document.querySelector("main > aside.left-sidebar .description"),
}
export const main = {
    init(){
        window.addEventListener("article-rendered", main.refresh);
    },
    refresh(){
        main.title();
        main.description();
    },
    description(){
        nodes.description.innerHTML = database.article.frontmatter.description ?? "No description";    
    },
    title(){
        nodes.title.innerHTML = database.article.frontmatter.title ?? database.article.name;
    },

}