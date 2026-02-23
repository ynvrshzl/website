# Visual Debugging Graph
[debugger.js](../src/debugger.js)

The Visual Debugger is a Core Module which plays a central role for developing higher-level operations such as, [Cartesian Axis](), [Transforms](), User-Interfactions, Etc.

Q: How do we actually debug graphics, if the current system requires `debug` to be a mode? 

C: And becuase the `Mode()` class can only handle data processing; the only graphical-data mode(debug) can export is node[] data...

## Temporary Solution
We built a pseudo canvas ontop of the real graph.

## System Integration
In order for Debugging to work , we treat it as a separate [Mode.]()

- [data.js/mode]() - initializes debugger as a mode
- [system.js]() - initializes mode