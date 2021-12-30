import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';
import { onMouseDownHandler } from './onMousedown'
export class Table extends ExcelComponent {
	static className = 'excel__table';
	constructor($root) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown']
		})
	}
  toHtml() {
    return createTable(10);
  }

	onClick(){
		console.log('click')
	}
	onMousedown(event){
		onMouseDownHandler(event, this.$root)
	}
	onMouseup(){}
}
