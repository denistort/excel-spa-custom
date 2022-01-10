import { Excel } from "../components/excel/Excel";
import { Formula } from "../components/Formula/Formula";
import { Header } from "../components/Header/Header";
import { Table } from "../components/Table/Table";
import { Toolbar } from "../components/Toolbar/Toolbar";
import { createStore } from "../core/createStore";
import { debounce, storage } from "../core/utils";
import { normalizeInitialState } from "../store/initialState";
import { rootReducer } from "../store/rootReducer";
import { Page } from "./Page";

const storageNameGener = (params) => `excel:${params}`

export class ExcelPage extends Page{
	constructor(param) {
		super(param)
		this.storeSub = null;
	}
	getRoot(){
		// const params = this.params ? this.params : Date.now().toString();
		const nameId = storageNameGener(this.params)
		const store = createStore(rootReducer, normalizeInitialState(nameId))
		/*
		Subscribing on store
		*/
		const stateListener = debounce(state => {
			// console.log(`Application state was updated = `, state)
			storage(nameId, state);
		}, 300);
		store.subscribe(stateListener);

		this.excel = new Excel({
			components: [Header, Toolbar, Formula, Table],
			store
		});


		return this.excel.getRoot()
	}

	afterRender() {
		this.excel.init();
	}
	destroy() {
		this.excel.destroy();
		this.storeSub.unsubscribe();
	}
}