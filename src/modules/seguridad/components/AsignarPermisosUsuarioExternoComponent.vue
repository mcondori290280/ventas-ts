<template>
    <div class="modal fade" tabindex="-1" id="asignar-permisos-usuario-externo-modal" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        Asignación de Permisos Externos: <span class="fw-300"><i>{{ nombreCompletoUsuario }}</i></span>
                    </h5>
                    <button type="button" class="close" aria-label="Close" @click="cancelar">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body pt-0 pb-0">

                    <!-- v-if="!seGrabo" -->
                    <div class="row">
                        <div class="col-xl-6 col-lg-6 col-md-12">
                            <div
                                id="panel-1"
                                class="panel"
                                v-show="opcionActual === SELECCIONAR_EMPRESA">
                                <div class="panel-hdr">
                                    <h2>
                                        Empresas <span class="fw-300"><i>Seleccione</i></span>&nbsp;
                                    </h2>
                                    <ol class="breadcrumb breadcrumb-sm breadcrumb-arrow pt-3 pr-0">
                                        <li class="active">
                                            <a href="javascript:void(0)">
                                                <i class="fal fa-home pr-2"></i>
                                                <span class="hidden-md-down">Empresa</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)">
                                                <i class="fal fa-map-marker pr-2"></i>
                                                <span class="hidden-md-down">Regional</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)">
                                                <i class="fal fa-cogs pr-2"></i>
                                                <span class="hidden-md-down">Rol</span>
                                            </a>
                                        </li>
                                    </ol>
                                </div>
                                <div class="panel-container show">
                                    <div class="panel-content">
                                        <div class="frame-wrap">
                                            <div class="form-row">
                                                <div class="col-xl-12 mb-3">
                                                    <input
                                                        type="text"
                                                        class="form-control form-control-sm"
                                                        id="buscar-empresa"
                                                        name="buscar-empresa"
                                                        autocomplete="off"
                                                        placeholder="Nombre de empresa"
                                                        title="Ingrese el nombre de la empresa y luego presione ENTER."
                                                        v-model.trim="empresaBusqueda"
                                                        @keyup.enter="buscarEmpresas"
                                                        ref="empresaBusquedaRef" />
                                                </div>
                                            </div>

                                            <div
                                                class="demo overflow-auto"
                                                data-spy="scroll"
                                                data-target="#spyscroll-1"
                                                data-offset="0"
                                                style="height:365px">

                                                <div
                                                    class="custom-control custom-switch"
                                                    v-for="(empresa, index) in empresas"
                                                    :key="index">
                                                    <input
                                                        type="radio"
                                                        class="custom-control-input"
                                                        :id="'empresa_'  + empresa.numpat"
                                                        name="numpat"
                                                        v-model="empresaRegionalRolForm.numpat"
                                                        :value="empresa.numpat"
                                                        @change="seSeleccionoEmpresa"
                                                        @click="seSeleccionoEmpresa" />
                                                    <label
                                                        class="custom-control-label cursor-pointer"
                                                        :for="'empresa_' + empresa.numpat">{{ empresa.conraz }}</label>
                                                </div>
                                            </div>

                                            <!-- <div class="row mt-3">
                                                <div class="col-xl-12">
                                                    <div class="float-right">
                                                        <button
                                                            type="button"
                                                            class="btn btn-default btn-sm"
                                                            title="Continuar con la selección de la Regional"
                                                            :disabled="empresaRegionalRolForm.numpat === ''"
                                                            @click="opcionActual = SELECCIONAR_REGIONAL">
                                                            <i class="fal fa-check"></i>
                                                            <span class="d-none d-sm-block float-right ml-1">Empresa</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div> -->
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                id="panel-1"
                                class="panel"
                                v-show="opcionActual === SELECCIONAR_REGIONAL">
                                <div class="panel-hdr">
                                    <h2>
                                        Regionales <span class="fw-300"><i>Seleccione</i></span>&nbsp;
                                    </h2>
                                    <ol
                                        class="breadcrumb breadcrumb-sm breadcrumb-arrow pt-3 pr-0"
                                        v-if="empresaRegionalRolForm.numpat.length > 0">
                                        <li>
                                            <a
                                                href="javascript:void(0)"
                                                :title="empresas.filter(e => e.numpat === empresaRegionalRolForm.numpat)[0].conraz"
                                                @click="empresaClick">
                                                <i class="fal fa-home pr-2"></i>
                                                <span class="hidden-md-down">Empresa</span>
                                            </a>
                                        </li>
                                        <li class="active">
                                            <a href="javascript:void(0)">
                                                <i class="fal fa-map-marker pr-2"></i>
                                                <span class="hidden-md-down">Regional</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)">
                                                <i class="fal fa-cogs pr-2"></i>
                                                <span class="hidden-md-down">Rol</span>
                                            </a>
                                        </li>
                                    </ol>
                                </div>
                                <div class="panel-container show">
                                    <div class="panel-content">
                                        <div class="frame-wrap">
                                            <div
                                                class="demo overflow-auto"
                                                data-spy="scroll"
                                                data-target="#spyscroll-1"
                                                data-offset="0"
                                                style="height:412px">
                                                <div
                                                    class="custom-control custom-switch"
                                                    v-for="(er, index) in empresaRegionales"
                                                    :key="index">
                                                    <!-- <input
                                                        type="radio"
                                                        class="custom-control-input"
                                                        :id="'empresa_'  + er.concod"
                                                        name="concod"
                                                        v-model="empresaRegionalRolForm.IdRegional"
                                                        :value="er.IdRegional"
                                                        @change="seSeleccionoRegional"
                                                        @click="seSeleccionoRegional" /> -->
                                                    <input
                                                        type="radio"
                                                        class="custom-control-input"
                                                        :id="'empresa_'  + er.concod"
                                                        name="concod"
                                                        :value="er.IdRegional"
                                                        @click="seSeleccionoRegional(er.IdRegional)" />
                                                    <label
                                                        class="custom-control-label cursor-pointer"
                                                        :for="'empresa_' + er.concod">{{ er.NombreRegional }}</label>
                                                </div>
                                            </div>

                                            <!-- <div class="row mt-3">
                                                <div class="col-xl-12">
                                                    <div class="float-right">
                                                        <button
                                                            type="button"
                                                            class="btn btn-default btn-sm"
                                                            title="Continuar con la selección del Rol"
                                                            :disabled="empresaRegionalRolForm.numpat === '' || empresaRegionalRolForm.IdRegional === 0"
                                                            @click="opcionActual = SELECCIONAR_ROL">
                                                            <i class="fal fa-check"></i>
                                                            <span class="d-none d-sm-block float-right ml-1">Regional</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div> -->
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                id="panel-2"
                                class="panel"
                                v-show="opcionActual === SELECCIONAR_ROL">
                                <div class="panel-hdr">
                                    <h2>
                                        Roles <span class="fw-300"><i>Seleccione</i></span>
                                    </h2>
                                    <ol
                                        class="breadcrumb breadcrumb-sm breadcrumb-arrow pt-3 pr-0"
                                        v-if="empresaRegionalRolForm.numpat.length > 0 && empresaRegionalRolForm.IdRegional > 0">
                                        <li>
                                            <a
                                                href="javascript:void(0)"
                                                :title="empresas.filter(e => e.numpat === empresaRegionalRolForm.numpat)[0].conraz"
                                                @click="empresaClick">
                                                <i class="fal fa-home pr-2"></i>
                                                <span class="hidden-md-down">Empresa</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="javascript:void(0)"
                                                :title="empresaRegionales.filter(er => er.IdRegional === empresaRegionalRolForm.IdRegional)[0].NombreRegional"
                                                @click="regionalClick">
                                                <i class="fal fa-map-marker pr-2"></i>
                                                <span class="hidden-md-down">Regional</span>
                                            </a>
                                        </li>
                                        <li class="active">
                                            <a href="javascript:void(0)">
                                                <i class="fal fa-cogs pr-2"></i>
                                                <span class="hidden-md-down">Rol</span>
                                            </a>
                                        </li>
                                    </ol>
                                </div>
                                <div class="panel-container show">
                                    <div class="panel-content">
                                        <div class="frame-wrap">
                                            <div
                                                class="demo overflow-auto"
                                                data-spy="scroll"
                                                data-target="#spyscroll-1"
                                                data-offset="0"
                                                style="height:365px">
                                                <div
                                                    class="custom-control custom-switch"
                                                    v-for="(err, index) in empresaRegionalRoles"
                                                    :key="index">
                                                    <input
                                                        type="checkbox"
                                                        class="custom-control-input"
                                                        :id="'rol-' + err.IdRol"
                                                        :name="'rol-' + err.IdRol"
                                                        v-model="err.seleccionado">
                                                    <label
                                                        class="custom-control-label"
                                                        :for="'rol-' + err.IdRol">{{ err.NombreRol }}</label>
                                                </div>
                                            </div>

                                            <div class="row mt-3">
                                                <div class="col-xl-12">
                                                    <div class="float-right">
                                                        <button
                                                            type="button"
                                                            class="btn btn-default btn-sm"
                                                            @click="adicionar"
                                                            title="Adicionar Rol"
                                                            :disabled="seGrabo || empresaRegionalRolForm.numpat === '' || empresaRegionalRolForm.IdRegional === 0 || empresaRegionalRoles.filter(r => r.seleccionado).length === 0">
                                                            <i class="fal fa-plus"></i>
                                                            <span class="d-none d-sm-block float-right ml-1">Adicionar</span>
                                                        </button>
                                                    </div>
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
                                        Empresas, Regionales y Roles <span class="fw-300"><i>Asignados</i></span>
                                    </h2>
                                </div>
                                <div class="panel-container show">
                                    <div class="panel-content">
                                        <div
                                            class="demo overflow-auto"
                                            data-spy="scroll"
                                            data-target="#spyscroll-1"
                                            data-offset="0"
                                            style="height:425px">

                                            <ul
                                                style="list-style-type:none;line-height:1.8em;"
                                                class="pl-3">
                                                <tree-item-component
                                                    :item="usuarioEmpresasRegionalesRoles"
                                                    :seGrabo="seGrabo"
                                                    @delete-item="eliminarItemEmit" />
                                            </ul>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="col-xl-4">
                            <div id="panel-1" class="panel">
                                <div class="panel-hdr">
                                    <h2>
                                        Empresas, Regionales y Roles <span class="fw-300"><i>Asignados</i></span>&nbsp;
                                    </h2>
                                </div>
                                <div class="panel-container show">
                                    <div class="panel-content">
                                        <div
                                            class="demo overflow-auto"
                                            data-spy="scroll"
                                            data-target="#spyscroll-1"
                                            data-offset="0"
                                            style="height:280px">

                                            <pre>{{ usuarioEmpresasRegionalesRoles }}</pre>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                    </div>

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
</template>

