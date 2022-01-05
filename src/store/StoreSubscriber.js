import { isEqual } from "../core/utils";

export class StoreSubscriber {
	constructor(store) {
		this.store = store;
		this.sub = null;
		this.previousState = {};
	}
	
	subscribeComponents(components){
		this.previousState = this.store.getState();
		this.sub = this.store.subscribe(state => {
			Object.keys(state).forEach( key => {
				if(!isEqual(this.previousState[key], state[key])){
					components.forEach(component => {
						if(component.isWatching(key)){
							const changes = {[key] : state[key]}
							component.storeChanged(changes)
						}
					})
				}
			})
			this.previousState = this.store.getState();
		})
	}
	unsubscribeFromStore(){
		this.sub.unsubscribe();
	}
}