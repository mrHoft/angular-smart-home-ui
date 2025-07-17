import { Routes } from '@angular/router';
import { PageDashboard } from './pages/dashboard/dashboard';
import { PageAbout } from './pages/about/about';
import { PageNotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: "full" },
  { path: 'dashboard', component: PageDashboard },
  { path: 'about', component: PageAbout },
  { path: '**', component: PageNotFound }
];
