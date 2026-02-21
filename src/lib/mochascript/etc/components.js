import { create as create } from "../src/html.js";

/** reusable component templates. 
 * this function simply calls templates["type"]() */
export function template(namespace = "table, list, etc.."){
    return templates[namespace]();
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
    }
}