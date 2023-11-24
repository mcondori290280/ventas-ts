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
                            <button type="button" class="btn btn-primary btn-sm mr-2" title="Nuevo" @click="nuevoCliente">
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
                                        <label class="form-label" for="nombre">Cliente</label>
                                        <div class="input-group">
                                            <input
                                                type="text"
                                                id="nombre"
                                                name="nombre"
                                                class="form-control form-control-sm"
                                                placeholder="Nombre cliente"
                                                autocomplete="off"
                                                v-model.trim="fitroBusqueda.textoBuscar"
                                                @keyup.enter="buscarClientes"/>
                                            <div class="input-group-append">
                                                <button
                                                    class="btn btn-primary btn-sm mb-2"
                                                    id="btn-buscar-clientes"
                                                    name="btn-buscar-clientes"
                                                    type="button"
                                                    @click="buscarClientes">
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

                            <!-- <DataTable :value="products" responsiveLayout="scroll">
                                <Column field="code" header="Code"></Column>
                                <Column field="name" header="Name"></Column>
                                <Column field="category" header="Category"></Column>
                                <Column field="quantity" header="Quantity"></Column>
                            </DataTable> -->

                            <EasyDataTable
                                :headers="headers"
                                :items="clientesFiltrados"
                                border-cell
                                alternating
                                buttons-pagination>

                                <template #item-estado="item">
                                    <div class="custom-control custom-checkbox ml-3">
                                        <input
                                            type="checkbox"
                                            class="custom-control-input"
                                            :id="'estado' + item.id_cliente"
                                            :name="'estado' + item.id_cliente"
                                            :checked="item.estado">
                                        <label
                                            class="custom-control-label"
                                            :for="'estado_' + item.id_cliente"></label>
                                    </div>
                                </template>

                                <template #item-acciones="item">
                                    <div class="input-group-append">
                                        <button
                                            type="button"
                                            class="btn btn-primary btn-xs"
                                            title="Editar cliente"
                                            @click="editarCliente(item)">
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

    <cliente-editar-component
        ref="clienteEditarComponentRef"
        @cerrarClienteEditarComponent="cerrarClienteEditarComponentEmit" />

</template>

<script lang='ts'>
import {
    onMounted,
    ref,
    defineAsyncComponent,
 } from 'vue'; 

import useClientes from '../composables/useClientes';

export default {
    components: {
        ClienteEditarComponent: defineAsyncComponent(
            () => import('@/modules/ventas/components/ClienteEditarComponent.vue')
        ),
    },
    setup() {
        // const products = ref<any>(
        //     [
        //         {"id": "1000","code": "f230fh0g3","name": "Bamboo Watch","description": "Product Description","image": "bamboo-watch.jpg","price": 65,"category": "Accessories","quantity": 24,"inventoryStatus": "INSTOCK","rating": 5},
        //         {"id": "1001","code": "nvklal433","name": "Black Watch","description": "Product Description","image": "black-watch.jpg","price": 72,"category": "Accessories","quantity": 61,"inventoryStatus": "INSTOCK","rating": 4},
        //         {"id": "1002","code": "zz21cz3c1","name": "Blue Band","description": "Product Description","image": "blue-band.jpg","price": 79,"category": "Fitness","quantity": 2,"inventoryStatus": "LOWSTOCK","rating": 3},
        //         {"id": "1003","code": "244wgerg2","name": "Blue T-Shirt","description": "Product Description","image": "blue-t-shirt.jpg","price": 29,"category": "Clothing","quantity": 25,"inventoryStatus": "INSTOCK","rating": 5},
        //         {"id": "1004","code": "h456wer53","name": "Bracelet","description": "Product Description","image": "bracelet.jpg","price": 15,"category": "Accessories","quantity": 73,"inventoryStatus": "INSTOCK","rating": 4},
        //         {"id": "1005","code": "av2231fwg","name": "Brown Purse","description": "Product Description","image": "brown-purse.jpg","price": 120,"category": "Accessories","quantity": 0,"inventoryStatus": "OUTOFSTOCK","rating": 4},
        //         {"id": "1006","code": "bib36pfvm","name": "Chakra Bracelet","description": "Product Description","image": "chakra-bracelet.jpg","price": 32,"category": "Accessories","quantity": 5,"inventoryStatus": "LOWSTOCK","rating": 3},
        //         {"id": "1007","code": "mbvjkgip5","name": "Galaxy Earrings","description": "Product Description","image": "galaxy-earrings.jpg","price": 34,"category": "Accessories","quantity": 23,"inventoryStatus": "INSTOCK","rating": 5},
        //         {"id": "1008","code": "vbb124btr","name": "Game Controller","description": "Product Description","image": "game-controller.jpg","price": 99,"category": "Electronics","quantity": 2,"inventoryStatus": "LOWSTOCK","rating": 4},
        //         {"id": "1009","code": "cm230f032","name": "Gaming Set","description": "Product Description","image": "gaming-set.jpg","price": 299,"category": "Electronics","quantity": 63,"inventoryStatus": "INSTOCK","rating": 3}
        //     ]            
        // );
        const {
            obtenerClientes,
        } = useClientes();

        const fitroBusqueda = ref<any>({
            textoBuscar: ''
        });

        const headers = [
            { text: 'CI', value: 'carnet_identidad', sortable: true },
            { text: 'Nombre', value: 'nombre', sortable: true },
            { text: 'Celular', value: 'celular', sortable: true },
            { text: 'Correo', value: 'correo_electronico', sortable: true },
            { text: 'Dirección', value: 'direccion', sortable: true },
            { text: 'Estado', value: 'estado', sortable: true },
            { text: '', value: 'acciones', width: 15 },
        ];

        let clientes: any = [];
        const clientesFiltrados = ref<any[]>([]);

        const textoFiltro = ref<string>('');

        const clienteEditarComponentRef = ref();

        onMounted(async() => {
            await buscarClientes();
        });

        const buscarClientes = async () => {
            const resp = await obtenerClientes(fitroBusqueda.value.textoBuscar);
            if (resp.ok) {
                clientes = resp.data;
                clientesFiltrados.value = JSON.parse(JSON.stringify(clientes));
            }
        }

        const nuevoCliente = async () => {
            clienteEditarComponentRef.value.abrirComponent();
        }

        const editarCliente = async (cliente: any) => {
            clienteEditarComponentRef.value.abrirComponent(JSON.parse(JSON.stringify(cliente)));
        }

        const filtrarInformacion = async () => {
            clientesFiltrados.value = JSON.parse(JSON.stringify(
                clientes.filter(
                    (u: any) => u.carnet_identidad.toLowerCase().includes(textoFiltro.value.toLowerCase())
                        || u.nombre.toLowerCase().includes(textoFiltro.value.toLowerCase())
                        || u.celular.toLowerCase().includes(textoFiltro.value.toLowerCase())
                        || u.correo_electronico.toLowerCase().includes(textoFiltro.value.toLowerCase())
                        || u.direccion.toLowerCase().includes(textoFiltro.value.toLowerCase())
                )
            ));
        }

        const cerrarClienteEditarComponentEmit = async(seGrabo: boolean) => {
            if (seGrabo) {
                await buscarClientes();
            }
        }

        return {
            // products,
            fitroBusqueda,
            headers,
            textoFiltro,
            clientesFiltrados,

            buscarClientes,
            editarCliente,
            filtrarInformacion,
            nuevoCliente,

            clienteEditarComponentRef,
            cerrarClienteEditarComponentEmit,
        };
    }
}
</script>
