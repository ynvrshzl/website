## Abstract Mathematics
The mathematics behind this system essentially creates a ceiling-floor inversion range. Essentially, 300, becomes a signed range (150, -150)

## Conceptual calculations:

- Cartesian conversion: essentially uses mathematics to logically apply a floor-ceiling signed range. This range is calculated for all 4 Cartesian difections (+x, +y, -y, -x). in order to calculate the ranges, we start at the world-origin (0, 0). Next, we find the middle pixel in the Canvas by calculating CanvasDimensions / 2, e.g. If the Canvas dimensions are (500, 250), half would be (250, 125).
- Canvas reversion: essentially this operation would convert CartesianCoordinates back into CanvasCoordinates, so that we can feed the data back into canvas. essentially creating a two-way translation layer.

Here, we run a conceptual test, converting

- Subject: Canvas (Height: 300, Width: 300)
- Input: basic CanvasCoordinates(150, 150)
- Output: we expect CartesianCoordinates(0, 0)

Calculation

1. Derive middle pixel of Canvas(150, 150)
2. Convert CanvasCoordinate(35, 80) to CartesianCoordinates(x, y)
3. Subtract...