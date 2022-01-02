export class Observer {
	constructor () {
		this.listeners = {};
	}
	//Notify listeners
	emit(eventName, ...args) {
		this.listeners[eventName].forEach(listener => {
			listener(...args)
		});
	};

	//Subscribing || Unsubscribing;
	subscribe(event, cb) {
		this.listeners[event] = this.listeners[event] || [];
		this.listeners[event].push(cb);
		return () => {
			this.listeners[event] = this.listeners[event].filter(listener => listener !== cb)
		}
	};
}
