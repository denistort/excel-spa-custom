import { ExcelComponent } from '../../core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';
	constructor($root) {
		super($root, {
			name: 'Formula',
			listeners: ['input', 'click']
		})
	}

	onInput(event) {
		console.log(this.$root)
    // console.log('Formula: onInput', event.target.textContent.trim())
		// console.log(event)
	}
	onClick(event){
		// console.log(event.target)
		console.log('слушатели были удалены')
		this.removeDOMListeners();
		console.log(this.listeners)
	}

	toHtml() {
    return (
			`
			<div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
			`
		)
  }
}
