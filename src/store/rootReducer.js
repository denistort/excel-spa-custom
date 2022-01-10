import { APPLY_STYLES, CHANGE_CELL_VALUE, CURRENT_STYLE_CELL, LAST_UPDATE, TABLE_NAME, TABLE_RESIZE } from "./types";

const value = (state, field, action) => {
	const val = state[field] || {};
	val[action.data.id] = action.data.value;
	return val;
}
export const rootReducer = (state, action) => {
	let field;
	let val;
	switch (action.type) {
		case TABLE_NAME:
			field = 'tableName';
			return {
				...state,
				[field]: action.data
			}
		case TABLE_RESIZE:
			field = action.data.type === 'col' ? 'colState' : 'rowState';
			return {
				...state, 
				[field]: value(state, field, action)
			}
		case CHANGE_CELL_VALUE:
			field = 'dataTableState'
			return {
				...state, 
				currentText: action.data.value, 
				[field]: value(state, field, action)
			}
		case CURRENT_STYLE_CELL:
			return {...state, currentStyleCell: action.data}
		case APPLY_STYLES:
			field = 'styleState';
			val = state[field] || {};
			action.data.ids.forEach(id => {
				val[id] = {...val[id], ...action.data.value[0]};
			});
			return {...state, [field]: val, currentStyleCell: {...state.currentStyleCell, ...action.data.value}}

		case LAST_UPDATE:
			field = 'lastUpdate';
			return {...state, [field]: new Date().toJSON()}
		default: return state;
	}
}