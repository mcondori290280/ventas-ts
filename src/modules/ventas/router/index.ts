import { isAuthenticatedGuard } from '@/modules/auth/router/authGuard';
import appConfig from '@/app.config';

import SystemLayout from '@/modules/system/layouts/SystemLayout.vue';
import CategoriasAdminView from '@/modules/ventas/views/CategoriasAdminView.vue';
import PresentacionesAdminView from '@/modules/ventas/views/PresentacionesAdminView.vue';
import MarcasAdminView from '@/modules/ventas/views/MarcasAdminView.vue';
import ProductosAdminView from '@/modules/ventas/views/ProductosAdminView.vue';
import ProductosStockAdminView from '@/modules/ventas/views/ProductosStockAdminView.vue';
import VentasEditarView from '@/modules/ventas/views/VentasEditarView.vue';
import VentasAdminView from '@/modules/ventas/views/VentasAdminView.vue';
import ClientesAdminView from '@/modules/ventas/views/ClientesAdminView.vue';
import KardexAdminView from '@/modules/ventas/views/KardexAdminView.vue';
import ProveedoresAdminView from '@/modules/ventas/views/ProveedoresAdminView.vue';
import CompraEditarView from '@/modules/ventas/views/CompraEditarView.vue';

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
            path: '/clientes-admin',
            name: 'clientes-admin',
            component: ClientesAdminView,
            beforeEnter: isAuthenticatedGuard,
            meta: {
                title: appConfig.TITULO_SISTEMA + ' - Clientes',
                titleForm: 'Clientes'
            },
        },
        {
            path: '/ventas-editar',
            name: 'ventas-editar',
            component: VentasEditarView,
            beforeEnter: isAuthenticatedGuard,
            meta: {
                title: appConfig.TITULO_SISTEMA + ' - Realizar ventas',
                titleForm: 'Realizar venta'
            },
        },
        {
            path: '/ventas-admin',
            name: 'ventas-admin',
            component: VentasAdminView,
            beforeEnter: isAuthenticatedGuard,
            meta: {
                title: appConfig.TITULO_SISTEMA + ' - Consultar ventas',
                titleForm: 'Ventas'
            },
        },

        {
            path: '/kardex-admin',
            name: 'kardex-admin',
            component: KardexAdminView,
            beforeEnter: isAuthenticatedGuard,
            meta: {
                title: appConfig.TITULO_SISTEMA + ' - Kardex de productos',
                titleForm: 'Kardex de productos'
            },
        },

        {
            path: '/proveedores-admin',
            name: 'proveedores-admin',
            component: ProveedoresAdminView,
            beforeEnter: isAuthenticatedGuard,
            meta: {
                title: appConfig.TITULO_SISTEMA + ' - Proveedores',
                titleForm: 'Proveedores'
            },
        },
        {
            path: '/compra-editar',
            name: 'compra-editar',
            component: CompraEditarView,
            beforeEnter: isAuthenticatedGuard,
            meta: {
                title: appConfig.TITULO_SISTEMA + ' - Realizar compra',
                titleForm: 'Realizar compra'
            },
        },

    ],
};
