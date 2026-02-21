/**
 * a set of dataview-inspired methods and functions \
 * also use daisy-chaining to query markdown data!
 * 
 * essentially abstracting this: 
 * ```js
 * const files = ["youniverse", "code", "blog"];
 * files.map(path => Object.values(database).find(file => file.path === path));
 * ```
 * 
 * into this:
 * ```js
 * query().paths("youniverse", "code", "blog").match();
 * query().lookup('youniverse.md', 'autobiography.md', 'blog.md');
 * ```
 * 
 * then this data can be stored into a variable\
 * and rendered inside a component like a table or list!
 * 
 * ```
 * const dat = query().lookup('youniverse.md', 'autobiography.md', 'blog.md');.astabulardata();
 * const tab = template("table").matrix(dat);
 * ```
 */
/** bundles: data query and html compnents to help create reuseable queries  */
export function main(namespace = "table, list, etc.."){
    return templates[namespace]();
}
/** daisy chainable methods */
export const utils = {
    /** renders an empty table.
     * to fill the table, see the matrix() data structure
     */
    table(){
        const parent = create("table");
        const tbody = create("tbody").in(parent);
        return parent;
    },
    /** search the database for *all* matching files, returns as an array */
    async query(){},
    async find(){},

}

/** utilities for component templates */
const templates = {
    /** create an empty list. to be filled with the tree() data structure
     */
    list(){
        const ul = create("ul");
        return ul;
    },
    /** renders an empty table.
     * to fill the table, see the matrix() data structure
     */
    table(){
        const parent = create("table");
        const tbody = create("tbody").in(parent);
        return parent;
    },
    "article-blog-post"(){},
    "sliding-panes"(){},
    "hero-cards"(){}
}

/**
 * inline code coming soon!
 * essentially this is us modyfing the markdown renderrer so it'll take some time
 * 
 * ideas for aliases:
 * markdown syntax...   `js:date(today)`     more markdown...
 * markdown syntax...   `%:date(today)`      more markdown...
 * markdown syntax...   {{ date(today) }}    more markdown...
 * markdown syntax...   % date(today) %      more markdown...
 */
function inline(){}