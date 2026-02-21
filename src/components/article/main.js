import { api as bridge } from "@api/bridge/main.js";
import { lib as markdown } from "@lib/markdown/main.js";
import { database } from "@sys/database.js";
import { heap, utils as state } from "@sys/heap.js";
import { create } from "@mocha/html.js";

/**
 * @abstract resolves URLS of DOM elements in the rendered article.
 * @abstract this adapter also helps us create relative markdown links to any folder location, regardless of article location. so this is alot like obsidian's relative/absolute path resolver. so we could link "[home]()" from a deep fs location
 * @design we resolve links from raw text, which is faster since markdown links work regardless of type, but working with html is much safer uwu
*/
class Resolver {
    constructor(file){
        /**
         * store the parameter passed to this class instance, 
         * usually called "file" which is the raw text 
         * content of the article
         */
        this.content = file;
        /**
         * the completed resolved version of the raw file links
         */
        this.resolution = null;
        /** run the main class function, as soon as it is invoked */
        this.init();
    }
    init(){
        this.scan();
    }
    scan(){
        this.content
    }
    /** converts a "string" to an absolute file path in the web system. */
    stringtoabsolute(string){
    }
}

/**
 * @abstract handles the assets of a markdown article.
 * @description the article assets system explained in-depth [here](../../../documentation/articles/assets.md)
 */
const AssetManager = {
    /**
     * a parent container for assets. this prohibits and organizes any dynamic article assets from entering the global html context.
    */
    container: null,
    /** 
     * global reference for script asset
     */
    js: null,
    /** 
     * global reference for css asset
     */    
    stylesh: null,
    /**
     * @method init
     * @abstract initialize the asset loader for the first time. 
     * @description this simply creates the asset target points like `<script>` for article-specific javascript
     */
    init(){
        /**
         * create the assets container. this sits inside the html `<body>`
         */
        AssetManager.container = create("section").css("assets").attach(document.body);

    },
    /**
     * refreshes internal asset system by unloading unused assets
     */
    refresh(){
        this.container.replaceChildren();
    },
    /** 
     * @param {object} article an article from the database.
     * @description here the asset manager "decides" how to handle each kind of article asset... script, stylesheet, image, etc.
     */
    async decide(article){
        /**
         * refresh articles each time this main function is called
         */
        AssetManager.refresh();
        
        /** 
         * because the article is an object, here we
         * extract the 'assets' array property
         * so we can process each asset, separately!
        */
        const assets = article["assets"];
        
        /**
         * @condition
         * skip this entire stage if the article has no/empty assets!!
         */
        if (Object.keys(assets).length > 0) await AssetManager.map(assets);
    },
    /**
     * @todo this is a temporary solution.
     * @abstract here, we conditionally handle the asset type. 
     * @description this loops over each asset and tries to call the  handler method, of the same name as "type."
     * @example assetloader[type](path)
     * @example
     * "script": "path/to/main.js".
     *     ^ type      ^ path
    */
    async map(assets){
        for (const asset of [assets]){
            
            /**
             * extract the property "key:" of the asset, which is the asset "type"
             * the key: "value" is the asset path itself.
             */
            for (const [property, path] of Object.entries(asset))
            {
                
                
                /**
                 * @example if we have a "script" property, 
                 * we try to access the method through the assetloader.
                 */
                if (Object.hasOwn(AssetManager, property)){

                    
                    /**
                     * if we find the matching method with the "script" name,
                     * then it runs assetloader["script"](). 
                     * otherwise, the asset is ignored
                     * we additionally pass in the "path" of the asset here too.
                     */
                    
                    await AssetManager[property](path);
                }
            }
            
        }
    },
    /**
     * handles loading custom javascript via a "main.js" script from an article asset
     * with the "src" of asset itself "...article/path/main.js", 
     */
    async script(path){
        /**
         * @temporaryfix
         * AssetManager.js = create("script").attr("type", "module").attr("src", path).css("asset").attach(this.container);
         * loading a script via url has a critical error: the script only runs once until the page is refreshed again.
         * so instead, we create a standard architecture: require each javascript asset to export a "main" function
         * this will change eventually
         */

        /**
         * here we import the "default" export of the "main.js" asset,
         * we label it as "main" but it can be called anything in "main.js"
         * aslong as it is "export default"
         */
        try {
            /** 
             * here we import the actual path of the asset, 
             * but as a relative import... so the browser 
             * treats it as a real js file.
             */
            const module = await import('../../../' + path);
            /**
             * we call the "default" export of the js file. 
             * basically this should always be the main function, 
             * however, the js file itself is already loaded and 
             * the code is executed upon import.
             */
            await module.default();
            /**
             * catch any errors that most likely result from:
             * - an incorrect or broken asset path (which is the database-compiler's responsibility)
             * - no 'default' export included in the "main.js" file
             */
        } catch (error) {
            console.error(`[CRITICAL]: The Asset Manager found an error in "${path}" ...possible issues include: either the script does contain a 'default' export ...or the file could not be properly loaded.`, '[System Diagnostics]:', error);
        }
    },
    /** 
     * create the base asset elements
     * script for main.js, style for styles.css
     */    
    stylesheet(path){
        AssetManager.stylesh = create("link").attr("rel", "stylesheet").attr("href", path).css("asset").attach(this.container)
    },

}

