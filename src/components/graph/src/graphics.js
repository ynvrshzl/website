import { create } from "@lib/mochascript/src/html.js";
import api from "./api.js";

/**
 * @class This entity represents the HTML Canvas.
 * @abstract Essentially, the canvas operates as a Bitmap Processor.
 * 
 */
export class Canvas {
    /**
     * the class block stores information about the HTML related properties in the canvas
     */
    constructor() {
        
        /** The HTML Canvas element itself */
        this.element = null;
        
        /** The context of the HTML Canvas */
        this.context = null;
        
        /** The clientBoundingRect of the HTML Canvas. */
        this.__rect__ = null;
        
        /** The cssclasses of the HTML Canvas */
        this.cssclasses = ["network", "graph"];
        
        /** The height of the HTML Canvas */
        this.height = Number;
        
        /** The width of the HTML Canvas */
        this.width = Number;
    }

    /**
     * @description This operation will initialize the `<canvas>` html element.  This will additionally append it to the target container, supplied by the `Main()` Graph class instance itself.  * so that the agent can describe where to place each network graph instance.
     */
    init() {
        this.ghtml();
        /** 
         * @bug why is context being reset, but not lost, if we run this.gcontext() here?
         * @done for some reason, the canvas.context was reset, if it was inside this init() method. however, positioning the operation after all other "g" processing operations, correctly set the context. just another classic day in web-development. lololol. 
         * @moved this.gcontext() to this.post()
         */
    }
    /**
     * @abstract 'post' as in any action that should run after Canvas initialization, and any in-between steps.
     */
    post() {
        this.fit();
        this.gboundingbox();
        this.gcontext();
    }
    /**
     * @todo how can we make the canvas gracefully auto-size to it's parent container?
     */
    fit() {
        const parent = this.element.parentElement;
        const width = parent.clientWidth;
        const height = parent.clientHeight;
        this.element.set({ height, width });
    }
    /**
     * here, we add the canvas, inside the target container.
     * which is defined in the NetworkGraph instance constructor
     */
    inside(target) {
        target.insertAdjacentElement("afterbegin", this.element);
    }
    /**
     * @abstract "g" methods generate things. here, we generate the html
     */
    ghtml() {
        /** we create the html for the canvas, and supply it's html properties.  * however!!! we do not attach it to the html yet, as each * NetworkGraph instance will define it's own attach target container.  */
        this.element = create("canvas").css(...this.cssclasses);
    }
    /**
     * @description This operation generates the base, initial HTML canvas context context from defined settings. Note, these most likely exist as overidden settings elsewhere, so do not treat this as a source of truth!
    */
    gcontext() {
        /**
         * note, we don't have to set the color settings for * the context, becuase the `Paint` entity is in charge * of all graphical operations, which includes colors.
         * this.context.fillStyle = config.nodes.color;
         * this.context.strokeStyle = config.edges.color;
         */
        this.context = this.element.getContext("2d");
        this.context.textBaseline = api.text.baseline;
        this.context.textAlign = api.text.align;
        this.context.font = api.text.font;
        this.context.lineWidth = api.edges.width;

    }
    /**
     * sets the canvas coordinate clientrect
     */
    gboundingbox() {
        this.__rect__ = this.element.getBoundingClientRect();
    }
}
/**
 * @abstract a `Paint` entity communicates with a `Canvas` to draw basic graphics from input data. it does not include state or memory.
 */
export class Paint {
    /**
     * @param {*} canvas is the canvas entity instance that this paint entity will communicate with
     */
    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.context;
    }
    /**
     * draws a circle onto the canvas frame buffer
     */
    circle({ x, y, r }) {
        const ctx = this.context;
        ctx.beginPath();
        ctx.arc(x, y, r ? r : api.nodes.scale, 0, Math.PI * 2, false);
        ctx.fill();
    }
    /**
     * draws plain-text onto the canvas
     */
    text({ x, y, data }) {
        const ctx = this.context;
        ctx.fillText(data, x, (y - api.text.offset));
    }
    /**
     * @todo this could be expressed in clearer terms, but it works. 
     * @abstract draws a line. for rendering edges between nodes.
     * @description this step also handles directional lines: from the arc-tangent of a node, to derive it's facing position.
     * @summary the line direction is calculated from two locations, the beggining and end of the line. becuase we are working in "2D" space, we have to supply {x, y} coordinates for the start and end locations.
     * @param { object } begin is the location on the canvas, in which the line will begin
     * @param { object } to is the location on the canvas, in which the line will end
     * @example line(begin { x: 0, y: 0 }, to: { x: 999, y: 999 }) // this draws a line that points from the left, to the right of the canvas
     */
    line({ from = { x, y }, to = { x, y } }) {
        const ctx = this.context;
        ctx.beginPath();
        ctx.moveTo(from['x'], from['y']);
        ctx.lineTo(to['x'], to['y']);
        ctx.lineWidth = api.edges.width;
        ctx.stroke();
        ctx.closePath();
    }
    /**
     * @description this operation will do __(2)__ things: __(1)__ to specify the __"fill" color__ of the __next__ graphic operation... or __(2)__ if there is __no color provided__, it can be used to switch the __next__ graphic operation to the __default__ "fill" color, configured in [config.js](./config.js)
     * @param color can be any __css-compatible__ color __string__ e.g. __"red"__ or __"#000"__
     */
    swap_fill_color(color) {
        this.canvas.context.fillStyle = color ?? api.nodes.color;
    }
    /**
     * @description this operation behaves exactly the same as the __".swap_fill_color()"__ operation, but for stroke graphics such as: __lines and borders.__
     * @param color can be any __css-compatible__ color __string__ e.g. __"red"__ or __"#000"__
     */
    swap_stroke_color(color) {
        this.canvas.context.strokeStyle = color ?? api.edges.color;
    }
}
/**
 * @abstract The Frame translates -> processed object Node(data) -> into Graphic paints
 * @class the Frame entity describes a full paint of graphics onto a canvas, a single composited bitmap image. No events, No stateful memory, Just feeding data into graphics instructions.
 */
export class BitmapFrame {
    constructor(instance) {

        /** store the graph reference in frame memory. so we can access shared graph dataa */
        this.graph = instance;

        /** * always clear any previous frame when creating a new frame instance */
        this.clear();

        /** @todo is this logical? The Frame, conceptually, is a bitmap image, so it intuitively and logically c;ontains graphics operations built-into itself. */
        this.draw = new Paint(instance.canvas);

    }
    /**
     * @todo what nearest-neighboor clears the canvas?
     * becuase the canvas should always be empty so we can draw a new frame buffer
     * the canvas api doesn't update graphics on it's own, so we clear it here
    */
    clear() {

        /** here, we get the coordinates from the camera,  becuase there might be transformations and scaling, the camera already handles this, so the frame can simply read it.  @todo does it make sense to have a camera, be a member of the frame? */
        const [ width, height, origin ] = this.graph.camera.viewbox();

        /** @todo translation needs to also apply to clear frame! */
        const [ x, y ] = this.graph.camera.translation;

        /** clear the entire canvas, with scaling considered */
        this.graph.canvas.context.clearRect(x, y, width, height);
    }
}