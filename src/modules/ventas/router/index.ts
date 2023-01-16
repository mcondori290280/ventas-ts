import { isAuthenticatedGuard } from '@/modules/auth/router/authGuard';
import appConfig from '@/app.config';

import SystemLayout from '@/modules/system/layouts/SystemLayout.vue';
import CategoriasAdminView from '@/modules/ventas/views/CategoriasAdminView.vue';

export default {
    name: 'ventas',
    component: SystemLayout,
    children: [
        {
            path: '/categorias-admin',
            name: 'categorias-admin',
            component: CategoriasAdminView,
            beforeEnter: isAuthenticatedGuard,
            meta: {
                title: appConfig.TITULO_SISTEMA + ' - Categorías',
                titleForm: 'Categorías'
            },
        },
        {
            path: '/presentaciones-admin',
            name: 'presentaciones-admin',
            component: CategoriasAdminView,
            beforeEnter: isAuthenticatedGuard,
            meta: {
                title: appConfig.TITULO_SISTEMA + ' - Presentaciones',
                titleForm: 'Presentaciones'
            },
        },
        {
            path: '/marcas-admin',
            name: 'marcas-admin',
            component: CategoriasAdminView,
            beforeEnter: isAuthenticatedGuard,
            meta: {
                title: appConfig.TITULO_SISTEMA + ' - Marcas',
                titleForm: 'Marcas'
            },
        },
        {
            path: '/productos-admin',
            name: 'productos-admin',
            component: CategoriasAdminView,
            beforeEnter: isAuthenticatedGuard,
            meta: {
                title: appConfig.TITULO_SISTEMA + ' - Productos',
                titleForm: 'Productos'
            },
        },
    ],
};