<script lang='ts'>

import { ref, defineComponent, defineAsyncComponent } from 'vue';

import useUsuarios from '@/modules/seguridad/composables/useUsuarios';
import utils from '@/utils/utils';

declare let window: any;

export default defineComponent({
    components: {
        TreeItemComponent: defineAsyncComponent(
            () => import('@/modules/system/components/TreeItemComponent.vue')
        ),
    },
    setup() {
        const {
            buscarEmpresasUsuarioExterno,
            obtenerRolesPorRegionalExterno,
            obtenerEmpresasRegionalesRolesUsuarioExterno,
            grabarEmpresasRegionalesRolesUsuarioExterno,
        } = useUsuarios();

        const SELECCIONAR_EMPRESA = 0;
        const SELECCIONAR_REGIONAL = 1;
        const SELECCIONAR_ROL = 2;
        const opcionActual = ref<any>(SELECCIONAR_EMPRESA);

        const empresas = ref<any>([]);
        const empresaRegionales = ref<any>([]);
        const empresaRegionalRoles = ref<any>([]);

        const empresaBusqueda = ref<string>('');
        const empresaBusquedaRef = ref<any>();

        const empresaRegionalRolForm = ref<any>({
            numpat: '',
            IdRegional: 0,
        });
        const usuarioEmpresasRegionalesRoles = ref<any>({});

        const seGrabo = ref<boolean>(false);

        const nombreCompletoUsuario = ref<string>('');

        let idEmpresaAnteriorSeleccionado = '';
        let idRegionalAnteriorSeleccionado = -1;

        const abrirComponent = async (idUsuario: number, estado: boolean, nombreCompleto: any) => {
            const resp = await obtenerEmpresasRegionalesRolesUsuarioExterno(idUsuario);
            if (resp.ok) {
                usuarioEmpresasRegionalesRoles.value = resp.data;

                window.$('#asignar-permisos-usuario-externo-modal').modal('show');

                usuarioEmpresasRegionalesRoles.value.name = "EMPRESAS, REGIONALES Y ROLES, <span class='fw-300'><i>Asignados</i>";
                usuarioEmpresasRegionalesRoles.value.IdUsuario = idUsuario;
                usuarioEmpresasRegionalesRoles.value.Estado = estado;

                await asignarChildrens();

                nombreCompletoUsuario.value = nombreCompleto;

                setTimeout(() => {
                    empresaBusquedaRef.value.focus();
                }, 500);
            }

            idEmpresaAnteriorSeleccionado = '';
            idRegionalAnteriorSeleccionado = -1;
        }

        const asignarChildrens = async () => {
            const children: any = [];

            // Childrens de empresas.
            usuarioEmpresasRegionalesRoles.value.EmpresasSAMI.forEach((empresa: any) => {
                empresa.conest = '';
                children.push({
                    name:       empresa.conraz,
                    numpat:     empresa.numpat,
                    IdRegional: 0,
                    IdRol:      0,
                    tipo:       'empresa',

                    children:   [],
                });
            });

            // Childrens de regionales.
            usuarioEmpresasRegionalesRoles.value.EmpresasSAMI.forEach((empresa: any) => {
                empresa.regionalesSAMI.forEach((regional: any) => {
                    children.filter((e: any) => e.numpat === empresa.numpat)[0].children.push({
                        name:       regional.NombreRegional,
                        numpat:     empresa.numpat,
                        IdRegional: regional.IdRegional,
                        IdRol:      0,
                        tipo:       'regional',

                        children:   [],
                    });
                });
            });

            // Childrens de roles.
            usuarioEmpresasRegionalesRoles.value.EmpresasSAMI.forEach((empresa: any) => {
                empresa.regionalesSAMI.forEach((regional: any) => {
                    regional.Roles.forEach((rol: any) => {
                         children.filter((e: any) => e.numpat === empresa.numpat)[0].children.filter((r: any) => r.IdRegional === regional.IdRegional)[0].children.push({
                            name:       rol.NombreRol,
                            numpat:     empresa.numpat,
                            IdRegional: regional.IdRegional,
                            IdRol:      rol.IdRol,
                            tipo:       'rol'
                        });
                    });
                });
            });

            usuarioEmpresasRegionalesRoles.value.children = children;
        }

        const grabar = async () => {
            const resp = await grabarEmpresasRegionalesRolesUsuarioExterno(usuarioEmpresasRegionalesRoles.value);
            if (resp.ok) {
                seGrabo.value = true;

                idEmpresaAnteriorSeleccionado = '';
                idRegionalAnteriorSeleccionado = -1;
            } 
        }

        const cancelar = () => {
            window.$('#asignar-permisos-usuario-externo-modal').modal('hide');

            empresas.value = [];
            empresaRegionales.value = [];
            empresaRegionalRoles.value = [];
            empresaBusqueda.value = '';
            empresaRegionalRolForm.value = {
                numpat: '',
                IdRegional: 0,
            };
            usuarioEmpresasRegionalesRoles.value = {};
            seGrabo.value = false;
            opcionActual.value = SELECCIONAR_EMPRESA;
        }

        const buscarEmpresas = async () => {
            if (empresaBusqueda.value.trim().length > 0) {
                empresas.value = [];
                empresaRegionales.value = [];
                empresaRegionalRoles.value = [];
                empresaRegionalRolForm.value = {
                    numpat: '',
                    IdRegional: 0,
                };

                const resp = await buscarEmpresasUsuarioExterno(empresaBusqueda.value);
                if (resp.ok) {
                    empresas.value = resp.data;
                }
            }
        }

        const seSeleccionoEmpresa = () => {
            if (idEmpresaAnteriorSeleccionado !== empresaRegionalRolForm.value.numpat) {
                empresaRegionalRolForm.value.IdRegional = 0;
                empresaRegionales.value = [];
                empresaRegionalRoles.value = [];

                empresaRegionales.value = empresas.value.filter(
                    (e: any) => e.numpat === empresaRegionalRolForm.value.numpat
                )[0].regionalesSAMI;

                idEmpresaAnteriorSeleccionado = empresaRegionalRolForm.value.numpat;

                opcionActual.value = SELECCIONAR_REGIONAL;
            } else {
                opcionActual.value = SELECCIONAR_REGIONAL;
            }
        }

        const seSeleccionoRegional = async (idRegional: number) => {
            empresaRegionalRolForm.value.IdRegional = idRegional;
            if (idRegionalAnteriorSeleccionado !== empresaRegionalRolForm.value.IdRegional) {
                empresaRegionalRoles.value = [];

                const resp = await obtenerRolesPorRegionalExterno(empresaRegionalRolForm.value.IdRegional);
                if (resp.ok) {
                    empresaRegionalRoles.value = resp.data;
                    for(let i = 0; i < empresaRegionalRoles.value.length; i++) {
                        empresaRegionalRoles.value[i].seleccionado = false;
                    }

                    opcionActual.value = SELECCIONAR_ROL;
                }
            } else {
                opcionActual.value = SELECCIONAR_ROL;
            }
        }

        const adicionar = () => {
            // Agergamos la empresa.
            if (!usuarioEmpresasRegionalesRoles.value.EmpresasSAMI) {
                usuarioEmpresasRegionalesRoles.value.EmpresasSAMI = [];

                usuarioEmpresasRegionalesRoles.value.children = [];
            }
            let indiceEmpresa = 0;
            if (usuarioEmpresasRegionalesRoles.value.EmpresasSAMI.filter((e:any) => e.numpat === empresaRegionalRolForm.value.numpat).length === 0) {
                usuarioEmpresasRegionalesRoles.value.EmpresasSAMI.push(
                    {
                        numpat: empresas.value.filter((e: any) => e.numpat === empresaRegionalRolForm.value.numpat)[0].numpat,
                        conraz: empresas.value.filter((e: any) => e.numpat === empresaRegionalRolForm.value.numpat)[0].conraz,
                        conest: empresas.value.filter((e: any) => e.numpat === empresaRegionalRolForm.value.numpat)[0].conest,
                    }
                );

                usuarioEmpresasRegionalesRoles.value.children.push(
                    {
                        name:       empresas.value.filter((e: any) => e.numpat === empresaRegionalRolForm.value.numpat)[0].conraz,
                        numpat:     empresas.value.filter((e: any) => e.numpat === empresaRegionalRolForm.value.numpat)[0].numpat,
                        IdRegional: 0,
                        IdRol:      0,
                        tipo:       'empresa'
                    }
                );

                indiceEmpresa = usuarioEmpresasRegionalesRoles.value.EmpresasSAMI.length - 1;
            } else {
                indiceEmpresa = usuarioEmpresasRegionalesRoles.value.EmpresasSAMI.findIndex((e: any) => e.numpat === empresaRegionalRolForm.value.numpat);
            }

            // Agregamos la regional.
            if(!usuarioEmpresasRegionalesRoles.value.EmpresasSAMI[indiceEmpresa].regionalesSAMI) {
                usuarioEmpresasRegionalesRoles.value.EmpresasSAMI[indiceEmpresa].regionalesSAMI = [];

                usuarioEmpresasRegionalesRoles.value.children[indiceEmpresa].children = [];
            }
            let indiceRegional = 0;
            if (usuarioEmpresasRegionalesRoles.value.EmpresasSAMI[indiceEmpresa].regionalesSAMI.filter((r:any) => r.IdRegional === empresaRegionalRolForm.value.IdRegional).length === 0) {
                usuarioEmpresasRegionalesRoles.value.EmpresasSAMI[indiceEmpresa].regionalesSAMI.push(
                    {
                        numpat:         empresaRegionales.value.filter((r: any) => r.IdRegional === empresaRegionalRolForm.value.IdRegional)[0].numpat,
                        concod:         empresaRegionales.value.filter((r: any) => r.IdRegional === empresaRegionalRolForm.value.IdRegional)[0].concod,
                        IdRegional:     empresaRegionales.value.filter((r: any) => r.IdRegional === empresaRegionalRolForm.value.IdRegional)[0].IdRegional,
                        constd:         empresaRegionales.value.filter((r: any) => r.IdRegional === empresaRegionalRolForm.value.IdRegional)[0].constd,
                        NombreRegional: empresaRegionales.value.filter((r: any) => r.IdRegional === empresaRegionalRolForm.value.IdRegional)[0].NombreRegional,
                    }
                );

                usuarioEmpresasRegionalesRoles.value.children[indiceEmpresa].children.push(
                    {
                        name:       empresaRegionales.value.filter((r: any) => r.IdRegional === empresaRegionalRolForm.value.IdRegional)[0].NombreRegional,
                        numpat:     empresas.value.filter((e: any) => e.numpat === empresaRegionalRolForm.value.numpat)[0].numpat,
                        IdRegional: empresaRegionales.value.filter((r: any) => r.IdRegional === empresaRegionalRolForm.value.IdRegional)[0].IdRegional,
                        IdRol:      0,
                        tipo:       'regional'
                    }
                );

                indiceRegional = usuarioEmpresasRegionalesRoles.value.EmpresasSAMI[indiceEmpresa].regionalesSAMI.length - 1;
            } else {
                indiceRegional = usuarioEmpresasRegionalesRoles.value.EmpresasSAMI[indiceEmpresa].regionalesSAMI.findIndex((r: any) => r.IdRegional === empresaRegionalRolForm.value.IdRegional);
            }

            // Agregamos el rol.
            empresaRegionalRoles.value.forEach((errSeleccionado: any) => {
                if (errSeleccionado.seleccionado) {
                    if(!usuarioEmpresasRegionalesRoles.value.EmpresasSAMI[indiceEmpresa].regionalesSAMI[indiceRegional].Roles) {
                        usuarioEmpresasRegionalesRoles.value.EmpresasSAMI[indiceEmpresa].regionalesSAMI[indiceRegional].Roles = [];

                        usuarioEmpresasRegionalesRoles.value.children[indiceEmpresa].children[indiceRegional].children = [];
                    }
                    if (usuarioEmpresasRegionalesRoles.value.EmpresasSAMI[indiceEmpresa].regionalesSAMI[indiceRegional].Roles.filter((r:any) => r.IdRol === errSeleccionado.IdRol).length === 0) {
                        usuarioEmpresasRegionalesRoles.value.EmpresasSAMI[indiceEmpresa].regionalesSAMI[indiceRegional].Roles.push(
                            {
                                IdRol:          errSeleccionado.IdRol,
                                NombreRol:      errSeleccionado.NombreRol,
                                DescripcionRol: errSeleccionado.DescripcionRol,
                                Estado:         errSeleccionado.Estado,
                            }
                        );

                        usuarioEmpresasRegionalesRoles.value.children[indiceEmpresa].children[indiceRegional].children.push(
                            {
                                name:       errSeleccionado.NombreRol,
                                numpat:     empresas.value.filter((e: any) => e.numpat === empresaRegionalRolForm.value.numpat)[0].numpat,
                                IdRegional: empresaRegionales.value.filter((r: any) => r.IdRegional === empresaRegionalRolForm.value.IdRegional)[0].IdRegional,
                                IdRol:      errSeleccionado.IdRol,
                                tipo:       'rol'
                            }
                        );
                    }
                }
            });

            empresaRegionalRoles.value.forEach((err: any) => {
                err.seleccionado = false;
            });
        }

        const eliminarItemEmit = async (item: any) => {
            const mensaje = '¿Está seguro de eliminar ' + (
                item.tipo === 'empresa'
                    ? 'la empresa seleccionada y todas sus regionales y roles relacionados?'
                    : item.tipo === 'regional'
                        ? 'la regional seleccionada y todos los roles relacionados?'
                        : 'el rol seleccionado?'
            );
            const resp = await utils.mensajePregunta(mensaje);
            let indice;
            if (resp) {
                switch (item.tipo) {
                    case 'empresa':
                        // Buscamos el índice de la empresa a eliminar.
                        indice = usuarioEmpresasRegionalesRoles.value.children.findIndex(
                            (empresa: any) => empresa.numpat === item.numpat
                        );

                        // Eliminamos la empresa.
                        usuarioEmpresasRegionalesRoles.value.children.splice(indice, 1);
                        usuarioEmpresasRegionalesRoles.value.EmpresasSAMI.splice(indice, 1);
                        break;
                    case 'regional':
                        // Buscamos el índice de la regional a eliminar.
                        indice = usuarioEmpresasRegionalesRoles.value.children.filter(
                            (empresa: any) => empresa.numpat === item.numpat
                        )[0].children.findIndex(
                            (regional: any) => regional.IdRegional === item.IdRegional
                        );

                        // Eliminamos la regional.
                        usuarioEmpresasRegionalesRoles.value.children.filter(
                            (empresa: any) => empresa.numpat === item.numpat
                        )[0].children.splice(indice, 1);
                        usuarioEmpresasRegionalesRoles.value.EmpresasSAMI.filter(
                            (empresa: any) => empresa.numpat === item.numpat
                        )[0].regionalesSAMI.splice(indice, 1);

                        // Si ya no existe regionales, se elimina la empresa.
                        if (usuarioEmpresasRegionalesRoles.value.children.filter(
                                (empresa: any) => empresa.numpat === item.numpat
                            )[0].children.length === 0
                        ) {
                            // Buscamos el índice de la empresa a eliminar.
                            indice = usuarioEmpresasRegionalesRoles.value.children.findIndex(
                                (empresa: any) => empresa.numpat === item.numpat
                            );

                            // Eliminamos la empresa.
                            usuarioEmpresasRegionalesRoles.value.children.splice(indice, 1);
                            usuarioEmpresasRegionalesRoles.value.EmpresasSAMI.splice(indice, 1);
                        }
                        break;
                    case 'rol':
                        // Buscamos el índice del rol a eliminar.
                        indice = usuarioEmpresasRegionalesRoles.value.children.filter(
                            (empresa: any) => empresa.numpat === item.numpat
                        )[0].children.filter(
                            (regional: any) => regional.IdRegional === item.IdRegional
                        )[0].children.findIndex(
                            (rol: any) => rol.IdRol === item.IdRol
                        );

                        // Eliminamos el rol.
                        usuarioEmpresasRegionalesRoles.value.children.filter(
                            (empresa: any) => empresa.numpat === item.numpat
                        )[0].children.filter(
                            (regional: any) => regional.IdRegional === item.IdRegional
                        )[0].children.splice(indice, 1);
                        usuarioEmpresasRegionalesRoles.value.EmpresasSAMI.filter(
                            (empresa: any) => empresa.numpat === item.numpat
                        )[0].regionalesSAMI.filter(
                            (regional: any) => regional.IdRegional === item.IdRegional
                        )[0].Roles.splice(indice, 1);

                        // Si ya no existe roles, se elimina la regional.
                        if (usuarioEmpresasRegionalesRoles.value.children.filter(
                                (empresa: any) => empresa.numpat === item.numpat
                            )[0].children.filter(
                                (regional: any) => regional.IdRegional === item.IdRegional
                            )[0].children.length === 0
                        ) {
                            // Buscamos el índice de la regional a eliminar.
                            indice = usuarioEmpresasRegionalesRoles.value.children.filter(
                                (empresa: any) => empresa.numpat === item.numpat
                            )[0].children.findIndex(
                                (regional: any) => regional.IdRegional === item.IdRegional
                            );

                            // Eliminamos la regional.
                            usuarioEmpresasRegionalesRoles.value.children.filter(
                                (empresa: any) => empresa.numpat === item.numpat
                            )[0].children.splice(indice, 1);
                            usuarioEmpresasRegionalesRoles.value.EmpresasSAMI.filter(
                                (empresa: any) => empresa.numpat === item.numpat
                            )[0].regionalesSAMI.splice(indice, 1);
                        }

                        // Si ya no existe regionales, se elimina la empresa.
                        if (usuarioEmpresasRegionalesRoles.value.children.filter(
                                (empresa: any) => empresa.numpat === item.numpat
                            )[0].children.length === 0
                        ) {
                            // Buscamos el índice de la empresa a eliminar.
                            indice = usuarioEmpresasRegionalesRoles.value.children.findIndex(
                                (empresa: any) => empresa.numpat === item.numpat
                            );

                            // Eliminamos la empresa.
                            usuarioEmpresasRegionalesRoles.value.children.splice(indice, 1);
                            usuarioEmpresasRegionalesRoles.value.EmpresasSAMI.splice(indice, 1);
                        }
                        break;
                }
            }
        }

        const empresaClick = () => {
            if (!seGrabo.value) {
                // empresaRegionalRolForm.value.numpat = '';
                // empresaRegionalRolForm.value.IdRegional = 0;
                // empresaRegionalRoles.value = [];

                opcionActual.value = SELECCIONAR_EMPRESA;
            }
        }

        const regionalClick = () => {
            if (!seGrabo.value) {
                // empresaRegionalRolForm.value.IdRegional = 0;
                // empresaRegionalRoles.value = [];

                opcionActual.value = SELECCIONAR_REGIONAL;
            }
        }

        return {
            nombreCompletoUsuario,
            empresaBusqueda,
            empresaRegionales,
            empresaRegionalRoles,
            empresaRegionalRolForm,
            empresas,
            opcionActual,
            seGrabo,
            SELECCIONAR_EMPRESA,
            SELECCIONAR_REGIONAL,
            SELECCIONAR_ROL,
            usuarioEmpresasRegionalesRoles,

            empresaBusquedaRef,

            abrirComponent,
            adicionar,
            buscarEmpresas,
            cancelar,
            eliminarItemEmit,
            empresaClick,
            grabar,
            regionalClick,
            seSeleccionoEmpresa,
            seSeleccionoRegional,
        };
    }
});
</script>
