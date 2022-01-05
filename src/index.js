import { Excel } from './components/excel/Excel';
import { Header } from './components/Header/Header';
import { Toolbar } from './components/Toolbar/Toolbar';
import { Formula } from './components/Formula/Formula';
import { Table } from './components/Table/Table';
import { createStore } from './core/createStore';
import { rootReducer } from './store/rootReducer';
import './styles/index.scss';
import { debounce, storage } from './core/utils';
import { initialState } from './store/initialState';

const store = createStore(rootReducer, initialState)
/*
Subscribing on store
*/
const stateListener = debounce(state => {
	// console.log(`Application state was updated = `, state)
	storage('excel-state', state);
}, 300);
store.subscribe(stateListener);

const app = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
	store
});

app.render();
