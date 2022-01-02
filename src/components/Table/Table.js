import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';
import { onMouseDownHandler } from './onMousedown';
import { TableSelection } from './TableSelection';
import { nextSelector } from './utils';
import { $ } from '../../core/dom';

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
    return createTable(10);
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
			this.selection.current.text(text)
			console.log('formula:input' + ' ' + text)
		})
		this.$subscribe('formula:keydown', _ => {
			this.selection.current.focus();
		})
	}
	onInput(event){
		if(event.target.dataset.type === 'cell'){
			this.$emit('table:oninput',$(event.target).text())
		}
	}
	onMousedown(event){
		/* DRAG  */
		onMouseDownHandler(event, this.$root);
		/* 
		Selection functionality
		*/
		if(event.target.dataset.type === 'cell'){
			const target = $(event.target);
			if(event.shiftKey === true){
				const cols = range(current.id(true).col, target.id(true).col)
				const rows = range(current.id(true).row, target.id(true).row)
				
				const ids = cols.reduce((acc, col) => {
					rows.forEach(row => acc.push(`${row}:${col}`));
					return acc;
				}, [])
				
				const cells = ids.map(id => $root.find(`[data-id="${id}"]`))
				this.selection.selectGroup(cells)
	
				} else {
					const $cell = this.$root.find(`[data-id="${event.target.dataset.id}"]`);
					this.selection.select($cell);
					this.$emit('table:select', this.selection.current.text())

				}
			}
	}
	onMouseup(){}
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
