import { Routes } from '@angular/router';
import { SectionDashboard } from './pages/dashboard/dashboard';
import { SectionAbout } from './pages/about/about';
import { PageLogin } from './pages/login/login';
import { PageNotFound } from './pages/not-found/not-found';
import { Layout } from './layout';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: "full" },
  {
    path: '',
    component: Layout,
    children: [
      { path: 'dashboard/about', component: SectionAbout },
      { path: 'dashboard/:id', component: SectionDashboard },
      { path: 'dashboard', component: SectionDashboard }
    ]
  },
  { path: 'login', component: PageLogin },
  { path: '**', component: PageNotFound }
];
