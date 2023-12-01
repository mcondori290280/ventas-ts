<template>
    <!-- BEGIN Page Content -->
    <!-- the #js-page-content id is needed for some plugins to initialize -->
    <main id="js-page-content"
          role="main"
          class="page-content">
        <div class="subheader">
            <h1 class="subheader-title">
                <i class='subheader-icon fal fa-users'></i> {{ $router.currentRoute.value.meta.titleForm }}
            </h1>
        </div>
        <div class="row">
            <div class="col-xl-12">
                <div class="panel">
                    <div class="panel-hdr mt-2">
                        <div class="float-left">
                            <button type="button" class="btn btn-primary btn-sm mr-2" title="Nuevo" @click="nuevaPresentacion">
                                <i class="fal fa-plus-square"></i>
                                <span class="d-none d-sm-block float-right ml-1">Nuevo</span>
                            </button>
                        </div>
                        <h2>
                            Filtro de<span class="fw-300"><i>{{ $router.currentRoute.value.meta.titleForm }}</i></span>
                        </h2>
                        <div class="panel-toolbar">
                            <button class="btn btn-panel" data-action="panel-collapse" data-toggle="tooltip" data-offset="0,10"
                                data-original-title="Collapse"></button>
                            <button class="btn btn-panel" data-action="panel-fullscreen" data-toggle="tooltip" data-offset="0,10"
                                data-original-title="Fullscreen"></button>
                        </div>
                    </div>
                    <div class="panel-container">
                        <div class="panel-content">
                            <div class="row mb-1">
                                <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label class="form-label" for="nombre">Presentación</label>
                                        <div class="input-group">
                                            <input
                                                type="text"
                                                id="nombre"
                                                name="nombre"
                                                class="form-control form-control-sm"
                                                placeholder="Nombre presentación"
                                                autocomplete="off"
                                                v-model.trim="fitroBusqueda.textoBuscar"
                                                @keyup.enter="buscarPresentaciones"/>
                                            <div class="input-group-append">
                                                <button
                                                    class="btn btn-primary btn-sm mb-2"
                                                    id="btn-buscar-presentaciones"
                                                    name="btn-buscar-presentaciones"
                                                    type="button"
                                                    @click="buscarPresentaciones">
                                                    <i class="fal fa-search"></i>
                                                    Buscar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-12">
                <div id="panel-listado" class="panel">
                    <div class="panel-hdr mt-2">
                        <h2>
                            Listado de<span class="fw-300"><i>{{ $router.currentRoute.value.meta.titleForm }}</i></span>
                        </h2>
                        <div class="panel-toolbar">
                            <button class="btn btn-panel" data-action="panel-collapse" data-toggle="tooltip" data-offset="0,10"
                                data-original-title="Collapse"></button>
                            <button class="btn btn-panel" data-action="panel-fullscreen" data-toggle="tooltip" data-offset="0,10"
                                data-original-title="Fullscreen"></button>
                        </div>
                    </div>
                    <div class="panel-container">
                        <div class="panel-content">
                            <div class="row mb-2">
                                <div class="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="fal fa-search"></i></span>
                                            </div>
                                            <input
                                                type="text"
                                                id="texto-buscar"
                                                name="texto-buscar"
                                                class="form-control form-control-sm flex"
                                                placeholder="Buscar"
                                                v-model="textoFiltro"
                                                @input="filtrarInformacion" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <EasyDataTable
                                :headers="headers"
                                :items="presentacionesFiltrados"
                                border-cell
                                alternating
                                buttons-pagination>

                                <template #item-estado="item">
                                    <div class="custom-control custom-checkbox ml-3">
                                        <input
                                            type="checkbox"
                                            class="custom-control-input"
                                            :id="'estado' + item.id_categoria"
                                            :name="'estado' + item.id_categoria"
                                            :checked="item.estado">
                                        <label
                                            class="custom-control-label"
                                            :for="'estado_' + item.id_categoria"></label>
                                    </div>
                                </template>

                                <template #item-acciones="item">
                                    <div class="input-group-append">
                                        <button
                                            type="button"
                                            class="btn btn-primary btn-xs"
                                            title="Editar presentación"
                                            @click="editarPresentacion(item)">
                                            <i class="fal fa-edit"></i>
                                        </button>
                                    </div>
                                </template>
                            </EasyDataTable>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </main>

    <!-- this overlay is activated only when mobile menu is triggered -->
    <div class="page-content-overlay" data-action="toggle" data-class="mobile-nav-on"></div>
    <!-- END Page Content -->

    <presentacion-editar-component
        ref="presentacionEditarComponentRef"
        @cerrarEditarPresentacionComponent="cerrarEditarPresentacionComponentEmit" />

</template>

<script lang='ts'>
import {
    onMounted,
    ref,
    defineAsyncComponent,
 } from 'vue'; 

import usePresentaciones from '@/modules/ventas/composables/usePresentaciones';

export default {
    components: {
        PresentacionEditarComponent: defineAsyncComponent(
            () => import('@/modules/ventas/components/PresentacionEditarComponent.vue')
        ),
    },
    setup() {
        const {
            obtenerPresentaciones,
        } = usePresentaciones();

        const fitroBusqueda = ref<any>({
            textoBuscar: ''
        });

        const headers = [
            { text: 'Nombre', value: 'nombre', sortable: true },
            { text: 'Sigla', value: 'sigla', sortable: true },
            { text: 'Estado', value: 'estado', sortable: true },
            { text: '', value: 'acciones', width: 15 },
        ];

        let presentaciones: any = [];
        const presentacionesFiltrados = ref<any[]>([]);

        const textoFiltro = ref<string>('');

        const presentacionEditarComponentRef = ref();

        onMounted(async() => {
            await buscarPresentaciones();
        });

        const buscarPresentaciones = async () => {
            const resp = await obtenerPresentaciones(fitroBusqueda.value.textoBuscar);
            if (resp.ok) {
                presentaciones = resp.data;
                presentacionesFiltrados.value = JSON.parse(JSON.stringify(presentaciones));
            }
        }

        const nuevaPresentacion = async () => {
            presentacionEditarComponentRef.value.abrirComponent();
        }

        const editarPresentacion = async (presentacion: any) => {
            presentacionEditarComponentRef.value.abrirComponent(JSON.parse(JSON.stringify(presentacion)));
        }

        const filtrarInformacion = async () => {
            presentacionesFiltrados.value = JSON.parse(JSON.stringify(
                presentaciones.filter(
                    (u: any) => u.nombre.toLowerCase().includes(textoFiltro.value.toLowerCase())
                )
            ));
        }

        const cerrarEditarPresentacionComponentEmit = async(seGrabo: boolean) => {
            if (seGrabo) {
                await buscarPresentaciones();
            }
        }

        return {
            fitroBusqueda,
            headers,
            textoFiltro,
            presentacionesFiltrados,

            buscarPresentaciones,
            editarPresentacion,
            filtrarInformacion,
            nuevaPresentacion,

            presentacionEditarComponentRef,
            cerrarEditarPresentacionComponentEmit,
        };
    }
}
</script>
