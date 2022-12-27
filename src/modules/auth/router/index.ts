import { isNotAuthenticatedGuard, isAuthenticatedGuard } from '@/modules/auth/router/authGuard';
import appConfig from '@/app.config';

export default {
    name: 'auth',
    component: () => import(/* webpackChunkName: "auth" */ '@/modules/auth/layouts/AuthLayout.vue'),
    children: [
        {
            path: '',
            name: 'login',
            component: () => import(/* webpackChunkName: "login" */ '@/modules/auth/views/LoginView.vue'),
            beforeEnter: isNotAuthenticatedGuard,
            meta: {
                title: appConfig.TITULO_SISTEMA + ' - Inicio de sesión',
            },
        },
        {
            path: '/forgot-your-password',
            name: 'forgot-your-password',
            component: () => import(/* webpackChunkName: "forgot-your-password" */ '@/modules/auth/views/ForgotYourPasswordView.vue'),
            beforeEnter: isNotAuthenticatedGuard,
            meta: {
                title: appConfig.TITULO_SISTEMA + ' - Restablecer contraseña',
            },
        },
        {
            path: '/regional-module',
            name: 'regional-module',
            component: () => import(/* webpackChunkName: "regional-module" */ '@/modules/auth/views/RegionalModuleView.vue'),
            beforeEnter: isAuthenticatedGuard,
            meta: {
                title: appConfig.TITULO_SISTEMA + ' - Regional y Módulo',
            },
        },
        {
            path: '/modificar-password/:tipo',
            name: 'modificar-password',
            component: () => import(/* webpackChunkName: "modificar-password" */ '@/modules/auth/views/ModificarPasswordView.vue'),
            beforeEnter: isAuthenticatedGuard,
            meta: {
                title: appConfig.TITULO_SISTEMA + ' - Modificar Contraseña',
            },
        },
        {
            path: '/reestablecer-contrasena/:enlace',
            name: 'reestablecer-contrasena',
            component: () => import(/* webpackChunkName: "reestablecer-contrasena" */ '@/modules/auth/views/ModificarPasswordView.vue'),
            beforeEnter: isNotAuthenticatedGuard,
            meta: {
                title: appConfig.TITULO_SISTEMA + ' - Reestablecer contraseña ',
            },
        },
    ],
};
