# Entities:
Some ideas for entities

## Abstract
- Point(a)
- Coordinate(x, y)
- Axis(a, b)
- Graph(ax, ay) or Quadrant() or Plane()

## 
- CartesianPlane(graph, graph) or CartesianPlane(ax, ay, ax2, ay2)
- CanvasCoordinates(0, 0)
- CartesianCoordinates(0, 0)
- CanvasConversion(cx, cy)
- CartesianConversion(x, y)


## Theorycrafting entities
- CanvasCoordinates - essentially describes original (x, y) pixel data for graphics at the raw Canvas layer. these coordinates are simple in the beginning, but once we introduce user events such as zooming, panning, clicking, this coordinate system is fundamentally unusable because there is no logical direction in raw bitmap data.
- CartesianCoordinates - 