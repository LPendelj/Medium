import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'register',
        loadChildren: () => import('./auth/auth.routes').then(m => m.registerRoutes)
    },
    {
        path: 'login',
        loadChildren: () => import('./auth/auth.routes').then(m => m.loginRoutes)
    },
    {
        path: '',
        loadChildren: () => import('./globalFeed/globalFeed.routes').then(m => m.feedRoutes)
    },
    {
        path: 'feed',
        loadChildren: () => import('./yourFeed/yourFeed.routes').then(m => m.feedRoutes)
    },
    {
        path: 'articles/new',
        loadChildren: () => import('./createArticle/create-article.routes').then(m => m.routes)
    },
    {
        path: 'articles/:slug',
        loadChildren: () => import('./article/article.routes').then(m => m.articleRoutes)
    },
    {
        path: 'articles/:slug/edit',
        loadChildren: () => import('./editArticle/edit-article.routes').then(m => m.routes)
    }
];
