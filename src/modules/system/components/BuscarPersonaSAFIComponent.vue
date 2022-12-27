<template>
    <div class="modal" tabindex="-1" id="buscar-persona-safi-modal" data-backdrop="static">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        Buscar Persona (SAFI)
                    </h5>
                    <button type="button" class="close" aria-label="Close" @click="cancelar">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body pt-0 pb-0">
                    <div class="form-row">
                        <div class="col-6">
                            <div class="form-group">
                                <label class="form-label" for="nombre-busqueda">
                                    Nombre Persona
                                    <p class="p-0 m-0 font-italic" style="font-size:10px;">(Apellido Paterno, Apellido Materno y Nombres)</p>
                                </label>
                                <div class="input-group">
                                    <input
                                        type="text"
                                        class="form-control form-control-sm"
                                        id="nombre-busqueda"
                                        name="nombre-busqueda"
                                        autocomplete="off"
                                        @keyup.enter="buscarPersonaSAFI"
                                        v-model.trim="nombreBusqueda"
                                        ref="nombreBusquedaRef" />
                                    <div class="input-group-append">
                                        <button
                                            class="btn btn-primary btn-sm mb-2"
                                            id="btn-buscar-persona"
                                            name="btn-buscar-persona"
                                            type="button"
                                            @click="buscarPersonaSAFI">
                                            <i class="fal fa-search"></i>
                                            Buscar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="panel-container">
                        <div class="panel-content">
                            <EasyDataTable
                                border-cell
                                alternating
                                :headers="headers"
                                :items="personas"
                                @click-row="seleccionarPersona"
                                buttons-pagination
                                :rows-per-page="10">
                                <template #item-seleccionado="persona">
                                    <div class="custom-control custom-checkbox ml-1">
                                        <input
                                            type="checkbox"
                                            class="custom-control-input"
                                            :id="'seleccionado_' + persona.IdPersona"
                                            :name="'seleccionado_' + persona.IdPersona"
                                            v-model="persona.seleccionado"
                                            :disabled="true"
                                            @click="seleccionarPersona(persona)">
                                        <label class="custom-control-label" for="defaultChecked"></label>
                                    </div>
                                </template>
                            </EasyDataTable>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-primary btn-sm"
                        :disabled="Object.keys(personaSel).length === 0"
                        @click="aceptar">Aceptar</button>
                    <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        @click="cancelar">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>

import { ref, defineComponent } from 'vue';

import useUsuarios from '@/modules/seguridad/composables/useUsuarios';
import utils from '@/utils/utils';

declare let window: any;

export default defineComponent({

    setup(_, { emit }) {
        const { buscarPersonasSAFI } = useUsuarios();

        const personas = ref<any>([]);
        const personaSel = ref<any>({});

        const nombreBusqueda = ref<string>('');
        const nombreBusquedaRef = ref<any>();

        const headers = [
            { text: '', value: 'seleccionado', sortable: true, width: 20 },
            { text: 'NIT/CI', value: 'DocumentoIdentidad', sortable: true },
            { text: 'Apellido Paterno', value: 'ApellidoPaterno', sortable: true },
            { text: 'Apellido Materno', value: 'ApellidoMaterno', sortable: true },
            { text: 'Nombres', value: 'Nombres', sortable: true },
        ];

        const abrirComponent = async (nombreBusquedaPar: string) => {
            nombreBusqueda.value = nombreBusquedaPar;

            await buscarPersonaSAFI()

            window.$('#buscar-persona-safi-modal').modal('show');

            nombreBusquedaRef.value.focus();
        }

        const aceptar = () => {
            emit('personaSeleccionada', personaSel.value);

            cancelar();
        }

        const cancelar = () => {
            window.$('#buscar-persona-safi-modal').modal('hide');

            personas.value = [];
            nombreBusqueda.value = '';
        }

        const seleccionarPersona = async (persona: any) => {
            personaSel.value = {};

            for (let i = 0; i < personas.value.length; i++) {
                if (personas.value[i].DocumentoIdentidad === persona.DocumentoIdentidad) {
                    personas.value[i].seleccionado = !personas.value[i].seleccionado;
                } else {
                    personas.value[i].seleccionado = false;
                }
            }

            personaSel.value = personas.value.filter((p: any) => p.seleccionado).length > 0
                ? personas.value.filter((p: any) => p.seleccionado)[0]
                : {};
        };

        const buscarPersonaSAFI = async () => {
            personas.value = [];

            if (nombreBusqueda.value.trim().split(' ').length > 1
                || (nombreBusqueda.value.trim().split('%').length > 1 && nombreBusqueda.value.trim().split('%')[1].trim().length > 0)) {
                const resp = await buscarPersonasSAFI(nombreBusqueda.value);
                if (resp.ok) {
                    personas.value = resp.data;
                    for(let i = 0; i < personas.value.length; i++) {
                        personas.value[i].seleccionado = false;
                    }
                }
            } else {
                utils.mostrarMensaje({
                    Descripcion: 'Texto de búsqueda, debe contener por lo menos dos palabras.',
                    TipoMensaje: 'warning'
                });
            }
        };
        
        return {
            personas,
            personaSel,
            headers,
            nombreBusqueda,

            nombreBusquedaRef,

            abrirComponent,
            aceptar,
            buscarPersonaSAFI,
            cancelar,
            seleccionarPersona,
        };
    }


});
</script>
