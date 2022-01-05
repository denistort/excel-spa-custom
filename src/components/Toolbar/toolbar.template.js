
const toolBarButton = ({isActive, icon, value}) => {
	const dataType = `
		data-type="button"
		data-value=${JSON.stringify(value)} 
		`
	return (
		`
		<div 
			${dataType}
			class="button ${isActive ? 'active' : ''}"
		>
			<i ${dataType} class="material-icons">${icon}</i>
		</div>
		`
	)
}


export const generateToolBarTemplate = (state) => {
	const buttons = [
		{
			icon: 'format_align_left',
			isActive: state['textAlign'] === 'left',
			value: {textAlign: state['textAlign'] === 'left' ? 'center' : 'left'},
		},
		{
			icon: 'format_align_center',
			isActive: state['textAlign'] === 'center',
			value: {textAlign: state['textAlign'] === 'center' ? 'left' : 'center'},
		},
		{
			icon: 'format_align_right',
			isActive: state['textAlign'] === 'right',
			value: {textAlign: state['textAlign'] === 'right' ? 'left' : 'right'},
		},
		{
			icon: 'format_bold',
			isActive: state['fontWeight'] === 'bold',
			value: {fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold'}
	
		},
		{
			icon: 'format_italic',
			isActive: state['fontStyle'] === 'italic',
			value: {fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic'},
		},
		{
			icon: 'format_underlined',
			isActive: state['textDecoration'] === 'underline',
			value: {textDecoration: state['textDecoration'] === 'underline' ? 'none' : 'underline'}
		},
	]
	return buttons.map(toolBarButton).join('');
}
