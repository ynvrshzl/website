/**
 * @description Classifies a single point in space.
 * @link Read more at [Wikipedia](https://en.wikipedia.org/wiki/Point_(geometry))
 */
export class Point {
    constructor(value) {
        this.value = value;
    }
}
/**
 * A pair of coordinates (x, y) which essentially describes a point(a) and it's location in space, along two Axis, specifically, a Quadrant. (x and y)
 */
export class Coordinate {
    constructor(x, y) {
        /** the actual coordinate. this is an array, but it could be a named object { x, y } */
        [this.x, this.y] = [new Point(x), new Point(y)];
    }
}
/**
 * @abstract The axis is essentially a conceptual computation model to assist the developer when working with Cartesian Planes
 * @description This entity describes a single one-dimensional axis, stretching from point(a) to point(b) to form an axis.
 */
export class Axis {

    constructor(label) {

        /**
         * @description The label is a semantic name for the axis e.g. "+x" or "-y"
         */
        this.label = String(label);

        /**
         * @description the length of the axis. esesntially, this is how long the axis spans, from Point(a) -> to -> Point(b)
         * @abstract in conceptual terms, this is literally a line, expressed as: (start, end)
        */
        this.range = Array(0, 0);

    }
    range([a, b]) {

        this.range = Array(new Point(a), new Point(b));

    }
}
export class Plane {
    /**
     * Assembling the plane, from two axis.
     */
    constructor() {
        this.axis = { x: new Axis("x"), y: new Axis("y") }
    }

}
/**
 * @abstract This entity fundamentally changes how the Canvas API processes coordinates. It is essentially a translation layer between: __Canvas-coordinates__ and __Human-readable coordinates__
 * @readme [docs](../docs/cartesian-coordinates.md)
 */
export class Cartesian_Coordinate_Transformer {
    constructor() {
        /** @property {HTMLCanvasElement} Canvas as a reference memory data block inside this class. If needed by other operations or entities of this Class. */
        this.canvas = null;
    }
    /**
     * @description Simply mounts the canvas to the system.
     * @param {HTMLCanvasElement} canvas HTML Canvas
     */
    construct(canvas) {
        this.canvas = canvas;
    }
    /**
     * @description This operation will convert: __Raw canvas coordinates__ to __Cartesian plane coordinates__
     * @param {Number} x **HTML Canvas (x) value** e.g. `50`
     * @param {Number} y **HTML Canvas (y) value** e.g. `200`
     */
    conversion(x, y) {

        /** Canvas width as max x, Canvas height as max y. Treat the width/height of the Canvas, as (x, y) values. */
        const [ cmx, cmy ] = [ this.canvas.width, this.canvas.height ];
        
        /** Canvas center x, Canvas center y. These values are used to calculate negative/positive values. */
        const [ccx, ccy] = [ cmx / 2, cmy / 2 ];

        /** Return Cartesian(x, y). The order of these calculations matter becuase we are essentially deriving polarity, using entirely math. */
        const [ cax, cay ] = [ (x - ccx), (ccy - y) ];

        /** Return */        
        return [ cax, cay ]
    }
    /**
     * this operation essentially undoes any cartesian coordinate calculations, back into their original canvas values.
     */
    reversion(x, y) {

        /** Canvas width as max x, Canvas height as max y. Treat the width/height of the Canvas, as (x, y) values. */
        const [ cmx, cmy ] = [ this.canvas.width, this.canvas.height ];
        
        /** Canvas center x, Canvas center y. These values are used to calculate negative/positive values. */
        const [ccx, ccy] = [ cmx / 2, cmy / 2 ];

        /** Return Cartesian(x, y). The order of these calculations matter becuase we are essentially deriving polarity, using entirely math. */
        const [ cax, cay ] = [ (x + ccx ), (ccy - y ) ];

        /** Return */        
        return [ cax, cay ]
    }
}