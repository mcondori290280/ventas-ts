<template>
    <div class="modal fade" tabindex="-1" id="cliente-editar-component-model" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <span v-text="cliente.id_cliente == 0 ? 'Nuevo' : 'Editar'" /> cliente
                    </h5>
                    <button type="button" class="close" aria-label="Close" @click="cancelar">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body pt-0 pb-0">

                    <form novalidate>
                        <div class="form-row">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                                <div class="form-group">
                                    <label
                                        class="form-label"
                                        for="carnet_identidad_modal">Carnet de identidad</label>
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fa fa-id-card" aria-hidden="true"></i></span>
                                        </div>
                                        <input
                                            type="text"
                                            class="form-control form-control-sm"
                                            :class="{ 'is-invalid': v$.carnet_identidad.$dirty && v$.carnet_identidad.$invalid }"
                                            id="carnet_identidad_modal"
                                            name="carnet_identidad_modal"
                                            autocomplete="off"
                                            :disabled="seGrabo"
                                            v-model.trim="v$.carnet_identidad.$model"
                                            ref="carnetIdentidadModalRef">
                                        <small
                                            class="invalid-feedback" v-if="v$.carnet_identidad.$dirty && v$.carnet_identidad.required.$invalid">
                                            Carnet de identidad, no tiene información.
                                        </small>
                                        <small class="invalid-feedback" v-if="v$.carnet_identidad.$dirty && v$.carnet_identidad.maxLength.$invalid">
                                            Carnet de identidad, debe contener un máximo de {{ v$.carnet_identidad.maxLength.$params.max }} caracteres.
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                                <label
                                    class="form-label"
                                    for="nombre-producto">Nombre</label>
                                <input
                                    type="text"
                                    class="form-control form-control-sm"
                                    :class="{ 'is-invalid': v$.nombre.$dirty && v$.nombre.$invalid }"
                                    id="nombre-producto"
                                    name="nombre-producto"
                                    autocomplete="off"
                                    :disabled="seGrabo"
                                    v-model.trim="v$.nombre.$model">
                                <small
                                    class="invalid-feedback" v-if="v$.nombre.$dirty && v$.nombre.required.$invalid">
                                    Nombre, no tiene información.
                                </small>
                                <small class="invalid-feedback" v-if="v$.nombre.$dirty && v$.nombre.maxLength.$invalid">
                                    Nombre, debe contener un máximo de {{ v$.nombre.maxLength.$params.max }} caracteres.
                                </small>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mt-3">
                                <label
                                    class="form-label"
                                    for="celular">Número celular</label>
                                <input
                                    type="text"
                                    class="form-control form-control-sm"
                                    :class="{ 'is-invalid': v$.celular.$dirty && v$.celular.$invalid }"
                                    id="celular"
                                    name="celular"
                                    autocomplete="off"
                                    :disabled="seGrabo"
                                    v-model.trim="v$.celular.$model">
                                <small
                                    class="invalid-feedback-select2"
                                    v-if="v$.celular.$dirty && v$.celular.required.$invalid">
                                    Celular, no tiene información.
                                </small>
                                <small class="invalid-feedback"
                                    v-if="v$.celular.$dirty && v$.celular.maxLength.$invalid">
                                    Celular, debe contener un máximo de {{ v$.celular.maxLength.$params.max }} caracteres.
                                </small>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mt-3">
                                <label
                                    class="form-label"
                                    for="correo_electronico">Correo electrónico</label>
                                <input
                                    type="text"
                                    class="form-control form-control-sm"
                                    :class="{ 'is-invalid': v$.correo_electronico.$dirty && v$.correo_electronico.$invalid }"
                                    id="correo_electronico"
                                    name="correo_electronico"
                                    autocomplete="off"
                                    :disabled="seGrabo"
                                    v-model.trim="v$.correo_electronico.$model">
                                <small class="invalid-feedback"
                                    v-if="v$.correo_electronico.$dirty && v$.correo_electronico.maxLength.$invalid">
                                    Correo electrónico, debe contener un máximo de {{ v$.correo_electronico.maxLength.$params.max }} caracteres.
                                </small>
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                                <label
                                    class="form-label"
                                    for="direccion">Dirección</label>
                                <textarea
                                    class="form-control form-control-sm"
                                    :class="{ 'is-invalid': v$.direccion.$dirty && v$.direccion.$invalid }"
                                    id="direccion"
                                    name="direccion"
                                    autocomplete="off"
                                    :disabled="seGrabo"
                                    v-model.trim="v$.direccion.$model" />
                                <small class="invalid-feedback"
                                    v-if="v$.direccion.$dirty && v$.direccion.maxLength.$invalid">
                                    Dirección, debe contener un máximo de {{ v$.direccion.maxLength.$params.max }} caracteres.
                                </small>
                            </div>

                        </div>
                    </form>

                </div>
                <div class="modal-footer">
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
import {
    defineComponent,
    ref,
} from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, maxLength } from '@vuelidate/validators';

import useClientes from '../composables/useClientes';

declare let window: any;

export default defineComponent({
    emits: ['cerrarClienteEditarComponent'],
    setup(_, { emit }) {
        const {
            grabarCliente,
        } = useClientes();

        const cliente = ref<any>({
            id_cliente: 0,
            carnet_identidad: '',
            nombre: '',
            celular: '',
            correo_electronico: '',
            direccion: '',
            estado: true,
        });
        const reglasProducto = {
            carnet_identidad: { required, maxLength: maxLength(15) },
            nombre: { required, maxLength: maxLength(100) },
            celular: { required, maxLength: maxLength(50) },
            correo_electronico: { maxLength: maxLength(50) },
            direccion: { maxLength: maxLength(50) },
        };
        const v$ = useVuelidate(
            reglasProducto,
            cliente,
            { $stopPropagation: true },
        );

        const seGrabo = ref<boolean>(false);

        const carnetIdentidadModalRef = ref();

        const abrirComponent = async (clientePar = undefined, carnetIdentidad = undefined) => {
            if (clientePar) {
                cliente.value = clientePar;
            }
            if (carnetIdentidad) {
                cliente.value.carnet_identidad = carnetIdentidad;
            }

            window.$('#cliente-editar-component-model').modal('show');

            setTimeout(() => {
                carnetIdentidadModalRef.value.focus();
            }, 500);
        }

        const grabar = async () => {
            if (!v$.value.$invalid) {
                const resp = await grabarCliente(cliente.value);
                if (resp.ok) {
                    seGrabo.value = true;
                    cliente.value.id_cliente = resp.data;

                    setTimeout(() => {
                        cancelar();
                    }, 1000);
                }
            } else {
                v$.value.$touch();
            }
        }

        const cancelar = () => {
            window.$('#cliente-editar-component-model').modal('hide');

            emit('cerrarClienteEditarComponent', seGrabo.value, cliente.value.carnet_identidad);

            cliente.value = {
                id_cliente: 0,
                carnet_identidad: '',
                nombre: '',
                celular: '',
                correo_electronico: '',
                direccion: '',
                estado: true,
            };

            v$.value.$reset();

            seGrabo.value = false;
        }

        return {
            seGrabo,
            cliente,

            carnetIdentidadModalRef,

            v$,

            abrirComponent,
            cancelar,
            grabar,
        };
    }
});
</script>