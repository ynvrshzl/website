import api from "./api.js";
import { Transform } from "./axis.js";
import * as Graphics from "./graphics.js";

/** 
 * @class Main Scence handler
 * @description A scene will provide the engineer, an interface to work with all of the objects that live inside the current Frame.
 */
export default class {

    /**
     * Constructor parameters for the Scene system.
     */
    constructor() {

        /** Class instance for graph.  */
        this.graph = null;

        /** Class instance for canvas.  */
        this.canvas = null;

        /** Layers in the current scene. */
        this.layers = Array;

    }
    mount(instance) {
        this.graph = instance;
        this.canvas = instance.canvas;
    }
    /** 
     * @description Here, we stage all of the graphics data, to be processed into a single final composited frame. This architecture allows us to split the layers of the frame, and orchestrate them in a specific sequence.
     * @todo since we call Scene.stage() in system.js/main refresh cycle, at this stage (pun entirely intended lol) the first initial { nodes } data is actually already loaded. we could potentially access this data!! 
     */
    stage() {

        /** 
         * @description Here, we semantically split the layers of graphics data, in graphical layers.  this only happens once per graph refresh cycle, not per -server frame.
         * @description here we define the lines first, and then the nodes. to avoid overlapping, z-index issues
         * @done Why not define layers as an object? e.g. "{ text: new layer()... }". Since Layers are conceptually ordered onto a frame, it makes sense to keep them ordered in an Array, rather than a freeform object, which would allow for any position of layer calls.
         */
        const layers = [

            /** this layer stores all "edges" on the Scene */
            new Layer("edges"),

            /** this layer stores all "nodes" on the Scene */
            new Layer("nodes"),

            /** this layer stores all "text" on the Scene */
            new Layer("text"),
        ];

        /** Next, we assign these layers to this Scene class. This way, the external world can access specific things on the Scene... (e.g. Scene.layers.at(0) = all of the edges on scene)*/
        this.layers = layers;
    };
    /**
     * @todo should "data" be an explicitly passed parameter, or stored inside the Scene?
     */
    buffer(data){

        /** 
         * @todo we will develop true 'edge' processing logic, and 'edges' as a property in nodes soon!
         * @description this is the Buffer stage. where we turn the abstract { data } into processable Layers. The purpose of the fullowing operations are to answer this question: How do we actually process edges, text and nodes into each layer, as data, so the external world can change it (e.g. the lpu).  This process splits the abstract data { nodes } into layers. We split the abstract data into data layers, then send the this processed layer data into the graphics system. This essentially lets the external world define events, through the abstract data { nodes }, conditional graphics and logic for the graphical data, which is a core feature of a graphics engine.
         */
        this.layers.at(0).buffer(() => {

            /** @todo buffer for edges...the Layer.buffer() operation should probably this 'buffer' model implement this internally... */
            const edges = [];

            /** here, we process the abstract data into edges. we form an object model, and lastly push the data into an array, to be painted in the next graphics step. the graphics will use this data to draw a line, which explains the strange data model. */
            for (const edge of data) {

                /** @done becuase we are buffering the data, inside an arrow func, how can we actually store the return data in the Layer? The graphics should treat this as we previously did, as an array of objects, looping over each object in the array... so we should return an object */
                edges.push({
                    from: { x: edge.x, y: edge.y }, to: { x: data.at(0).x, y: data.at(0).y }
                });

            }

            /** @todo, should this comment be inside documentation? */
            /** after processing, this operation returns the compiled buffer memory. now, the abstract data model { nodes } has been processed into a data-layer. this data-layer will be processed into graphics. essentially establishing communication between data-and-graphics. this is how the system events can control graphics and access specific objects on the Scene. */
            return edges;
        });

        /** 
         * Next we process text, above the edges layer. This follows the same process as the edges, but handling text as a specific process. 
         * @todo should buffer be a raw function like this? or as an entity?
         */
        this.layers.at(1).buffer(() => {
            
            const buffer = []

            for (const text of data) {
                buffer.push({

                    /** @property using the node["x"] property, we extract it into a semantic data-layer */
                    x: text.x,

                    /** @property using the node["y"] property, we extract it into a semantic data-layer */
                    y: text.y,

                    /** 
                     * @property using the node["label"] property , we extract it into a semantic data-layer. 
                     * @done the names "data" and "label" are confusing here, but earlier in the processing stage node.label makes sense 
                    */
                    data: text.label
                });
            }
            
            return buffer;
        });

        /** Processing graphical nodes (alias: dots, circles, bubbles) */
        this.layers.at(2).buffer(() => {

            const buffer = [];

            for (const dot of data) {
                buffer.push({

                    /** @property using the node["y"] property, we extract it into a semantic data-layer */
                    x: dot.x,

                    /** @property using the node["x"] property, we extract it into a semantic data-layer */
                    y: dot.y,

                    /** 
                     * @done should we handle the logical processing of color here? becusae externally, the only way a specific node can be change, is via the events system. which essentially finds the `id` of the event-related-node, and changes it's data. this simply reads from it. 
                     * color: ?
                    */

                });
            }
            return buffer;
        });        
    }
    /**
     * Render Scene by Compositing Layers, looping over graphical data and drawing.
     */
    render(){

        /** Graphics paint operations. @done Probably should be included inside the frame itself? */
        const Draw = this.frame.draw;

        /** @todo after the layers have processed their split data, how do we specify how to paint each layer? since the frame is the final composited bitmap image, we could treat it as the main draw process container. */
        /** @todo this is a significant idea, so let's implement this paint loop as some kind of entity or method! */
        this.layers.at(0).data.forEach((edge) => {
            
            const color = edge.color ?? api.edges.color;

            /** @todo this is where we can conditionally read graphical colors, probably handled in the LPU stages of event processing so we can change edge color, of a specific edge or node for example, programatically, by simply accessing the node id, and changing it's edge color as a property? */
            Draw.swap_stroke_color(color);

            /** this operation simply draws the line */
            Draw.line(edge);

        });

        /** @todo still implementing! */
        this.layers.at(1).data.forEach((text) => {
            
            const { x, y } = { x: text.x, y: text.y };
            
            /** Text label to draw alongside node */
            const data = text.data;
            
            /** The conditional color of the text  */
            const color = text.color ?? api.text.color;
            
            Draw.swap_fill_color(color);
            Draw.text({ x, y, data });
        })

        /** @todo still implementing! */
        this.layers.at(2).data.forEach((node) => {
            
            const { x, y } = { x: node.x, y: node.y };
            
            /** The conditional color of the text  */
            const color = node.color ?? api.nodes.color;
            
            Draw.swap_fill_color(color);
            
            Draw.circle({ x, y })
        })
    }    
    /** 
     * @todo to implement this as an actual process!
     * @param {Object} data expects abstract processed { nodes } data
    */
    test(data) {
        
        /** Here, we store the frame as the final composition */
        this.frame = new Graphics.BitmapFrame(this.graph);

        /** Buffer the Layers, which simply separates the { data } into specific data-layers like "text", "nodes", "edges" */
        this.buffer(data);

        /** Rendering the final Scene, which is called inside the Server, essentially per Frame. */
        this.render();

    }

}
/** 
 * @abstract This class describes an "Abstract" layer, which does not specifically draw any kind of graphics, it simply organizes composites into groups.
 * @description A Layer is a single composition in a graphical paint, which essentially, constructs a scene in a programmed, sequential order 
 * @description semantically "Layers" becuase we need to draw specific objects in the Scene, before others. e.g. draw all lines at layer 0, then nodes at layer 1. Essentially, a mathematical graphical z-index system. 
*/
export class Layer {
    constructor(label) {

        /** the name of the layer, which is used for organizing layers */
        this.label = label;

        /** This Layer keeps track of all assigned objects, as an Array. */
        this.data = Array;
    }
    /** 
     * This operation will process the Abstract Object data, into a more meaningful form, e.g. "Text" layer. The data is then stored inside this Layer. 
     * @param {Object} data of type Object, which will contain an array of objects, for the objects inside this Layer.
    */
    buffer(data) {

        /** @todo is this safe? well, in true software spirit: fuck it! */
        this.data = data();

    }
}
/**
 * the __Camera__ entity is the viewer interaction layer of the canvas.
 * @abstract zooming/panning the canvas.
 * @abstract becuase the camera does not apply transformations and is a virtual object in the scene...
 */
