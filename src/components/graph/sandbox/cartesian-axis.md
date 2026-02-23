# Cartesian Axis System
In this Documentation/sandbox enviornment series, we study and explore the calculations behind the Cartesian System.

## Core Question
How do we actually use a Cartesian Axis system, to help make the Canvas coordinates easier to work with?

Core Components:
- [Point]()
- [Coordinates]()
- [Axis]()
- [Planes]()
- [Cartesian System]()

Process:
- Step 0... [Canvas as Source](#canvas-as-source) and [Model](#the-fundamental-model)
- Step 1... [Reading](#canvas-read)
- Step 2... [Calculation]()
- Step 3... [Conversion]()

## Canvas as Source
For this example, let's assume an HTML Canvas, with dimensions of __300 x 300__. For simplicity, we'll use  __square dimensions__, in the real system, _height and width will most likely differ based on the HTML interface layout._ Regardless, the mathematics and concepts described here are still applicable.

```js
const canvas = { w: 300,  h: 300 };
```

## The Fundamental Model
Canvas = Source, Cartesian Axis = Interoperable layer.

The canvas becomes the Source, and the Cartesian Axis is an interpoerable layer, between Canvas coordinates, and Human-readable graphs. This is basically the model we're working with here. Everything else is just programmable translations to make these systems work!

## Canvas Read
So our 1st step, we need to read the Canvas width + height, so the Cartesian System can access it's values to calculate. An example model could look like this:

```js
const cps = new CartesianPlanesSystem();
cps.read(canvas);
```

The plane system now has access to the Canvas, and is ready to perform calculations.

## Canvas Calculation
The next step is to use this as a source of calculation, to create our Cartesian Axis system. Here, we calculate half of the canvas. Which is 150. The reason we calculate this value is becuase it is the Origin of the Cartesian Axis (0, 0).

```js
const half = canvas["w"] / 2; 
```
Result  = 150

Once we establish an origin, the rest of the Axis are simply calculations, diverging in four directions (Up, Down, Left, Right)

## Calculating Axis
Each axis, being a quadrant division, is used as the maximum axis length.

Now we essentially established two spaces: Canvas Space, and Cartesian Space. Each axis will have a maximum length of 75, based on the above calculations.

## Conceptual Axis Model
At this stage, we are operating in cartesian space. using the cartesian-converted canvas coordinates. we can calculate axis ranges from them, as 4 axis. each axis is essentially drawing a straight line. E.g.

$$ 
    "axis\ begin" = point(a)
$$
$$
    "axis\ end" = point(b) 
$$

Here are the conceptual models about Axis in Cartesian Planes:

- Each axis as a quadrant plane of the original canvas
- If each axis is simply a divergent direction, about the oriign __(0, 0)__ 
- At any given direction, two perpendicular axis, form a __Quadrant__

## Axis

Negative X
-  Length: __(-x)__ spans (-150, 0). 
- Canvas: Equivalent to __Canvas(0, 150)__
- Space: center-left to origin

Positive X
- Length: __(+x)__ spans (0, 150). 
- Canvas: Equivalent to __Canvas(150, 300)__
- Space: origin to center-right

Positive Y


## Quadrants/Planes
Planes (or formally Quadrants) are the emergent chunks of the Cartesian System. Dividing the Original Canvas into 4 axis, we essentially have 4 mini graphs

- In our example, a Quadrant spand __150__ units. 
- A Quadrant will span 150 units, based on two axis (x, y) and in __4__ possible arrangements of directions



```js
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
const canvas = { x: 150, y: 150 };
const cart = {x: 0, y: 0}
```