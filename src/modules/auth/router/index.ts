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
            path: '/olvidaste-tu-contrasena',
            name: 'olvidaste-tu-contrasena',
            component: () => import(/* webpackChunkName: "olvidaste-tu-contrasena" */ '@/modules/auth/views/OlvidasteTuContrasenaView.vue'),
            beforeEnter: isNotAuthenticatedGuard,
            meta: {
                title: appConfig.TITULO_SISTEMA + ' - Restablecer contraseña',
            },
        },
        {
            path: '/seleccionar-sucursal',
            name: 'seleccionar-sucursal',
            component: () => import(/* webpackChunkName: "seleccionar-sucursal" */ '@/modules/auth/views/SeleccionarSucursalView.vue'),
            beforeEnter: isAuthenticatedGuard,
            meta: {
                title: appConfig.TITULO_SISTEMA + ' - Sucursal',
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
