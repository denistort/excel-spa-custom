import { DOMListener } from './DOMListener';

export class ExcelComponent extends DOMListener {
	constructor($root, options = {}){
		super($root, options.listeners);
		this.name = options.name || '';
		this.observer = options.observer;
		this.store = options.store;
		this.subOnStore = options.subOnStore || [];
		this.unsubList = [];
		this.prepare();
	}

	/* 	
	Store methods
	*/
	$dispatch(action){
		this.store.dispatch(action);
	}
	$getState(){
		return this.store.getState();
	}
	storeChanged() {}

	isWatching(key) {
		return this.subOnStore.includes(key)
	}
	/*
	Notify all subscribers on Event
	*/
	$emit(eventName, ...args){
		this.observer.emit(eventName, args)
	}

	$subscribe(event, cb) {
		const unsub = this.observer.subscribe(event, cb);
		this.unsubList.push(unsub)
	}

	/*
	Prepare before init;
	*/
	prepare() {}
	/* 
	Render to html
	*/
  toHtml() {
		return '';
  }
	/* 
	Init and adding event listeners 
	*/
	init(){
		this.initDOMListeners();
	}
	/*
	Destroy and remove all DOM listeners and observer listeners
	*/
	destroy(){
		this.removeDOMListeners();
		this.unsubList.forEach(unsub => unsub());
	}
}
