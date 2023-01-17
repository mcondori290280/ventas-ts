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
                            <button type="button" class="btn btn-primary btn-sm mr-2" title="Nuevo" @click="nuevaMarca">
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
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label" for="nombre">Marca</label>
                                        <div class="input-group">
                                            <input
                                                type="text"
                                                id="nombre"
                                                name="nombre"
                                                class="form-control form-control-sm"
                                                placeholder="Nombre de categoría"
                                                autocomplete="off"
                                                v-model.trim="fitroBusqueda.textoBuscar"
                                                @keyup.enter="buscarMarcas"/>
                                            <div class="input-group-append">
                                                <button
                                                    class="btn btn-primary btn-sm mb-2"
                                                    id="btn-buscar-marcas"
                                                    name="btn-buscar-marcas"
                                                    type="button"
                                                    @click="buscarMarcas">
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
                                :items="marcasFiltrados"
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
                                            title="Editar marca"
                                            @click="editarMarca(item)">
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

    <marca-editar-component
        ref="marcaEditarComponentRef"
        @cerrarEditarMarcaComponent="cerrarEditarMarcaComponentEmit" />

</template>

<script lang='ts'>
import {
    onMounted,
    ref,
    defineAsyncComponent,
 } from 'vue'; 

import useMarcas from '@/modules/ventas/composables/useMarcas';

export default {
    components: {
        MarcaEditarComponent: defineAsyncComponent(
            () => import('@/modules/ventas/components/MarcaEditarComponent.vue')
        ),
    },
    setup() {
        const {
            obtenerMarcas,
        } = useMarcas();

        const fitroBusqueda = ref<any>({
            textoBuscar: ''
        });

        const headers = [
            { text: 'Nombre', value: 'nombre', sortable: true },
            { text: 'Estado', value: 'estado', sortable: true },
            { text: '', value: 'acciones', width: 15 },
        ];

        let marcas: any = [];
        const marcasFiltrados = ref<any[]>([]);

        const textoFiltro = ref<string>('');

        const marcaEditarComponentRef = ref();

        onMounted(async() => {
            await buscarMarcas();
        });

        const buscarMarcas = async () => {
            const resp = await obtenerMarcas(fitroBusqueda.value.textoBuscar);
            if (resp.ok) {
                marcas = resp.data;
                marcasFiltrados.value = JSON.parse(JSON.stringify(marcas));
            }
        }

        const nuevaMarca = async () => {
            marcaEditarComponentRef.value.abrirComponent();
        }

        const editarMarca = async (categoria: any) => {
            marcaEditarComponentRef.value.abrirComponent(categoria);
        }

        const filtrarInformacion = async () => {
            marcasFiltrados.value = JSON.parse(JSON.stringify(
                marcas.filter(
                    (u: any) => u.nombre.toLowerCase().includes(textoFiltro.value.toLowerCase())
                )
            ));
        }

        const cerrarEditarMarcaComponentEmit = async(seGrabo: boolean) => {
            if (seGrabo) {
                await buscarMarcas();
            }
        }

        return {
            fitroBusqueda,
            headers,
            textoFiltro,
            marcasFiltrados,

            buscarMarcas,
            editarMarca,
            filtrarInformacion,
            nuevaMarca,

            marcaEditarComponentRef,
            cerrarEditarMarcaComponentEmit,
        };
    }
}
</script>
