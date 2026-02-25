import { database } from "@sys/database.js";
import { heap } from "@sys/heap.js";
import * as Axis from "./axis.js";
import * as Debug from "./debugger.js";

/**
 * @abstract `Data` is the smallest unit of instruction for the network graph.
 * @description this class is used to store abstract data, most commonly for nodes.
 * @description the `Data` class contains program memory for a `NetworkGraph` instance.
 */
export class AbstractData {
	constructor() { }
	/** @todo to be implemented */
	store(){}
	/** @todo to be implemented */
	lock(){}
	/** @todo to be implemented */
	remove(){}
	/** @todo to be implemented */
	flush(){}
}
/**
 * @class a `Node` is the smallest unit in a network graph. this represents the both: the graphical data, and the semantic data for the network graph to parse and visualize.
 * @param {string} id specifies the unique id of a node. this is used throughout the system to work with specific nodes by targeting the `id`
 * @param {number} x the intial x position of the node on the canvas. __if not supplied, it will default to 0__
 * @param {number} y the intial y position of the node on the canvas. __if not supplied, it will default to 0__
 * @param {string} label is the text that is assigned to a node
 * @param {URL} href is the URL link that the node contains to it's real article
 * @param {array} links are __external connections__, meaning, how the node is related to a neighboor node. From the current node, to another node. These links will be visualized as edges between nodes. __If no links are supplied,__ it __defaults__ to [] an empty array. node connections change based on the visualization __Mode__, explained [here](../docs/connections.md)
 */
export class Node {
	/** @todo although this structure is awesome, the Processor is manually specifiying parameter args, so some settings applied in Node() creation stage, are not carried over to the final product... */
	constructor({ id, x, y, label, href, links, color, edges }) {
		this.id = id;
		this.x = x ?? null;
		this.y = y ?? null;
		this.label = label;
		this.href = href;
		this.links = links ?? [];
		this.edges = edges ?? [];
		this.color = color ?? "red";
	}
}
/**
 * @description this entity translates articles into network-graph data, so they can be visualized.
 * @important the processor does not process graphical-related computations, it only translates article data into network-graph nodes.
 */
export class Processor {
	constructor() {
	}
	/**
	 * process a single data node
	 * @param {object} item is the data source to convert into a node
	 * @returns the node
	 */
	node(item) {
		const { href, label, id, x, y } = item;
		return new Node({ href, label, id, x, y });
	}
	/**
	 * @description __translate__ an __abstract data source__ into a __completed node.__
	 * @description this requires the abstract data to be an object, and a position map to assign positions for the node
	 * @param {object} data from an abstract (generic) data type, not specifically an article.
	 * @param {array} positions is the array of {x, y} positions to generate for each node. __this is optional, only if the nodes should be in a specific position, otherwise, a randomized visualization is used as a default.__
	 */
	abstract({ data, positions }) {

		/**
		 * temporary memory storage for the output processed data
		 */
		const output = [];

		/**
		 * we process the data
		*/
		data.forEach((item, index) => {

			/**
			 * here, we create a new node for each data item.
			 * the object should include explicit fields 'href: ...',
			 */
			const { href, label, id } = item;

			const node = this.node({
				/** if the node does not have an already generated id, this will auto-generate one based on the loop index. */
				id: id ?? index,
				/** label */
				label: label,
				/** href */
				href: href ?? null,
				/** x */
				x: positions[index]['x'],
				/** y */
				y: positions[index]['y'],
			});

			output.push(node);

		});

		return output;
	}
}
/**
 * @class this entity specifies how to handle the NetworkGraph operation modes.
 * @documentation [link](../docs)
 * @abstract the purpose of these operations are to processes specific data based on "mode"
 * @abstract this processed data is then passed to the rest of the system
 */
