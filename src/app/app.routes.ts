import { Routes } from '@angular/router';
import { SectionDashboard } from './pages/dashboard/dashboard';
import { SectionAbout } from './pages/about/about';
import { PageLogin } from './pages/login/login';
import { PageNotFound } from './pages/not-found/not-found';
import { Layout } from './layout';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: "full" },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard/about', component: SectionAbout },
      { path: 'dashboard/:id', component: SectionDashboard },
      { path: 'dashboard', component: SectionDashboard }
    ]
  },
  { path: 'login', component: PageLogin },
  { path: '**', component: PageNotFound }
];
