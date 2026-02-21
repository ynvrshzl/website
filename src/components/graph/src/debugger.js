import * as Graphics from "./graphics.js"
import { Positions } from "./axis.js";

/**
 * Main system debug process
 */
export default class Main {
    constructor() {
        /**
         * This class stores the Graph instance for debugging.
         */
        this.graph = null;
        /**
         * This property can be used as a flag for the external world, that debug mode is enabled.
         */
        this.state = String("disabled");
    }
    mount(instance) {
        this.graph = instance;
    }
    /**
     * Run this operation when you want to enable network-graph debug mode
     */
    enable() {
        this.state = String("enabled");
    }
    /**
     * Run this operation when you want to disable network-graph debug mode
     */
    disable() {
        this.state = String("disabled");
    }
}   
/** @todo implement! */
class SharedDebugMemoryModule {
    constructor(argsv) {
        this.canvas = argsv.canvas;
    }
}

/**
 * Creates a new pseudo-canvas to draw debug graphics.
 */
export class VisualAnalysisCanvas {
    constructor(instance){
        /** ? */
        this.graph = instance;
        /** ? */
        this.canvas = new Graphics.Canvas();
        /** ? */
        this.paint = new Graphics.Paint(this.canvas);
    }
    draw_fps_counter() {

    }
    draw_viewport_dimensions() {

    }
    draw_translation_event(){
        this.graph.camera.debug();
    }
    draw_cartesian_axis(){
        
    }
    /** simply initializes "debug" mode by drawing a "debug" text in the graph */
    init() {
        /** @todo temporary */
        this.canvas.style.zIndex = "9999";
        const pos = new Positions(this.canvas);
        const { x, y } = pos.origin();
        this.paint.text({ x, y, data: "Graph is in debug mode" })
    }    
}