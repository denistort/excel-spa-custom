import { $ } from "../../core/dom";
import { range } from "./utils";

export const selectionCells = (event, current, selection, $root, $emit) => {
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
			selection.selectGroup(cells)

			} else {
				const $cell = $root.find(`[data-id="${event.target.dataset.id}"]`);
				selection.select($cell);
				// $emit('table-cell:onselect', selection.current.text())
			}
		}
}
