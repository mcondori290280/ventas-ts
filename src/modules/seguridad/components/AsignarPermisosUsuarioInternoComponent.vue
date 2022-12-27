<template>
    <div class="modal fade" tabindex="-1" id="asignar-permisos-usuario-interno-modal" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        Asignación de Permisos Internos: <span class="fw-300"><i>{{ nombreCompletoUsuario }}</i></span>
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
                                v-show="opcionActual === SELECCIONAR_ROL">
                                <div class="panel-hdr">
                                    <h2>
                                        Roles <span class="fw-300"><i>Seleccione</i></span>&nbsp;
                                    </h2>
                                    <ol class="breadcrumb breadcrumb-sm breadcrumb-arrow pt-3 pr-0">
                                        <li class="active">
                                            <a href="javascript:void(0)">
                                                <i class="fal fa-home pr-2"></i>
                                                <span class="hidden-md-down">Roles</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="javascript:void(0)"
                                                @click="regionalClick">
                                                <i class="fal fa-map-marker pr-2"></i>
                                                <span class="hidden-md-down">Regional</span>
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
                                                style="height:404px">

                                                <div
                                                    class="custom-control custom-switch"
                                                    v-for="(rol, index) in roles"
                                                    :key="index">
                                                    <input
                                                        type="radio"
                                                        class="custom-control-input"
                                                        :id="'rol-'  + rol.IdRol"
                                                        name="id-rol"
                                                        v-model="rolRegionalForm.IdRol"
                                                        :value="rol.IdRol"
                                                        @change="seSeleccionoRol"
                                                        @click="seSeleccionoRol" />
                                                    <label
                                                        class="custom-control-label cursor-pointer"
                                                        :for="'rol-' + rol.IdRol">{{ rol.NombreRol }}</label>
                                                </div>
                                            </div>

                                            <!-- <div class="row mt-3">
                                                <div class="col-xl-12">
                                                    <div class="float-right">
                                                        <button
                                                            type="button"
                                                            class="btn btn-default btn-sm"
                                                            title="Continuar con la selección de la Regional"
                                                            :disabled="rolRegionalForm.IdRol === 0"
                                                            @click="opcionActual = SELECCIONAR_REGIONAL">
                                                            <i class="fal fa-check"></i>
                                                            <span class="d-none d-sm-block float-right ml-1">Rol</span>
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
                                        v-if="rolRegionalForm.IdRol > 0">
                                        <li>
                                            <a
                                                href="javascript:void(0)"
                                                :title="roles.filter((e) => e.IdRol === rolRegionalForm.IdRol)[0].NombreRol"
                                                @click="rolClick">
                                                <i class="fal fa-home pr-2"></i>
                                                <span class="hidden-md-down">Rol</span>
                                            </a>
                                        </li>
                                        <li class="active">
                                            <a href="javascript:void(0)">
                                                <i class="fal fa-map-marker pr-2"></i>
                                                <span class="hidden-md-down">Regional</span>
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
                                                style="height:356px">
                                                <div
                                                    class="custom-control custom-switch"
                                                    v-for="(r, index) in regionales"
                                                    :key="index">
                                                    <input
                                                        type="checkbox"
                                                        class="custom-control-input"
                                                        :id="'regional_' + r.IdRegional"
                                                        :name="'regional_' + r.IdRegional"
                                                        v-model="r.seleccionado">
                                                    <label
                                                        class="custom-control-label"
                                                        :for="'regional_' + r.IdRegional">{{ r.NombreRegional }}</label>
                                                </div>
                                               
                                            </div>
                                            <div class="row">
                                                <div class="col-xl-12">
                                                    <div class="float-center">
                                                        <button
                                                            type="button"
                                                            class="btn btn-default btn-sm mr-2"
                                                            @click="seleccionarTodo(true)"
                                                            title="Seleccionar todas la regionales"
                                                            :disabled="seGrabo || rolRegionalForm.IdRol === 0 ">
                                                            Seleccionar todo
                                                        </button>
                                                        <button
                                                            type="button"
                                                            class="btn btn-default btn-sm"
                                                            @click="seleccionarTodo(false)"
                                                            title="No seleccionar nada"
                                                            :disabled="seGrabo || rolRegionalForm.IdRol === 0 ">
                                                            No marcar nada
                                                        </button>
                                                    </div>
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
                                                            :disabled="seGrabo || rolRegionalForm.IdRol === 0 || regionales.filter((r) => r.seleccionado).length === 0">
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
                                        Roles y Regionales <span class="fw-300"><i>Asignados</i></span>
                                    </h2>
                                </div>
                                <div class="panel-container show">
                                    <div class="panel-content">
                                        <div
                                            class="demo overflow-auto"
                                            data-spy="scroll"
                                            data-target="#spyscroll-1"
                                            data-offset="0"
                                            style="height:416px">

                                            <ul
                                                style="list-style-type:none;line-height:1.8em;"
                                                class="pl-3">
                                                <tree-item-component
                                                    :item="usuarioRolesRegionales"
                                                    :seGrabo="seGrabo"
                                                    @delete-item="eliminarItemEmit" />
                                            </ul>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--
                        <div class="col-xl-4">
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

                                            <pre>{{ usuarioRolesRegionales.children }}</pre>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        -->
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
            obtenerRolesUsuarioInterno,
            obtenerRegionalDelRolesInterno,
            obtenerRolesRegionalesUsuarioInterno,
            grabarRolesRegionalesUsuarioInterno,
        } = useUsuarios();

        const SELECCIONAR_ROL = 0;
        const SELECCIONAR_REGIONAL = 1;
        const opcionActual = ref<any>(SELECCIONAR_ROL);

        const roles = ref<any>([]);
        const regionales = ref<any>([]);

        const rolRegionalForm = ref<any>({
            IdRol: 0,
        });
        const usuarioRolesRegionales = ref<any>({});

        const seGrabo = ref<boolean>(false);

        const nombreCompletoUsuario = ref<string>('');

        let idRolAnteriorSeleccionado = 0;

        const abrirComponent = async (idUsuario: number, estado: boolean, nombreCompleto: any) => {
            const resp = await obtenerRolesRegionalesUsuarioInterno(idUsuario);
            if (resp.ok) {
                usuarioRolesRegionales.value = resp.data;
                usuarioRolesRegionales.value.estado = estado;
                usuarioRolesRegionales.value.name = "ROLES Y REGIONALES, <span class='fw-300'><i>Asignados</i>";

                await asignarChildrens();

                nombreCompletoUsuario.value = nombreCompleto;

                window.$('#asignar-permisos-usuario-interno-modal').modal('show');
            }

            const respRolesInternos = await obtenerRolesUsuarioInterno();
            if (respRolesInternos.ok) {
                roles.value = respRolesInternos.data;
            }

            idRolAnteriorSeleccionado = 0;
        }

        const asignarChildrens = async () => {
            const children: any = [];

            // Childrens de roles.
            usuarioRolesRegionales.value.Roles.forEach((rol: any) => {
                children.push({
                    name:       rol.NombreRol,
                    IdRol:      rol.IdRol,
                    IdRegional: -1,
                    tipo:       'rol',

                    children:   [],
                });
            });

            // Childrens de regionales.
            usuarioRolesRegionales.value.Roles.forEach((rol: any) => {
                rol.regionales.forEach((regional: any) => {
                    children.filter((r: any) => r.IdRol === rol.IdRol)[0].children.push({
                        name:       regional.NombreRegional,
                        IdRegional: regional.IdRegional,
                        IdRol:      rol.IdRol,
                        tipo:       'regional',

                        children:   [],
                    });
                });
            });

            usuarioRolesRegionales.value.children = children;
        }

        const seSeleccionoRol = async () => {
            if (idRolAnteriorSeleccionado !== rolRegionalForm.value.IdRol) {
                regionales.value = [];

                // Buscar las regionales del rol seleccionado.
                const resp = await obtenerRegionalDelRolesInterno(rolRegionalForm.value.IdRol);
                if (resp.ok) {
                    regionales.value = resp.data;
                    regionales.value.forEach((r: any) => {
                        r.seleccionado = false;
                    });

                    opcionActual.value = SELECCIONAR_REGIONAL;
                }

                idRolAnteriorSeleccionado = rolRegionalForm.value.IdRol;
            } else {
                opcionActual.value = SELECCIONAR_REGIONAL;
            }
        }

        const rolClick = async () => {
            if (!seGrabo.value) {
                // rolRegionalForm.value.IdRol = 0;
                // regionales.value = [];

                opcionActual.value = SELECCIONAR_ROL;
            }
        }

        const regionalClick = async () => {
            if (!seGrabo.value
                && regionales.value.filter((r: any) => r.seleccionado).length > 0) {
                opcionActual.value = SELECCIONAR_REGIONAL;
            }
        }

        const adicionar = () => {
            // Agregamos la empresa.
            if (!usuarioRolesRegionales.value.Roles) {
                usuarioRolesRegionales.value.Roles = [];

                usuarioRolesRegionales.value.children = [];
            } else if (usuarioRolesRegionales.value.Roles && !usuarioRolesRegionales.value.children) {
                usuarioRolesRegionales.value.children = [];
            }
            let indiceRol = 0;
            if (usuarioRolesRegionales.value.Roles.filter((r:any) => r.IdRol === rolRegionalForm.value.IdRol).length === 0) {
                usuarioRolesRegionales.value.Roles.push(
                    {
                        IdRol:     roles.value.filter((r: any) => r.IdRol === rolRegionalForm.value.IdRol)[0].IdRol,
                        NombreRol: roles.value.filter((r: any) => r.IdRol === rolRegionalForm.value.IdRol)[0].NombreRol,
                    }
                );

                usuarioRolesRegionales.value.children.push(
                    {
                        name:       roles.value.filter((r: any) => r.IdRol === rolRegionalForm.value.IdRol)[0].NombreRol,
                        IdRol:      roles.value.filter((r: any) => r.IdRol === rolRegionalForm.value.IdRol)[0].IdRol,
                        IdRegional: -1,
                        tipo:       'rol'
                    }
                );

                indiceRol = usuarioRolesRegionales.value.Roles.length - 1;
            } else {
                indiceRol = usuarioRolesRegionales.value.Roles.findIndex((r: any) => r.IdRol === rolRegionalForm.value.IdRol);
            }

            // Agregamos la regional.
            regionales.value.forEach((regionalSeleccionada: any) => {
                if (regionalSeleccionada.seleccionado) {
                    if(!usuarioRolesRegionales.value.Roles[indiceRol].regionales) {
                        usuarioRolesRegionales.value.Roles[indiceRol].regionales = [];

                        usuarioRolesRegionales.value.children[indiceRol].children = [];
                    }
                    if (usuarioRolesRegionales.value.Roles[indiceRol].regionales.filter((r:any) => r.IdRegional === regionalSeleccionada.IdRegional).length === 0) {
                        usuarioRolesRegionales.value.Roles[indiceRol].regionales.push(
                            {
                                IdRol:          roles.value.filter((r: any) => r.IdRol === rolRegionalForm.value.IdRol)[0].IdRol,
                                IdRegional:     regionalSeleccionada.IdRegional,
                                NombreRegional: regionalSeleccionada.NombreRegional,
                            }
                        );

                        usuarioRolesRegionales.value.children[indiceRol].children.push(
                            {
                                name:       regionalSeleccionada.NombreRegional,
                                IdRegional: regionalSeleccionada.IdRegional,
                                IdRol:      roles.value.filter((r: any) => r.IdRol === rolRegionalForm.value.IdRol)[0].IdRol,
                                tipo:       'regional'
                            }
                        );

                    }
                }
            });

            regionales.value.forEach((r: any) => {
                r.seleccionado = false;
            });
        }

        const eliminarItemEmit = async (item: any) => {
            const mensaje = '¿Está seguro de eliminar ' + (
                item.tipo === 'regional'
                    ? 'la regional seleccionada y todos los roles relacionados?'
                    : 'el rol seleccionado?'
            );
            const resp = await utils.mensajePregunta(mensaje);
            let indice;
            if (resp) {
                switch (item.tipo) {
                    case 'rol':
                        // Buscamos el índice del rol a eliminar.
                        indice = usuarioRolesRegionales.value.children.findIndex(
                            (rol: any) => rol.IdRol === item.IdRol
                        );

                        // Eliminamos la empresa.
                        usuarioRolesRegionales.value.children.splice(indice, 1);
                        usuarioRolesRegionales.value.Roles.splice(indice, 1);
                        break;
                    case 'regional':
                        // Buscamos el índice de la regional a eliminar.
                        indice = usuarioRolesRegionales.value.children.filter(
                            (rol: any) => rol.IdRol === item.IdRol
                        )[0].children.findIndex(
                            (regional: any) => regional.IdRegional === item.IdRegional
                        );

                        // Eliminamos la regional.
                        usuarioRolesRegionales.value.children.filter(
                            (rol: any) => rol.IdRol === item.IdRol
                        )[0].children.splice(indice, 1);
                        usuarioRolesRegionales.value.Roles.filter(
                            (rol: any) => rol.IdRol === item.IdRol
                        )[0].regionales.splice(indice, 1);

                        // Si ya no existe regionales, se elimina el rol.
                        if (usuarioRolesRegionales.value.children.filter(
                                (rol: any) => rol.IdRol === item.IdRol
                            )[0].children.length === 0
                        ) {
                            // Buscamos el índice de la empresa a eliminar.
                            indice = usuarioRolesRegionales.value.children.findIndex(
                                (rol: any) => rol.IdRol === item.IdRol
                            );

                            // Eliminamos el rol.
                            usuarioRolesRegionales.value.children.splice(indice, 1);
                            usuarioRolesRegionales.value.Roles.splice(indice, 1);
                        }
                        break;
                }
            }
        }

        const grabar = async () => {
            const resp = await grabarRolesRegionalesUsuarioInterno(usuarioRolesRegionales.value);
            if (resp.ok) {
                seGrabo.value = true;
            } 
        }

        const cancelar = () => {
            window.$('#asignar-permisos-usuario-interno-modal').modal('hide');

            roles.value = [];
            regionales.value = [];
            rolRegionalForm.value = {
                IdRol: 0,
            };
            usuarioRolesRegionales.value = {};
            seGrabo.value = false;
            opcionActual.value = SELECCIONAR_ROL;
        }

        const seleccionarTodo = async (seleccionar: boolean) => { 
            regionales.value.forEach((r: any) => {
                r.seleccionado = seleccionar;
            });
        }
        return {
            nombreCompletoUsuario,
            opcionActual,
            regionales,
            roles,
            rolRegionalForm,
            seGrabo,
            SELECCIONAR_REGIONAL,
            SELECCIONAR_ROL,
            usuarioRolesRegionales,

            abrirComponent,
            adicionar,
            cancelar,
            eliminarItemEmit,
            grabar,
            rolClick,
            regionalClick,
            seSeleccionoRol,
            seleccionarTodo,
        };
    }
});
</script>
