# Import/Export


## Importing with .use()
Import modules without the JS import keyword. This helps with safety and provides an easier way to think about sharing code across files and folders. Paths are also relatively resolved and aliases are built-in. Other modules can extend this or change it's shape, most useful with [".alias("x")"]() to change conflicting names.

```js
app().use("math").as("mathematica")
```

## Exporting with .share()
Export a file or part of your program, packaged it as a shareable piece.

```js
new Formula("x")
App().share("x")
```