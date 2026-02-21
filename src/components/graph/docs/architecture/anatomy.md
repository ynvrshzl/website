# Definitions
## The "Node"
The anatomy of a node are like the proton, neutro and electrons of an atom. The node contains information about each dot in the network graph. Consider it the developer mirror-interface of the user-facing graphic.

## The "Edges"
Hey, get your mind out of the guttter, we're talking about edges between  balls- i mean nodes! Edges are calculated from the center of a "Node" and connect to other Nodes.

# Syntax
Sample code of the anatomy of a Node:
```js
{
    id: 0,
    label: "string",
    href: "string",
    x: 0,
    y: 0,
}
```
Here is the data model for all nodes.

```js
const nodes = [{}, {}, {}]
```