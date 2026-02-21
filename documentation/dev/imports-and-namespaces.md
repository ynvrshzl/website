# Imports and Namespaces
To avoid writing fragile paths like: `"../../lib/main.js"` we are implementing a wierd new feature called ["importmaps."](https://mdn-webdocs.com) 

## Why?
Essentially this is how node-js uses `"@node"` tags to import dependencies. It makes modules cleaner, code easier to read and less prone to breaking changes.

## Caveats
Some notes about this process

- VS Code uses ["jsconfig.json"]() to provide module resolution
- The browser uses ["index.html"]() to process an `"importmap"` `<script>`

However, VS Code supports wildcards/glob patterns, but the browser doesn't. This means there should be a single source for import maps, and node can process them since it's a back-end static file that has to load before the javascript itself... so it can't happen as a network request!

## Build steps
If the import map gets too complicated, this might add an extra build step to the process, but the tradeoffs are easier to maintain code, which is essential!

Read more about the build process [here](../../build/readme.md)