This project started out as a a personal daisy-chain components library for my JS projects.


we're actually rapidly improving... and i thought i had reached the intermediate stage... where growth stagnates and lessons... along with limiting habits... harden...  but since we created our database compiler... it has been the most complicated system we ever created... and the faact that i can read it and even explain it to you in detail... from memory... means that somehwere... the code stopped being variables and scope... and it became layers, blocks, pillars that were born out of memory and so they can fit there... it's like for the first time i learned how to use each block of programming...

the variable,the function, the object, the class... it's almost like a generational progression... classes are blueprints for objects... methods and fields are functions and variables for objects... and functions are technically variables... with their own program scope inside... so it's like a fucntion is a mini program...

this is the fundamental idea i want to capture in metalang... becuase we discovered it purely through observation... and alot of headaches lol :(

let's see here... if the program were to tell a story it would be like... 

new Program("main") ...this is like the global scope of a program. 
new Program("level 1") ...this is like a first-level scope... a program inside a program... though "scope" itself is very confusing especially in rule-breaking features like closures and callbacks... so here the word program actually helps the engineer understand what's going on intellectually and symbolically...

it's just like lego :) it speaks for itself becuase everything is a shape!!! the only confusing thing is always the lego instructions lol... but atleast they have guiding symbols like arrows and numbers and pictures simulating the timeline construction process of the build... 

that's another idea i want to capture here...

new Assembly... or new Directions() ... or new Map("") or new Instructions("") 
.... this is like the lego instructions guide that both tell the programmer what the program is doing... and simultaneously design and assemble it's architecture... visibly...

this is what i mean!!! no more of this nonsense... 

function calc(type, x, y){ if (type === "product") { return x * y } else if (type === "add") { return x + y } }

instead we could have this conceptually...

```js
new Transformer("calc")
    .notes("builds a basic arithmetic calculator by transforming two numbers with a calculation type.")
    .input(x).type("num").input(y).type("num")
    .input("type").alias("type")
        .note("here we can optionally change .input() to be more descriptive .type()")
    .branch()
        .input("type").string().matches("product").res(1)
        .input("type").string().matches("add")res(2)
    .results()
        .res(1).math().multiply(x).by(y)
        .res(2).math().add(x).by(y)
```
then to use it... 

```js
Transformer("calc").type("add").input(3).input(5).store().results()
```

this is what i imagine the future of code looks like :) each line break represents a new idea in the current block. inputs first, then conditions... which is the main function body purpsoe... and then retuns but it could all be written as one single block, since that's what english looks like traditionally.