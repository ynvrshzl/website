## Converting Canvas coordinates to Cartesian
How can we actually convert these values into axis?

```js
// pseudo code for converting spaces: canvas -> to cax 
const canvas = [300, 300]

// half of canvas (150, 150) is the cartesian origin (0, 0)
const half = 300/2;

// quarter of canvas (75, 75) is used as the maximum axis length.
const quarter =  150/2 ;

/**
 * @abstract conceptual model of each axis as a quadrant plane of the original canvas
 * @description at this stage, we are operating in cartesian space. using the cartesian-converted canvas coordinates. we can calculate axis ranges from them, as 4 axis. each axis is essentially drawing a straight line e.g. start(a) to end(b)
*/
const axis = {
    /** 
     * axis -x 
     * canvas: x: "0" to x: "150"
     * space: top-left to top-center 
     */
    "-x": { start: -150, end: 0, }
    /** 
     * axis +x 
     * canvas: x: "150" to x: "300"
     * space: top-center to top-right 
     */
    "+x": { start: 0, end: 150 },
    /** 
     * axis +y 
     * canvas: Y:0, Y:150
     * space: top-left to center-left
     */
    "+y": { start: 150, end: 0, },
    /** 
     * axis -y 
     * canvas: y: "150" to y: "300"
     * space: center-center to center-bototm
     */
    "-y": { start: 0, end: -150 }
} 
```


## Integrating Cartesian Axis
These coordinate systems fit into the larger system.

Canvas(x, y) -> converted to Cartesian Axis
When rendering -> Translate back to Canvas(x, y) User interactions

## Lifecycle
What would the lifecycle of new graph coordinate system look like?

```js
// step 1: create cartesian axis planes system
const cax = new CartesianAxis();
// step 2: convert the canvas coordinates to cartesian coordinates
cax.read(HTMLCanvasElement);
/**
 * e.g. if we pass in Canvas(150, 150) the system translates this into: Coord(0, 0) which will make user-interactions and positions and animations, human-manageable.
 */
const canvas = {x: 150, y: 150};
const cart = {x: 0, y: 0}
```