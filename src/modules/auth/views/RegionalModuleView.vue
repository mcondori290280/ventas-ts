<template>
    <div class="page-wrapper p-0">
        <div class="page-inner">
            <div class="page-content-wrapper p-0">
                <header-regional-modulo-component />

                <main id="js-page-content" role="main" class="page-content">
                    <div class="subheader">
                        <h1 class="subheader-title">
                            <i class="subheader-icon fal fa-box-check"></i>Regional - Módulo
                            <small> Seleccione Regional y Módulo </small>
                        </h1>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div id="panel-1" class="panel">
                                <div class="panel-hdr">
                                    <h2>
                                        Regionales <span class="fw-300"><i>Seleccione</i></span>&nbsp;
                                    </h2>
                                </div>
                                <div class="panel-container show">
                                    <div class="panel-content">
                                        <div class="frame-wrap">
                                            <div class="demo">
                                                <div
                                                    class="custom-control custom-switch"
                                                    v-for="(regional, index) in regionales"
                                                    :key="index">
                                                    <input
                                                        type="radio"
                                                        class="custom-control-input"
                                                        :id="regional.NombreRegional"
                                                        name="id_regional"
                                                        v-model="payload.id_regional"
                                                        :value="regional.IdRegional"
                                                        @change="obtenerRegionalesCargar"/>
                                                    <label
                                                        class="custom-control-label cursor-pointer"
                                                        :for="regional.NombreRegional"
                                                        >{{ regional.NombreRegional }}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-8">
                            <div
                                id="panel-modulos-administrativos"
                                class="panel"
                                v-if="modulosAdministrativos.length > 0">
                                <div class="panel-hdr">
                                    <h2>
                                        Módulos Administrativos<span class="fw-300"><i>Seleccione</i></span>
                                    </h2>
                                </div>
                                <div class="panel-container show">
                                    <div class="panel-content">
                                        <div class="row">
                                            <div
                                                class="col-sm-6 col-xl-3"
                                                v-for="(modulo, index) in modulosAdministrativos"
                                                :key="index">
                                                <div
                                                    class="p-3 rounded overflow-hidden position-relative text-white mb-g cursor-pointer"
                                                    style="height: 110px"
                                                    :class="colores[modulo.IdSistema - 1]"
                                                    @click="moduloSeleccionado(modulo)">
                                                    <div class="">
                                                        <h3
                                                            class="display-4 d-block l-h-n m-0 fw-500"
                                                            style="font-size: 18px">
                                                            {{ modulo.NombreSistema.toUpperCase() }}
                                                        </h3>
                                                    </div>
                                                    <i
                                                        class="position-absolute pos-bottom opacity-30"
                                                        :class="modulo.Imagen"
                                                        style="font-size: 6rem; right: 18px"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                id="panel-modulos-medicos"
                                class="panel"
                                v-if="modulosMedicos.length > 0">
                                <div class="panel-hdr">
                                    <h2>
                                        Módulos Médicos<span class="fw-300"><i>Seleccione</i></span>
                                    </h2>
                                </div>
                                <div class="panel-container show">
                                    <div class="panel-content">
                                        <div class="row">
                                            <div
                                                class="col-sm-6 col-xl-3"
                                                v-for="(modulo, index) in modulosMedicos"
                                                :key="index">
                                                <div
                                                    class="p-3 rounded overflow-hidden position-relative text-white mb-g cursor-pointer"
                                                    style="height: 110px"
                                                    :class="colores[modulo.IdSistema - 1]"
                                                    @click="moduloSeleccionado(modulo)">
                                                    <div class="">
                                                        <h3
                                                            class="display-4 d-block l-h-n m-0 fw-500"
                                                            style="font-size: 18px">
                                                            {{ modulo.NombreSistema.toUpperCase() }}
                                                        </h3>
                                                    </div>
                                                    <i
                                                        class="position-absolute pos-bottom opacity-30"
                                                        :class="modulo.Imagen"
                                                        style="font-size: 6rem; right: 18px"></i>
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

