export const methods = {
    /** equivalent to console.log("") but keeps state along the chain.
     * very useful for logging exact call satck and memory at each step. 
     * comes with colors and symbols for increasing readability */
    print(msg){
        console.log(msg, this)
        return this;
    },
    
}
/** example usage:
 * log.i("sample message log");
 * log.msg("sample message log");
 * log.err("sample message log");
 */
export const log = {
    /** renders a new empty line to the console */
    newln(){
        console.log("");
    },
    /** arbitrary timestamp string for use within logs. returns the current time in "hh:mm" format */
    time(){
        const now = new Date();
        const h = String(now.getHours());
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        return `${h}:${m}:${s}`
    },
    info(str){
        console.log(cols.blue(`[INFO]:`), str);
    },
    success(str){
        console.log(cols.green(`[SUCCESS]:`), str);
    },
    error(str){
        console.error(cols.red(`[PANIC]:.`), str);
    },
    message(str){
        console.log(cols.gray(`[LOG]:`), str);
    },
    warn(str){
        console.warn(cols.yellow(`[WARNING]:`), str);
    },
    debug(str){
        console.debug(cols.yellow(`[DEBUG]:`), str);
    }, 
    /** render console as table */ 
    table(object){
        console.table(object);
    }
}
export const cols = {
    red(str){
        return `\x1b[31m${str}\x1b[0m`
    },
    green(str){
        return `\x1b[32m${str}\x1b[0m`
    },
    yellow(str){
        return `\x1b[33m${str}\x1b[0m`
    },
    blue(str){
        return `\x1b[34m${str}\x1b[0m`
    },
    gray(str){
        return `\x1b[90m${str}\x1b[0m`
    },    
}