/** html dom elements */
const nodes = {
    container: document.querySelector("main > article"),
    cover: document.querySelector("main > article > section.hero > img.cover"),
    title: document.querySelector("main > article > section.header > .title"),
    body: document.querySelector("main > article > section.body"),
    footer: document.querySelector("main > article > section.footer > footer"),
    description: document.querySelector("main > article > section.header > .description"),
}
/** 
 * 
 * @summary parser for article rendering system
 * 
 * get the url from the window so we can load the article
 * uses the window URL to load markdown article
 * 
 * @abstract
 * the system searches for an "index.md" file in every folder
 * this is like the "manifest" file, that acts as the main source for the folder.
 * there are other file types that behave this way, such as "description.md" and "gallery.md"
 * these are used by the templates engine to source data for the current article.
 * 
 * @summary 
 * the window url is actually the folder name
 * underneath we are sourcing from the index.md file...
 * 
 * https://url.io/#/sample/article 
 *                            ^  in this case "article" is a directory 
 *                               "article/index.md" 
 *                                       "index.md" is the actual source file from which the url is being read
 * 
 * @throws error "folder-missing-index": if the window url points to a folder that does not contain an main.md file, it will load an error page
 * 
 */
const parse = {
    window_url_to_article() {
        // https://site-url.com/#/path/to/file <-- returns everything after the #/ hash... essentially the real article path
        return window.location.hash.split("#/").at(1);
    },
    /** 
     * convert a url `"path"` of an article, to the `"index.md"` file in `"wiki/"`
     */
    normalize_string_to_article_path(path) {
        return "/wiki/" + path + "/index.md"
    },
}
const network = {
    /** 
     * loads the article store from the database to extract it's frontmatter and properties 
    */
    async get_article_item_from_database(path){        
        const article = database.find((file) => file.folder === path)
        return article;
    },
    /** 
     * @description returns the markdown body of the article. 
     * @note the frontmatter, properties, and more are handeled in the backend.
     * 
     * @summary realtime-read the file contents from the website.
     * 
     * we fetch the content this way, because it is the only
     * part of the markdown file that is not indexed 
     * in the *.json database.
     */
    async read(path) {
        const file = await bridge.read(path);
        return file;
    },
}
export const main = {
    async init() {
        /**
         * initialise asset loader and any core components part of the article rendering process
         */
        AssetManager.init();
        /** 
         * this hooks the article lifecycle to the window hashchange 
         * so it reactively changes to all url events.
        */
        window.addEventListener("hashchange", async function () { await main.refresh() });
        await main.refresh();
        
    },
    /** main article lifecycle.
     * 
     * @abstract
     * (1) => program reads the window url/#/hash 
     * (2) => the program constructs an article path from the url
     * (3) => the article is fetched from the live web remote server
     * (4) => the article is queried from the massive javascript snapshop of the static *.json database stack...and loaded into temporary system heap memory
     * (5) => finally the article content is rendered!
     * (6) => global event is emitted so other members can wait for this main lifecycle event
     */
    async refresh() {
        /**
         * step 1: these functions assemble the url and paths for article to database
         */
        const hash = parse.window_url_to_article();
        const path = parse.normalize_string_to_article_path(hash);
        /**
         * step 2: the network assemblers for the markdown content, and properties.
         * fetch the markdown file and the frontmatter from the compiled database. 
         */
        const article = await network.get_article_item_from_database(hash);
        const file = await network.read(path);
        this.set(article);
        
        // step 3: content rendering process
        /**
         * here we resolve any paths and URLs from the raw article text
         * using a resolver adapter to return the corrected link paths
         */
        const resolutions = new Resolver(file);
        /**
         * from the resolved version of the raw text article,
         * we render it to markdown
         */
        this.render(file); 
        /**
         * handle any assets packaged with the article
         */
        await AssetManager.decide(article);
        /**
         * emit a global event to signal the article render process has completed.
         * this event is necessary becuase of async/await timings in other components.
         * to ensure that content is fully rendered before it can be accessed or manipulated
         * by other components.
         */
        main.emit();
    },
    /** emits a global event that the article has finished rendering so other modules can safely respond afterwards event.  */
    emit() {
        window.dispatchEvent(new Event("article-rendered"));
    },
    /** store the article to global memory so ti is accessibly by other parts of of the system*/
    set(article) {
        state.set("article", article);
    },
    /**
     * @param {string} file the raw contents of a file
     * @description render the raw contenxt of the file as markdown 
     */
    render(file) {
        /** 
         * using the markdown library, 
         * extract the 'content' object 
         * which is the actual raw html string. 
         */
        const { content } = markdown.file(file);
        /**
         * here we render selectively to elements
         */
        nodes.body.innerHTML = content;
        nodes.cover.src = heap.article.frontmatter.cover ?? heap.article.assets.image ?? "";
        nodes.description.innerHTML = heap.article.frontmatter.description ?? "";
        nodes.title.innerHTML = heap.article.frontmatter.title 
            ?? ""
            ?? heap.article.folder
        nodes.footer.innerHTML = "";
    },
}