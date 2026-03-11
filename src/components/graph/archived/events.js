/**
 * This entity processess event operations, of the \*node 
 */
class Node_evtpr {
	constructor(){}
	process_loop(){}
	on_hover_start(){}
	on_hover_end(){}
	on_click_start(){}
	on_click_end(){}
}
class EventProcess {
    constructor(){}
    on_start(){}
    on_end(){}
}
class Canvas_evtpr extends EventProcess {

}
/**
 * This entity processess event operations, of the \*camera 
 */
class Camera_event extends EventProcess {
	on_pan_start(){}
	on_pan_end(){}
	on_zoom_start(){}
	on_zoom_end(){}
	while_panning(){}
}

class Event_branch {
	
}