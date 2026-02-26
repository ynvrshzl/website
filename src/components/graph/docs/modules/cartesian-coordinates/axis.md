## Axis
A reference of how Axis essentially work. Compared to the factory settings of the Canvas.

Negative X
-  Length: __(-x)__ spans (-150, 0). 
- Canvas: Equivalent to __Canvas(0, 150)__
- Space: center-left to origin

Positive X
- Length: __(+x)__ spans (0, 150). 
- Canvas: Equivalent to __Canvas(150, 300)__
- Space: origin to center-right

Positive Y

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