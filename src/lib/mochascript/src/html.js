/** 
 * Components library
 * Copyright Hazl (c) 2025 All rights reserved.
*/

/**
 * @description this function creates html elements and components.
 * @abstract components can be built in two ways: using the classic object-configuration with utilities `.set()` or `.attr()` or can be daisy-chained as in... `create("div").in(body).with("text")`
 * @returns `HTML element reference`
*/
export function create(tag = 'html'){
    const element = document.createElement(tag);
    Object.assign(element, methods);
    return element;
}
/**
 * Helper function to create a table, list, etc.
 */
export function component(namespace = "table, list, etc.."){
    const element = templates[namespace]();
    Object.assign(element, methods);
    return element;
}
/**
 * Not implemented yet!
 */
const templates = {
    table(){
        const parent = create("table");
        const tbody = create("tbody").in(parent);
        return parent;
    }
}
/** 
 * @description methods for `create()`
 * @abstract these names are chosen becuase *every HTML element contains built-in prototytpe methods like: a.href and div.class, so those names can't be used as methods
 */
const methods = {
    /** 
     * simplified query selector. can do... element.select("article:has(i)")   
     */
    select(selector){
        return this.querySelector(selector);
    },
    /** 
     * creates any html element "div", "style", etc.   
     */
    tag(element = ""){
        document.createElement(element);
        return this;
    },
    /** 
     * add a css class or multiple classes. can be a string, an array, or multiple comma-separated strings 
     */
    css(...classes){
        this.classList.add(...classes);
        return this;
    },
    /** 
     * @description edit html attributes or properties
     * @summary `create("div").set({textContent: "hello"})`
     * @param args object configuration
     */
    set(args = {}){
        Object.entries(args).forEach(([property, value]) => {
            // for html properties like textContent, they have to be declarative
            // otherwise, if the property doesn't exist in the element, it's an html attribute like checked, type, href, etc.
            if (property in this) this[property] = value;
            else this.setAttribute(property, value)
        })
        return this;
    },
    /** the displayed text of an html element. alias for text = "" */
    content(string = ""){
        this.textContent = string;
        return this;
    },
    /** adds an html `<!--` dom comment above the current element. note: the element must be already attached to the DOM for this to work! */
    comment(string){
        this.insertAdjacentHTML("beforebegin", `<!--- ${string} --->`)
        return this;
    },
    /** edit the innerhtml of an element */
    html(markup = `<html></html>`){
        this.innerHTML = markup;
        return this;
    },
    inlinecss(style = "string" || { color: blue }){
        this.style = style;
        return this;
    },    
    /** simplified verbose version of .set() but only for html element attributes */
    attr(attr, value){
        this.setAttribute(attr, value);
        return this;
    },
    /** *inside another element. if no element is specified, it simply attaches it to the html body. */
    attach(selector = document.documentElement){
        selector.appendChild(this)
        return this;
    },    
    in(selector){
        selector.appendChild(this);
        return this;
    },
    /** add this element to the document... *at the end of another element */
    after(element){
        element.insertAdjacentElement("afterend", this)
        return this;
    },
    /** insert *this element at the *beginning of an element */
    atstart(element){
        element.insertAdjacentElement("afterbegin", this)
        return this;
    }, 
    insertatendof(element){
        element.insertAdjacentElement("beforeend", this)
        return this;
    }, 
    /** add this element to the document... *ontop of another element */
    before(element){
        element.insertAdjacentElement("beforebegin", this)
        return this;
    },
    /** sets the `src = ""` of an image... `<img src="https://..."/>` */
    image(string = ""){
        this.setAttribute("src", string)
        return this;
    },
    /** equivalent of href = "" */
    url(string = ""){
        this.setAttribute("href", string)
        return this;
    },
    /** use this when the content type should handle BOTH DOM nodes and plain strings
     * useful for other template nodes where incoming data requires .inset() to handle both strings or actual html elements
     * tries to normalize a into a DOM element or fallback as plain text. */
    inset(content){
        if (content instanceof Node) this.appendChild(content);
        else this.textContent = String(content);
        return this;
    },
    /** insert a node inside create("div").chain(create()) */
    chain(node){
        this.appendChild(node);
        return this;
    },
    matrix(rows = []){
        /** select the <tbody> of the table as the root container, otherwise it appends directly to the table, which is not helpful */
        const tbody = this.querySelector("tbody");
        /**
         * 
         * main loop goes through rows                  ^...v top-down      [rows],
         * next loop inside parses cells/columns        >...left to right   [cols]
         * map row [n] to column [n]
         * since it's a nested array 
         * the loop goes horizontal to vertical
         * so we start with the outermost array          [ [], [], [] ]
         * then work each item inside                    [cell, cell, cell]
         * 
         */
        rows.map((row) => {
            /** add row [n] to (this) table */
            const tr = create("tr").in(tbody);
            row.map(cell => { // map each item in the current [nth] row
                create("td").in(tr).inset(cell);
            });
        });
        return this;
    },
    tree(items = []){
        for (const item of items) {
            create("li").in(this).inset(item);
        }
        return this;
    },
    /** equivalent of => button.onclick */
    onclick(callback){
        this.onclick = callback;
        return this;
    },
}