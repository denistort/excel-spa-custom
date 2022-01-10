import { Router } from "./core/Router/Router";
import { DashboardPage } from "./Pages/Dashboard";
import { ExcelPage } from "./Pages/ExcelPage";
import './styles/index.scss';

new Router('#app', {
	dashboard: DashboardPage,
	excel: ExcelPage
});