# File properties
Using standard [Markdown YAML frontmatter](), each file can define it's own properties. 


## What are properties for?
Properties are used throughout the websys enviornment to...
- Give structure to complex relationships
- Frontend queries... [read more here](../database/querys.md)

## All property types
As of December 01, 2025, these are all of the supported property types in articles.

<!-- | Property | Use case |
| ----     | -------- |
| `image: <url>`   | Display an  | -->

- image: is used to display an image as the article thumbnail in queries and in layout
- description: is used to display a short preview of the article
- **title: ""** is used as an alias to display the article in links and layouts instead of the actual article file path
