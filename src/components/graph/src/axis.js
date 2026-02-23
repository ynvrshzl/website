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
    set range([a, b]) {

        this.range = Array(new Point(a), new Point(b));

    }
}
/**
 * @abstract This entity essentially translates (0, 0) into the center of the world
 * @abstract This entity fundamentally changes how the Canvas API processes coordinates.
 * @abstract It is essentially a translation layer between: __Canvas-coordinates__ and __Human-readable coordinates__
 * @readme [docs](../docs/cartesian-coordinates.md)
 */
export class CartesianPlanesModule {
    constructor() {
        
        /** In a Cartesian system, we work with [4] directions (up, down, left, right). Here, we are semantically defining these __4__ directions, as [4] axis. Each Axis essentially stores length data. We can use these Axis in combination, to describe Coordinate data, while being reversible, translatable, back to the original constructs of the Canvas.*/
        this.planes = [
            new Axis("+y"), new Axis("+x"),
            new Axis("-y"), new Axis("-x"),
        ];
    }
    /**
     * This operation will convert the Canvas space -> into Cartesian Space
     * @param {HTMLCanvasElement} canvas The Cartesian Axis calculations rely on the dimensions of an HTML Canvas. Provide a canvas instance because it's screen space is used in cartesian coordinate calculations!
     */
    construct(canvas) {

        /** here, we read the raw dimensions of the canvas @todo doesn't the canvas itself have a read method for this? */
        const [ width, height ] = canvas;

        /** here, we divide the canvas into 4 quadrants so we can calculate the ranges of each axis. */
        for (const axis of this.planes) {
            /** @todo */
            axis.range()
        }
    }
    /**
     * visual debugging graph, to help visualize the cartesian plane, vs the canvas coordinates.
     */
    debug() {
        /** here, we visually debug the planes becuase it's impossible to mentally visualize this lol. */
    }
    /**
     * @description This operation will convert: __raw canvas coordinates__ to __Cartesian plane coordinates__
     * @abstract in abstract terms, we are creating a negative/positive slider, from a base value.
     * @summary If the canvas dimensions are __Dimensions(300, 300)__ -> and we have __Coordinates(150, 150)__ -> this operation converts the coordinates to -> Cartesian(0, 0)
     */
    convert_canvas_coordinates_to_cartesian(x, y) {
        /**
         * @step the first step is to establish the origin(0, 0). essentially, we can compute the middle of the canvas to the real canvas coordinate origin, however, we need to translate the canvas coordinates -> into cartesian coordinates. In our example, the middle of the Canvas would be (150, 150). We want it to be (0, 0).
         * @abstract from (0, 0), we can determine what axis (direction) we are working with, based on positive/negative values.
         */
        const o = [0, 0];
        /**
         * mx, my = max "x" and max "y" of the original canvas to determine pixel values.
         */
        const [cx, cy] = [this.canvas.width, this.canvas.height];
        /**
         * raw coordinates of the center of the canvas
         */
        const co = [cx / 2, cy / 2];

        /**
         * @description in our abstract example, the canvas origin would be (150, 150)...
         * @description so now, instead of the canvas dimensions being (300, 300) -> it is converted into -> (150, 150) as the maximum positive range, and (-150, -150) as the maximum negative range.
        */
        const calculation = Array(x, y).map((coordinate, index) => {

            /** the output Cartesian plane point */
            let point = new Point(0);

        });

        /** return the final calculated cartesian coordinates */
        return calculation;
    }
    /**
     * this operation essentially undoes any cartesian coordinate calculations, back into their original canvas values.
     */
    convert_cartesian_to_canvas(x, y) { }
}
/**
 * @description this entity applies __transformation operations__ like __scale__ and __translation__ to __objects__ inside a __Canvas__
 */
