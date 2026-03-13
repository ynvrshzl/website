
/** testing branch event architecture without if/else */
const branches = [
	{
		name: "hovering",
		description: "The mouse hovering over the canvas event, is the main branch, for which all other user-interaction event branches will process.",
		condition: (event) => event === true,
		operations: [],
	},
	{
		name: "main",
		signal: () => { if (Event("HOVERING") === true) return true; },
		operations: [],
	},
]