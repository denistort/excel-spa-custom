import { Excel } from './components/excel/Excel';
import { Header } from './components/Header/Header';
import { Toolbar } from './components/Toolbar/Toolbar';
import { Formula } from './components/Formula/Formula';
import { Table } from './components/Table/Table';
import './styles/index.scss';

const app = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table]
});

app.render();
