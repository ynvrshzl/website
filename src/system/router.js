const routes = {
    /** autoloads the website home page if there isn't a /#/ hash url */
    home(){
        if (!(window.location.hash)){
            window.location.hash = "/home";
        }
    },
    error(){
        window.location.hash = "/error";
    }
}

/** 
 * router to handle site urls 
 * and page mappings
 */
export const main = {
    init() {
        routes.home();
        window.addEventListener("hashchange", routes.home);
        window.addEventListener("click", resolvers.anchor_click);
        window.addEventListener("auxclick", resolvers.open_in_new_tab);
    },
    /** This operation is used for safely changing the URL hash of the window 
     * @param {String} url Any valid string url. E.g. "path/to/file"
    */
    change_to_url(url){
        window.location.hash = "/" + url.split("/").slice(3).join("/").replace(".md", "");
    },
    
    /** sample utility for resolving conflicting link paths like in obsidian */
    resolve_url_to_database_path(){},
}

const resolvers = {
    /**
     * override default anchor links 
     * so that they properly change the window hash url, 
     * becuase this is how the site loads articles!
    */
    anchor_click(event)
    {
        if(event.target.localName === "a"){
            event.preventDefault();
            /** strip the leading website url and return everything after https://domain.io/... */
            const link = event.target.href.split("/").slice(3).join("/").replace(".md", "");
            window.location.hash = "/" + link;
        }
    },
    /** handle middle clicks (open link in new tab) */
    open_in_new_tab(event)       
    {
        if(event.target.tagName === "A"){
            event.preventDefault();
        }
    }
}