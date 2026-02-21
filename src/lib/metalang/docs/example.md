Example of a simple program using metalang, compared with raw JavaScript.

```js
new Formula()
	.input(2).as("x")
	.input(5).as("y")
	.math().multiply("x").by("y")
	.output()
```


# How metalangauge is created
Metalanguage is a superset of programming languages. The vison is to someday have a single interface for all programming languages, to create human-readable code that scales and is manageable, and most importantly, helps fight the increasing mental health issues in this industry.

```js
class Formula{
	constructor(){}
	input(){}
	as(){}
	math(){}
	multiply(){}
	output(){}
}
new Formula() // ... and the rest follows the same as metalang
```



```js
new Abstraction("i").describes("the number of the current loop cycle.")
new Array("items").data(1, 2, 3)
new Loop()
	.note("this loop returns an array of items, with their factor multiplied by the index.")
	.label("item factory")
	.abstractions().index().as("i").iterations().as("item")
	.input().array("items").note("this loop requires an arary of 'items'")
	.executes().math().multiply("i").note("here we multiply it by the cycle index")
	.returns().array()

Loop("item factory").using().array("items")
```

```js
new Program()
new Transformer()
new Formula(x, y)
```