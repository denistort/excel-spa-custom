export class ActiveRoute {
	static get path(){
		return window.location.hash.slice(1); 
	}
	static get pathname() {
		return window.location.pathname;
	}
	static get param() {
		return ActiveRoute.path.split('/')[1]
	}
	static goTo(to){
		window.location.href = to;
	}
}
