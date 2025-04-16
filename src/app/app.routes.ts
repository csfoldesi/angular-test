import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.component'),
  },
  {
    path: 'courses',
    loadComponent: () => import('./courses/courses.component'),
  },
  {
    path: 'course/:id',
    loadComponent: () => import('./course/course.component'),
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login.component'),
  },
  {
    path: 'blog',
    loadComponent: () => import('./blog/blog.component'),
  },
  {
    path: 'images',
    loadComponent: () => import('./images/images.component'),
  },
  {
    path: 'reddit',
    loadComponent: () => import('./reddit/reddit.component'),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
