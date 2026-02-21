/**
 * @name templates.js
 * @description this module helps automate the content delivery system. 
 * @documentation read more [here](./readme.md)
 */
export const main = {
    /** 
     * generates templates from list of template names
     */
    init(){
        templates.forEach(name => new Template(name))
    }
}

/** 
 * a list of template names
 */
const templates = [
    'default',
    'persona',
    'article',
    'youniversity',
];

/** 
 * this class is a model for what a template is 
 * and how it actually get's applied 
 */
class Template{
    constructor(name){
        /**
         * template name
         */
        this.name = name;
        this.content = null;
        this.condition = false;
    }
    /**
     * the actual condition to check if this template 
     * should be applied to an article
     */
    condition(lambda){

        return this;
    }
}