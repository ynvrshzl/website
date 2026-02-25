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
        const analysis_layer = new VisualAnalysisCanvas();
        analysis_layer.mount(this.graph);
        analysis_layer.init();
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
        
        /** Yeah so unfortunately this debug visualizer doesn't pass through the server.... so graphics are never updated... becusae the server only uses nodes to paint graphics...  */
        const Draw = new Graphics.Paint(this.canvas);

        /** Logging the canvas, shows that it hasn't finished initializing... */
        console.log(this.graph.canvas);

        /** 
         * it appears that the graph initializes the canvas, after the mode... what. lol. so *unfortunately this wouldn't work...
         * const pos = new Axis.Positions(this.graph.canvas);
         * const { x, y } = pos.origin();        
         */

        /** @todo it also appears that if we draw on the grpah canvas itself, it's always overwritten by the server, sourcing from the nodes... so we're thinking the only solution here is to build a second, pseudo-canvas! */
        Draw.text({ x: 250, y: 250, data: "Graph is in debug mode" })

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