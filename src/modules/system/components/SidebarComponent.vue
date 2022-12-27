<template>
    <!-- BEGIN Left Aside -->
    <aside class="page-sidebar">
        <div
            class="page-logo"
            style=" background: linear-gradient(90deg, rgba(215, 215, 215, 1) 3px, rgba(255, 255, 255, 1) 32px);">
            <!-- <a href="javascript:void(0)" class="page-logo-link press-scale-down d-flex align-items-center" data-toggle="modal" data-target="#modal-shortcut">
                    <img src="/assets/img/logo.png" alt="SmartAdmin WebApp" aria-roledescription="logo">
                    <span class="page-logo-text mr-1">SmartAdmin WebAppv</span>
                    <i class="fal fa-angle-down d-inline-block ml-1 fs-lg color-primary-300"></i>
                </a> -->
            <router-link
                :to="{ name: 'main' }"
                class="page-logo-link press-scale-down d-flex align-items-center"
                exact>
                <!-- <img src="/assets/img/logo.png"
                            alt="SmartAdmin WebApp">
                        <span class="page-logo-text mr-1">CSBP</span>
                        <i class="fal d-inline-block ml-1 fs-lg color-primary-300"></i> -->
                <img
                    src="/assets/img/logo2020.png"
                    alt="SmartAdmin WebApp"
                    style="height: 50px"
                    @click="clickLogoMovil()" />
                <span class="page-logo-text ml-3">
                    <img
                        src="/assets/img/logo2020letras.png"
                        alt="SmartAdmin WebApp"
                        style="height: 25px; margin-left: 10px"
                        @click="clickLogoMovil()" />
                </span>
            </router-link>
        </div>
        <!-- BEGIN PRIMARY NAVIGATION -->
        <nav id="js-primary-nav" class="primary-nav" role="navigation">
        <!-- <div class="nav-filter">
                    <div class="position-relative">
                        <input type="text" id="nav_filter_input" placeholder="Filter menu" class="form-control" tabindex="0">
                        <a href="javascript:void(0)" onclick="return false;" class="btn-primary btn-search-close js-waves-off" data-action="toggle" data-class="list-filter-active" data-target=".page-sidebar">
                            <i class="fal fa-chevron-up"></i>
                        </a>
                    </div>
                </div> -->

            <ul id="js-nav-menu" class="nav-menu">
                <template v-for="acceso in accesos" :key="acceso.IdRolFormularioWeb">
                    <li class="nav-title">
                        {{ acceso.titulo }}
                    </li>
                    <template
                        v-for="hijo in acceso.Children"
                        :key="hijo.IdRolFormularioWeb">
                        <li
                            :id="`acceso_menu_${acceso.IdRolFormularioWeb}`"
                            class="acceso-menu">
                            <a
                                href="javascript:void(0)"
                                :title="`${hijo.titulo}`"
                                :data-filter-tags="`${hijo.titulo}`">
                                <i :class="`${hijo.classIcon}`"></i>
                                <span class="nav-link-text" data-i18n="nav.application_intel">{{
                                hijo.titulo
                                }}</span>
                            </a>
                            <ul>
                                <template
                                    v-for="(nieto, index) in hijo.Children"
                                    :key="nieto.IdRolFormularioWeb">
                                    <li :id="`menu-item-${acceso.IdRolFormularioWeb}-${index}`">
                                            <a
                                                href="javascript:void(0)"
                                                :title="`${nieto.titulo}`"
                                                @click="
                                                    seHizoClickEnOpcion(
                                                    `acceso_menu_${acceso.IdRolFormularioWeb}`,
                                                    `menu-item-${acceso.IdRolFormularioWeb}-${index}`,
                                                    nieto.url,
                                                    `${acceso.IdRolFormularioWeb}`
                                                    )">
                                                <span class="nav-link-text">{{ nieto.titulo }}</span>
                                            </a>
                                    </li>
                                </template>
                            </ul>
                        </li>
                    </template>
                </template>

                <!--
                <li class="nav-title">Facturación Electrónica</li>
                <li id="acceso_menu_seguimiento_pacientes" class="acceso-menu">
                <a
                    href="javascript:void(0)"
                    title="Application Intel"
                    data-filter-tags="application intel"
                >
                    <i class="fal fa-info-circle"></i>
                    <span class="nav-link-text" data-i18n="nav.application_intel"
                    >Facturación</span
                    >
                </a>
                <ul>
                    <li id="menu-item-0">
                    <a
                        href="javascript:void(0)"
                        title="Ventas"
                        @click="
                        seHizoClickEnOpcion(
                            'acceso_menu_seguimiento_pacientes',
                            'menu-item-0',
                            'ventas-admin'
                        )
                        "
                    >
                        <span class="nav-link-text">Ventas</span>
                    </a>
                    </li>
                    <li id="menu-item-1">
                    <a
                        href="javascript:void(0)"
                        title="Eventos"
                        @click="
                        seHizoClickEnOpcion(
                            'acceso_menu_seguimiento_pacientes',
                            'menu-item-1',
                            'eventos-admin'
                        )
                        "
                    >
                        <span class="nav-link-text">Eventos</span>
                    </a>
                    </li>
                    <li id="menu-item-2">
                    <a
                        href="javascript:void(0)"
                        title="Clientes"
                        @click="
                        seHizoClickEnOpcion(
                            'acceso_menu_seguimiento_pacientes',
                            'menu-item-2',
                            'clientes-admin'
                        )
                        "
                    >
                        <span class="nav-link-text">Clientes</span>
                    </a>
                    </li>
                    <li id="menu-item-3">
                    <a
                        href="javascript:void(0)"
                        title="Productos"
                        @click="
                        seHizoClickEnOpcion(
                            'acceso_menu_seguimiento_pacientes',
                            'menu-item-3',
                            'productos-admin'
                        )
                        "
                    >
                        <span class="nav-link-text">Productos</span>
                    </a>
                    </li>
                    <li id="menu-item-4">
                    <a
                        href="javascript:void(0)"
                        title="Sucursales"
                        @click="
                        seHizoClickEnOpcion(
                            'acceso_menu_seguimiento_pacientes',
                            'menu-item-4',
                            'sucursales-admin'
                        )
                        "
                    >
                        <span class="nav-link-text">Sucursales</span>
                    </a>
                    </li>
                </ul>
                </li>
                -->
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
                router.push({ name: 'main' });
            }

            if (sessionStorage.getItem('menu-item')) {
                $('#' + sessionStorage.getItem('menu-item')).addClass('active');
            } else {
                router.push({ name: 'main' });
            }
        });

        const clickLogoMovil = () => {
            // Escondemos la Sidebar en modo móvil.
            $('body').removeClass('mobile-nav-on');
        };

        const seHizoClickEnOpcion = (acceso, item, route, idKey) => {
            // Removemos la clase active de los link <a>
            route = route.toString().replace('/', '');

            for (let i = 0; i < 200; i++) {
                $('#menu-item-' + idKey.toString() + '-' + i.toString()).removeClass(
                'active'
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