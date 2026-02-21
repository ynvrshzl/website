# Assets
Articles can load assets like scripts and images, without having to manually write them into the frontmatter.

This works because of the **backend database.**

This vastly improves author's input time and manageability of the system. This was a huge step in the process towards scaleability, and moreoever - human maintainability!

### File names and notes
The system uses the file names instead of manual frontmatter to load assets.

- `"main.js"` for **JS**
- `"styles.css"` for any extra **CSS** styling
- `"img/.*"` and any images are placed inside this folder
- `"audio/.*"` for sound files

### Scripts and CSS
Every article can now have scripts and CSS. Following the basic structure of a software project. JavaScript files are imported as modules, so they can import other scripts

### Images
Images used to exist as two separate things: frontmatter properties and the actual image files themselves.

The [Database]() and [Asset loader]() bridges these together.

We used to manually having to write frontmatter properties like `"image: image.jpg"` or `"cover: cover.jpg"` and simply scan the folder `"wiki/article/img/.."` for *any* images named "cover" or "image" etc... becuase the way i use frontmatter is to link images so the frontend can display them... it's already a pseudo asset loader... but this way would reduce manual input in both places...

### Music
Coming soon...
### Other asset types
Coming soon...