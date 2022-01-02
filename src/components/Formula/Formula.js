import { ExcelComponent } from '../../core/ExcelComponent';
import { $ } from '../../core/dom';
export class Formula extends ExcelComponent {
  static className = 'excel__formula';
	constructor($root, options) {
		super($root, {
			name: 'Formula',
			listeners: ['input', 'click', 'keydown'],
			...options
		})
	}
	init(){
		super.init();
		const inputFormula = this.$root.find(`[data-type="formula-input"]`);

		this.$subscribe('table:select', text => {
			inputFormula.text(text);
		})
		this.$subscribe('table:oninput', text => {
			inputFormula.text(text);
		})
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
	onClick(event){
		// this.removeDOMListeners();
		// console.log('click work')
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
