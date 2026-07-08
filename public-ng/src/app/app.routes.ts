import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { authGuard } from './core/auth.guard';
import { List } from './components/event/list/list';
import { Detail } from './components/event/detail/detail';
import { AdminPersonList } from './components/admin/admin-person-list/admin-person-list';
import { listResolver } from './core/resolver/list.resolver';
import { eventDetailResolver } from './core/resolver/event.resolver';
import { AdminPersonListResolver } from './core/resolver/admin-person-list.resolver';
import { AdminPersonEdit } from './components/admin/admin-person-edit/admin-person-edit';
import { adminPersonEditResolver } from './core/resolver/admin-person-edit.resolver';
import { AdminJob } from './components/admin/admin-job/admin-job';
import { adminJobResolver } from './core/resolver/admin-job.resolver';
import { AdminFormulas } from './components/admin/admin-formulas/admin-formulas';


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
  {
    path: 'admin/person/list',
    component: AdminPersonList,
    canActivate: [authGuard],    
    resolve: {data: AdminPersonListResolver},
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'admin/person/edit/:id',
    component: AdminPersonEdit,
    canActivate: [authGuard],
    resolve: {data: adminPersonEditResolver},
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'admin/job',
    component: AdminJob,
    canActivate: [authGuard],
    resolve: {data: adminJobResolver},
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'admin/formulas',
    component: AdminFormulas,
    canActivate: [authGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'event/view/:id',
    component: Detail,
    canActivate: [authGuard],
    resolve: {data: eventDetailResolver},
    runGuardsAndResolvers: 'always',
    data: {mode: 'view'}
  },
  {
    path: 'event/edit/:id',
    component: Detail,
    canActivate: [authGuard],
    resolve: {data: eventDetailResolver},
    runGuardsAndResolvers: 'always',
    data: {mode: 'edit'}
  },
];
