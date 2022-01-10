const arrOfButtons = [
	'delete',
	'exit_to_app'
]
const headerButton = (name) => {
	return (
		`
		<div class="button" data-type="button-header">
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

			<div class="button" data-type="button-header-delete">
				<i data-type="button-header-delete" class="material-icons">delete</i>
			</div>

			<div class="button" data-type="button-header-exit">
				<i data-type="button-header-exit" class="material-icons">exit_to_app</i>
			</div>

		</div>
		`
	)
}
