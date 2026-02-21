import { create } from "@mocha/html.js"
import quotes from "./quotes.js";

/** 
 * @todo build proper code soon!
 * @description Using various modular components, we assemble a loading/boot screen for the website, while system enviornment is initializing. Inspired by; Discord and Obsidian
*/
export const main = {

    init() {

        /** Initializing components for boot-screen */
        const Components = [
            /** Main boot-screen container page */
            new Page(),
            /** Progress bar */
            new Progress(),
            /** Quotes component */
            new PeriodicQuotesComponent(),
        ];

        /** The load screen begins as soon as the web loads */
        Components.at(0).init(document.body);
        const container = Components.at(0).element;

        /** Progress bar */
        /** @todo should 'inside' be a method... (e.g. .inside(x)) or a property assignment... (e.g. w.target = x) */
        Components.at(1).target = container;
        Components.at(1).init();

        /** @todo for now, the progress bar is simply animated (like obsidian), however, someday we may want to translate external progress into a progress bar visualization! */
        Components.at(1).cyclic_bar();

        /** Quotes */
        Components.at(2).inside(container);
        Components.at(2).build();

        /** 
         * @todo for now, we could solve 'flash-of-unwanted-content' using css, by adding a css-hack to the body. however, in future cases, this module may need to be loaded before the core javascript...
         * @example document.body.classList.add("loading");
        */
       const css = 'loading';

        /**
         * @todo css handles creating a pseudo-delay to remove the container, becuase the event finishes way too quickly for the loading screen to be visible! for future cases, this will be handled by an actual progress event, detailed further in this system.
         * @description To determine when the website has completed the initial loading process, we use the main websys event 'article-rendered'. 
         * @example window.addEventListener('article-rendered', () => Components.at(0).stop, { once: true });
         */
        const event = () => { Components.at(0).stop(); }
        const timeout = 3000;
        /** @todo temporary madness */
        clearTimeout(event);
        setTimeout(event, timeout);
    }
}
/** 
 * @abstract Modular loading component. 
 * @description Can visualize a loading wheel to represent a cyclic, ongoing process, or a progress bar to represent a singular destination. */
class Progress {
    constructor() {
        /** ... */
        this.container = HTMLElement;
        /** ... */
        this.element = HTMLElement;
    }

    /** This operation simply creates a container for the progress element. Which is selected by the user in the methods below. */
    init() {
        /** the html container for component */
        this.container = create('div').in(this.target).css("progress", "container");
    }

    /** 
     * @description This operation will specify the progress visualized as a cyclic circle.
     */
    loader_wheel() { }
    /** This is a simpler bar progress visualization. animations are controlled via CSS */
    cyclic_bar() {
        this.element = create("progress").css("progress", "cyclic", "component").in(this.container)
        
        /** @todo just a temporary little label underneath the progress bar! */
        create("div").in(this.container).content("Booting WebSystem ver1.0").css("description")
    }
    /** 
     * @description This operation will specify the progress visualized as a bar. Given the parameters "min", "max" and "current", the progress bar will use these values during the graphical animation. Handled via the Interpolation Class
     */
    manual_bar({ min, max, current }) {
        /** create progress bar */
        this.element = create("progress");
        /** animate progress bar value across time */
        this.interpolation = new Interpolation();
        /** start the animation. @todo we're just animating a sample here! later on, we should probably animate real opreations! */
        this.interpolation.start(this.element);
    }
}

/** Abstarct class used to interpolate values, across time. Used in this context, for progress bar animation. */
class Interpolation {
    constructor(element) {
        this.element = element;
    }
    start() {

    }
}

/** Abstract HTML Container for assembling component */
class Page {
    constructor() {
        /** the html element for component */
        this.element = HTMLElement;
    }
    /** Initializes the boot-screen */
    init(target) {
        this.element = create("div").css("boot-screen", "container").atstart(target);
    }
    start() {

    }
    stop() {
        this.element.remove()
    }
}
/** An HTML websys-component for creating cyclic quotes */
/** @todo it might be cool to add a markdown feature so the qutoe can be clickable to it's source... */
/** @todo speaking of markdown capabilities... it might be even cooler to query from all 'quote.md' files... */
class PeriodicQuotesComponent {
    /** The constructor of this class component provides top-level parameters  */
    constructor() {
        /** This is the 'refresh-rate' interval of which the quotes will change. */
        this.ms = 2 * 1000;
        this.source = quotes;
        this.target = HTMLElement;
        this.element = HTMLElement;
        this.container = HTMLElement;
    }
    /** This operation begins the quotes cyclic change. Set by */
    start(){
        /** @todo build the cycling quotes compnent here beautiful! */
        this.element.innerHTML()
    }
    inside(target) {
        this.target = target
    }
    build() {
        this.container = create("div").in(this.target).css("quotes-component", "container")
        /** @todo temporary method for quote! */
        this.element = create("p").in(this.container).css("quote").content(this.source[0])
    }
}