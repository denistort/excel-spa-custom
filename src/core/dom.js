class Dom {
	constructor(selector){
		this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
	}

	get dataset() {
		return this.$el.dataset;
	}

	html(html){
		if(typeof html === 'string'){
			this.$el.innerHTML = html;
			return this
		}
		return this.$el.outerHTMl.trim();
	}

	clear() {
		this.html('');
		return this
	}
	on(event, callback){
		this.$el.addEventListener(event, callback)
	}
	off(event, callback){
		this.$el.removeEventListener(event, callback)
	}
	append(node){
		if (node instanceof Dom ) {
			node = node.$el
		}
		if(Element.prototype.append){
			this.$el.append(node)
		} else {
			this.$el.appendChild(node)
		}

		return this
	}

	closest(selector){
		return $(this.$el.closest(selector))
	}

	getCoords(){
		return this.$el.getBoundingClientRect();
	}

	findAll(selector){
		return this.$el.querySelectorAll(selector)
	}

	css(styles = {}) {
		if(Object.keys(styles).length > 0){
			Object.entries(styles).map(([key, value]) => this.$el.style[key] = value);
		}
		return this;
	}
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, ...classes) => {
	const domElem = document.createElement(tagName);
	if(classes.length > 0) {
		classes.forEach(w => {
			domElem.classList.add(w)
		})
	}
	return $(domElem);
};
