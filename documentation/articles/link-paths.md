# Link paths
Some markdown links work as expected, while others do not. Why does this happen?

## How the system solves this issue
Instead of manually working this in the back-end, **the front-end dynamically resolves all markdown links.**

The conflict here is that the front-end never touches the article frontmatter, it only renders the content [read more about this system here](./delivery.md)