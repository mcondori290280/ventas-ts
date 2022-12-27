import { isAuthenticatedGuard } from '@/modules/auth/router/authGuard';
import appConfig from '@/app.config';

export default {
    name: 'system',
    component: () => import(/* webpackChunkName: "system" */ '@/modules/system/layouts/SystemLayout.vue'),
    children: [
        {
            path: '',
            name: 'main',
            component: () => import(/* webpackChunkName: "main" */ '@/modules/system/views/MainView.vue'),
            beforeEnter: isAuthenticatedGuard,
            meta: {
                title: appConfig.TITULO_SISTEMA + ' - Inicio',
            },
        },
    ],
};
