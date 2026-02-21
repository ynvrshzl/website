# Media
*An authors guide to using Images, Music and more media in your articles*

Media is the *modern* touch to our website. It breaks up the blocks of long-form paragraph content, and adds cohesive balance. Sometimes, it is true, a picture is worth a thousands words. *So make sure to make the most of your media!*

## Introduction
There are __(2)__ ways to use images and other media types inside an article:

- As content media
- As a property for the file

## Media as content
Using media as content is self-explanatory. The only technical side-effect are relative links, which are explained in detail [here](./link-paths.md)

## Media as properties
Read more about all supported property types in articles. [Here](./properties.md)

Thanks to our advanced backend system, we have options to greatly improve manual work.

Articles can define their own "image" property *OR* from the article directory, an "img/" folder with any image file titled "image.*" will be used as the property itself.


## FAQ!
### "What if an article has both an image file and property?"
To avoid conflicts, if an article has both an _`img/image.*`_ and a frontmatter _`image:`_ property, the backend will **ignore the frontmatter** property.

This is a design choice to reduce manual input.

### "How are images and other media used throughout the system?"
Using an image as a [property](./properties.md) is used by the [backend]() to display the image in queries. This makes content in our website reactive and live, without having to manually place each image. At 1000s of articles, this is impossible to do by  hand, so we use the power of machines to reduce work.

Most media works this way as well.