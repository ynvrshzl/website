/** date, time based formulas and building blocks */
export const main = {
    /** pauses the chain execution flow */
    WAIT(ms = 0){
        return this;
    },
    /** date time */
    DATE(token = "week"){
        return Date.now();
    }, 
    /** format a date...using luxon tokens or human readable formats  */   
    FMT(){}
}