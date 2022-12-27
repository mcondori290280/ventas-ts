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
                                        <!-- <button
                                            type="button"
                                            class="btn btn-primary btn-xs mr-1"
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
                                        </button> -->
                                        <button
                                            type="button"
                                            class="btn btn-danger btn-xs"
                                            :title="`Reestablecer contraseña ${ item.NombreCompleto}`"
                                            v-if="item.Estado"
                                            @click="reestablecerContrasenia(item)">
                                            <i class="fal fa-key"></i>
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

    <div class="modal fade" tabindex="-1" id="reestablecer-contrasenia-modal" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        Reestablecer Contraseña
                    </h5>
                    <button
                        type="button"
                        class="close"
                        aria-label="Close"
                        @click="cancelarModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body pt-0">

                    <div class="row">
                        <div class="col-xl-12">
                            <form novalidate>
                                <div class="form-group mb-2">
                                    <label class="form-label" for="contrasena-nueva">Nueva contraseña</label>
                                    <input
                                        type="password"
                                        class="form-control form-control-sm"
                                        id="contrasena-nueva"
                                        name="contrasena-nueva"
                                        :class="{ 'is-invalid': vReseteoContraseniaModalForm$.contrasenaNueva.$dirty && vReseteoContraseniaModalForm$.contrasenaNueva.$invalid }"
                                        v-model="vReseteoContraseniaModalForm$.contrasenaNueva.$model"
                                        ref="contrasenaNuevaRef">
                                        <small
                                            class="invalid-feedback"
                                            v-if="vReseteoContraseniaModalForm$.contrasenaNueva.$dirty && vReseteoContraseniaModalForm$.contrasenaNueva.required.$invalid">
                                            Nueva contraseña, no tiene información.
                                        </small>
                                        <small
                                            class="invalid-feedback"
                                            v-if="vReseteoContraseniaModalForm$.contrasenaNueva.$dirty && vReseteoContraseniaModalForm$.contrasenaNueva.minLength.$invalid">
                                            Nueva contraseña, debe contener como mínimo 10 caracteres.
                                        </small>
                                        <small
                                            class="invalid-feedback"
                                            v-if="vReseteoContraseniaModalForm$.contrasenaNueva.$dirty && vReseteoContraseniaModalForm$.contrasenaNueva.validarPasswordMayusculas.$invalid  && vReseteoContraseniaModalForm$.contrasenaNueva.$model.trim().length > 0">
                                            Nueva contraseña, debe contener maýuculas.
                                        </small>
                                        <small
                                            class="invalid-feedback"
                                            v-if="vReseteoContraseniaModalForm$.contrasenaNueva.$dirty && vReseteoContraseniaModalForm$.contrasenaNueva.validarPasswordMinusculas.$invalid  && vReseteoContraseniaModalForm$.contrasenaNueva.$model.trim().length > 0">
                                            Nueva contraseña, debe contener minúsculas.
                                        </small>
                                        <small
                                            class="invalid-feedback"
                                            v-if="vReseteoContraseniaModalForm$.contrasenaNueva.$dirty && vReseteoContraseniaModalForm$.contrasenaNueva.validarPasswordNumeros.$invalid  && vReseteoContraseniaModalForm$.contrasenaNueva.$model.trim().length > 0">
                                            Nueva contraseña, debe contener números.
                                        </small>
                                        <small
                                            class="invalid-feedback"
                                            v-if="vReseteoContraseniaModalForm$.contrasenaNueva.$dirty && vReseteoContraseniaModalForm$.contrasenaNueva.validarPasswordCaracteresEspacial.$invalid  && vReseteoContraseniaModalForm$.contrasenaNueva.$model.trim().length > 0">
                                            Nueva contraseña, debe contener caracteres especiales.
                                        </small>
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="contrasena-repite">Repita la nueva contraseña</label>
                                    <input
                                        type="password"
                                        class="form-control form-control-sm"
                                        id="contrasena-repite"
                                        name="contrasena-repite"
                                        :class="{ 'is-invalid': vReseteoContraseniaModalForm$.contrasenaRepite.$dirty && vReseteoContraseniaModalForm$.contrasenaRepite.$invalid }"
                                        v-model="vReseteoContraseniaModalForm$.contrasenaRepite.$model">
                                        <small
                                            class="invalid-feedback"
                                            v-if="vReseteoContraseniaModalForm$.contrasenaRepite.$dirty && vReseteoContraseniaModalForm$.contrasenaRepite.required.$invalid">
                                            Repita la nueva contraseña, no tiene información.
                                        </small>
                                        <small
                                            class="invalid-feedback"
                                            v-if="vReseteoContraseniaModalForm$.contrasenaRepite.$dirty && vReseteoContraseniaModalForm$.contrasenaRepite.sameAsPassword.$invalid && vReseteoContraseniaModalForm$.contrasenaRepite.$model.trim().length > 0">
                                            Nueva contraseña y Repita la nueva contraseña, no son iguales.
                                        </small>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
                <div class="modal-footer pt-0">
                    <button
                        type="button"
                        class="btn btn-primary btn-sm"
                        @click="aceptarModal">Aceptar</button>
                    <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        @click="cancelarModal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { onMounted, ref } from 'vue'; 
