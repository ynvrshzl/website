/**
 * ui creator helper kit.
 * @example new UI("div").attach()
 */
class UI {
    constructor(tag){
        this.tag = tag;
        this.node = null;
        this.create(tag);
    }
    create(tag){
        const node = document.createElement(tag);
        this.node = node;
        return node;
    }
    attach(target){
        target.apend(this.node) ?? document.body.appendChild(target)
    }
}

/**
 * simplifies element query selectors with built-in memory
 */
class Selector{
    
}

/**
 * manager UI layouts without the need of external CSS or HTML
 */
class Layour{

}