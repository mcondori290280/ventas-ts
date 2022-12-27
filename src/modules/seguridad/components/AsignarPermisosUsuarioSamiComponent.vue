<template>
    <div class="modal fade" tabindex="-1" id="asignar-permisos-usuario-sami-modal" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        Asignación de Permisos SAMI: <span class="fw-300"><i>{{ nombreCompletoUsuario }}</i></span>
                    </h5>
                    <button type="button" class="close" aria-label="Close" @click="cancelar">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body pb-0 pt-0">

                    <!-- v-if="!seGrabo" -->
                    <div class="row">
                        <div class="col-xl-6 col-lg-6 col-md-12">
                            <div
                                id="panel-1"
                                class="panel">
                                <div class="panel-hdr">
                                    <h2>
                                        Centros de Atención y Grupos <span class="fw-300"><i>Seleccione</i></span>
                                    </h2>
                                </div>
                                <div class="panel-container show">
                                    <div class="panel-content">
                                        <div class="frame-wrap">

                                            <div
                                                class="demo overflow-auto"
                                                data-spy="scroll"
                                                data-target="#spyscroll-1"
                                                data-offset="0"
                                                style="height:303px">

                                                <div
                                                    class="custom-control custom-switch"
                                                    v-for="(centroAtencion, index) in centrosAtencionGruposTiposAccesos.listaCentrosAtencion"
                                                    :key="index">
                                                    <div>
                                                        <input
                                                            type="checkbox"
                                                            class="custom-control-input"
                                                            :id="'ceacod-'  + centroAtencion.ceacod"
                                                            :name="'ceacod-'  + centroAtencion.ceacod"
                                                            :disabled="seGrabo || !centrosAtencionGruposTiposAccesos.estado"
                                                            v-model="centroAtencion.Habilitado"
                                                            @change="centroAtencionClick(centroAtencion)" />
                                                        <label
                                                            class="custom-control-label cursor-pointer"
                                                            :for="'ceacod-' + centroAtencion.ceacod">{{ centroAtencion.ceades }}</label>
                                                        <span
                                                            v-if="centroAtencion.grucod.trim().length > 0 && !seGrabo"
                                                            @click="centroAtencion.Habilitado = false; centroAtencion.grucod = ''; centroAtencion.grudes = '';"
                                                            :title="`Eliminar Centro de Atención: ${ centroAtencion.ceades } y grupo: ${ centroAtencion.grudes }`">
                                                            <i class="fal fa-trash-alt pl-2 text-danger d-inline cursor-pointer"></i>
                                                        </span>
                                                    </div>
                                                    <span
                                                        class="fw-300"
                                                        v-if="centroAtencion.grucod.trim().length > 0">
                                                        <i
                                                            class="text-primary font-weight-bold">
                                                            Grupo: {{ centroAtencion.grudes }}
                                                        </i>
                                                    </span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="col-xl-6 col-lg-6 col-md-12">
                            <div id="panel-1" class="panel">
                                <div class="panel-hdr">
                                    <h2>
                                        Accesos <span class="fw-300"><i>Asignados</i></span>
                                    </h2>
                                </div>
                                <div class="panel-container show">
                                    <div class="panel-content">

                                        <div
                                            class="demo overflow-auto"
                                            data-spy="scroll"
                                            data-target="#spyscroll-1"
                                            data-offset="0"
                                            style="height:303px">

                                            <div
                                                class="custom-control custom-switch"
                                                v-for="(acceso, index) in centrosAtencionGruposTiposAccesos.listaTipoAccesos"
                                                :key="index">
                                                <input
                                                    type="checkbox"
                                                    class="custom-control-input"
                                                    :id="'acceso-' + acceso.CodTipoUsuario"
                                                    :name="'acceso-' + acceso.CodTipoUsuario"
                                                    :disabled="seGrabo || !centrosAtencionGruposTiposAccesos.estado"
                                                    v-model="acceso.Estado">
                                                <label
                                                    class="custom-control-label"
                                                    :for="'acceso-' + acceso.CodTipoUsuario">{{ acceso.DesTipoUsuario }}</label>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="row">
                        <div class="col-xl-12">
                            <div
                                id="panel-1"
                                class="panel">
                                <div class="panel-hdr">
                                    <h2>
                                        Médico SAMI
                                    </h2>
                                </div>
                                <div class="panel-container show">
                                    <div class="panel-content">
                                        <div class="frame-wrap">

                                            <div class="form-row">
                                                <div class="col-xl-6 col-lg-6 mb-3">
                                                    <div class="custom-control custom-switch">
                                                        <input
                                                            type="checkbox"
                                                            class="custom-control-input"
                                                            id="es-medico"
                                                            name="es-medico"
                                                            :disabled="seGrabo || !centrosAtencionGruposTiposAccesos.estado"
                                                            v-model="centrosAtencionGruposTiposAccesos.EsMedico" />
                                                        <label class="custom-control-label" for="es-medico">¿Es personal médico?</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="form-row">
                                                <div class="col-xl-6 col-lg-6 mb-3">
                                                    <label
                                                        class="form-label"
                                                        for="medcod">Médico SAMI</label>
                                                    <Select2
                                                        id="medcod"
                                                        name="medcod"
                                                        v-model="centrosAtencionGruposTiposAccesos.medcod"
                                                        :disabled="seGrabo || !centrosAtencionGruposTiposAccesos.EsMedico || !centrosAtencionGruposTiposAccesos.estado"
                                                        :options="medicos"
                                                        :settings="{ multiple: false, placeholder: 'Seleccione', width: '100%', tags: false, dropdownParent:'#asignar-permisos-usuario-sami-modal'}" />
                                                </div>
                                            </div>

                                            <div class="form-row">
                                                <div class="col-xl-6 col-lg-6">
                                                    <div class="custom-control custom-switch">
                                                        <input
                                                            type="checkbox"
                                                            class="custom-control-input"
                                                            id="estado-usuario-sami"
                                                            name="estado-usuario-sami"
                                                            :disabled="seGrabo || usuarioInnovoSinUsuarioSAMI"
                                                            v-model="centrosAtencionGruposTiposAccesos.estado" />
                                                        <label class="custom-control-label" for="estado-usuario-sami">Estado usuario en SAMI</label>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- <pre>{{ centrosAtencionGruposTiposAccesos }}</pre> -->
                </div>
                <div class="modal-footer pt-0">
                    <button
                        type="button"
                        class="btn btn-primary btn-sm"
                        v-if="!seGrabo"
                        @click="grabar">Grabar</button>
                    <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        @click="cancelar">{{ seGrabo ? 'Salir' : 'Cancelar'}}</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" tabindex="-1" id="seleccionar-grupo-modal" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        Seleccione grupo
                    </h5>
                    <button type="button" class="close" aria-label="Close" @click="cancelarGrupo">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body pt-0 pb-0">

                    <p>
                        Para el Centro de Atención: <span class="fw-300"><i>{{ centroAtencionSeleccionado.ceades }}</i></span>
                    </p>

                    <div
                        id="panel-1"
                        class="panel">
                        <div class="panel-container show">
                            <div class="panel-content">
                                <div class="frame-wrap">

                                    <div
                                        class="demo overflow-auto"
                                        data-spy="scroll"
                                        data-target="#spyscroll-1"
                                        data-offset="0"
                                        style="height:355px">

                                        <div
                                            class="custom-control custom-switch"
                                            v-for="(grupo, index) in centrosAtencionGruposTiposAccesos.listaGruposUsuario"
                                            :key="index">
                                            <div>
                                                <input
                                                    type="radio"
                                                    class="custom-control-input"
                                                    :id="'grucod-' + grupo.grucod"
                                                    name="grucod"
                                                    v-model="centroAtencionSeleccionado.grucod"
                                                    :value="grupo.grucod"
                                                    :change="
                                                        centroAtencionSeleccionado.grucod
                                                            ? centroAtencionSeleccionado.grudes = centrosAtencionGruposTiposAccesos.listaGruposUsuario.filter(
                                                                  (ca: any) => ca.grucod === centroAtencionSeleccionado.grucod
                                                              )[0].grudes
                                                            : ''
                                                    " />
                                                <label
                                                    class="custom-control-label cursor-pointer"
                                                    :for="'grucod-' + grupo.grucod">{{ grupo.grudes }}</label>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="modal-footer pt-0">
                    <button
                        type="button"
                        class="btn btn-primary btn-sm"
                        :disabled="centroAtencionSeleccionado.grucod && centroAtencionSeleccionado.grucod.length === 0"
                        @click="aceptarGrupo">Aceptar</button>
                    <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        @click="cancelarGrupo">Cancelar</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script lang='ts'>

