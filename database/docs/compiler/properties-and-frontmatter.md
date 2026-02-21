# Properties
There are different property types to assemble into a ["node"](../node.md)

Becuase of these different property types, most of the complexity comes from building separate sources into one coherent node. 

- System-defined properties... such as file time or folder
- Content-defined properties... like file outlinks
- Databaserelations... like file inlinks
- Author-defined properties... the frontmatter
 
## Frontmatter
Frontmatter is merged with the node.

## Outlinks, inlinks, extlinks
These are Content properties

## System Properties
System properties like file.ctime file.folder etc, are all handled in different ways, but are considered system-level properties.

## Assets
Assets are used by the front-end to load dynamic content