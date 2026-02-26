/** 
 * @todo the primitive version of the programmed loop calculations is this...
 * the mathematics is essentially programatically adding/subtracting from the source units... 
 * e.g. if canvas = (300, 500), median = (150, 300), then calculations are -/+ per-quadrant logic.
 */
const test = [
    {
        quadrant: 1,
        space: "top-right",
        canvas: [300, 500],
        x: [0, 150],
        y: [0, 150],
        equation: [(300 / 2), (500 / 2)],
    },
    {
        quadrant: 2,
        space: "bottom-right",
        canvas: [0, 150],
        x: [0,]
    },
    {
        quadrant: 3,
        space: "bottom-left"
    },
    {
        quadrant: 4,
        space: "upper-left"
    }
]

const axis = {
    /** 
     * axis -x 
     * canvas: x: "0" to x: "150"
     * space: top-left to top-center 
     */
    "-x": { start: -150, end: 0, },
    /** 
     * axis +x 
     * canvas: x: "150" to x: "300"
     * space: top-center to top-right 
     */
    "+x": { start: 0, end: 150 },
    /** 
     * axis +y 
     * canvas: Y:0, Y:150
     * space: top-left to center-left
     */
    "+y": { start: 150, end: 0, },
    /** 
     * axis -y 
     * canvas: y: "150" to y: "300"
     * space: center-center to center-bototm
     */
    "-y": { start: 0, end: -150 }
} 