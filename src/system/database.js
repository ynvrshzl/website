import { api as bridge } from "@api/bridge/main.js";
/** javascript copy of static file => database/dist/index.json */
export const database = [{}]

/** this program will mount the database index into the live web-system global state */
export const main = {
    /** parses the dist/index.json file into javascript to be accessed from within the web-sys */
    async init(){
        const src = "../../database/dist/index.json";
        const file = await bridge.read(src);
        const index = JSON.parse(file); // parse json into javascript
        Object.assign(database, index); // assign to store
        console.debug(database);
    },
}