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
                            <button type="button" class="btn btn-primary btn-sm mr-2" title="Nuevo" @click="nuevoRol">
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
                                        <label class="form-label" for="producto">Nombre del Rol</label>
                                        <div class="input-group">
                                            <input
                                                type="text"
                                                id="nombre_usuario"
                                                name="nombre_usuario"
                                                class="form-control form-control-sm"
                                                placeholder="Nombre del Rol"
                                                v-model.trim="fitroBusqueda.textoBuscar"
                                                @keyup.enter="buscarRoles"/>
                                            <div class="input-group-append">
                                                <button
                                                    class="btn btn-primary btn-sm mb-2"
                                                    id="btn_buscar_usuarios"
                                                    name="btn_buscar_usuarios"
                                                    type="button"
                                                    @click="buscarRoles">
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
                                :items="rolesFiltrados"
                                border-cell
                                alternating
                                buttons-pagination>

                                <template #item-EsRolExterno="item">
                                    <div class="custom-control custom-checkbox ml-5">
                                        <input
                                            type="checkbox"
                                            class="custom-control-input"
                                            :id="'rol-externo' + item.IdRol"
                                            :name="'rol-externo' + item.IdRol"
                                            :checked="item.EsRolExterno">
                                        <label
                                            class="custom-control-label"
                                            for="'estado' + item.IdUsuario"></label>
                                    </div>
                                </template>

                                <template #item-Estado="item">
                                    <div class="custom-control custom-checkbox ml-3">
                                        <input
                                            type="checkbox"
                                            class="custom-control-input"
                                            :id="'estado' + item.IdRol"
                                            :name="'estado' + item.IdRol"
                                            :checked="item.Estado">
                                        <label
                                            class="custom-control-label"
                                            for="'estado' + item.IdUsuario"></label>
                                    </div>
                                </template>

                                <template #item-acciones="item">
                                    <div class="input-group-append">
                                        <button
                                            type="button"
                                            class="btn btn-primary btn-xs mr-1"
                                            title="Editar Rol"
                                            @click="editarRol(item)">
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
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue'; 

import useRoles from '../composables/useRoles';
import utils from '@/utils/utils';

// const URL_NAME_ADMIN = 'roles-admin';
const URL_NAME_EDITAR = 'rol-editar';

export default {
    setup() {
        const router = useRouter();

        const {
            buscarRolesApi,
        } = useRoles();

        const fitroBusqueda = ref<any>({
            textoBuscar: ''
        });

        const headers = [
            { text: 'Nombre Rol', value: 'NombreRol', sortable: true },
            { text: 'Descripción', value: 'DescripcionRol', sortable: true },
            { text: 'Rol externo', value: 'EsRolExterno', sortable: true, width: 100 },
            { text: 'Estado', value: 'Estado', sortable: true, width: 20 },
            { text: '', value: 'acciones', width: 20 },
        ];

        let roles: any = [];
        const rolesFiltrados = ref<any[]>([]);

        const textoFiltro = ref<string>('');
        
        onMounted(async() => {
            if (router.options.history.state.back === `/${ URL_NAME_EDITAR }`) {
                const respuesta = await utils.recuperaValoresLocalStorage('filtro-busqueda-rol');
                if (respuesta.ok) {
                    fitroBusqueda.value = respuesta.data;
                    await buscarRoles();
                }
            } else {
                utils.eliminarValoresLocalStorage('filtro-busqueda-rol');
            }
        });

        const buscarRoles = async () => {
            roles = [];
            rolesFiltrados.value = [];

            const resp = await buscarRolesApi(fitroBusqueda.value.textoBuscar);
            if (resp.ok) {
                roles = resp.data;
                rolesFiltrados.value = JSON.parse(JSON.stringify(roles));
            }
        }

        const nuevoRol = async () => {
            fitroBusqueda.value.textoBuscar.trim().length > 0
                ? await utils.almacenaValoresLocalStorage('filtro-busqueda-rol', fitroBusqueda.value)
                : '';
            await utils.eliminarValoresLocalStorage(URL_NAME_EDITAR);

            router.push({
                name: URL_NAME_EDITAR
            });
        }

        const editarRol = async (rol: any) => {
            fitroBusqueda.value.textoBuscar.trim().length > 0
                ? await utils.almacenaValoresLocalStorage('filtro-busqueda-rol', fitroBusqueda.value)
                : '';
            await utils.almacenaValoresLocalStorage(URL_NAME_EDITAR, rol);
            router.push({
                name: URL_NAME_EDITAR
            });
        }

        const filtrarInformacion = async () => {
            rolesFiltrados.value = JSON.parse(JSON.stringify(
                roles.filter(
                    (rol: any) => rol.NombreRol.toLowerCase().includes(textoFiltro.value.toLowerCase())
                        || rol.DescripcionRol.toString().toLowerCase().includes(textoFiltro.value.toLowerCase()) 
                )
            ));
        }

        return {
            fitroBusqueda,
            headers,
            textoFiltro,
            rolesFiltrados,

            buscarRoles,
            editarRol,
            filtrarInformacion,
            nuevoRol,
        };
    }
}
</script>
