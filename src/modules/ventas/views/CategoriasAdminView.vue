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
                            <button type="button" class="btn btn-primary btn-sm mr-2" title="Nuevo" @click="nuevaCategoria">
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
                                        <label class="form-label" for="producto">Nombre Usuario</label>
                                        <div class="input-group">
                                            <input
                                                type="text"
                                                id="nombre_usuario"
                                                name="nombre_usuario"
                                                class="form-control form-control-sm"
                                                placeholder="Nombre de Usuario"
                                                v-model.trim="fitroBusqueda.textoBuscar"
                                                @keyup.enter="buscarUsuarios"/>
                                            <div class="input-group-append">
                                                <button
                                                    class="btn btn-primary btn-sm mb-2"
                                                    id="btn_buscar_usuarios"
                                                    name="btn_buscar_usuarios"
                                                    type="button"
                                                    @click="buscarUsuarios">
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
                                :items="categoriasFiltrados"
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
                                            title="Editar categoría"
                                            @click="editarCategoria(item)">
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

</template>

<script lang='ts'>
import { onMounted, ref } from 'vue'; 

import useCategorias from '@/modules/ventas/composables/useCategorias';

// import utils from '@/utils/utils';

export default {
    setup() {
        const {
            obtenerCategorias,
        } = useCategorias();

        const fitroBusqueda = ref<any>({
            textoBuscar: ''
        });

        const headers = [
            { text: 'Nombre', value: 'nombre', sortable: true },
            { text: 'Estado', value: 'estado', sortable: true },
            { text: '', value: 'acciones', width: 15 },
        ];

        let categorias: any = [];
        const categoriasFiltrados = ref<any[]>([]);

        const textoFiltro = ref<string>('');

        onMounted(async() => {
            const resp = await obtenerCategorias();
            if (resp.ok) {
                categorias = resp.data;
                categoriasFiltrados.value = JSON.parse(JSON.stringify(categorias));
            }
        });

        const buscarUsuarios = async () => {
            // usuarios = [];
            // categoriasFiltrados.value = [];

            // const resp = await buscarUsuariosInternosExternos(fitroBusqueda.value.textoBuscar);
            // if (resp.ok) {
            //     usuarios = resp.data;
            //     usuarios.forEach((usuario: any) => {
            //         if ([USUARIO_INTERNO, USUARIO_EXTERNO, USUARIO_INTERNO_EXTERNO].includes(usuario.IdTipoUsuarioPar)) {
            //             usuario.DescripcionTipoUsuarioPar = tiposUsuario.filter((tu: any) => tu.IdParametro === usuario.IdTipoUsuarioPar)[0].NombreParametro
            //         } else {
            //             usuario.DescripcionTipoUsuarioPar = '';
            //         }
            //     });

            //     categoriasFiltrados.value = JSON.parse(JSON.stringify(usuarios));
            // }
        }

        const nuevaCategoria = async () => {
            console.log('nuevaCategoria');
        }

        const editarCategoria = async () => {
            console.log('editarCategoria');
        }

        const filtrarInformacion = async () => {
            categoriasFiltrados.value = JSON.parse(JSON.stringify(
                categorias.filter(
                    (u: any) => u.nombre.toLowerCase().includes(textoFiltro.value.toLowerCase())
                )
            ));
        }

        return {
            fitroBusqueda,
            headers,
            textoFiltro,
            categoriasFiltrados,

            buscarUsuarios,
            editarCategoria,
            filtrarInformacion,
            nuevaCategoria,
        };
    }
}
</script>