export class Mode {
	constructor(mode) {
		/**
		 * the mode needs direct access to the graph instance that called it,
		 * we share the entire graph instance here.
		 */
		this.graph = null;
		/** the mode as a string */
		this.mode = mode;
		/** store any mode data to be shared with other entities */
		this.data = null;
	}
	/**
	 * @description this operation will connect the graph instance, and the mode engine together.
	 * @param {string} instance the graph instance reference.
	 */
	sync(instance) {
		this.graph = instance;
	}
	/**
	 * this opeartion will attempt to run the mode
	 */
	run() {
		/**
		 * here, we run the method  of the same name as `"mode"`
		 * so if the mode is `"global"`, it will call `.global();`
		 */
		const mode = this.mode;
		/**
		 * @todo these operation most likely belongs in a seaparate processor unit! it's like a multiplexer thing.
		 * we run this through a try-catch so the graph doesn't
		 * block or crash the system if there is an error.
		*/
		try {
			/** here we initialize the core components for the current mode */
			const { canvas, camera, positions, data, processor, events } = this.init();

			/**
			 * @description here, we store the processed data, nodes is the processed data from the __Mode__, by accessing the "mode" that shares the same method name in this class
			*/
			const nodes = this[mode](canvas, camera, positions, data, processor, events);

			/**
			 * @description this data is now ready to be processed in further steps. we clarify it is meant to be treated as an output
			 */
			this.export({ nodes });

			/**
			 * @errors here we catch any errors
			 */
		} catch (error) {
			console.error(`[Network Graph]: Oops! The "Mode" operation has encountered an error!`, error);
		}
	}
	/**
	 * @description Regardless of __Mode__, these __initial__ operations are required for each mode to process their own data.
	 * @abstract This operation reveals that the __Mode__ entity, behaves much like a State Machine. Where logical mappings are processed based on data.
	 */
	init() {
		/**
		 * these are static variables, inherited when the graph initializes
		 */
		const canvas = this.graph.canvas;
		const camera = this.graph.camera;
		const events = this.graph.events.data;

		/**
		 * position map for positioning nodes onto the canvas
		 */
		const positions = new Axis.Positions({ canvas });

		/**
		 * @entity this allows us to semantically bridge data between the parts in this system
		*/
		const data = new AbstractData();

		/**
		  * @stage processing articles into network-graph nodes
		  * @abstract the reason we create a new processor each time the frame refreshes, is becuase the articles on the site have changed, it's more intuitive, to establish a new processor instance, than to clear the previous instance
		 */
		const processor = new Processor();

		/**
		 * here we return explicit namespace memory variables, so data flow is clear.
		 */
		return { canvas, camera, positions, data, processor, events };
	}
	/**
	 * @description read more [here](../docs/modes.md)
	 * @summary when the Mode entity is loaded as "global" it will visualize all of the articles on the site.
	 */
	global(canvas, camera, positions, data, processor, events) {

		/**
		 * @stage loading all articles on site
		 * here, we store the entire website database in the 'data' nodes
		 * so it can be manipulated by the other stages
		 */
		data.nodes = database;

		/**
		 * @stage generating positions for each node
		 * here, we generate a position map
		 */
		data.positions = positions.spatial_randomness_from_origin({
			nodes: data.nodes
		});

		/**
		 * @stage process nodes
		 * here we convert the database articles into node format.
		 * essentially  translating fields like "article.name" into "href"
		 * so the processor can understand what fields to parse into a node.
		 */
		data.processed = database.map((item) => { return { href: item.name, label: item.name }; });
		data.output = processor.abstract({
			data: data.processed,
			positions: data.positions
		});

		/** @returns when this mode has finished it's processing, it returns the data */
		return data.output;
	}
	/**
	 * this operation will handle the network-graph in __'local'__ mode.
	 */
	local(canvas, camera, positions, data, processor, events) {

		/**
		 * here, we create the 'root' article. essentially it is the current * websystem article. which is the purpose of "local" mode
		 * @todo how come the "color" property isn't being applied here?
		 */
		data.root = { id: 0, label: heap.article.name, href: heap.article.name, color: "blue" };

		/**
		 * @summary here we process all articles from the real html `<a>` links.  that contains article links
		 * @abstract the database includes an `external` links section, but the article can generate dynamic links, not present in the database. so this method handles dynamically-generated links!
		 * here, we convert the anchors into processable node format
		 */
		data.anchors = document.querySelector("main > article").querySelectorAll("a");
		data.processed = [];

		/**
		 * looping thorugh each html <a> article links to extract data so we can build an article node from it
		 */
		data.anchors?.forEach((anchor, index) => {
			/** here, we save each processed <a> link, as a node into program memory */
			data.processed.push(
				/** we process each <a> link, as a node */
				processor.node({
					/** here we `+1` offset the id becuase the root node requires id: 0 */
					id: (index + 1),
					/** @todo we should use a resolver class here from the `Article` module, becuase sometimes markdown links are not correctly parsed into html! */
					href: anchor.href,
					/** we get the last "/" of the anchor link to get it's name */
					label: anchor.href.split("/").pop(),
				})
			);
		});

		/**
		 * @stage preparing nodes for positions
		 * here we create an [array] of the root article, and the html links together.
		 * essentially, the actual graphical data of the nodes, can only be generated
		 * once the total number of nodes is known. at this stage, the nodes are purely
		 * data, the responsibility of the other stages handle the different layers of the process.
		*/
		data.nodes = [data.root, ...data.processed];

		/**
		 * @stage generating node postiions
		 * description here, we create a position map, based on the total number of nodes.
		*/
		data.positions = positions.spatial_randomness_from_origin({
			nodes: data.nodes
		});


		/**
		 * @stage setting node positions
		 * we feed the positions data -> to the earlier-generation nodes -> into processor, so the nodes are processed.
		 */
		data.output = processor.abstract({
			/** return the... */
			data: data.nodes,
			/** return the... */
			positions: data.positions
		});

		/** @returns when this mode has finished it's processing, it returns the data */
		return data.output;
	}
	/** 
	 * @debug here, we handle any developer debugger-specific code that should only run on testing cycles  
	 * @todo it might be useful since this operation can access the graph's original canvas, camera, postiions, data, etc...
	*/
	debug(canvas, camera, positions, data, processor, events) {

		/** Create a new debugger instance */
		const debug = new Debug.default();
		debug.mount(this.graph);
		debug.init();

		/** 
		 * here we store the debug, inside the graph, essentially a two-way-sync so we can call debug operations elsewhere.
		 * @todo this might be useful in the case we want to call debug from other graph modules, as in the cartesian axis system...
		 */
		this.graph.debug = debug;

		/** draw the debug node at the centre of the graph for debugging purposes*/
		const origin = positions.origin();

		/** 
		 * here, we crate sample data so the graph can render something in debug mode.
		 * @todo since we want the debug mode to update at each frame, it should be in the server loop... however, debug is methodically handled as a 'mode' so this entity can only transfer node-data. perhaps we could introduce some kind of stack call draw buffer array, so modes can exclusively push their own draw data? becusae how else can we handle this in debug? if we don't want to change the rest of the system specifically for this mode?
		 */
		const sample = [{ id: 0, label: `X: (${Math.round(origin.x)}), Y: (${Math.round(origin.y)}), Frame: 1/60`, href: null }];

		/** the graph requires some kind of node data, so we pass in placeholder values */
		data.output = processor.abstract({
			/** passing debug sample data */
			data: sample,
			/** passing debug sample data */
			positions: [origin]
		});

		/** sample data is returned to the next entity in the system */
		return data.output;
	}
	/** coming soon. */
	source() { }
	/**
	 * @description This operation handles sharing the processed __Mode__ data to external entities such as  __Frame__ drawing and __Events__
	 */
	export(output) {
		// this.graph.buffer.store(output);
		this.graph.nodes = output;
	}
}
