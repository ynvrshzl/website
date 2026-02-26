# Core Questions
Discussing Core
## Purpose
Why are we creating this system?

The purpose of this system is: __to provide a human-readable way of working with coordinates.__ This matters becuase __Coordinates__ are the __Human engineer language__ of a Network Graphics engine. Everything we do in Graph space, is a coordinate.

To create a human, intuitive directional world-space where (0, 0) is the origin of the world. this essentially means that we introduced direction, up down the left right, but also symmetry. this is the basis of graphical mathematical computation. as soon as we have an origin point for the world we can understand the rest of the world from it. this is how we calculate the gravity and physics. 

> E.g. So if our Canvas is __"300 * 300"__, this system essentially translates __"(0, 0)"__ into __"(150, 150)"__

## How do we actually use this system?
How do we *actually* use a Cartesian Axis system? 

__Translation & Conversion.__ By establishing a two-way translation system between the original Canvas system. We essentially have a human workable layer, which always translates back into the original coordinates, that the Canvas API understands.

- Translation: Convert $Canvas(x, y)$ into $Cartesian(x, y)$
- Conversion: Translate $Cartesian(x, y)$ back into $Canvas(x, y)$

## System Integration
These coordinate systems fit into the larger system. WHenever we need to use coordinates, we can simply access this system as an interface. So instead of thinking about a mouse pointer as (x, y), we think in terms of space and direction. 

E.g.

- Pointer Event: (x, y) 
- Convert: (x, y) to Cartesian(x, y)
- (x, y) is now directional and spatial.
- Translate back to Canvas(x, y)