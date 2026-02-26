## Process:
- Step 0... [Canvas as Source](#canvas-as-source) and [Model](#the-fundamental-model)
- Step 1... [Reading](#canvas-read)
- Step 2... [Calculation]()
- Step 3... [Conversion]()

## Canvas as Source
For this example, let's assume an HTML Canvas, with dimensions of __300 x 300__. For simplicity, we'll use  __square dimensions__, in the real system, _height and width will most likely differ based on the HTML interface layout._ Regardless, the mathematics and concepts described here are still applicable.

```js
const canvas = { width: 300,  height: 300 };
```


## Canvas Read
So our 1st step, we need to read the Canvas width + height, so the Cartesian System can access it's values to calculate. An example model could look like this:

```js
const cps = new CartesianPlanesSystem();
cps.read(canvas);
```

The plane system now has access to the Canvas, and is ready to perform calculations.

## Canvas Calculation
In abstract terms, we are creating a negative/positive slider, from a base value. Whereas the old system, canvas dimensions are __Dimensions(300, 300)__ -> and we have __Coordinates(150, 150)__ -> this operation converts the coordinates to -> Cartesian(0, 0)

The next step is to use this as a source of calculation, to create our Cartesian Axis system. Here, we calculate half of the canvas. Which is 150. The reason we calculate this value is becuase it is the Origin of the Cartesian Axis (0, 0).

```js
const half = canvas.width / 2; 
```
Result  = 150

Once we establish an origin, the rest of the Axis are simply calculations, diverging in four directions (Up, Down, Left, Right)