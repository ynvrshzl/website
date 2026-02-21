## Variables
Using assign/access we can create custom varialbes to store the chain of commands like a snapshot in memory. 

These are by default stored in the global stack, which you can read more about [here.](./../global-stack.md)

```js
app().value(3).assign("var name")
access("var name").get(value) // prints: "3"
```
