---
image: https://images.pexels.com/photos/8327690/pexels-photo-8327690.jpeg?w=500
---
```js
// each block will eventually be it's own page!
const blocks = [
    {
        name: "Program",
        type: "Core",
        description: "The Program block is the main part of a computer program in metalang",
        icon: "memory",
    },
    {
        name: "Abstract",
        type: "Conceptual",
        description: "Everything begins somewhere, before the block, came the concept of something in a computer program. Everything originates from this abstract idea.",
    }
]

// define table rows for query
const table = blocks.map(block => [
    // icon
    create("i").content(block.icon ?? "deployed_code").css("material-symbols-rounded").inlinecss("font-size: 5rem;  color: var(--color-text-muted);"),

    // title of each article card
    create("b").content(block.name),

    // create a link to the article 
    create("a").url(block.name).content(block.type), 

    // description of article in card.
    create("span").css("description").content(block.description),
]);

// final table
// query("table").css("grid").matrix([[1], [2], [3]]).in(article);
component("table").css("grid").matrix(table).in(article);
```
