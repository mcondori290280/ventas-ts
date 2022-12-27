<template>
    <div class="modal fade" tabindex="-1" id="asignar-regionales-formulariosArbol-rol-modal" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        Asignación de Regionales y Formularios: <span class="fw-300"><i>{{ nombreCompletoRol }}</i></span>
                    </h5>
                    <button type="button" class="close" aria-label="Close" @click="cancelar">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body pb-0 pt-0">

                    <!-- v-if="!seGrabo" -->
                    <div class="row">
                        <div class="col-xl-6 col-lg-6 col-md-12º">
                            <div
                                id="panel-1"
                                class="panel">
                                <div class="panel-hdr">
                                    <h2>
                                        Regionales <span class="fw-300"><i>Seleccione</i></span>
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
                                                style="height:400px">

                                                <div
                                                    class="custom-control custom-switch"
                                                    v-for="(regional, index) in rolRegionalesFormularios.Regionales"
                                                    :key="index">
                                                    <input
                                                        type="checkbox"
                                                        class="custom-control-input"
                                                        :id="'regional-' + regional.IdRegional"
                                                        :name="'regional-' + regional.IdRegional"
                                                        :disabled="seGrabo"
                                                        v-model="regional.Seleccionado">
                                                    <label
                                                        class="custom-control-label"
                                                        :for="('regional-' + regional.IdRegional)">{{ regional.NombreRegional }}</label>
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
                                        Formularios <span class="fw-300"><i>Asignados</i></span>
                                    </h2>
                                </div>
                                <div class="panel-container show">
                                    <div class="panel-content">
                                        <div class="frame-wrap">

                                            <Tree
                                                :value="rolRegionalesFormularios.ListaArbolFormularios"
                                                selectionMode="checkbox"
                                                v-model:selectionKeys="formulariosSeleccionados"
                                                :expandedKeys="expandedKeys"
                                                :filter="true"
                                                filterMode="lenient"
                                                scrollHeight="316px"></Tree>

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

import { ref, defineComponent } from 'vue';
// import { useStore } from 'vuex';

import useRoles from '@/modules/seguridad/composables/useRoles';
// import utils from '@/utils/utils';

declare let window: any;

export default defineComponent({
    setup() {
        // const store = useStore();

        const {
            obtenerRegionalesFormulariosRol,
            grabarRolRegionalesFormularios,
        } = useRoles();

        const formulariosSeleccionados = ref<any>({});
        const rolRegionalesFormularios = ref<any>([]);
        const expandedKeys = ref<any>({});

        const seGrabo = ref<boolean>(false);

        const nombreCompletoRol = ref<string>('');

        const abrirComponent = async (idRol: number, nombreRol: string) => {
            nombreCompletoRol.value = nombreRol;

            window.$('#asignar-regionales-formulariosArbol-rol-modal').modal('show');
            const resp: any = await obtenerRegionalesFormulariosRol(idRol);

            if (resp.ok) {
                rolRegionalesFormularios.value = resp.data;

                // Generamos el objeto que define los ítems seleccionados.
                rolRegionalesFormularios.value.ListaArbolFormularios.forEach(async (element: any) => {
                    element.icon = '';

                    await recorrerArbol(element);
                });

                // Eliminamos los ítems no seleccionados.
                Object.keys(formulariosSeleccionados.value).forEach(
                    key => {
                        if (!formulariosSeleccionados.value[key].checked && !formulariosSeleccionados.value[key].partialChecked) {
                            delete formulariosSeleccionados.value[key];
                        }
                    }
                );

                // Se expande todos los nodos.
                for (const node of rolRegionalesFormularios.value.ListaArbolFormularios) {
                    expandNode(node);
                }
                expandedKeys.value = {...expandedKeys.value};
            }
        }

        function expandNode(node: any) {
            if (node.children && node.children.length) {
                expandedKeys.value[node.key] = true;

                for (const child of node.children) {
                    expandNode(child);
                }
            }
        }

        async function recorrerArbol(nodo: any) {
            let checkedAll = true;

            nodo.children.forEach((element: any) => {
                recorrerArbol(element);
            });

            nodo.children.forEach((element: any) => {
                element.icon = '';

                if (!element.Seleccionado) {
                    checkedAll = false;
                }
            });

            formulariosSeleccionados.value[nodo.key] = {
                checked: nodo.children.length === 0
                    ? nodo.Seleccionado
                    : checkedAll,
                partialChecked: nodo.children.length === 0
                    ? false
                    : (nodo.children.filter((n: any) => n.Seleccionado).length > 0 && nodo.children.filter((n: any) => n.Seleccionado).length < nodo.children.length)
            };
        }

        const grabar = async () => {
            rolRegionalesFormularios.value.ListaFormularios.forEach((formulario: any) => {
                formulario.Seleccionado = false;
                formulario.AccionPrincipal = '';
                formulario.Area = '';
                formulario.Controlador = '';
                formulario.CssImagen = '';
            });

            Object.keys(formulariosSeleccionados.value).forEach(
                key => {
                    if (rolRegionalesFormularios.value.ListaFormularios.filter((formulario: any) => formulario.IdFormularioWeb === parseInt(key)).length > 0) {
                        rolRegionalesFormularios.value.ListaFormularios.filter((formulario: any) => formulario.IdFormularioWeb === parseInt(key))[0].Seleccionado = true;
                    }
                }
            );

            const resp = await grabarRolRegionalesFormularios(rolRegionalesFormularios.value);
            if (resp.ok) {
                seGrabo.value = true;
            }
        }

        const cancelar = () => {
            window.$('#asignar-regionales-formulariosArbol-rol-modal').modal('hide');

            seGrabo.value = false;
        }

        return {
            expandedKeys,
            formulariosSeleccionados,
            rolRegionalesFormularios,

            nombreCompletoRol,
            seGrabo,

            abrirComponent,
            cancelar,
            grabar,
        };
    }
});
</script>
