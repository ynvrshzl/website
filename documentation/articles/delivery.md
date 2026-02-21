# Delivery system
*How does the system read and render article content?*

In summary, This process is split into **two stages:** Front-end and Back-end. 

These systems are explained in-depth throughout their dedicated sections throughout the documentation, here is a summary of both systems:
- __Frontend delivery process:__ dynamic content
- __Backend delivery process:__ static database

Essentially the front-end never touches the article frontmatter, it only renders the content. The back-end, handles both the frontmatter, and the content of the article. This can be confused, but is explained in [properties](./properties.md)

Resources:
- [Frontend](../front-end.md)
- [Backend](../back-end.md)