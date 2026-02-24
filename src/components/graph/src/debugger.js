import * as Graphics from "./graphics.js"
import * as Axis from "./axis.js";

/**
 * Main system debug process
 */
export default class Main {
    constructor() {
        /** This property stores the Graph instance for debugging.  */
        this.graph = null;
    }
    mount(instance) {
        this.graph = instance;
    }
    /** @todo so when we debug, do we want to setup our modular debug systems, inside mode/debug itself? or here? */
    init(){
        const analysis_layer = new VisualAnalysisCanvas(this.graph);
        analysis_layer.mount(this.graph);
    }
}   

/**
 * Creates a new pseudo-canvas to draw debug graphics.
 */
export class VisualAnalysisCanvas {
    constructor(){
        /** ? */
        this.graph = null;
        /** ? */
        this.canvas = new Graphics.Canvas();
        /** ? */
        this.paint = new Graphics.Paint(this.canvas);
    }
    mount(instance) {
        this.graph = instance;
    }
    /** simply initializes "debug" mode by drawing a "debug" text in the graph */
    init() {

        /** @todo temporary */
        this.canvas.style.zIndex = "9999";

        const pos = new Axis.Positions(this.canvas);
        
        const { x, y } = pos.origin();
        
        this.paint.text({ x, y, data: "Graph is in debug mode" })
    }    
    draw_fps_counter() {

    }
    draw_viewport_dimensions() {

    }
    draw_translation_event(){
        this.graph.camera.debug();
    }
    /**
     * visual debugging graph, to help visualize the cartesian plane, vs the canvas coordinates.
     */
    draw_cartesian_axis(){
        /** here, we visually debug the planes becuase it's impossible to mentally visualize this lol. */
        
    }
}

/** @todo implement! */
class SharedDebugMemoryModule {
    constructor(argsv) {
        this.canvas = argsv.canvas;
    }
}