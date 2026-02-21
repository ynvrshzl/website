/** 
 * dynamically constructs the html page and provides useful API for changing document stuff 
 */
export const main = {
    init(){
        this.title("Webverse");
    },
    /** update the website title... displayed in the tab and other browser areas */
    title(title){
        document['title'] = title.toString();
    },
}