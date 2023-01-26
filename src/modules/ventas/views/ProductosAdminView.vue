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
                            <button type="button" class="btn btn-primary btn-sm mr-2" title="Nuevo" @click="nuevoProducto">
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
                                        <label class="form-label" for="nombre">Producto</label>
                                        <div class="input-group">
                                            <input
                                                type="text"
                                                id="nombre"
                                                name="nombre"
                                                class="form-control form-control-sm"
                                                placeholder="Nombre de producto"
                                                autocomplete="off"
                                                v-model.trim="fitroBusqueda.textoBuscar"
                                                @keyup.enter="buscarProductos"/>
                                            <div class="input-group-append">
                                                <button
                                                    class="btn btn-primary btn-sm mb-2"
                                                    id="btn-buscar-productos"
                                                    name="btn-buscar-productos"
                                                    type="button"
                                                    @click="buscarProductos">
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
                                :items="productosFiltrados"
                                border-cell
                                alternating
                                buttons-pagination>
                                <template #item-estado="item">
                                    <div class="custom-control custom-checkbox ml-3">
                                        <input
                                            type="checkbox"
                                            class="custom-control-input"
                                            :id="'estado' + item.id_producto"
                                            :name="'estado' + item.id_producto"
                                            :checked="item.estado">
                                        <label
                                            class="custom-control-label"
                                            :for="'estado_' + item.id_producto"></label>
                                    </div>
                                </template>

                                <template #item-acciones="item">
                                    <div class="input-group-append">
                                        <button
                                            type="button"
                                            class="btn btn-primary btn-xs"
                                            title="Editar producto"
                                            @click="editarProducto(item)">
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

    <producto-editar-component
        ref="productoEditarComponentRef"
        @cerrarEditarProductoComponent="cerrarEditarProductoComponentEmit" />

</template>

<script lang='ts'>
import {
    onMounted,
    ref,
    defineAsyncComponent,
} from 'vue'; 

import numeral from 'numeral';

import useProductos from '@/modules/ventas/composables/useProductos';

export default {
    components: {
        ProductoEditarComponent: defineAsyncComponent(
            () => import('@/modules/ventas/components/ProductoEditarComponent.vue')
        ),
    },
    setup() {
        const {
            obtenerProductos,
        } = useProductos();

        const fitroBusqueda = ref<any>({
            textoBuscar: ''
        });

        const headers = [
            { text: 'Código de barras', value: 'codigo_barras', sortable: true },
            { text: 'Nombre', value: 'nombre', sortable: true },
            { text: 'Categoría', value: 'nombre_categoria', sortable: true },
            { text: 'Marca', value: 'nombre_marca', sortable: true },
            { text: 'Presentación', value: 'nombre_presentacion', sortable: true },
            { text: 'Estado', value: 'estado', sortable: true },
            { text: '', value: 'acciones', width: 15 },
        ];

        let productos: any = [];
        const productosFiltrados = ref<any[]>([]);

        const textoFiltro = ref<string>('');

        const productoEditarComponentRef = ref();

        onMounted(async() => {
            await buscarProductos();
        });

        const buscarProductos = async () => {
            const resp = await obtenerProductos(fitroBusqueda.value.textoBuscar);
            if (resp.ok) {
                productos = resp.data;
                productosFiltrados.value = JSON.parse(JSON.stringify(productos));
            }
        }

        const nuevoProducto = async () => {
            productoEditarComponentRef.value.abrirComponent();
        }

        const editarProducto = async (producto: any) => {
            productoEditarComponentRef.value.abrirComponent(JSON.parse(JSON.stringify(producto)));
        }

        const filtrarInformacion = async () => {
            productosFiltrados.value = JSON.parse(JSON.stringify(
                productos.filter(
                    (u: any) => u.codigo_barras.toLowerCase().includes(textoFiltro.value.toLowerCase())
                        || u.nombre.toLowerCase().includes(textoFiltro.value.toLowerCase())
                        || u.nombre_categoria.toLowerCase().includes(textoFiltro.value.toLowerCase())
                        || u.nombre_marca.toLowerCase().includes(textoFiltro.value.toLowerCase())
                        || u.nombre_presentacion.toLowerCase().includes(textoFiltro.value.toLowerCase())
                )
            ));
        }

        const cerrarEditarProductoComponentEmit = async(seGrabo: boolean) => {
            if (seGrabo) {
                await buscarProductos();
            }
        }

        return {
            fitroBusqueda,
            headers,
            textoFiltro,
            productosFiltrados,

            buscarProductos,
            editarProducto,
            filtrarInformacion,
            nuevoProducto,

            numeral,

            productoEditarComponentRef,
            cerrarEditarProductoComponentEmit,
        };
    }
}
</script>
