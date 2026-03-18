import api from "./api.js";
import { main as Router } from "@sys/router.js";
import * as Log from "@mocha/log.js"

/**
 * @abstract a server provides a system to control the clock cycles of graphics.
 * @description continously running at each browser frame, *usually* 60fps, this is useful for user-interaction events, live-repaints, and network graph reactivity.
 */
export class Server {
	constructor() {

		/** the Server creates a per-instance Logical Processing Unit, becuase it simply processes graph event data, and calls graph internal operations, through shared memory. */
		this.lpu = null;

		/** here, we assign the graph instance. */
		this.graph = null;

		/** this is a flag that turns the server on or off. raf = requestanimationframe, which is the server's clock */
		this.raf = null;
	}
	init() {
		/** the state machine is initliazed once upon server creation */
		this.lpu = new LPU(this.graph);
	}
	/**
	 * @description This operation continously requests a function to repeat.
	 * @param {Function} loop This is the function that will be repeated
	 */
	request(loop) {
		/**  here we call the browser "requestAnimationFrame" and recursively * keep calling the the server.init() method at every browser trick.  * essentially is running continously at `60` FPS. we also set it as a * 'raf' flag, so the other operations can switch the server on/off by * cancelling this animationframerequest. which has to be cancelled via * the browser id. */
		this.raf = requestAnimationFrame(loop);
	}
	/**
	 * Connects the server to the graph instance so they can communicate data.
	 */
	sync(instance) {
		this.graph = instance;
	}
	/**
	 * initializes the server with any pre-loading necessary
	 */
	start() {
		this.loop();
	}
	/**
	 * stops the server
	 */
	stop() {
		/**
		 * we cancel any previously running instances to avoid memory leaks
		*/
		cancelAnimationFrame(this.raf);
	}
	refresh() {
		this.stop();
		this.start();
	}
	/**  This is the server clock loop, running continously at every browser frame.  */
	loop() {
		/** storing the graph instance as a semantic memory block. */
		const Graph = this.graph;

		/**
		 * @description this is the processed data (`from Mode(...).export()`) is now ready for painting, it is sent to the frame to parse the data into graphics
		 * @todo the data flow here can be improved! how can we more clearly handle processing node data in __Mode__?
		 */
		const { nodes } = Graph.nodes;

		/** Here, we draw the graphical scene, from data. This means that graphics only source from data, they never logically decide how to paint things? */
		/** @todo when scene becomes sophisticated, this will prbably be multiple orchestrable steps */
		Graph.scene.test(nodes);

		/**
		 * @abstract  here, the state machine will process one browser frame. any zoom, hover etc events should happen after the initial frame is painted
		 * @todo yeah, becuase the events system is essentially hidden in this main server loop, so we need a way to define the relationship between the events signals -> and the lpu processing into state -> and at next server frame -> the graphics simply draw from the newly updated data.
		 */
		this.lpu.interpret();
		this.lpu.branch();
		this.lpu.evaluate();

		/** 
		 * @abstract here we request a server restart. 
		 * @description once the loop is completed, it will request the browser animation frame this allows us to externall stop the server by prohibiting this request  this completing. 
		 */
		this.request(this.loop.bind(this))
	}
}

/** This class provides a memory block for implementing event storage data. To provide event communicatation with the external world.  */
class Stack {
	/** @todo this definitely should be a separate object? and the class simply instantiates stack memory... */
}

/**
 * @class this is a controller for user-interaction events, like zooming and clicking.
 * @description this class __only__ returns event data, not canvas transformations. those operations are handled by the other parts of the process.
 */
export class Events {

