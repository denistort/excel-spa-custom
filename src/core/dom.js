export class Dom {
	constructor(selector){
		this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
	}

	get dataset() {
		return this.$el.dataset;
	}
	get value() {
		return this.$el.value;
	}
	id(parse) {
		if(parse){
			const parsed = this.id().split(':')
			return {
				row: Number(parsed[0]),
				col: Number(parsed[1])
			}
		}
		return this.$el.dataset.id
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
	text(text) {
		if(text){
			this.$el.textContent = text;
			return this
		} 
		return this.$el.textContent
	}
	closest(selector){
		return $(this.$el.closest(selector))
	}

	getCoords(){
		return this.$el.getBoundingClientRect();
	}

	find(selector){
		return $(this.$el.querySelector(selector))
	}
	findAll(selector){
		return this.$el.querySelectorAll(selector)
	}
	focus() {
		this.$el.focus()
		return this;
	}
	attr(name, value){
		if(value){
			this.$el.setAttribute(name, value);
			return this
		}
		return this.$el.getAttribute(name)
	}

	//Styling adding css classes or deleting
	addClass(className){
		this.$el.classList.add(className);
		return this
	};
	removeClass(className){
		this.$el.classList.remove(className);
		return this
	};
	toggleClass(className){
		this.$el.classList.toggle(className);
		return this
	};
	isHasClass(className){
		return this.$el.classList.contains(className);
	}
	addClasses(...bunchOfClasses){
		if(bunchOfClasses.length > 0) {
			bunchOfClasses.forEach(clasS => this.$el.classList.add(clasS))
		}
		return this
	}

	css(styles = {}) {
		if(Object.keys(styles).length > 0){
			Object.entries(styles).map(([key, value]) => this.$el.style[key] = value);
		}
		return this;
	}

	getStyles(styles = []){
		// input => ['fontStyle'] output => {'fontStlye': '' or 'fontStlye': 'italic'};
		return styles.reduce((res, s) => {
			res[s] = this.$el.style[s]
			return res 
		}, {}) 
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
