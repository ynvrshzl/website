# Network Graph: System Lifecycle
As of: __February 2, 2026__

Here is a overview map of how all these parts actually look like and speak to each other.


## Main system lifecycle

```js
system(init) -> mode(debug) -> server(init) -> server(looping)... -> frame(draw)
```

```js
Main -> LPU -> Server -> Draw Frame
```


1. Main initializing core modules (uievents, )
1. Clear frame 
2. Process the current active article
3. Process related articles
4. Paint buffer
5. Scene paint one frame from source data

## Server lifecycle
The Server processes data continously, essentially mapping [User Interactions]

## Init
> When the Graph is created, it creates instances of dependent modules like the [Server](), [Graphics]() and [Stack]().

