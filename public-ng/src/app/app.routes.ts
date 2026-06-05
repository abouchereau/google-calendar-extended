import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { authGuard } from './core/auth.guard';
import { List } from './components/list/list';
import { listResolver } from './core/resolver/event.resolver';


export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: '',
    component: List,
    canActivate: [authGuard],
    resolve: {data: listResolver},
    runGuardsAndResolvers: 'always'
  },
];
