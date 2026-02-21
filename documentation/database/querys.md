# Queries
Queries communicate directly with the [database]() and the [front-end]() to help developers save time writng manual HTML and help build pages with dynamic articles that react in real-time. This is essential in a content stream to provide the best experience to the human being.

- [Code API]() to actually run the javascript codeblocks in the frontend
- [Dataquery Utility]() the custom SQL langauge for querying data
- [Components Library]() to assemble the dataquery parts into HTML


## Structure of a query
Every query is built from this main idea:
- **Logical processing**... adding fitlers and rules to return matching files in the database.
- **Structuring**... shaping the data 
- **Rendering**... showing the files


## How to use

### 1
**Example 1: Querying:** Here, we showcase how to query files in the database. This essentially uses javascript filtering on the database. Here, we showcase how to query files in the database. This essentially uses javascript filtering on the database. Here, we showcase how to query files in the database. This essentially uses javascript filtering on the database.

Vanilla JS
```javascript
const files = database.find(file => file.path.includes('path.md'));
```

Library version
```js
query("table").for(file.path, "file.md")
```

### 2:

**Example 2: Structuring:** The next stage of a query is structuring

```javascript
const struct = query.map(file => [row, row, row])
```

## Rendering
Then finally, we use it in actual HTML
```javascript
template("type").css("grid").matrix(table).in(article);
```