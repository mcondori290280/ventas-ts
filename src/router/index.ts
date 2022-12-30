import { createRouter, createWebHashHistory } from "vue-router";

import { isNotAuthenticatedGuard } from '@/modules/auth/router/authGuard';
import authRouter from '@/modules/auth/router';
import systemRouter from '@/modules/system/router';
import appConfig from '../app.config';

const routes = [
    {
        path: '/auth',
        ...authRouter,
    },
    {
        path: '/system',
        ...systemRouter,
    },
    {
        path: '',
        redirect: '/auth'
    },
    {
        path: '/404',
        name: 'no-encontrado',
        component: () => import(/* webpackChunkName: "not-found" */'@/modules/auth/views/NoEncontradoView.vue'),
        beforeEnter: isNotAuthenticatedGuard,
        meta: {
            title: appConfig.TITULO_SISTEMA + ' - Página no encontrada',
        },
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/404',
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;