	constructor() {

		/** Store a reference to the graph, so we can properly source the canvas positions and element information.  */
		this.graph = null;

		/** This memory block is how events store data, and communicate with the external world.  */
		this.stack = {

			/** Source definition await... */
			"POINTERXY": Array(0, 0),

			/** Source definition await... */
			"CLICKING": Boolean(false),

			/** Source definition await... */
			"PANNING": Boolean(false),

			/** Source definition await...*/
			"CTXMENU": Boolean(false),

			/** Source definition await... */
			"DRAGGING": Boolean(false),

			/** This memory block contains a boolean state of the user hovering over the graph window. */
			"HOVERING": Boolean(false),

			/** This memory block contains the boolean state of the user zooming event.  */
			"ZOOMING": Boolean(false),

			/** This event stack data block contains the direction as string ("in" or "out") of the zoom event. */
			"ZOOMDELTA": String,
		}

		/**
		 * @todo this should probably be made clearer and actuall implement flags somehow?
		 * @description Event logic map for event names, their mutated flags, and their operations
		 * 
		 * @param {string} event is the actual DOM event name
		 * @param {method} method is the method to execute when the event method
		 * @param {array} flags awaiting implementation in future update...
		 */
		this.map = [
			{
				dom: 'mousemove',
				method: this.mousemove,
				flags: [],
			},
			{
				dom: "mousedown",
				method: this.mousedown,
				flags: [],
			},
			{
				dom: "mouseup",
				method: this.mouseup,
				flags: [],
			},
			{
				dom: 'wheel',
				method: this.mousewheel,
				flags: [],
			},
			{
				dom: 'mouseenter',
				method: this.mouseenter,
				flags: [],
			},
			{
				dom: 'mouseleave',
				method: this.mouseleave,
				flags: [],
			},
		];
	}
	/** Syrnchonize/mount the events module to a main Graph instance. */
	sync(instance) {
		this.graph = instance;
	}
	/**
	 * @event hook the graph instance to refresh with the main article event, so the article and graph are synchronized
	*/
	hook(callback) {
		window.addEventListener("article-rendered", callback);
	}
	/**
	 * @description This operation provides safe, and simplified access to state values. It includes error-checking and system stability. Like a junction point for event reading. So instead of accessing state memory like this: `this.state.canvas.ZOOMING` ...we can simply call: `access("zooming")`
	 * @param {String} flag is the string value of the event signal in stack memory, for which to access.
	 */
	read(flag) {

		/** the events stack is how events share their data with the external world, so we access that here. */
		const event_stack = this.stack;

		/** error-checking is verbose and hard to read, but this is for the operator to diagnose issues, especially in a very delicate data-transfer operation. */
		try {

			/** if the flag name provided does not exist */
			if (!(flag in event_stack)) {

				/** throw new error to assist the operator */
				throw new Error("Panic! The events stack does not contain the provided flag string: ", flag)

				/** otherwise, it is safe to access values */
			} else {

				/** simply returns the flag object from stack memory */
				return event_stack[flag];

			}

			/** operator message assistance */
		} catch (error) {
			console.error(error.message);
			debugger;
		}
	}
	/**
	 * each custom event is intialized here.
	 */
	init() {
		const map = this.map;

		/** here we loop through each event in the map list */
		map.forEach((event) => {

			/** these are the object keys of the current event, in the event list */
			const { dom, method } = event;

			/** memory-leak avoidance! here, remove any event listeners if this event instance is for some reason called multiple times */
			this.graph.canvas.element.removeEventListener(dom, method.bind(this), { passive: false })
			/** 
			 * here, we are assigning each DOM event "event" like mousewheel 
			 * with the method "method" -> to execute when this event is triggered in the DOM.
			*/
			this.graph.canvas.element.addEventListener(dom, method.bind(this), { passive: false });

		});
	}
	/**
	 * @abstract Essentially, how this event will communicate with the outside world. 
	 * @description Use this operation, to assign/store event data in a stack memory data block. 
	 * @param {String} string case-wise, can be an uppercase or lowercase flag in the event stack to assign data.
	 * @param {any} data of any kind. @todo definitely should enforce data typing here, but it works.
	 */
	flag(string, data) {
		/** 
		 * here, we sanitize the flag string *if needed... which could help correct accidental flag string args. 
		 */
		const block = string.trim().toUpperCase();
		/** 
		 * @todo this is probably memory unsafe, but it's okay for now!
		 * @description assign the data to the stack key.
		 * @abstract in theory... this could handle *any kind of data block. both strings or objects. but we aren't working with tree stacks or crazy memory models.
		 */
		this.stack[block] = data;
	}
	/**
	 * @abstract this is the main graph user-interaction event. 
	 * @description this essentially maps the mouse to the node positions so it can be used by other evnets like clicking, dragging
	 */
	mousemove(event) {

		/**
		 * @const rect bounding-box
		 * @description the 1st step in the graph mouse hover event  involves creating a bounding-box. 
		 * @description becuase the  canvas api doesn't have built-in events. here, essential we clip the box of the mouse   event to the canvas region, essentially we are  translating the mouse region and converting units to the canvas window constraints.
		*/
		const box = this.graph.canvas.__rect__;
		/** mouse x positions, converted to canvas x */
		const mx = event.clientX - box.left;
		/** mouse y positions, converted to canvas y */
		const my = event.clientY - box.top;
		/** here, we return the event data. at this stage, nodes are ready to be calculated for collision with pointer, but that's not the responsibility of the events controller! */
		this.flag("POINTERXY", [mx, my]);

	}
	mousedown(event) {
		/**
		 * @todo how can we more semantically handle this? 
		 * @description here, we store the 3 types of mouse click buttons
		*/
		event.preventDefault();
		if (event.button === 0) this.flag("CLICKING", true)
		if (event.button === 1) this.flag("PANNING", true)
		if (event.button === 2) this.flag("CTXMENU", true)

	}
	mouseup(event) {
		event.preventDefault();
		if (event.button === 0) this.flag("CLICKING", false)
		if (event.button === 1) this.flag("PANNING", false)
		if (event.button === 2) this.flag("CTXMENU", false)

	}
	mouseenter() {

		this.flag("HOVERING", true);

	}
	mouseleave() {

		this.flag("HOVERING", false);

	}
	/**
	 * @summary mousewheel zoom in/out event. 
	 * @description this function __only__ returns the direction of the zoom event. it can be used to increase/decrease an external 'scale' or value.
	 */
	mousewheel(event) {

		event.preventDefault();
		/**
		 * @const direction here, we store the direction of the mouse-wheel zoom. as a label "in" or "out" so the other steps can source from this single data.
		 * @description where 'deltaY' is either -1 or 1, which is the direction of the mouse-wheel scroll event.
		 * @abstract essentially, the browser handles the mouse zoom event by a range from -1 to 1. but not the actual level
		 */
		const delta = event.deltaY < 0 ? "in" : "out";
		this.flag("ZOOMING", true);
		this.flag("ZOOMDELTA", delta);
	}

}

