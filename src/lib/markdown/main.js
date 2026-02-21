import matter from 'https://cdn.skypack.dev/gray-matter';
import * as marked from 'https://unpkg.com/marked@latest/lib/marked.esm.js';

/** various markdown utilities */
export const lib = {
    /** parse a full markdown file, returning {content, frontmatter} */
    file(string = "") {
        /** gray matter splits the frontmatter & content as 2 objects */
        const file = matter(string);
        /** parse markdown to html */
        const content = marked.parse(file['content']);
        const frontmatter = file['data'];
        return { content, frontmatter }
    },
    /** convert markdown text to stringified html */
    render(string = "") {
        return marked.parse(string);
    }
}