
const generateDocuments = (keys) => {
	if(keys.length === 0 ){
		return `<p>Записей нет</p>`
	}
	
	return keys.map(key => {
		const info = JSON.parse(localStorage.getItem(key));
		return (
		`
		<li class="db__record">
			<a href="#excel/${key.split(':')[1]}">${info.tableName}</a>
			<strong>
				${new Date(info.lastUpdate).toLocaleDateString()}
				${new Date(info.lastUpdate).toLocaleTimeString()}
			</strong>
		</li>
		`
		)
	})
}
const createRecordsTable = () => {

	return (
		`
		<div class="db__table db__view">
		<div class="db__list-header">
			<span>Название</span>
			<span>Дата открытия</span>
		</div>
		<ul class="db__list">

			${generateDocuments(getAllkeys())}
		</ul>
		</div>
		`
	)
}
export const generateDashboardTemplate = () => {
	const now = Date.now().toString();
	return (
		`
		<div class="db__header">
        <h1>Excel Dashboard</h1>
    </div>

    <div class="db__new">
      <div class="db__view">
        <a href="#excel/${now}" class="db__create">
          Новая <br /> Таблица
        </a>
      </div>
    </div>

		${createRecordsTable()}
		
		`
	)
}

const getAllkeys = () => {
	const keys = [];
	for( let i = 0; i < localStorage.length; i++){
		const key = localStorage.key(i);
		if(!key.includes('excel')){
			continue
		}
		keys.push( key)
	}

	return keys;
}