import { $ } from "../../core/dom";
import { range } from "./utils";

export const selectionCells = (event, current, selection, $root) => {
	const target = $(event.target);
			if(shiftPressed(event)){
				const cols = range(current.id(true).col, target.id(true).col)
				const rows = range(current.id(true).row, target.id(true).row)
				
				const ids = cols.reduce((acc, col) => {
					rows.forEach(row => acc.push(`${row}:${col}`));
					return acc;
				}, [])
				
				const cells = ids.map(id => $root.find(`[data-id="${id}"]`))
				selection.selectGroup(cells)
			}
}

const shiftPressed = (event) => event.shiftKey === true ? true : false;