export class Transform {
    constructor(canvas) {
        this.canvas = canvas;
    }
    /**
     * this operation will translate the entire canvas
     */
    translate(x, y) {
        this.reset();
        this.canvas.context.translate(x, y);
    }
    /** this operation will reset the canvas transform to... (0, 0)? */
    reset() {
        // this.canvas.context.setTransform(1, 0, 0, 1, 0, 0);
        this.canvas.context.resetTransform();
    }
    /**
     * we apply the coordinate space of the camera lens,
     * to the coordinate space of the canvas. this means
     * on a new frame draw, the elements can retain their
     * data, and only the canvas coordinates are changed.
     */
    scale(x) {
        /** reset the transform first */
        this.reset();
        /** set the canvas context scale */
        this.canvas.context.scale(x, x);
    }
}
/**
 * @abstract the `Positions` entity contains various coordinate calculations + templates for visualizing the network graph data.
 * @description Essentially, it provides _Static starting coordinates__ Data so a Frame knows where to initialize draw objects. These Position coordinate data values can be later animated or shifted, and graphics simply read from these values.
 */
export class Positions {
    constructor({ canvas }) {
        /**
         * hold a reference to the canvas instance so
         * coordinates can be calculated from height, width
         */
        this.canvas = canvas;
    }
    /** Safely read canvas dimensions */
    canvas_dimensions() {

        /** @todo perhaps the canvas itself should package this read operation? */
        const [width, height] = [
            /** access the canvas 'rect' itself, rather than the html values */
            this.canvas.__rect__.width,
            /** access the canvas 'rect' itself, rather than the html values */
            this.canvas.__rect__.height,
        ];
        /** return exactly as width, then height. */
        return [width, height];

    }
    /**
     * @description calculates the __Origin (middle)__ of the canvas.
     * @returns the { x, y } origin of the canvas
     */
    origin() {
        /** here, we store the width, height of the canvas viewbox */
        const [width, height] = this.canvas_dimensions();

        /** using the viewbox, we divide by 2 to get half of it's value */
        /** here, we return this as { x, y } coordinates */
        const [x, y] = [width / 2, height / 2];

        /** return these coordinates as a named object. */
        return { x, y };
    }

    /**
     * @description  this opeartion will return randomized coordinates, meant to serve as input data to visualize randomized coordinates on a canvas map.
     * @returns an array of objects. each object consists of __{ x, y }__ as __uniquely randomized coordinates.__
     */
    spatial_randomness({ nodes }) {

        /** This is the eventual output map */
        const output = [];

        /** We store the max number of computations to perform. however, __any abstract length data is sufficient__, becuase we're just * operating on the __length__ of the items.  */
        const max = nodes.length;

        /** Get the initial screen dimensions of the canvas instance to establish a range for randomness */
        const [width, height] = this.canvas_dimensions();

        /** Semantically describe the width, height should be treated as max coordinate values. */
        const bounds = { x: width, y: height };

        /**
         * here we loop through the total amount of nodes, so we can generate postiions for each
         */
        for (let i = 0; i < max; i++) {

            /**
             * here we perform the actual randomized calculations
             * we store { x, y } in an destructured-array because
             * it's visually more intuitive to work this data type.
             */
            const [x, y] = [
                Math.random() * (bounds.x - 150),
                Math.random() * (bounds.y - 150)
            ];

            /**
             * push each generation of { x, y } coordinates as
             * an object to the eventual output map. the loop
             * keeps repeating this process until the length __max__
             * is reached.
             */
            output.push({ x, y });

        }

        /**
         * here we return the output when the loop completes
         */
        return output;

    }
    spatial_randomness_from_origin({ nodes }) {

        /** generate a random spatial map */
        const coordinates = this.spatial_randomness({ nodes });

        /**
         * here, we override the `0th` position in the random map, so it is always the origin. external entites can simply load the origin data first.
         * @todo this method could belimited, being array-based, but it keeps the system intuitive and simple.
         */
        coordinates[0] = this.origin();

        /** we return the original random spatial map, with a modified position at zero */
        return coordinates;
    }
    arc_randomness_from_origin() { }
    arc_randomness() { }
    orbit_around_point() { }
}
