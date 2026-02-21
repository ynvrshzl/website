## Node States

There are two fundamental design choices:

- Integrating [Data Model]() + [State]()
- Separate StateBuffer and Data Model

A separate [StateBuffer]() increases data-traffic communication because we de-couple state with graphics data... and it might be time to establish a single data model as "nodes"... becuse fundamentally, these are the only kinds of objects that we are working with in the graph.

Just like with the rest of the architecture, we don't know what is the optimal solution, until we have inferred how the other parts will access an use this model.