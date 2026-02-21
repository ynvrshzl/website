# Developer Reference
This is a reference guide for the Network Graph component. It includes the key ideas for the function of the system. After understanding the [Architecture](./architecture.md) we can understand how to operate with the component. 

We explore the concepts and models of the graph, rather than the raw source code, becuase it is more important to understand the simple ideas, underneat the very complex deeper system, without information overload.

## Main: "Entry Point"
The core idea of the graph begins with it's entry point: **operation modes.** This is how the operator can decide how the graph will be displayed. 

## "Operation Modes"
This network-graph component operates in two modes: **global/local.** For ease of access, we'll *assume* operation in **local-space** -- however -- almost all of these concepts apply for both **global/local** modes.

## "Isolated Contexts"
Each Network Graph is an instance, meaning it can hold it's own state and be applied to multiple areas of the application interface, or be extended to create visualizations for other