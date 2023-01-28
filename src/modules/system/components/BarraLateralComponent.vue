<template>
    <!-- BEGIN Left Aside -->
    <aside class="page-sidebar">
        <div
            class="page-logo"
            style=" background: linear-gradient(90deg, rgba(215, 215, 215, 1) 3px, rgba(255, 255, 255, 1) 32px);">
            <!-- <router-link
                :to="{ name: 'inicio' }"
                class="page-logo-link press-scale-down d-flex align-items-center"
                exact> -->
            <div class="page-logo-link press-scale-down d-flex align-items-center">
                <img
                    src="/assets/img/logo-imagen.png"
                    alt="SmartAdmin WebApp"
                    style="height:60px"
                    @click="clickLogoMovil()" />
                <span class="page-logo-text">
                    <img
                        src="/assets/img/logo-letras.png"
                        alt="SmartAdmin WebApp"
                        style="height:50px; margin-left:-10px"
                        @click="clickLogoMovil()" />
                </span>
            </div>
            <!-- </router-link> -->
        </div>
        <!-- BEGIN PRIMARY NAVIGATION -->
        <nav id="js-primary-nav" class="primary-nav" role="navigation">
            <ul id="js-nav-menu" class="nav-menu">
                <li class="nav-title">Sistema de Ventas</li>
                <li id="acceso-menu-almacen" class="acceso-menu">
                    <a
                        href="javascript:void(0)"
                        title="Almacén">
                        <i class="fal fa-archive"></i>
                        <span class="nav-link-text" data-i18n="nav.application_intel">
                            Almacén
                        </span>
                    </a>
                    <ul>
                        <li id="menu-item-10">
                            <a
                                href="javascript:void(0)"
                                title="Gestión de categorías de productos"
                                @click="
                                    seHizoClickEnOpcion(
                                        'acceso-menu-almacen',
                                        'menu-item-10',
                                        'categorias-admin'
                                    )
                                ">
                                <span class="nav-link-text">Categorías</span>
                            </a>
                        </li>
                        <li id="menu-item-11">
                            <a
                                href="javascript:void(0)"
                                title="Gestión de presentaciones"
                                @click="
                                    seHizoClickEnOpcion(
                                        'acceso-menu-almacen',
                                        'menu-item-11',
                                        'presentaciones-admin'
                                    )
                                ">
                                <span class="nav-link-text">Presentaciones</span>
                            </a>
                        </li>
                        <li id="menu-item-12">
                            <a
                                href="javascript:void(0)"
                                title="Gestión de marcas"
                                @click="
                                    seHizoClickEnOpcion(
                                        'acceso-menu-almacen',
                                        'menu-item-12',
                                        'marcas-admin'
                                    )
                                ">
                                <span class="nav-link-text">Marcas</span>
                            </a>
                        </li>
                        <li id="menu-item-13">
                            <a
                                href="javascript:void(0)"
                                title="Gestión productos"
                                @click="
                                    seHizoClickEnOpcion(
                                        'acceso-menu-almacen',
                                        'menu-item-13',
                                        'productos-admin'
                                    )
                                ">
                                <span class="nav-link-text">Productos</span>
                            </a>
                        </li>
                        <li id="menu-item-14">
                            <a
                                href="javascript:void(0)"
                                title="Gestión stock de productos"
                                @click="
                                    seHizoClickEnOpcion(
                                        'acceso-menu-almacen',
                                        'menu-item-14',
                                        'productos-stock-admin'
                                    )
                                ">
                                <span class="nav-link-text">Stock Productos</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li id="acceso-menu-ventas" class="acceso-menu">
                    <a
                        href="javascript:void(0)"
                        title="Ventas">
                        <i class="fal fa-shopping-cart"></i>
                        <span class="nav-link-text" data-i18n="nav.application_intel">
                            Ventas
                        </span>
                    </a>
                    <ul>
                        <li id="menu-item-21">
                            <a
                                href="javascript:void(0)"
                                title="Clientes"
                                @click="
                                    seHizoClickEnOpcion(
                                        'acceso-menu-ventas',
                                        'menu-item-21',
                                        'clientes-admin'
                                    )
                                ">
                                <span class="nav-link-text">Clientes</span>
                            </a>
                        </li>
                        <li id="menu-item-22">
                            <a
                                href="javascript:void(0)"
                                title="Realizar ventas"
                                @click="
                                    seHizoClickEnOpcion(
                                        'acceso-menu-ventas',
                                        'menu-item-22',
                                        'ventas-editar'
                                    )
                                ">
                                <span class="nav-link-text">Realizar Ventas</span>
                            </a>
                        </li>
                        <li id="menu-item-23">
                            <a
                                href="javascript:void(0)"
                                title="Consultar ventas"
                                @click="
                                    seHizoClickEnOpcion(
                                        'acceso-menu-ventas',
                                        'menu-item-23',
                                        'ventas-admin'
                                    )
                                ">
                                <span class="nav-link-text">Consultar Ventas</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li id="acceso-menu-inventario" class="acceso-menu">
                    <a
                        href="javascript:void(0)"
                        title="Inventario">
                        <i class="fal fa-th-large"></i>
                        <span class="nav-link-text" data-i18n="nav.application_intel">
                            Inventario
                        </span>
                    </a>
                    <ul>
                        <li id="menu-item-31">
                            <a
                                href="javascript:void(0)"
                                title="Kadex"
                                @click="
                                    seHizoClickEnOpcion(
                                        'acceso-menu-inventario',
                                        'menu-item-31',
                                        'kardex-admin'
                                    )
                                ">
                                <span class="nav-link-text">Kardex</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li id="acceso-menu-compras" class="acceso-menu">
                    <a
                        href="javascript:void(0)"
                        title="Compras">
                        <i class="fal fa-truck"></i>
                        <span class="nav-link-text" data-i18n="nav.application_intel">
                            Compras
                        </span>
                    </a>
                    <ul>
                        <li id="menu-item-41">
                            <a
                                href="javascript:void(0)"
                                title="Proveedores"
                                @click="
                                    seHizoClickEnOpcion(
                                        'acceso-menu-compras',
                                        'menu-item-41',
                                        'proveedores-admin'
                                    )
                                ">
                                <span class="nav-link-text">Proveedores</span>
                            </a>
                        </li>
                        <li id="menu-item-42">
                            <a
                                href="javascript:void(0)"
                                title="Realizar Compra"
                                @click="
                                    seHizoClickEnOpcion(
                                        'acceso-menu-compras',
                                        'menu-item-42',
                                        'compra-editar'
                                    )
                                ">
                                <span class="nav-link-text">Realizar Compra</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="filter-message js-filter-message bg-success-600"></div>
        </nav>
        <!-- END PRIMARY NAVIGATION -->
    </aside>
    <!-- END Left Aside -->
