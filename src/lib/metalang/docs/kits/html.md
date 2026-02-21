# HTML
Kit containes utilities for working with HTML elements

## create
Main entry point to create an HTML element

```c++
html("div").as("root").attach().content("I am a div!")
```

## .attach
Appends the element to another HTML element. If no element is provided, it simply attaches the element to the document body or the app root defined with `.as("root")`


## .select
Equivalent of `document.querySelector()` which selects any element from a root

