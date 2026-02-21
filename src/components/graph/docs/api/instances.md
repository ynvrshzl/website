# Instances
The NetworkGraph can have multiple instances. 

Each NetworkGraph is configurable with options. Read more [here.](./configuration.md)


### Example
```ts
/** let's import the Graph component from skydev! */
import { Main } as NetworkGraph from "http://graph<url>"

/** here we create one graph */
new NetworkGraph({mode: "local", container: <HTMLElement>});

/** and another, becuase why not! */
new NetworkGraph({ mode: "global" });
```