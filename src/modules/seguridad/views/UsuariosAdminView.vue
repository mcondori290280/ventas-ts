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
                            <button type="button" class="btn btn-primary btn-sm mr-2" title="Nuevo" @click="nuevoFormulario">
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
                                :items="usuariosFiltrados"
                                border-cell
                                alternating
                                buttons-pagination>

                                <template #item-Estado="item">
                                    <div class="custom-control custom-checkbox ml-3">
                                        <input
                                            type="checkbox"
                                            class="custom-control-input"
                                            :id="'estado' + item.IdUsuario"
                                            :name="'estado' + item.IdUsuario"
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
                                            class="btn btn-primary btn-xs"
                                            :title="'Editar Usuario '
                                                + (item.IdTipoUsuarioPar == USUARIO_EXTERNO
                                                    ? 'Externo '
                                                    : item.IdTipoUsuarioPar == USUARIO_INTERNO
                                                        ? 'Interno'
                                                        : item.IdTipoUsuarioPar == USUARIO_INTERNO_EXTERNO
                                                            ? 'Interno y Externo'
                                                            : '')"
                                            @click="editarUsuarioExterno(item)">
                                            <i class="fal fa-edit"></i>
                                        </button>
                                    </div>
                                </template>
                            </EasyDataTable>
                        </div>
                    </div>
                </div>
            </div>


            <!-- <div class="col-xl-12" id="prueba">
                <div class="panel">
                    <div class="panel-container">
                        <div class="panel-content">
                            <iframe src="https://www.gotbootstrap.com/themes/smartadmin/4.5.1/intel_marketing_dashboard.html?IdRegional=1"
                                    width="100%" height="2500px" frameborder="0"
                                    allowfullscreen>
                            </iframe>
                        </div>
                    </div>
                </div>
            </div> -->


        </div>
    </main>

    <!-- this overlay is activated only when mobile menu is triggered -->
    <div class="page-content-overlay" data-action="toggle" data-class="mobile-nav-on"></div>
    <!-- END Page Content -->

</template>

<script lang='ts'>
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue'; 

import useUsuarios from '../composables/useUsuarios';
import utils from '@/utils/utils';
import useParametrosGenerales from '@/modules/system/composables/useParametrosGenerales';

// const URL_NAME_ADMIN = 'usuarios-admin';
const URL_NAME_EDITAR = 'usuario-editar';

export default {
    setup() {
        const USUARIO_INTERNO = 1801;
        const USUARIO_EXTERNO = 1802;
        const USUARIO_INTERNO_EXTERNO = 1971;

        const router = useRouter();

        const {
            buscarUsuariosInternosExternos,
        } = useUsuarios();
        const {
            obtenerTiposUsuario
        } = useParametrosGenerales();

        let tiposUsuario: any = [];

        const fitroBusqueda = ref<any>({
            textoBuscar: ''
        });

        const headers = [
            { text: 'Nombre Completo', value: 'NombreCompleto', sortable: true },
            { text: 'Usuario', value: 'NombreUsuario', sortable: true },
            { text: 'Correo Electrónico', value: 'CorreoElectronico', sortable: true },
            { text: 'Tipo Usuario', value: 'DescripcionTipoUsuarioPar', sortable: true },
            // { text: 'Regionales', value: 'Regionales', sortable: true },
            { text: 'Estado', value: 'Estado', sortable: true, width: 20 },
            { text: '', value: 'acciones', width: 15 },
        ];

        let usuarios: any = [];
        const usuariosFiltrados = ref<any[]>([]);

        const textoFiltro = ref<string>('');

        onMounted(async() => {
            const respuestaTiposUsuario = await obtenerTiposUsuario();
            if (respuestaTiposUsuario.ok) {
                tiposUsuario = respuestaTiposUsuario.data;
            }

            if (router.options.history.state.back === `/${ URL_NAME_EDITAR }`) {
                const respuesta = await utils.recuperaValoresLocalStorage('filtro-busqueda-usuario');
                if (respuesta.ok) {
                    fitroBusqueda.value = respuesta.data;
                    await buscarUsuarios();
                }
            } else {
                utils.eliminarValoresLocalStorage('filtro-busqueda-usuario');
            }
        });

        const buscarUsuarios = async () => {
            usuarios = [];
            usuariosFiltrados.value = [];

            const resp = await buscarUsuariosInternosExternos(fitroBusqueda.value.textoBuscar);
            if (resp.ok) {
                usuarios = resp.data;
                usuarios.forEach((usuario: any) => {
                    if ([USUARIO_INTERNO, USUARIO_EXTERNO, USUARIO_INTERNO_EXTERNO].includes(usuario.IdTipoUsuarioPar)) {
                        usuario.DescripcionTipoUsuarioPar = tiposUsuario.filter((tu: any) => tu.IdParametro === usuario.IdTipoUsuarioPar)[0].NombreParametro
                    } else {
                        usuario.DescripcionTipoUsuarioPar = '';
                    }
                });

                usuariosFiltrados.value = JSON.parse(JSON.stringify(usuarios));
            }
        }

        const nuevoFormulario = async () => {
            fitroBusqueda.value.textoBuscar.trim().length > 0
                ? await utils.almacenaValoresLocalStorage('filtro-busqueda-usuario', fitroBusqueda.value)
                : '';
            await utils.eliminarValoresLocalStorage(URL_NAME_EDITAR);

            router.push({
                name: URL_NAME_EDITAR
            });
        }

        const editarUsuarioExterno = async (usuarioExterno: any) => {
            fitroBusqueda.value.textoBuscar.trim().length > 0
                ? await utils.almacenaValoresLocalStorage('filtro-busqueda-usuario', fitroBusqueda.value)
                : '';
            await utils.almacenaValoresLocalStorage(URL_NAME_EDITAR, usuarioExterno);
            router.push({
                name: URL_NAME_EDITAR
            });
        }

        const filtrarInformacion = async () => {
            usuariosFiltrados.value = JSON.parse(JSON.stringify(
                usuarios.filter(
                    (u: any) => u.NombreCompleto.toLowerCase().includes(textoFiltro.value.toLowerCase())
                        || u.NombreUsuario.toString().toLowerCase().includes(textoFiltro.value.toLowerCase()) 
                        || u.CorreoElectronico.toString().toLowerCase().includes(textoFiltro.value.toLowerCase()) 
                        || u.DescripcionTipoUsuarioPar.toString().toLowerCase().includes(textoFiltro.value.toLowerCase()) 
                )
            ));
        }

        return {
            fitroBusqueda,
            headers,
            textoFiltro,
            USUARIO_EXTERNO,
            USUARIO_INTERNO_EXTERNO,
            USUARIO_INTERNO,
            usuariosFiltrados,

            buscarUsuarios,
            editarUsuarioExterno,
            filtrarInformacion,
            nuevoFormulario,
        };
    }
}
</script>