import useVuelidate from '@vuelidate/core';
import { minLength, required } from '@vuelidate/validators';

import useUsuarios from '../composables/useUsuarios';
import useParametrosGenerales from '@/modules/system/composables/useParametrosGenerales';

declare let window: any;

export default {
    setup() {
        const USUARIO_INTERNO = 1801;
        const USUARIO_EXTERNO = 1802;
        const USUARIO_INTERNO_EXTERNO = 1971;

        const {
            buscarUsuariosInternosExternos,
            reestablecerContraseniaApi,
        } = useUsuarios();
        const { obtenerTiposUsuario } = useParametrosGenerales();

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
            { text: '', value: 'acciones', width: 20 },
        ];

        let usuarios: any = [];
        const usuariosFiltrados = ref<any[]>([]);

        const textoFiltro = ref<string>('');

        // Variables modal Reseteo de contraseña.
        const passwordIsSame = () => {
            return reseteoContraseniaModalForm.value.contrasenaNueva === reseteoContraseniaModalForm.value.contrasenaRepite;
        }
        const reseteoContraseniaModalForm = ref<any>({
            contrasenaNueva: '',
            contrasenaRepite: '',
            idUsuario: '',
        });
        const reglasReseteoContraseniaModalForm = {
            contrasenaNueva: {
                required,
                validarPasswordMayusculas: (value: string) => {
                    return /[A-Z]/.test(value)
                },
                validarPasswordMinusculas: (value: string) => {
                    return /[a-z]/.test(value);
                },
                validarPasswordNumeros: (value: string) => {
                    return /[0-9]/.test(value);
                },
                validarPasswordCaracteresEspacial: (value: string) => {
                    return /[#?!@$%^&*-]/.test(value);
                },
                minLength: minLength(10),
            },
            contrasenaRepite: {
                required,
                sameAsPassword: passwordIsSame,
            },
        };
        const vReseteoContraseniaModalForm$ = useVuelidate(
            reglasReseteoContraseniaModalForm,
            reseteoContraseniaModalForm
        );
        const contrasenaNuevaRef = ref();

        
        onMounted(async() => {
            const respuestaTiposUsuario = await obtenerTiposUsuario();
            if (respuestaTiposUsuario.ok) {
                tiposUsuario = respuestaTiposUsuario.data;
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


        // Métodos para el modal.
        const reestablecerContrasenia = async(usuario: any) => {
            reseteoContraseniaModalForm.value = {
                contrasenaNueva: '',
                contrasenaRepite: '',
                idUsuario: usuario.IdUsuario,
            };
            vReseteoContraseniaModalForm$.value.$reset();

            window.$('#reestablecer-contrasenia-modal').modal('show');

            setTimeout(() => {
                contrasenaNuevaRef.value.focus();
            }, 500);
        }

        const aceptarModal = async () => {
            if (!vReseteoContraseniaModalForm$.value.$invalid) {
                const resp = await reestablecerContraseniaApi(reseteoContraseniaModalForm.value);
                if (resp.ok) {
                    cancelarModal();
                }
            } else {
                vReseteoContraseniaModalForm$.value.$touch();
            }
        }

        const cancelarModal = () => {
            window.$('#reestablecer-contrasenia-modal').modal('hide');
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
            filtrarInformacion,
            reestablecerContrasenia,

            // Varaible y métodos del modal.
            vReseteoContraseniaModalForm$,
            contrasenaNuevaRef,

            aceptarModal,
            cancelarModal,
        };
    }
}
</script>
