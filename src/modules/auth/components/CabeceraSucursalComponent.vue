<template>
    <div>
        <!-- BEGIN Page Header -->
        <header class="page-header ml-0"
                role="banner">
            <!-- we need this logo when user switches to nav-function-top -->
            <div class="pl-0 bg-white page-logo-link press-scale-down d-flex align-items-center">
                <img src="/assets/img/logo-imagen.png"
                        alt="MarketBo"
                        style="height:60px;">
                <span class="page-logo-text mr-1">
                    <img src="/assets/img/logo-letras.png"
                            alt="MarketBo"
                            style="height:50px;margin-left:-10px;">
                </span>
            </div>

            <div class="ml-auto d-flex" v-if="mostrarOpcionesUsuarioCabecera">

                <!-- app user menu -->
                <div id="app-user-menu">
                    <a href="javascript:void(0)"
                       data-toggle="dropdown"
                       :title="email"
                       class="header-icon d-flex align-items-center justify-content-center ml-2">
                        <!-- <img src="/assets/img/demo/avatars/avatar-admin.png"
                             class="profile-image rounded-circle"
                             :alt="fullNameUser"> -->
                        <img src="/assets/img/demo/avatars/default.png"
                             class="profile-image rounded-circle"
                             :alt="fullNameUser">
                    </a>
                    <div class="dropdown-menu dropdown-menu-animated dropdown-lg">
                        <div class="dropdown-header bg-trans-gradient d-flex flex-row py-4 rounded-top">
                            <div class="d-flex flex-row align-items-center mt-1 mb-1 color-white">
                                <span class="mr-2">
                                    <!-- <img src="/assets/img/demo/avatars/avatar-admin.png"
                                         class="rounded-circle profile-image"
                                         :alt="fullNameUser"> -->
                                    <img src="/assets/img/demo/avatars/default.png"
                                         class="rounded-circle profile-image"
                                         :alt="fullNameUser">
                                </span>
                                <div class="info-card-text">
                                    <div class="fs-lg text-truncate text-truncate-lg">{{ fullNameUser }}</div>
                                    <span class="text-truncate text-truncate-md opacity-80">{{ email }}</span>
                                </div>
                            </div>
                        </div>
                        <a class="dropdown-item fw-500 pt-3 pb-3"
                           href="javascript:void(0)"
                           @click="cerrarSesion">
                            <span data-i18n="drpdwn.page-logout">Cerrar sesión</span>
                        </a>
                    </div>
                </div>
            </div>
        </header>
        <!-- END Page Header -->
    </div>
</template>

<script>
import { ref } from 'vue';
import useAuth from '../composables/useAuth';
import { useRouter } from 'vue-router';

export default {
    props: {
        mostrarOpcionesUsuario: {
            type: Boolean,
            default: true
        }
    },
    setup(props) {
        const router = useRouter();

        const mostrarOpcionesUsuarioCabecera = ref(props.mostrarOpcionesUsuario);

        const { email, fullNameUser, logout } = useAuth();

        return {
            email,
            fullNameUser,
            mostrarOpcionesUsuarioCabecera,

            cerrarSesion: () => {
                router.push({ name: 'login' });
                logout();
            },
        };
    }
}
</script>

<style scoped>
@media (min-width: 992px) {
    .nav-function-top .page-header {
        margin-top: 0;
        height: 4.125rem;
        background-image: none;
        background-image: none;
        background-color: #fff;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        -webkit-box-shadow: 0px 0px 14px 0px rgb(86 61 124 / 13%);
        box-shadow: 0px 0px 14px 0px rgb(86 61 124 / 13%);
    }
}
</style>