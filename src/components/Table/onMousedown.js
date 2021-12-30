import { $ } from '../../core/dom';

export const onMouseDownHandler = (event, $root) => {
	if(event.target.dataset.resize){
		event.target.style.opacity = 1;
		const $resizer = $(event.target)
		const $parent = $resizer.closest('[data-type="resizable"]');
		const coords = $parent.getCoords();
		const allCells = $root.findAll(`[data-col="${$parent.dataset.col}"]`);
		const type = $resizer.dataset.resize;
		let value;
		document.onmousemove = e =>{
			if(type === 'col'){
				const delta = e.pageX - coords.right;
				value = coords.width + delta;
				$parent.css({width: `${value}px`})
			} else {
				const delta = e.pageY - coords.bottom;
				value = coords.height + delta;
				$parent.css({height: `${value}px`})
			}
		}
		document.onmouseup = () => {
			document.onmousemove = null;
			document.onmouseup = null;
			event.target.style.opacity = null;
			if(type === 'col') allCells.forEach(el => $(el).css({width: value+'px'}));
		}
	}
}