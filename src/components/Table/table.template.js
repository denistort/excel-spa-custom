import { defaultStyle } from "../../core/constants";
import { parseCell } from "../../core/parse";
import { toInlineStyle } from "../../core/utils";

const CODES = {
  A: 65,
  Z: 90
}
const isExist = (obj, key) => key in obj;
const setSizes = (widthOrHeight, amount) => `${widthOrHeight}: ${amount}px;`;

const getSizes = (obj, index, widthOrHeight) => {
	if(!isExist(obj, index)) return 
	return setSizes(widthOrHeight, obj[index]);
}
const getCellValue = (data, row, col) => {
	if(!isExist(data, `${col}:${row}`)) return
	return data[`${col}:${row}`];
}

const toCell = (row, state) => (_, col) => {
	const id = `${col}:${row}`
	const cellWidth = getSizes(state.colState, col, 'width');
	const cellValue = getCellValue(state.dataTableState, row, col) || '';
	const defaultCss = toInlineStyle({
		...defaultStyle,
		...state.styleState[id]
	}) || toInlineStyle(defaultStyle);
	return (
		`<div 
			class="cell" 
			contenteditable 
			data-col="${col}"
			data-row="${row}"
			data-id="${id}"
			data-value="${cellValue || ' '}"
			style="${defaultCss} ${cellWidth || ''}" 
			data-type="cell"
		>
		${parseCell(cellValue) || ''}
		</div>`
	)
}

const toColumn = state => (col, index) => {
	const columntWidth = getSizes(state.colState, index, 'width');
	return (
		`
		<div 
			class="column" 
			style="${columntWidth || ''}" 
			data-type="resizable" 
			data-col="${index}"
			>
				${col}
			<div class="col-resize" data-resize="col"></div>
		</div>
		`
	)
}

const createRow = (index, content, rowState = {}) => {
	let rowHeight = getSizes(rowState, index, 'height');
	const resize = index ? `<div class="row-resize" data-resize="row"></div>` : '';
	return (
		`
		<div class="row" data-row="${index}" style="${rowHeight || ''}" data-type="resizable">
			<div class="row-info">
			${index ? index : ''}
			${resize}
			</div>
			<div class="row-data">${content}</div>
		</div>
		`
	)
}
const toChar = (_, index) => String.fromCharCode(CODES.A + index)

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(toColumn(state))
    .join('')

  rows.push(createRow(null, cols))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(toCell(row, state))
      .join('')

    rows.push(createRow(row + 1, cells, state.rowState))
  }

  return rows.join('')
}
