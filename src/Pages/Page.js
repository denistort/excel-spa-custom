export class Page {
	constructor(params) {
		this.params = params;
	}
	getRoot() {
		throw new Error('GetRoot method should be implemented');
	}; 
	afterRender() {};
	destroy() {}
}