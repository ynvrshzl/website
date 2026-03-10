/**
 * @summary API: developer configuration for the graph settings. 
 * @abstract this is a base configuration for all graph instances. but each graph instance can add it's own config. 
 * @abstract these configuration stores are specifically treated as a singleton, becuase they provide style consistency across graph instances.
 */
export default {
    /** exposed program parameters for text */
    text: {
        /** property */
        baseline: "middle",
        /** property */
        align: "center",
        /** property */
        font: `12px ${getComputedStyle(document.body).getPropertyValue("--font-family-base").trim()}`,
        /** property */
        color: getComputedStyle(document.body).getPropertyValue("--color-text").trim(),
        /** the calculated offset of the text, from the center of the node */
        offset: 24
    },
    /** exposed program parameters for nodes */
    nodes: {
        scale: 7,
        color: getComputedStyle(document.body).getPropertyValue("--color-text").trim(),
        accent: getComputedStyle(document.body).getPropertyValue("--color-accent").trim()
    },
    /** exposed program parameters for edges */
    edges: {
        color: getComputedStyle(document.body).getPropertyValue("--color-text-muted").trim(),
        width: 1,
    },
};