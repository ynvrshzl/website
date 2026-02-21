import { create } from "@mocha/html.js";
import { api as bridge } from "@api/bridge/main.js";
import { lib as markdown } from "@lib/markdown/main.js";

/** here we export the component so the web-system can register and verify integrity. */
export { Component as main }
const Component = {

    /** @todo would be awesome to use the article render system as a class instance here! */
    init() {
        const ipc = new IPC();
        new DOMEvents(ipc).init();
        
    }
}

/**
 * @todo most of this is temporary code!
 * @description Page-preview pop-up Component
 * @copyright websys
 * @version 1.0.0
 */
class PagePreview {

    constructor(event) {

        this.html = HTMLElement;
        this.create();

    }
    create() {
        this.html = create("div").css("page-preview");
    }
    display(body) {
        this.html.html(body);
    }
    /** @todo let's use the tooltip postiion component as an abstract utility!! */
    at(event) {
        const offset = -10;
        const [ x, y ] = [event.pageX - offset, event.pageY - offset];
        this.html.style.position = 'absolute'
        this.html.style.top = `${y}px`
        this.html.style.left = `${x}px`;
        this.html.insertatendof(document.body);
    }
}

/**
 * Handles arbitrary DOM Events.
 */
class DOMEvents {
    constructor(ipc) {
        this.ipc = ipc;
    }
    /**
     * list of events
     */
    map = [ 'pointerover', 'mouseout', 'keypress' ];
    /**
     * @description initializes window event listeners for each event in the list.
     * @description note that this uses the exact name of the event!
     */
    init() {
        /**
         * run through each list in the event map, essentially 'e' is both: the name of DOM Event, and the callback to execute.
         */
        this.map.forEach(e => window.addEventListener(e, this[e].bind(this), { passive: false }))
    }
    keypress(event){
        if(event.ctrlKey) return true;
    }
    async pointerover(event) {
        /** should we prevent default behavior for mouse enter?? */
        event.preventDefault();
             
        /** main condition: only run program if hovering over a link. */
        if (event.target.localName === "a" && Boolean(this.keypress(event)) === true) {

            if (this.ipc.component === null) {

                /** @todo temporary code!! */
                const link = "wiki/" + event.target.href.split("/").slice(3).join("/") + "/index.md";
                try {
                    
                    const file = await bridge.read(link);
                    const { content } = markdown.file(file)
                    const $PagePreview = new PagePreview();
                    $PagePreview.display(content);
                    $PagePreview.at(event);
                    this.ipc.store('component', $PagePreview)
                    
                } catch (error) {
                    console.error(error)
                }

            }

        }
    }
    mouseout(event) {
        event.preventDefault();
        if (event.target.localName === "a") {
            if (this.ipc.component !== null) {
                this.ipc.component.html.remove();
                this.ipc.reset("component");
            }
        }
    }
}
/**
 * @class IPC Is as the name implies, arbitrary inter-process-communication
 * @summary Essentially a translation layer so memory is safely managed throughout the system.
 */
class IPC {
    constructor() {
        this.component = null;
    }
    reset(key){
        this[key] = null;
    }
    store(key, data) {
        this[key] = data;
    }
}
class UIEvents {
    constructor() { }
    spawn() { }
    rmv() { }
}