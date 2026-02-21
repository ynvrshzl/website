import { heap as database } from "@sys/heap.js";

const nodes = {
    toggle: document.querySelector("main > header button[aria-label='toggle left sidebar'i]"),
    title: document.querySelector("main > header .title"),
    thumbnail: document.querySelector("main > header img.thumbnail"),
    description: document.querySelector("main > header .description"),
}
export const main = {
    init(){
        nodes.toggle.onclick = function(){ document.querySelector("aside.left-sidebar").classList.toggle("collapsed"); };
        window.addEventListener("article-rendered", main.refresh);
    },
    refresh(){
        main.thumbnail();
        main.title();
        main.description();
    },
    description(){
        nodes.description.innerHTML = database.article.frontmatter.description ?? "No description";    
    },
    title(){
        nodes.title.innerHTML = database.article.title ?? database.article.name;
    },
    thumbnail(){
        nodes.thumbnail.src = database.article.assets.image ?? database.article.frontmatter.image ?? "" ;
    }
}