<script>
import { ref, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import useAuth from '../composables/useAuth';

export default {
    components: {
        HeaderRegionalModuloComponent: defineAsyncComponent(() => import('../components/HeaderRegionalModuloComponent')),
        FooterComponent: defineAsyncComponent(() => import('../components/FooterComponent')),
    },
    setup() {
        const router = useRouter();
        const store = useStore();

        const { obtenerRegionales, obtenerModulos, obtenerAccesos } = useAuth();

        const regionales = ref([]);
        let modulos = [];
        const modulosAdministrativos = ref([]);
        const modulosMedicos = ref([]);
        const payload = ref({
            id_regional: null,
            id_modulo: null,
            unica_regional_modulo: false,
            regional: null,
        });

        const colores = ref([
            'bg-warning-500', 'bg-primary-400', 'bg-success-600', 'bg-info-400', 'bg-danger-400', 'bg-fusion-100', 'bg-warning-500', 'bg-primary-400', 'bg-success-600', 'bg-info-400', 'bg-danger-400', 'bg-fusion-100',
            'bg-warning-500', 'bg-primary-400', 'bg-success-600', 'bg-info-400', 'bg-danger-400', 'bg-fusion-100', 'bg-warning-500', 'bg-primary-400', 'bg-success-600', 'bg-info-400', 'bg-danger-400', 'bg-fusion-100',
            'bg-warning-500', 'bg-primary-400', 'bg-success-600', 'bg-info-400', 'bg-danger-400', 'bg-fusion-100', 'bg-warning-500', 'bg-primary-400', 'bg-success-600', 'bg-info-400', 'bg-danger-400', 'bg-fusion-100',
            'bg-warning-500', 'bg-primary-400', 'bg-success-600', 'bg-info-400', 'bg-danger-400', 'bg-fusion-100', 'bg-warning-500', 'bg-primary-400', 'bg-success-600', 'bg-info-400', 'bg-danger-400', 'bg-fusion-100',
            'bg-warning-500', 'bg-primary-400', 'bg-success-600', 'bg-info-400', 'bg-danger-400', 'bg-fusion-100', 'bg-warning-500', 'bg-primary-400', 'bg-success-600', 'bg-info-400', 'bg-danger-400', 'bg-fusion-100',
        ]);

        sessionStorage.removeItem('acceso-menu');
        sessionStorage.removeItem('menu-item');

        const obtenerModulosCargar = async () => {
            modulos = await obtenerModulos(store.getters['auth/getIdRegional']);
            if (modulos.length > 0) {
                // Filtramos los módulos.
                modulosAdministrativos.value = modulos.filter(modulo => modulo.Agrupador === 'Administrativa' && modulo.UrlModulo !== '');
                modulosMedicos.value = modulos.filter(modulo => modulo.Agrupador === 'Medica' && modulo.UrlModulo !== '');
            }
        }

        const obtenerRegionalesCargar = async () => {
            if (regionales.value.length === 0) {
                regionales.value = await obtenerRegionales();
                if (regionales.value.length === 0) {
                    return;
                }

                // Si el usuario no tiene una regional por defecto.
                if(regionales.value.filter(r => r.EsPrincipal).length === 0) {
                    regionales.value[0].EsPrincipal = true;
                }

                if (regionales.value.length > 0) {
                    if (store.getters['auth/getIdRegional'] === null) {
                        payload.value.id_regional = regionales.value.filter(regional => regional.EsPrincipal)[0].IdRegional;
                        payload.value.regional = regionales.value.filter(regional => regional.EsPrincipal)[0].NombreRegional;
                    } else {
                        payload.value.id_regional = store.getters['auth/getIdRegional'];
                        payload.value.regional = store.getters['auth/getRegional'];
                    }
                }
            } else {
                payload.value.regional = regionales.value.filter(regional => regional.IdRegional == payload.value.id_regional)[0].NombreRegional;
            }
            store.commit('auth/setRegionalModule', payload.value);

            obtenerModulosCargar();
        };

        const moduloSeleccionado = async (modulo) => {
            const idUsuario = store.getters['auth/getIdUsuario'];
            if (modulo.redirige.trim().length === 0) {
                payload.value.id_modulo = modulo.IdSistema;
                store.commit('auth/setRegionalModule', payload.value);

                await obtenerAccesos();

                router.push({ name: 'main' });
            } else {
                window.location = `${modulo.redirige.trim()}/#/redirige/${idUsuario}/${payload.value.id_regional}/${modulo.IdSistema}/${payload.value.regional}/${modulo.NombreSistema}${modulo.UrlModulo.trim()}`;
            }
        }

        const obtieneSiCaducoPaswword = async () => {
            let caduco = false;
            caduco = store.getters['auth/getCaducoPassword'] === null ? false : caduco = store.getters['auth/getCaducoPassword'];

            if (caduco) {
                router.push({ name: 'modificar-password', params: { tipo: '1' } });
            }
            else { 
                caduco = store.getters['auth/getModificarPassword'] === null ? false : caduco = store.getters['auth/getModificarPassword'];
                if (caduco) {
                    router.push({ name: 'modificar-password', params: { tipo: '2' }});
                }
            }
        }

        obtieneSiCaducoPaswword();
        obtenerRegionalesCargar();

        return {
            colores,
            modulosAdministrativos,
            modulosMedicos,
            payload,
            regionales,

            moduloSeleccionado,
            obtenerRegionalesCargar,
        };
    }
}
</script>