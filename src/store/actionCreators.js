import { 
	CHANGE_CELL_VALUE, 
	CURRENT_STYLE_CELL, 
	TABLE_RESIZE,
	APPLY_STYLES, 
	TABLE_NAME,
	LAST_UPDATE
} from "./types"

/* ACTION-CREATORS-LIST */
const actionFactory = type => data => {
	return {
		type: type,
		data
	}
}

export const tableResize = actionFactory(TABLE_RESIZE);
export const changeCellValue = actionFactory(CHANGE_CELL_VALUE);
export const changeStyles = actionFactory(CURRENT_STYLE_CELL);
export const applyStyles = actionFactory(APPLY_STYLES);
export const tableNameChange = actionFactory(TABLE_NAME);
export const lastUpdateChange = () => {
	return {
		type: LAST_UPDATE
	}
}

