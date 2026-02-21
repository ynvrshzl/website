# Scene System
Network Graph > Engine > Graphics > Scene System

Scenes are a core part of a Graphics Engine. In the context of our Network Graph engine

## 1 - How does the Scene fit into the System?
The Scene itself integrates into the system by integrating [Data Model]() into Graphics. In abstract code:

```javascript
Graph.scene.test(nodes);
```

## 2 - How does the Scene change the engine?

However, to understand how this fundamentally shapes the rest of the engine, we can understand how the [Scene]() fits in the system, by the near-neighboor building blocks of the Graph Engine:

- Server 
- Scene
- Layers
- Events 
- LPU

Scenes solve a very specific problem: after a graphics engine has the ability to paint raw graphics onto a frame, how do we access objects in the frame?

## 3 - Neighbooring Lifecycles of the Scene
<!-- todo: this should probably be a link here as a reference, but it's a key system-document utilizied by other documents too! -->
These are the nearby-neighboor processes and lifecycles of the system, in which the Scene has a key role.


Main graph engine lifecycle:

* The [Mode]() processes [Graphics]() data
* The [Server]() accesses the [Graphics]() data
* The [Server]() calls [Scene]() to draw from [Graphics]() data
* The [Server]() re-cycles this process... about 60 times per second (60fps)

---

The Scene process:
* The [Scene]() splits the [Graphics]() data into [Layers]()  e.g. "text", "edge", "nodes".
* Each [Layer]() processes the abstract [Graphics]() data to extract it's layer type, respectively.
* Each [Layer]() paint onto the Frame...??
* The [Frame]() is the final composited [Bitmap Image]()
* The [Scene]() holds object memory which is then accessed in the external world.

---

To handle user-interactions, the Scene becomes an even more fundamental part:
* For example, the [Event]() processor detects a "mousemove" user-interaction, and stores the signal as data.

When the main lifecycle repeats in the Server,
* The [Server]() accesses the [Graphics]() data
* The [Server]() recognizes [Graphics]() data has been changed (earlier by the [Events]() and [LPU]())
* The [Server]() calls [Scene]() to draw from [Graphics]() data
* The [Server]() runs cyclically...


# Layers 
As part of the [Network Graph: Data + Graphics System]()

Layers are part of the Scene, which are an evolutionary part of the system. Essentially, Layers semantically help us convert and manage data to graphics processing.

## Purpose of Layers
Z-Order, Data processing, Events, User Interaction, etc.

### Z-Order
What's the purpose of Layers in a graphical system? At it's heart, the graphics engine can only draw the data we give it. By specifying the order of data, we can program the graphics engine to draw text above everything else. This is a core idea in Graphics Engines __'z-order'__


## Code Breakdown
These ideas and codeblocks are sourced from legacy source code.  [Open the source snippet here.](../../sandbox/legacy/frame-layers.js)

To understand the complex evolution of this system, we must first historically understand the original Frame. The following section, is an analysis of the ideas, concepts and working parts for the original code for frame: Text, Edges and Nodes onto the frame.


### Part 1: Data Model

In this case, the original data was an array of objects, each object is described as a [Node](). This data model is explored further in [Nodes.]() 

This is our main data model. Which contains the [Nodes](../docs/architecture/anatomy.md) and their Properties e.g. "x, y, label, href." 


```javascript
const nodes  = [{}, {}, {}];
```


### Part 2: Data to Graphics
Painting Graphics from Data Loops

IN the original Frame, we created "pseudo" layers by looping over each Object in the node, and treating each object as semantic layers, even though we were still sourcing the same "nodes" in each loop. The new Layers system, made this clearer by specifying each object as a data type.

```javascript
for (const edge of nodes){ ... };
```
