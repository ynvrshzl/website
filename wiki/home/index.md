---
image: https://images.pexels.com/photos/8262599/pexels-photo-8262599.jpeg?w=500
cover: https://images.pexels.com/photos/8262599/pexels-photo-8262599.jpeg
title: "Title"
description: "Lorem ipsum"
---

```js
// const graph = await import("../../src/components/graph/src/class.js");

/** 
 * @explanation
 * store articles as "src" array
 * here we filter the database to find the 
 * markdown files that match the seach query.
*/
const files = [
    'youniversity/touch-typing',
    'graph-testing',
    'meta-lang',
    'youniversity/vim',
];
/** here, we scan the database to find the "index" file of each query. */
const src = files.map(path => database.find(file => file.folder === path && file.file === "index.md"));

/** replace js "this" with our own "self". essentially, we store this home article as "this." so if we need to reference the current file, we call 'self', instead of 'heap.article'. */
const self = heap.article;

// define table rows for query
const table = src.map(file => [
    // icon
    // create("i").content("note").css("material-symbols-rounded").inlinecss("position: absolute; top: 15px; right: 15px; height: 45px; width: 45px; z-index: 1; font-size: 2rem; color: white;"),

    // create an image
    create("img")
        .image(file.assets.image ?? file.frontmatter.image ?? self.frontmatter.image)
        .css("cover"), 

    // create thumbnail
    create("img")
        .image(file.assets.image ?? file.frontmatter.image ?? self.frontmatter.image)
        .inlinecss("position: absolute; top: -30px; left: 40%; height: 60px; width: 60px;"),     

    
    // title of each article card
    // create("b").content(`${file.frontmatter.title ?? file.name}`),

    // create a link to the article 
    create("a").url(file.folder).content("Click to Read"), 

    // description of article in card.
    create("span")
        .css("description")
        .content(file.frontmatter.description ?? file.name),

]);

// final table
// query("table").css("grid").matrix([[1], [2], [3]]).in(article);
component("table").css("grid").matrix(table).in(article);
```