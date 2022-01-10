import { $ } from '../../core/dom';
import { ExcelComponent } from '../../core/ExcelComponent';
import { ActiveRoute } from '../../core/Router/activeRoute';
import * as actions from '../../store/actionCreators';
import { generateHeeaderTemplate } from './header.template';

export class Header extends ExcelComponent {
	static className = 'excel__header';
	constructor($root, options) {
		super($root, {
			name: 'Header',
			listeners: ['input', 'click'],
			subOnStore: ['tableName'],
			...options
		})
	}
	onClick(event) {
		if($(event.target).dataset.type === 'button-header-exit'){
			ActiveRoute.goTo('/');
		}
		if($(event.target).dataset.type === 'button-header-delete'){
			const decision = confirm('Are you sure that you want to delete this table')
			if(decision === true){
				localStorage.removeItem('excel:' + ActiveRoute.param)
				ActiveRoute.goTo('/');			
			}
		}
	}
	onInput(event){
		this.$dispatch(actions.tableNameChange($(event.target).value))
	}

  toHtml() {
    return generateHeeaderTemplate(this.$getState());
  }
}
