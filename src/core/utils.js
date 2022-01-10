const capitalizeFirstChar = (str) => {
	if(typeof str !== "string") {
		return '';
	}
	return str.charAt(0).toUpperCase() + str.slice(1)
} 

export const getMethodName = (str) => `on${capitalizeFirstChar(str)}`;
export const storage = (key, data=null) => {
	if(!data){
		return JSON.parse(localStorage.getItem(key))
	} 
	localStorage.setItem(key, JSON.stringify(data))
}

export const isEqual = (a, b) => {
	if(typeof a === 'object' &&  typeof b === 'object'){
		return JSON.stringify(a) === JSON.stringify(b)
	}
	return a === b
}

export const camelToDash = (s) => s.replace(/[A-Z]/g, '-$&').toLowerCase();

export const toInlineStyle = (styleObj = {}) => {
	return Object
		.keys(styleObj)
		.map(key => `${camelToDash(key)}: ${styleObj[key]};`)
		.join(' ')
} 


export const debounce = (fn, time) => {
	let timeout;
	return (...args) => {
		const later = () => {
			clearTimeout(timeout);
			// fn.apply(this, ...args);
			fn(...args);
		}
		clearTimeout(timeout);
		timeout = setTimeout(later, time)
	}
}