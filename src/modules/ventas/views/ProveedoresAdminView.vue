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
                            <button type="button" class="btn btn-primary btn-sm mr-2" title="Nuevo" @click="nuevoProveedor">
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
                                        <label class="form-label" for="nombre">Proveedor</label>
                                        <div class="input-group">
                                            <input
                                                type="text"
                                                id="nombre"
                                                name="nombre"
                                                class="form-control form-control-sm"
                                                placeholder="Nombre proveedor"
                                                autocomplete="off"
                                                v-model.trim="fitroBusqueda.textoBuscar"
                                                @keyup.enter="buscarProveedores"/>
                                            <div class="input-group-append">
                                                <button
                                                    class="btn btn-primary btn-sm mb-2"
                                                    id="btn-buscar-proveedores"
                                                    name="btn-buscar-proveedores"
                                                    type="button"
                                                    @click="buscarProveedores">
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
                                :items="proveedoresFiltrados"
                                border-cell
                                alternating
                                buttons-pagination>

                                <template #item-estado="item">
                                    <div class="custom-control custom-checkbox ml-3">
                                        <input
                                            type="checkbox"
                                            class="custom-control-input"
                                            :id="'estado' + item.id_proveedor"
                                            :name="'estado' + item.id_proveedor"
                                            :checked="item.estado">
                                        <label
                                            class="custom-control-label"
                                            :for="'estado_' + item.id_proveedor"></label>
                                    </div>
                                </template>

                                <template #item-acciones="item">
                                    <div class="input-group-append">
                                        <button
                                            type="button"
                                            class="btn btn-primary btn-xs"
                                            title="Editar proveedor"
                                            @click="editarProveedor(item)">
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

    <proveedor-editar-component
        ref="proveedorEditarComponentRef"
        @cerrarProveedorEditarComponent="cerrarProveedorEditarComponentEmit" />

</template>

<script lang='ts'>
import {
    onMounted,
    ref,
    defineAsyncComponent,
 } from 'vue'; 

import useProveedores from '../composables/useProveedores';

export default {
    components: {
        ProveedorEditarComponent: defineAsyncComponent(
            () => import('@/modules/ventas/components/ProveedorEditarComponent.vue')
        ),
    },
    setup() {
        const {
            obtenerProveedores,
        } = useProveedores();

        const fitroBusqueda = ref<any>({
            textoBuscar: ''
        });

        const headers = [
            { text: 'Nombre', value: 'nombre', sortable: true },
            { text: 'NIT', value: 'nit', sortable: true },
            { text: 'Celular', value: 'celular', sortable: true },
            { text: 'Contacto', value: 'contacto', sortable: true },
            { text: 'Celular Contacto', value: 'celular_contacto', sortable: true },
            { text: 'Estado', value: 'estado', sortable: true },
            { text: '', value: 'acciones', width: 15 },
        ];

        let proveedores: any = [];
        const proveedoresFiltrados = ref<any[]>([]);

        const textoFiltro = ref<string>('');

        const proveedorEditarComponentRef = ref();

        onMounted(async() => {
            await buscarProveedores();
        });

        const buscarProveedores = async () => {
            const resp = await obtenerProveedores(fitroBusqueda.value.textoBuscar);
            if (resp.ok) {
                proveedores = resp.data;
                proveedoresFiltrados.value = JSON.parse(JSON.stringify(proveedores));
            }
        }

        const nuevoProveedor = async () => {
            proveedorEditarComponentRef.value.abrirComponent();
        }

        const editarProveedor = async (proveedor: any) => {
            proveedorEditarComponentRef.value.abrirComponent(JSON.parse(JSON.stringify(proveedor)));
        }

        const filtrarInformacion = async () => {
            proveedoresFiltrados.value = JSON.parse(JSON.stringify(
                proveedores.filter(
                    (u: any) => u.nombre.toLowerCase().includes(textoFiltro.value.toLowerCase())
                        || u.nit.toLowerCase().includes(textoFiltro.value.toLowerCase())
                        || u.celular.toLowerCase().includes(textoFiltro.value.toLowerCase())
                        || u.contacto.toLowerCase().includes(textoFiltro.value.toLowerCase())
                        || u.celular_contacto.toLowerCase().includes(textoFiltro.value.toLowerCase())
                )
            ));
        }

        const cerrarProveedorEditarComponentEmit = async(seGrabo: boolean) => {
            if (seGrabo) {
                await buscarProveedores();
            }
        }

        return {
            // products,
            fitroBusqueda,
            headers,
            textoFiltro,
            proveedoresFiltrados,

            buscarProveedores,
            editarProveedor,
            filtrarInformacion,
            nuevoProveedor,

            proveedorEditarComponentRef,
            cerrarProveedorEditarComponentEmit,
        };
    }
}
</script>
