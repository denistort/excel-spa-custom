import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './onMousedown';
import { TableSelection } from './TableSelection';
import { isCell, nextSelector, shiftPressed } from './utils';
import { $ } from '../../core/dom';
import { selectionCells } from './selectionCell';
import * as actions from '../../store/actionCreators';
import { defaultStyle } from '../../core/constants';
import { parseCell } from '../../core/parse';

export class Table extends ExcelComponent {
	static className = 'excel__table';
	constructor($root, options) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown', 'keydown', 'input'],
			...options
		})
	}

  toHtml() {
    return createTable(20, this.$getState());
  }

	prepare(){
		this.selection = new TableSelection();
	}

	init() {
		super.init()
		const $cell = this.$root.find('[data-id="0:0"]');
		this.selection.select($cell);
		//observer
		this.$subscribe('formula:input', text => {
			const result = parseCell(...text);
			this.selection.current
				.attr('data-value', ...text)
				.text(result)
			this.updateTextInStore(String(text));
		})
		this.$subscribe('formula:keydown', _ => {
			this.selection.current.focus();
		})
		this.$subscribe('toolbar:applyStyle', value => {
			this.selection.applyStyles(...value)
			this.$dispatch(actions.applyStyles({
				ids: this.selection.getAllGroudIds,
				value,
			}))
		})
	}
	updateTextInStore(value){
		this.$dispatch(actions.changeCellValue({
			id: this.selection.current.id(),
			value
		}))
	}
	onInput(event){
		if(isCell(event)){
			this.updateTextInStore($(event.target).text())
			//when you change
			$(event.target).attr('data-value', $(event.target).text())
		}
	}

	async resizeTable(event, $root) {
		try {
			const data = await resizeHandler(event, $root);
			this.$dispatch(actions.tableResize(data));
		} catch (error) {
			console.warn(error.message)
		}
	}
	selectCell(event){
		const $cell = this.$root.find(`[data-id="${event.target.dataset.id}"]`);
		this.selection.select($cell);
		this.$emit('table:select', this.selection.current)
		const defaultStyleKeys = Object.keys(defaultStyle);
		const obj = $cell.getStyles(defaultStyleKeys);
		this.$dispatch(actions.changeStyles(obj))
	}
	onMousedown(event){
		/* DRAG  RESIZING*/
		this.resizeTable(event, this.$root);
		/* 
		Selection functionality
		*/
		if(isCell(event)){
			if(shiftPressed(event)){
				selectionCells(
					event, 
					this.selection.current,
					this.selection,
					this.$root
				)
			} else {
				this.selectCell(event)
			}
		}
	}
	onKeydown(event){
		const keys = [
			'Enter', 
			'Tab', 
			'ArrowLeft', 
			'ArrowRight', 
			'ArrowDown', 
			'ArrowUp'
		];
		const {key} = event;
		if(keys.includes(key) && !event.shiftKey){
			event.preventDefault();
			const id = this.selection.current.id(true);
			const $next = this.$root.find(nextSelector(key, id));
			this.selection.select($next);
			this.$emit('table:select', $next.text())
		}
	}


	destroy() {
		super.destroy()
	}
}
