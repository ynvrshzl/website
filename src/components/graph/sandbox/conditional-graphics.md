# Conditional Graphics
In order for [Conditional Graphics]() to emerge, The [Server]() continously runs these operations. 

## Conceptual psycho-model
The conceptual psycho-model of this system is simply: 

- [Nodes]() are [Data]() _(x, y, label, href)_
- [States]() are built-into the [Data]() _(hover, click, drag etc.)_
- [Events]() only send signals _(e.g. mousemove,)_
- [Calcuations]() are processed in [LPU]() 

## System Architecture for Conditional Graphics

- Server
- Frame
- Scene
- Layer


The timeline lifecycle of graphics:
- [Server]() draws frame 1
- [Server]() calls [Scene]() to draw
- [Frame]() is processed via [Scene]()
- [Scene]() is processed into [Layers]()
- [Layers]() process[Abstract Data]() into [Semantic Layer Data]()