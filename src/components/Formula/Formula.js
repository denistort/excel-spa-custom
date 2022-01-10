import { ExcelComponent } from '../../core/ExcelComponent';
import { $, Dom } from '../../core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';
	constructor($root, options) {
		super($root, {
			name: 'Formula',
			listeners: ['input', 'keydown'],
			subOnStore: ['currentText'],
			...options
		})
	}
	init(){
		super.init();
		const inputFormula = this.$root.find(`[data-type="formula-input"]`);

		this.$subscribe('table:select', $cell => {
			if(typeof $cell[0] === 'object'){
				inputFormula.text($cell[0].dataset.value);
			} else{ 
				inputFormula.text($cell[0]);

			}
		})
	}
	storeChanged({currentText}){
		const inputFormula = this.$root.find(`[data-type="formula-input"]`);
		inputFormula.text(currentText);
	}
	onInput(event) {
		this.$emit('formula:input', $(event.target).text());
	}
	onKeydown(event){
		if(event.key === 'Enter'){
			event.preventDefault();
			this.$emit('formula:keydown', 'ee')
		}
	}

	toHtml() {
    return (
			`
			<div class="info">fx</div>
      <div data-type="formula-input" class="input" contenteditable spellcheck="false"></div>
			`
		)
  }
}
