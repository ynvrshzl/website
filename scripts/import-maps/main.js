/** this script builds the import maps for both the index.html file and vscode's jsconfig.json file. this keeps both synchronized but they require specific differences in module resolution. we handle that in this build step
 * 
 */
const map = {
    "@lib/*": ["./src/lib/*"],
    "@api/*": ["./src/api/*"],
    "@mocha/*": ["./src/lib/mochascript/src/*"],
    "@sys/*": ["./src/system/*"]
}
// run program
function main(){



}

function write_to_vscode_jsconfig(){
    // parse the json file as javascript
    // look for the object "paths"
    // write back to the file as JSON
}