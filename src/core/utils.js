const capitalizeFirstChar = (str) => {
	if(typeof str !== "string") {
		return '';
	}
	return str.charAt(0).toUpperCase() + str.slice(1)
} 

export const getMethodName = (str) => `on${capitalizeFirstChar(str)}`;