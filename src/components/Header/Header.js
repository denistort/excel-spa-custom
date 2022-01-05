import { $ } from '../../core/dom';
import { ExcelComponent } from '../../core/ExcelComponent';
import * as actions from '../../store/actionCreators';
import { generateHeeaderTemplate } from './header.template';

export class Header extends ExcelComponent {
	static className = 'excel__header';
	constructor($root, options) {
		super($root, {
			name: 'Header',
			listeners: ['input'],
			subOnStore: ['tableName'],
			...options
		})
	}

	onInput(event){
		console.log($(event.target).value)
		this.$dispatch(actions.tableNameChange($(event.target).value))
	}

  toHtml() {
    return generateHeeaderTemplate(this.$getState());
  }
}
