/**
 * @const modules is an dynamic modules importer
 * @fileoverview critical: do not modify the order of these modules! as we order these by dependencies... listeners first, then emitters
 */
const modules = [
	"@sys/router.js",
	"@sys/document.js",
	"@sys/database.js",
	"@api/code/main.js",
	"@components/index.js",
];

/**
 * this function loops through each const { main } object of these imports.
 */
async function main(){
	/**
	 * for every file url in the modules list...
	 */
	for (const module of modules) {
		/** we wrap the logic in a try-catch block, to avoid system errors */
		try {
			/**
			 * store the module {  main } object. this means it must have a master export object in order to be loaded with the site! e.g. export const main = { init() }
			 */
			const { main } = await import(module);
			
			/**
			 * if the module does not contain a main.init() object...
			 */
			if (!(main.init)) {
				/**
				 * throw error with meaningful information and solution.
				 */
				throw new Error("The module imported has no '.init()' method!", module)
			/** 
			 * otherwise, we can just call the .init() method in the module export
			 */
			} else {
				main.init();
			}
		/** catch any errors and alert the operator of a meaningful problem */
		} catch (error) {
			console.error(error)
		}
	}
}
main();