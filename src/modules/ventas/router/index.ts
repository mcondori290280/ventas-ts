import { isAuthenticatedGuard } from '@/modules/auth/router/authGuard';
import appConfig from '@/app.config';

import SystemLayout from '@/modules/system/layouts/SystemLayout.vue';
import CategoriasAdminView from '@/modules/ventas/views/CategoriasAdminView.vue';
import PresentacionesAdminView from '@/modules/ventas/views/PresentacionesAdminView.vue';
import MarcasAdminView from '@/modules/ventas/views/MarcasAdminView.vue';
import ProductosAdminView from '@/modules/ventas/views/ProductosAdminView.vue';
import ProductosStockAdminView from '@/modules/ventas/views/ProductosStockAdminView.vue';
import VentasEditarView from '@/modules/ventas/views/VentasEditarView.vue';

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
            component: PresentacionesAdminView,
            beforeEnter: isAuthenticatedGuard,
            meta: {
                title: appConfig.TITULO_SISTEMA + ' - Presentaciones',
                titleForm: 'Presentaciones'
            },
        },
        {
            path: '/marcas-admin',
            name: 'marcas-admin',
            component: MarcasAdminView,
            beforeEnter: isAuthenticatedGuard,
            meta: {
                title: appConfig.TITULO_SISTEMA + ' - Marcas',
                titleForm: 'Marcas'
            },
        },
        {
            path: '/productos-admin',
            name: 'productos-admin',
            component: ProductosAdminView,
            beforeEnter: isAuthenticatedGuard,
            meta: {
                title: appConfig.TITULO_SISTEMA + ' - Productos',
                titleForm: 'Productos'
            },
        },
        {
            path: '/productos-stock-admin',
            name: 'productos-stock-admin',
            component: ProductosStockAdminView,
            beforeEnter: isAuthenticatedGuard,
            meta: {
                title: appConfig.TITULO_SISTEMA + ' - Productos stock',
                titleForm: 'Productos stock'
            },
        },

        {
            path: '/ventas-editar',
            name: 'ventas-editar',
            component: VentasEditarView,
            beforeEnter: isAuthenticatedGuard,
            meta: {
                title: appConfig.TITULO_SISTEMA + ' - Ventas',
                titleForm: 'Ventas'
            },
        },
    ],
};