export class Camera {
    /**
     * becuase the canvas api only works with coordinates,
     * the camera is a pseudo-layer, which modifies the canvas
     * coordinates space. essentially, it is a pseudo-layer because
     * it doesn't exist in canvas space, but it helps us to
     * model the view layer of a canvas.
     */
    constructor(canvas = HTMLCanvasElement) {
        /**
         * canvas reference
         */
        this.canvas = canvas;
        /**
         * store the camera zoom level. which is actually at a lower-level, the canvas -> context -> scale(x, y).
         */
        this.scale = 1;
        /**
         * the camera can pan around the graph, we store that as a translation
         */
        this.translation = [0, 0];
        /**
         * a camera requires Transform
         */
        this.transform = new Transform(canvas);
    }
    /**
     * @description zoom the Camera based on a direction "in" or "out".
     * @param {*} direction a string "in" or "out" which tells the Camera how to logically zoom.
     */
    zoom(direction) {
        /**
         * here, we store the two possible directions
         * in, out. and we map the logic to handle each.
         * this allows for abstraction of any other operations.
         */
        const logic = {
            /**  if the zoom was in, it will increment by the negative factor to reduce large scale values. */
            in: () => (Number(this.scale) + Number(factor)),
            /** if it was "out" it wil decrement by the negative factor to reduce large scale values. */
            out: () => (Number(this.scale) - Number(factor))
        };

        /** the minimum scale level allowed in the graph. this has to be a positive integer */
        const min = 0.3;

        /** the factor of each scale increment. */
        const factor = 0.05;

        /** here, we store the raw value of the logical zoom map output */
        const local = logic[direction]();

        /** here, we apply any general mathematics to correct the scale values */
        const clamp = Math.max(local, min);

        /** store the scaled value in this camera */
        this.scale = clamp;

        /** use the transform to apply the scale to the canvas */
        this.transform.scale(this.scale);

        /** @todo center the canvas so the scale doesn't get pinned to the top left corner */
    }
    pan([x, y]) {
        /** call the Transform to translate the canvas */
        this.transform.translate(x, y);
        /** additionally, we store the translation values inside the camera, so...?*/
        this.translation = [x, y];
    }
    /**
     * the Camera viewbox returns the canvas width and height, with scale and transforms applied.
     * @abstract  calculates the visible screen space of the canvas, __based on any transformations.__
     * @returns [ width, height ] of canvas coordinates, with scaling applied
    */
    viewbox() {
        /** the current scale of the Camera */
        const scale = this.scale;
        /**
         * here, we calculate the percieved scale of the canvas.
         */
        const [width, height] = [this.canvas.element.width / scale, this.canvas.element.height / scale];
        /** based on the scaled values, we can divide by 2 to extract half of the coordinates. essentially returning the middle */
        const [origin] = [height / 2, width / 2];
        /** return these are an array */
        return [width, height, origin];
    }
    /** returns a coordinate, aligned to the center of the camera. */
    centerize(x) {
        const [width, height, origin] = this.viewbox();
        /** the graphic aligned to the center of the canvas */
        const offset = origin - (x / 2);
        return offset;
    }
    /**
     * @debug programmer visuals for debugging camera
     * @description this will show a box for the current visible camere range. everything outside the camera is considered void.
     * @abstract here we show a box with some text showing the scale of the canvas. all generated at the center of the graph. which calculates the scale to derive the origin of the  new canvas coordinate space.
     */
    debug() {
        /**
         * @todo let's move these methods to actual layers of the system!
         * @author perhaps the camera should not be allowed to actually set the canvas scale... but it depends on how it's going to integrate in the system
        */
        console.debug(this.scale);
        /**  divide the total canvas width, height, by the current scale. */
        const [width, height] = this.viewbox();
        /** based on the scaled values, we can divide by 2 to extract half of the coordinates. essentially returning the middle */
        const [origin] = [height / 2, width / 2];
        /** the size of the debug box */
        const box = 100;
        /** the box aligned to the center of the canvas */
        const offset = this.centerize(box);
        /** draw the debug graphics */
        this.canvas.context.strokeStyle = api.nodes.accent;
        this.canvas.context.beginPath();
        this.canvas.context.rect(offset, offset, box, box);
        this.canvas.context.closePath();
        this.canvas.context.stroke();
        this.canvas.context.fillStyle = 'white';
        this.canvas.context.fillText(`${this.scale}`, origin, offset);
        this.canvas.context.fillText(`Camera`, origin, origin);
        this.canvas.context.fillText(`${this.scale}`, origin, offset + box);
    }
}