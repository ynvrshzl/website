/** @description This code was the original, legacy system for creating Layers inside the Frame graphics itself. This changed with our Scene + Layers system, but the core ideas were referenced from this code. */

/** Edges */
for (const edge of data) {

    /** @todo here, we conditionally decide graphical colors, based on any data conditons. */
    paint.swap_stroke_color();
    paint.line({ from: { x: edge.x, y: edge.y }, to: { x: data.at(0).x, y: data.at(0).y } });
}
/** Text */
for (const node of data) {
    /**  */
    const { x, y } = { x: node.x, y: node.y };
    /** Text label to draw alongside node */
    const data = node.label;
    /** The conditional color of the text  */
    const color = api.text.color;
    /**  */
    paint.swap_fill_color(color);
    /**  */
    paint.text({ x, y, data });
}
/** Nodes */
for (const node of data) {
    /**  */
    const { x, y } = { x: node.x, y: node.y };
    /**  */
    const color = node.color ?? 'rebeccapurple';
    /**  */
    paint.swap_fill_color(color);
    /**  */
    paint.circle({ x, y });
}