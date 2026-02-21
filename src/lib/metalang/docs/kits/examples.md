# "Kits": Examples
Examples of how to use kits and build your own

```js
kit("math")
  .block("abs").does(x => ... )
  .block("random").between(min, max => ... )
  .block("round").does(value => ... )
  .package();
```

We can then use the same "math" kit later in our code
```js
use("math").abs(-5).random(3, 5).round(3.14159);
```

These can be exported and reused in other files

```js
kit('math').share("global")
```