</template>

<script>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import useAuth from '@/modules/auth/composables/useAuth';

import $ from 'jquery';

export default {
    setup() {
        const router = useRouter();
        const { accesos } = useAuth();

        onMounted(() => {
            // eslint-disable-next-line
            initApp.buildNavigation('#js-primary-nav');

            // Si existe el último acceso del manú almacenado en la sessionStore, asignamos
            // la misma al menú.
            if (sessionStorage.getItem('acceso-menu')) {
                $('li.acceso-menu').removeClass('active');
                $('#' + sessionStorage.getItem('acceso-menu')).addClass('open active');
            } else {
                router.push({ name: 'inicio' });
            }

            if (sessionStorage.getItem('menu-item')) {
                $('#' + sessionStorage.getItem('menu-item')).addClass('active');
            } else {
                router.push({ name: 'inicio' });
            }
        });

        const clickLogoMovil = () => {
            // Escondemos la Sidebar en modo móvil.
            $('body').removeClass('mobile-nav-on');
        };

        const seHizoClickEnOpcion = (acceso, item, route/*, idKey*/) => {
            // Removemos la clase active de los link <a>
            route = route.toString().replace('/', '');

            for (let i = 0; i < 200; i++) {
                $('#menu-item-' + i.toString()).removeClass(
                '   active'
                );
            }

            $('li.acceso-menu').removeClass('active');
            $('#' + acceso).addClass('active');
            $('#' + item).addClass('active');

            sessionStorage.setItem('acceso-menu', acceso);
            sessionStorage.setItem('menu-item', item);

            // Escondemos la Sidebar en modo móvil.
            $('body').removeClass('mobile-nav-on');

            router.push({ name: route });
        };

        return {
            clickLogoMovil,
            seHizoClickEnOpcion,
            accesos,
        };
    },
};
</script>