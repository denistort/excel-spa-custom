import { defaultStyle, defaultTableName } from "../core/constants";
import { storage } from "../core/utils"

const defaultState = {
	tableName: defaultTableName,
	colState: {},
	rowState: {},
	currentText: '',
	styleState: {},
	dataTableState: {},
	currentStyleCell: defaultStyle,
}
const normalize = state => ({
	...state, 
	currentText: '',
	currentStyleCell: defaultStyle,
})
export const initialState = normalize(storage('excel-state') || defaultState);