import { log } from "./src/utils.js";
import { main as compiler } from "./src/compiler/main.js";
import { main as monitor } from "./src/monitor.js";

/** 
 * @main database function 
 */
async function main(){
    clear();
    log.message("Welcome to the Websystem Database CLI.")
    monitor.start(onchange);
}

/**
 * optionally clear the console for readability
 */
function clear(){
    console.clear();
}

/**
 * assemble the build process here
 */
async function onchange(){
    clear();
    log.warn("Please wait while we attempt to relay Database Compiler stage... ")
    await compiler.start();
    log.info("Database has completed all compiling stages and has restarted watch. Monitoring for changes...")
}

/**
 * @tests for any database diagnostics
 */
async function tests(){
    await compiler.start();
}

/* 
 * run the main function or any tests
*/
main();