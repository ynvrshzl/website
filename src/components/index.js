/**
 * @description components stack list imports
 * @important each component requires a "main.js" script + an export object: 
 * @example export const main = { init(){...} }
 * @description essentially, each component is the name of the folder and a "main.js" script. so "sidebar" would be "./sidebar/main.js".
 * @imoprtant the 'artcle' component is the bottom-most, and is loaded last on this stack. becuase all components on the site rely on it's event 'article-rendered' to emit
 */
const components = [
    // "boot-screen",
    "tooltips",
    "page-preview",
    "sidebar",
	"header",
	"graph",
    "article"
];

/**
 * @summary initializes requested components. 
 * @important each component must be an object with an "init()" method so the initializer can load the component itself
 * @supports async/await components 
 */
export const main = {
    async init(){
        for (const component of components) {
            try {
                /** here, we assemble the relative path of the component folder name + "main.js" */
                const url = `./${component}/main.js`
                const { main } = await import(url);
                await main.init();
            } catch (error) {
                console.error(error.message)
            }
        }
    }
};