/**
 * @summary this entity servers as a state machine that logically processes states -> into graph operations
 * @descri the state machine is in charge of coordinating __Events__ data with __States__ so the __Frame__ can paint graphics conditionally and other entities can process the events accordingly.
 * @abstract __"LPU"__ is an a shortening of __"Logical_Processing_Unit"__
 * @summary by definition, a state is __data dynamically changes inside a program's lifecycle.__
 */
export class LPU {
	/**
	 * the constructor of the State entity will store stateful memory as properties. for example, when a node is hovered, or, the state will store this information, so it can be accessed to external entities.
	 * @param {class} instance class of graph to attach to.
	 */
	constructor(instance) {
		this.graph = instance;
	}
	/** @todo this will be the actual state -> logic evaluation to handle */
	evaluate() {

	}
	/**
	 * @description The LPU Interpreter operation is a translation between event signals and event handler operations. Essentially, it will translate -> event flags -> into logic branches -> for the lpu state machine to calculate and intelligently decide how to handle incoming event data... (maybe object lookups!)
	*/
	interpret() {

	}

	/** @todo this operation will probably merge with .interpret() */
	branch() {

		/** Local variables: These are simply local variables so we don't have to specity "this" at every call.  */
		const { nodes } = this.graph.nodes;

		/** Graph instance reference pointer */
		const Graph = this.graph;

		/** This is crazy lol, but lemme explain. For some reason, the Events module loses it's "this" context when we call it from inside this LPU class. So we're essentially re-assigning the "this" context, to the graph event class reference, stored in the main graph class. Super-hacky, but works lol. */
		const SIGNAL = this.graph.events.read.bind(this.graph.events);

		/** @description here we translate the events states, inside the continously running server. we assume events are instant, and so, flip-flop latches cannot work in a single event. a flip-flop flag like "zooming = true" has to share state-data across (2) events.  */
		if (SIGNAL("HOVERING") === true) {

			/** Processing each "node" in Graph memory */
			nodes.forEach((node) => {

				/** Extract 'x' + 'y' position coordinates from node data */
				const { x, y } = node;

				/** @todo Radius should probably be packaged with each node... */
				const radius = api.nodes.scale;

				/** Pointer coordinate data 'x' + 'y' */
				const [ptrx, ptry] = SIGNAL("POINTERXY");

				/** Distance between Pointer and Node coordinate values. E.g. if ptrx = 25, and 'x' = 50, the distance between is 25. This number should decrease the closer the pointer arrives to the node. */
				const [dx, dy] = [ptrx - x, ptry - y];

				/** Becuase the above values would only work for the exact centre of the node, we apply a squareroot function using bare mathematics, to derive the summation diameter. */
				const dist2 = [dx * dx + dy * dy]

				/** Square the radius. e.g. 10 * 10 = 100 */
				const r2 = radius * radius

				/** handle if the current node, in the loop, is being hovered */
				if (dist2 <= r2) {

					/** Here, we store the currently hovered node, in state memory. This way, any external entity can access memory dynamically, without needing to call specific operationg within this event. */
					Graph.state.node.hovering = node;

				}

			});


			/** @todo the click event logic has to happen above node state flipping, becuase the below will reset the node state to null, and this click behavior has to catch it beforehand. This branch, if the user is hovering inside the graph, we can safely executre these inner branches at level: 2 */
			if (SIGNAL("CLICKING") === true) {

				/**
				 * @todo should the LPU be allowed to change event flags?
				 * @description here the LPU flips the event flag to "false" becausae the event is instant and can't process a flip-flop latch internally.
				 */
				Graph.events.flag("CLICKING", false);

				/** The actual click event logic, which simply loads the websys-router api to the node.href */
				if (Graph.state.node.hovering !== null) {

					/** The node that is currently being hovered, is stored in a previous operations (hover event handler) */
					const node = Graph.state.node.hovering;

					console.log("Node href: ", node.href);

					/** Only change the window URL if the node contains a valid 'href' url. */
					if (node.href !== null || node.href !== "") {

						/** Call the websys router to load url from node.href! */
						Router.change_to_url(node.href);

					}

					/** Regardless of the above operation(s), always flip the state back to null (reset) */
					Graph.state.node.hovering = null;
				}
			}

			/** @todo if there is a node being hovered, we handle that externally here */
			if (Graph.state.node.hovering !== null) {

				/** Accessibility: change the mouse cursor to contextual link pointer. @todo this requires cleaner event architecture. */
				Graph.canvas.element.style.cursor = "pointer";

				/** System debugging console */
				console.debug(`Graph-state-memory: node.hovering is ${Log.cols.green(Graph.state.node.hovering)}`);

				if (Graph.state.node.hovering !== undefined){
					/** @todo abstarct implementation sample of how conditional colors could work */
					const hovered_node = nodes.find(n => n === Graph.state.node.hovering);
					hovered_node.color = api.nodes.accent;
				}

				/** @todo how do we handle when a node is no longer being hovered? */
				Graph.state.node.hovering = null;

				/** @todo this should probably be handled separately... beuase it's not only hovering the cnavas, but over node stateful hover memory */
			} else if (Graph.state.node.hovering === null) {

				/** System debugging console */
				console.debug(`Graph-state-memory: node.hovering is ${Log.cols.red(Graph.state.node.hovering)}`);

				/** Accessibility: change the mouse cursor to contextual link pointer. @todo this requires cleaner event architecture. */
				Graph.canvas.element.style.cursor = "initial";
				
			}

			/**
			 * @todo this requires a translation axis system!
			 * @description if the user is panning over the canvas with the middle-mouse button
			 */
			if (SIGNAL("PANNING") === true) {

				/** here we handle panning the canvas */
				// Graph.canvas.element.style.cursor = "grab";

				/** the event returns the raw x, y pointer values */
				const [x, y] = SIGNAL("POINTERXY");

				/** here we store the camera translation value. essentially, this is the value we iterate so the pan is using this as an anchor point */
				const cpan = Graph.camera.translation;

				/** here we calculate correct values */
				const pan = [x, y].map(pixel => (pixel));

				/** @todo disabled until cartesian-axis implementation */
				// Graph.camera.pan(pan);

			} else if (SIGNAL("PANNING") === false) {

				/** gracefully exit the panning branch */
				/** @todo handling the cursor actually requires a state otherwise this silently overrides any previous style settings!! */
				// Graph.canvas.element.style.cursor = "initial";

			}

			/** only if hovering is true. otherwise, the zoom event gets misfired */
			if (SIGNAL("ZOOMING") === true) {

				/**
				 * @todo should the LPU be allowed to change event flags?
				 * @description here the LPU flips the event flag to "false" becausae the event is instant and can't process a flip-flop latch internally.
				 */
				Graph.events.flag("ZOOMING", false);

				/** @todo disabled until cartesian-axis implementation */
				// Graph.camera.zoom(event("ZOOMDELTA"));

			}
		}
	}
}