import { ref, defineComponent } from 'vue';
import { useStore } from 'vuex';

import useUsuarios from '@/modules/seguridad/composables/useUsuarios';
// import utils from '@/utils/utils';

declare let window: any;

export default defineComponent({
    setup() {
        const store = useStore();

        const {
            obtenerUsuarioCentroYGrupoSami,
            obtieneMedicosNoAsignadosSami,
            grabarModificarUsuarioSAMI,
        } = useUsuarios();

        const centrosAtencionGruposTiposAccesos = ref<any>({});
        const centroAtencionSeleccionado = ref<any>({});

        const medicos = ref<any>([]);

        const seGrabo = ref<boolean>(false);

        const nombreCompletoUsuario = ref<string>('');

        const usuarioInnovoSinUsuarioSAMI = ref<boolean>(false);

        const abrirComponent = async (idUsuario: number, nombreCompleto: any) => {
            let resp = await obtenerUsuarioCentroYGrupoSami(idUsuario);
            if (resp.ok) {
                centrosAtencionGruposTiposAccesos.value = resp.data;
                centrosAtencionGruposTiposAccesos.value.medcod = centrosAtencionGruposTiposAccesos.value.medcod === null
                    ? ''
                    : centrosAtencionGruposTiposAccesos.value.medcod;
                centrosAtencionGruposTiposAccesos.value.IdRegionalSesion = store.getters['auth/getIdRegional'];

                nombreCompletoUsuario.value = nombreCompleto;

                usuarioInnovoSinUsuarioSAMI.value = centrosAtencionGruposTiposAccesos.value.usecod === 0;

                centrosAtencionGruposTiposAccesos.value.estado = usuarioInnovoSinUsuarioSAMI.value
                    ? true
                    : centrosAtencionGruposTiposAccesos.value.estado;

                centrosAtencionGruposTiposAccesos.value.usecod = idUsuario;

                resp = await obtieneMedicosNoAsignadosSami(idUsuario);
                if (resp.ok) {
                    medicos.value = resp.data;
                    await medicos.value.forEach(async(m: any) => {
                        m.id = m.CodMedico;
                        m.text = m.Medico;
                    });

                    window.$('#asignar-permisos-usuario-sami-modal').modal('show');
                }
            }
        }

        const centroAtencionClick = async (centroAtencion: any) => {
            centroAtencion.Habilitado = centroAtencion.Habilitado
                ? false
                : !centroAtencion.Habilitado;
            centroAtencionSeleccionado.value = JSON.parse(JSON.stringify(centroAtencion));
            window.$('#seleccionar-grupo-modal').modal('show');
        }

        const grabar = async () => {
            const resp = await grabarModificarUsuarioSAMI(centrosAtencionGruposTiposAccesos.value);
            if (resp.ok) {
                seGrabo.value = true;
            }
        }

        const cancelar = () => {
            window.$('#asignar-permisos-usuario-sami-modal').modal('hide');

            centrosAtencionGruposTiposAccesos.value = {};
            seGrabo.value = false;
        }

        const aceptarGrupo = async () => {
            // Asignamos el grupo seleccionado al centro de atención.
            centrosAtencionGruposTiposAccesos.value.listaCentrosAtencion.filter(
                (ca: any) => ca.ceacod === centroAtencionSeleccionado.value.ceacod
            )[0].grucod = centroAtencionSeleccionado.value.grucod;
            centrosAtencionGruposTiposAccesos.value.listaCentrosAtencion.filter(
                (ca: any) => ca.ceacod === centroAtencionSeleccionado.value.ceacod
            )[0].grudes = centroAtencionSeleccionado.value.grudes;
            centrosAtencionGruposTiposAccesos.value.listaCentrosAtencion.filter(
                (ca: any) => ca.ceacod === centroAtencionSeleccionado.value.ceacod
            )[0].Habilitado = true;

            window.$('#seleccionar-grupo-modal').modal('hide');
            window.$(document).ready(function() { 
                window.$('#seleccionar-grupo-modal').on('hidden.bs.modal', function () { 
                    window.$("body").addClass("modal-open") 
                }) 
            });
        }

        const cancelarGrupo = async () => {
            centroAtencionSeleccionado.value.grucod = '';
            centroAtencionSeleccionado.value.grudes = '';
            centroAtencionSeleccionado.value.Habilitado = false;

            window.$('#seleccionar-grupo-modal').modal('hide');
            window.$(document).ready(function() { 
                window.$('#seleccionar-grupo-modal').on('hidden.bs.modal', function () { 
                    window.$("body").addClass("modal-open") 
                }) 
            });
        }

        return {
            centroAtencionSeleccionado,            
            centrosAtencionGruposTiposAccesos,
            medicos,
            nombreCompletoUsuario,
            seGrabo,
            usuarioInnovoSinUsuarioSAMI,

            abrirComponent,
            cancelar,
            grabar,
            centroAtencionClick,

            aceptarGrupo,
            cancelarGrupo
        };
    }
});
</script>
