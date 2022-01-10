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
	lastUpdate: new Date().toJSON()
}
const normalize = state => ({
	...state, 
	currentText: '',
	currentStyleCell: defaultStyle,
})
export const normalizeInitialState = (name) => {
	if(!storage(name)) return defaultState	
	return normalize(storage(name));
} 