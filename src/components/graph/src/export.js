import * as Data from "./data.js";
import * as Graphics from "./graphics.js";
import * as Scene from "./scene.js";
import { Events, Server } from "./system.js";

/**
 * @summary Network Graph
 * @version 6.0.0
 * @link for documentation see... [README](./graph/README)
 */
export class Main {
	/**
	 * @abstract the network graph acts as an interface from -> the user-defined container -> to the network graph -> tells the canvas where it will be attached ->
	 * @description the constructor of this class is essentially a per-instance configuration of this network graph instance
	 */
	constructor(args) {

		/**
		 * here, we store the configuration key names
		 * so we can validate correct configuration
		 */
		const { inside, mode } = args;

		/**
		 * @property
		 * the network graph component will be attached to this html element.
		 * we explcitly want to insert this canvas to a specific container
		*/
		this.inside = inside;

		/**
		 * @property read more [here](../docs/modes.md)
		 */
		this.mode = mode;

		/** when this instance is created, it will immediately initialize */
		this.init();
	}
	/**
	 * @description this operation runs one time and assembles the graph, this essentially initializes all of the other parts of the network graph so they communicate in coordination
	 */
	init() {
		/**
		 * here, we create a new html canvas for this network graph instance.
		 * it is the main element in the network-graph-system
		 */
		this.canvas = new Graphics.Canvas();
		this.canvas.init();
		this.canvas.inside(this.inside);
		this.canvas.post();

		/**
		 * @event "article-render"
		 * @description here we setup the graph events. the first event is the core life-cycle sync. this graph instance is synchronized with the main websystem lifecycle.
		 * @abstract we synchronize a and b. a: the main graph lifecycle function, b: the main websystem lifecycle
		 */
		this.events = new Events();
		this.events.sync(this);
		this.events.hook(this.refresh.bind(this));
		this.events.init();

		/** only one camera is needed per graph instance */
		this.camera = new Scene.Camera(this.canvas);

		/**
		 * @description here we create a new server for the network-graph.  * essentially this is how the graph will continously * react to user-interaction events.
		 * @todo, the server init is confusing here. we should move new LPU to this graph
		 */
		this.server = new Server();
		this.server.sync(this);
		this.server.init();

	}
	/**
	 * @abstract this is the main api of the network graph.
	 * @description this operation contains actions that should control the dynamic lifecycles of the graph. such as when the graph needs to update it's visualization data source.
	 * @summary this is most useful for synchronizing the graph with another system event, such as in the article rendering event.
	 */
	refresh() {
		
		/** Creating stateful memory for every refresh cycle. @todo should state be completely wiped each refresh, or simply instantiated once per graph cycle? */
		const state = new Data.State();
		state.sync(this);
		this.state = state;

		/** Every Network Graph refresh, the mode responsible for the data visualization, should also refresh. that is why we refresh the mode, rather than initializing it once. Becuase...? essentially, the mode is the API entry-point of the network graph.  */
		const mode = new Data.Mode(this.mode);
		mode.sync(this);
		mode.run();

		/** Create a new scene on every graph refresh. */
		this.scene = new Scene.default();
		this.scene.mount(this);
		this.scene.stage();

		/** Refresh the server after the Mode processes data */
		this.server.refresh();


	}
}
