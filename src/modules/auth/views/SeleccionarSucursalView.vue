<template>
    <div class="page-wrapper p-0">
        <div class="page-inner">
            <div class="page-content-wrapper p-0">
                <header-cucursal-component />

                <main id="js-page-content" role="main" class="page-content">
                    <div class="row justify-content-center">
                        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div class="subheader">
                                <h1 class="subheader-title">
                                    <i class="subheader-icon fal fa-box-check"></i>Sucursal
                                    <small> Seleccione Sucursal </small>
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div id="panel-1" class="panel">
                                <div class="panel-hdr">
                                    <h2>
                                        Sucursales <span class="fw-300"><i>Seleccione</i></span>&nbsp;
                                    </h2>
                                </div>
                                <div class="panel-container show">
                                    <div class="panel-content">
                                        <div class="frame-wrap">
                                            <div class="demo">
                                                <div class="list-group">
                                                    <a
                                                        v-for="(sucursal, index) in sucursales"
                                                        :key="index"
                                                        href="javascript:void(0)"
                                                        class="list-group-item list-group-item-action border-0"
                                                        :class="{ 'font-weight-bold': payload.id_sucursal === sucursal.id_sucursal }"
                                                        @click="obtenerSucursalesCargar(sucursal.id_sucursal)">
                                                        <i
                                                            class='fal fa-check-circle mr-2'
                                                            :class="{ 'font-weight-bold': payload.id_sucursal === sucursal.id_sucursal }"></i>
                                                        {{ sucursal.ciudad }} - {{ sucursal.zona }} - {{ sucursal.direccion }}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <!-- this overlay is activated only when mobile menu is triggered -->
                <div
                    class="page-content-overlay"
                    data-action="toggle"
                    data-class="mobile-nav-on"></div>
                <!-- END Page Content -->

                <footer-component />
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { ref, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import useAuth from '../composables/useAuth';

export default {
    components: {
        HeaderCucursalComponent: defineAsyncComponent(() => import('../components/HeaderSucursalComponent.vue')),
        FooterComponent: defineAsyncComponent(() => import('../components/FooterComponent.vue')),
    },
    setup() {
        const router = useRouter();
        const store = useStore();

        const { obtenerSucursales } = useAuth();

        const sucursales = ref<any>([]);
        const payload = ref({
            id_sucursal: 0,
            sucursal: '',
            unica_sucursal: false,
        });

        sessionStorage.removeItem('acceso-menu');
        sessionStorage.removeItem('menu-item');

        const obtenerSucursalesCargar = async (id_sucursal: number) => {
            if (sucursales.value.length === 0) {
                sucursales.value = await obtenerSucursales();
                if (sucursales.value.length === 0) {
                    return;
                }

                if (sucursales.value.length === 1) {
                    payload.value.id_sucursal = sucursales.value[0].id_sucursal;
                    payload.value.sucursal = (sucursales.value[0].ciudad
                        + ' - ' + sucursales.value[0].zona
                        + ' - ' + sucursales.value[0].direccion).toString();
                    payload.value.unica_sucursal = sucursales.value.length === 1;

                    store.commit('auth/setSucursal', payload.value);

                    router.push({ name: 'main' });
                } else if (store.getters['auth/getIdSucursal'] !== 0) {
                    payload.value.id_sucursal = store.getters['auth/getIdSucursal'];
                }
            } else {
                payload.value.id_sucursal = id_sucursal;
                payload.value.sucursal = sucursales.value.filter((sucursal: any) => sucursal.id_sucursal == payload.value.id_sucursal)[0].ciudad
                    + ' - ' + sucursales.value.filter((sucursal: any) => sucursal.id_sucursal == payload.value.id_sucursal)[0].zona
                    + ' - ' + sucursales.value.filter((sucursal: any) => sucursal.id_sucursal == payload.value.id_sucursal)[0].direccion;
                payload.value.unica_sucursal = sucursales.value.length === 1;

                store.commit('auth/setSucursal', payload.value);

                router.push({ name: 'main' });
            }
        };

        obtenerSucursalesCargar(store.getters['auth/getIdSucursal']);

        return {
            payload,
            sucursales,

            obtenerSucursalesCargar,
        };
    }
}
</script>