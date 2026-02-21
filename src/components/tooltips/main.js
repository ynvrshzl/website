import { create } from "@mocha/html.js"

export const main = {
    init(){
        new DOMEvents().init();
        window.addEventListener("article-rendered", () => new AutoDOMTooltipManager().refresh());
        
    }
}

class DOMEvents {
    init(){
        const events = [ "pointerover", "pointerout", "pointerup" ];
        events.forEach((e) => window.removeEventListener(e, this[e].bind(this)));
        events.forEach((e) => window.addEventListener(e, this[e].bind(this)));
    }   
    /**
     * This click event essentially is a patch-fix, for when in case the clicked element goes out of view (as in clicking a button or link)
    */ 
    pointerup(e){
        /** @todo temporarily, this can just use the pointerout logic! */
        this.pointerout(e);
    }
    /**
     * THis operation handles the pointer hover.
     */
    pointerover(e){
        if (e.target.closest("[data-tooltip]")){
            const exists = Boolean(document.querySelector(".tooltip"));
            /** only create one tooltip instance */
            if (!exists){
                const tooltip = new Tooltip().build().read(e.target.getAttribute("data-tooltip"));
                new Position(tooltip.HTMLElement).at(e);
            }
        }
    }
    /**
     * THis operation handles the pointer leave
     */    
    pointerout(e){
       if (e.target.closest("[data-tooltip]")){
            if (document.querySelector(".tooltip")){
                const tooltip = document.querySelector(".tooltip")
                tooltip.classList.add("animating-out");
                tooltip.removeEventListener("animationend", () => tooltip.remove())    
                tooltip.addEventListener("animationend", () => tooltip.remove())
            }
        } 
    }
}

/**
 * @description Tooltip Component
 * @important This Tooltip component only works for HTML elements that have either a "data-tooltip" or "aria-label" attribute!
 */
export class Tooltip {
    constructor() {
        /** This is the tooltip html element itself */
        this.HTMLElement = HTMLElement;
    }
    /**
     * This operation generates the HTML and styles for the tooltip component
     */
    build() {
        this.HTMLElement = create("div").in(document.body).css("tooltip");
        return this;
    }
    /** This operation allows access to change Tooltip text
     * @param {Event} DOMEvent is the source of the
     */
    read(DOMEvent) {
        /** DOMEvent data */
        this.HTMLElement.html(DOMEvent);
        return this;
    }
}

class AutoDOMTooltipManager {
    refresh(){
        document.querySelectorAll("a").forEach(a => a.setAttribute("data-tooltip", `Click to visit: <b>"${a.href.split("/").slice(-1)}"</b>\nOr hold the <b>Ctrl</b> key to preview page.`))
    }
}


/**
 * This utility handles dynamic element postioning so they don't clip outside the web screen
 */
class Position {
    constructor(element) {
        this.element = element;
    }
    /** 
     * essentially, this calculates if the dynamic component would be clipped outside of the window. and it snaps the component to 1/4 corners on the screen. */
    /** @param {Event} event is the actual DOMEvent itself, which is handled by the Events() entity */
    at(event) {
        const offset = -10;
        let [ x, y ] = [ event.pageX - offset, event.pageY - offset ];
        /** @todo clamping */
        // const rect = this.element.getBoundingRect();
        this.element.style.position = 'absolute'
        this.element.style.top = `${y}px`
        this.element.style.left = `${x}px`;

    }
}
