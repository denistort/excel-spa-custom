export class TableSelection {
	constructor(){
		this.group = [];
		this.className = 'selected';
		this.current = null;
	}

	select($el){
		this.clear();
		this.current = $el;
		this.group.push($el);
		$el
			.focus()
			.addClass(this.className);
	}
	
	clear() {
		this.group.forEach($c => $c.removeClass(this.className));
		this.group = [];
		this.current = null;
	}
	selectGroup(cellsGroup = []){
		if(cellsGroup.length > 0){
			this.group = cellsGroup;
			cellsGroup.forEach(cell => {
				cell.addClass(this.className)
			})
		}
	}
}