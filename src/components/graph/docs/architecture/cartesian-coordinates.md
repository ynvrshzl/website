
# Coordinate System
_Network Graph - Coordinate System_

![](https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Cartesian-coordinate-system.svg/500px-Cartesian-coordinate-system.svg.png) 

In this document, we explore the coordinate system of the Network Graph to solve a fundamental issue with the [Canvas API]().

## Graph
In mathematics, a Graph is a 2D plane, made of two axis: _(x, y)_. This is how the [Canvas API]() handles graphics by default, however, when we start working with space, we run into a fundamental issue: The Canvas thinks (0, 0) is the first pixel (the top left corner), but the human sees (0, 0) as the origin of the world.

Fundamentally, this is an issue of Global vs Local space. The Canvas can be thought of as Local space, and our conceptual system is Global space. This can be very confusing to manage on our own, so we build abstraction layers to protect us from becoming overwhelmed by the details.

## Cartesian Coordinates
_The conceptual translation layer_


In essence, the Canvas API only has __2 axis (x, y)__. In a Cartesian Plane, we have __4 axis (+x, +y, -x, -y)__. This provides us a way of working with Coordinates, that is more intuitive in a graph. For example, with this system, the coordinate __(0, 0)__ is intuitively the center of the graph. With the old Canvas API system, __(0, 0)__ get's pinned to the corner of screen, leading to many issues.

Learn more about the [Cartesian Coordinates](https://en.wikipedia.org/wiki/Cartesian_coordinate_system)

## Abstract

This is a system evolution of our language speaking in coordinates & transforms. We are essentially using mathematics to create 2D directional space, in a bitmap image with no such model. 


## Mathematics
The mathematics behind this system essentially creates a ceiling-floor inversion range. Essentially, 300, becomes a signed range (150, -150)

## Purpose
The main purpose of this system is: to provide a __human-readable__ way of working with coordinates. This matters becuase Coordinates are the __main language__ of a Network Graph. 

The purpose of Cartesian coordinates is to create a logical, directional world-space where (0, 0) is the origin of the world. this essentially means that we introduced direction, up down the left right, but also symmetry. this is the basis of graphical mathematical computation. as soon as we have an origin point for the world we can understand the rest of the world from it. this is how we calculate the gravity and physics. 

So if our Canvas is __"300 * 300"__, this system essentially translates __"(0, 0)"__ into __"(150, 150)"__


## Function:
This system essentially acts as a translation layer interface between the Canvas API and Human-readable spatial information. Thus, it is a two-way translator, able to translate raw Canvas coordinates into Cartesian space, and translate any Cartesian-space coordinates, back into Canvas coordinates so the original data is always true

## Entities:
- CanvasCoordinates(0, 0)
- CartesianCoordinates(0, 0)
- CanvasConversion(cx, cy)
- CartesianConversion(x, y)
- Point(a)
- Coordinate(x, y)
- Axis(a, b)
- Graph(ax, ay)
- CartesianPlane(graph, graph) 
- or CartesianPlane(ax, ay, ax2, ay2)


## Entity definitions
- CanvasCoordinates - essentially describes original (x, y) pixel data for graphics at the raw Canvas layer. these coordinates are simple in the beginning, but once we introduce user events such as zooming, panning, clicking, this coordinate system is fundamentally unusable because there is no logical direction in raw bitmap data.
- CartesianCoordinates - 


## Theorycrafting:
Here we explore abstract possibilities and solutions, before jumping directly into code.

- __"Axis as units":__ so conceptually, if we create four directional axes from the origin point (0, 0), then we have values for each axis. so when we convert coordinate spaces, we can simply work with each Axis.points or Axis.range
- __"Graphs as units":__ Axis provide one-dimensional ranges, but since we are working with coordinates, perhaps it is more intuitive to think in terms of graphs. a Cartesian plane system is constructed from four axes in all directions, like a compass. this introduces to possibilities, either we continue to work with Axis, or we work with Graphs. with a graph however, a new structure emerges, a "quadrant."
- __"Quadrants as entities":__ quadrants are an emergent structure in Cartesian space. Like the diameter of a circle, it is not a real structure, but rather a conceptual tool for calculation. if we introduce the quadrants as entities, we would essentially be creating 4 Canvas chunks. This is more in line with render optimization than coordinate spaces. 

## Conceptual calculations:
- Cartesian conversion: essentially uses mathematics to logically apply a floor-ceiling signed range. This range is calculated for all 4 Cartesian difections (+x, +y, -y, -x). in order to calculate the ranges, we start at the world-origin (0, 0). Next, we find the middle pixel in the Canvas by calculating CanvasDimensions / 2, e.g. If the Canvas dimensions are (500, 250), half would be (250, 125).
- Canvas reversion: essentially this operation would convert CartesianCoordinates back into CanvasCoordinates, so that we can feed the data back into canvas. essentially creating a two-way translation layer.

Here, we run a conceptual test, converting

- Subject: Canvas (Height: 300, Width: 300)
- Input: basic CanvasCoordinates(150, 150)
- Output: we expect CartesianCoordinates(0, 0)

Calculation

1. Derive middle pixel of Canvas(150, 150)
2. Convert CanvasCoordinate(35, 80) -> to CartesianCoordinate
