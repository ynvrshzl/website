# Compiler
_Scan > Read > Index > Store > Repeat > Post-process -> Compile > Exit_

This is the most masteruflly complex and surgically orchestrated in the entire database system. The compiling process includes these steps:

- [Scan](#scan)
- [Read](#Read)
- [Filter](#Filter)
- [Parse](#Parse)
- [Memory](#Memory)
- [Dissect](#Dissect)
- [Index](#Index)
- [Push](#Push)
- [Loop](#Loop)
- [Exporting](#Exporting)




## Scan
During this phase, the compiler scans the ["wiki/"]() directory. This is where the actual *.md files are scanned, and any [Assets]() packaged with each article.

## Filter
__This stage is part of the scanning process.__ Because ["wiki/"]() contains *many* file types, we filter them each file type at this stage

- Find all markdown files (*.md)
- Find all script files... *.js
- Find all images... img/*
- Etc...

## Read
The compiler _loops through each file *.md_ in ["wiki/"]() and reads the contents. This is where we extract [Properties](./compiler/properties-and-frontmatter.md)

## Parse 
Parses it's content into frontmatter/body

## Memory 
Creates a temporary copy of the file stored as a ["node"](./node.md)

## Dissect 
This stage involves dissecting the extracted data, and working with each level. Later reassembled into a compiled index.

The markdown file at this stage contains a base object, but is still missing... 
- Frontmatter
- Links
- Assets

### Frontmatter

### Links

### Assets
Author-specfiic uses for assets is explained in [here](../../documentation/articles/assets.md)

The compiler parses assets

## Index 
The actual indexing of [Properties](./compiler/properties-and-frontmatter.md) into a [Node](./node.md)

## Push 
The [node](./node.md) to the program [stack](./compiler/stack.md). When the program is done parsing the current *.md file it pushes the node to the [stack](./compiler/stack.md) And moves onto the next file until all markdown files are parsed and indexed

## Loop 
this process is repeated for each *.md article until all articles are parsed into the database stack
### Exporting 
When all markdown files have been traversed and indexed, The program compiles and writes the stack as a [*.json]() file.
