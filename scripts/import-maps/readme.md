This build process is part of the backend node build sequence

## Importmap
_Note: This is not a major building process. This only applies when "src/" paths are renamed or moved._

This handles resolving custom javascript module namespaces like `@lib` and `@api` for both vscode, and the browser. Since they handle paths differently, this process updates both locations to avoid manual work, and keep the system synchonized. 