const arrOfButtons = [
	'delete',
	'exit_to_app'
]
const headerButton = (name, type) => {
	return (
		`
		<div class="button" data-type="${type}">
			<i class="material-icons">${name}</i>
		</div>
		`
	)
}
export const generateHeeaderTemplate = (state) => {
	return(
		`
		<input 
			type="text" 
			class="input" 
			value="${state.tableName}"
			data-type="header-tableName-input" 
		/>

		<div>

			<div class="button">
				<i class="material-icons">delete</i>
			</div>

			<div class="button">
				<i class="material-icons">exit_to_app</i>
			</div>

		</div>
		`
	)
}
