class Dom {
	constructor(selector){
		this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
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