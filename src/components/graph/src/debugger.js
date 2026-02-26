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
    /** 
     * @description The basic premise of our debug model, is that in the graph, any debug-specific operations should fundamentally stay inside a private sandbox container. Away from the system.
     * @done so when we debug, do we want to setup our modular debug systems, inside mode/debug itself? or here? @answer it makes more sense to write module tests, as switchable operations here! that way we can test multiple parts of the system without bloating "debug" everywhere!!! 
     */
    init() {
        /** @todo Temporary test using string as variable so we can log what test we're seeing. */
        const test = "cartesian_system_console_debugging"
        
        // Logging to browser console
        console.groupCollapsed("[Graph Debugger]:")
        console.log("Graph Debugger is processing current system test...", `"${test}"`);
        console.groupEnd();
        
        // Call test, using string address variable.
        new Test(this.graph)[test]();
    }
}
/**
 * This entity contains swappable unit tests for a Network Graph Instance.
 */
class Test {
    constructor(instance) {
        /** Reference the original graph instance. */
        this.graph = instance;
    }
    /** This test conducts an example of using Canvas coordinates, to Cartesian Coordinates, and back to Canvas. As a sample of a real-world use case. */
    cartesian_system_console_debugging() {
        
        /** Main program developer variables. These are some sample Canvas coordinates. Note: that this has to be within the Canvas(width, height). Overflow values are not supported yet! */
        const [x, y] = [ 75, 25 ];

        /** Cartesian Coordinate System */
        const ccs = new Axis.Cartesian_Coordinate_Transformer();
        
        /** Mount to canvas (required for calculations) */
        ccs.construct(this.graph.canvas);        
        
        /** Cartesian(x, y) as a result of conversion */
        const [cx, cy] = ccs.conversion(x, y);
        
        /** Canvas(x, y) as reversed conversions. */
        const [rx, ry] = ccs.reversion(cx, cy);
        
        /** Log to console */
        console.group("[Cartesian System]:");
            
            // Conversion
            console.groupCollapsed(`\Conversion`);
                console.log("Successfully converted *sample canvas coordinates to cartesian coordinates.");
                console.table([{
                    "Canvas Dimensions: Canvas(Width, Height)": [this.graph.canvas.width, this.graph.canvas.height],
                    "Canvas Median: Canvas(Width / 2 , Height / 2)": [this.graph.canvas.width / 2, this.graph.canvas.height / 2],
                    "Sample input coordinates: Canvas(x, y)": [x, y],
                    "Output coordinates: Cartesian(x, y)" : [cx, cy]
                }]);
            console.groupEnd();
            
            // Reversion
            console.groupCollapsed(`Reversion`);
                console.log("Now, we will convert the Cartesian(x, y) back into the original Canvas(x ,y)");
                console.table([{
                    "Input coordinates: Cartesian(x, y)" : [cx, cy],
                    "Output coordinates: Canvas(x, y)": [rx, ry],
                }]);
            console.groupEnd();
            
            // Evaluation
            console.groupCollapsed('\Evaluation');
                console.log("Calculations match? Reversion (Should match Canvas(x, y))");
                console.table([
                    {
                        "Canvas(x, y)":[x, y], 
                        "Cartesian(x, y)": [cx, cy], 
                        "Reversion(x, y)": [rx, ry]
                    }
                ]);
            console.groupEnd();
        console.groupEnd();
    }
    cartesian_visual_analysis() {
        const analysis_layer = new VisualAnalysisCanvas();
        analysis_layer.mount(this.graph);
        analysis_layer.init();
    }

}

/**
 * Creates a new pseudo-canvas to draw debug graphics.
 */
export class VisualAnalysisCanvas {

    constructor() {

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
    draw_translation_event() {
        this.graph.camera.debug();
    }
    /**
     * visual debugging graph, to help visualize the cartesian plane, vs the canvas coordinates.
     */
    draw_cartesian_axis() {
        /** here, we visually debug the planes becuase it's impossible to mentally visualize this lol. */

    }
}

/** @todo implement! */
class SharedDebugMemoryModule {
    constructor(argsv) {
        this.canvas = argsv.canvas;
    }
}