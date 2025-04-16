import { Routes } from '@angular/router';
import { FrameworksPage } from './pages/frameworks/frameworks.page';
import { ZooiPage } from './pages/zooi/zooi.page';
import { AndereFrameworksPage } from './pages/andere-frameworks/andere-frameworks.page';

export const routes: Routes = [
	{ path: 'frameworks', component: FrameworksPage },
	{ path: 'andere-frameworks', component: AndereFrameworksPage },
	{ path: 'zooi/:id', component: ZooiPage },
	{ path: '', redirectTo: '/frameworks', pathMatch: 'full' },
];
