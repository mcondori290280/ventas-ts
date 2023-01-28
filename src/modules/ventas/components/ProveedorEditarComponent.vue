<template>
    <div class="modal fade" tabindex="-1" id="proveedor-editar-component-model" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <span v-text="proveedor.id_proveedor == 0 ? 'Nuevo' : 'Editar'" /> proveedor
                    </h5>
                    <button type="button" class="close" aria-label="Close" @click="cancelar">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body pt-0 pb-0">

                    <form novalidate>
                        <div class="form-row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <label
                                    class="form-label"
                                    for="nombre-proveedor">Nombre</label>
                                <input
                                    type="text"
                                    class="form-control form-control-sm"
                                    :class="{ 'is-invalid': v$.nombre.$dirty && v$.nombre.$invalid }"
                                    id="nombre-proveedor"
                                    name="nombre-proveedor"
                                    autocomplete="off"
                                    :disabled="seGrabo"
                                    v-model.trim="v$.nombre.$model"
                                    ref="nombreRef">
                                <small
                                    class="invalid-feedback" v-if="v$.nombre.$dirty && v$.nombre.required.$invalid">
                                    Nombre, no tiene información.
                                </small>
                                <small class="invalid-feedback" v-if="v$.nombre.$dirty && v$.nombre.maxLength.$invalid">
                                    Nombre, debe contener un máximo de {{ v$.nombre.maxLength.$params.max }} caracteres.
                                </small>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mt-3">
                                <div class="form-group">
                                    <label
                                        class="form-label"
                                        for="nit">NIT</label>
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fa fa-id-card" aria-hidden="true"></i></span>
                                        </div>
                                        <input
                                            type="text"
                                            class="form-control form-control-sm"
                                            :class="{ 'is-invalid': v$.nit.$dirty && v$.nit.$invalid }"
                                            id="nit"
                                            name="nit"
                                            autocomplete="off"
                                            :disabled="seGrabo"
                                            v-model.trim="v$.nit.$model">
                                        <small
                                            class="invalid-feedback" v-if="v$.nit.$dirty && v$.nit.required.$invalid">
                                            NIT, no tiene información.
                                        </small>
                                        <small class="invalid-feedback" v-if="v$.nit.$dirty && v$.nit.maxLength.$invalid">
                                            NIT, debe contener un máximo de {{ v$.nit.maxLength.$params.max }} caracteres.
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mt-3">
                                <label
                                    class="form-label"
                                    for="celular">Celular</label>
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
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                                <label
                                    class="form-label"
                                    for="contacto">Contacto</label>
                                <input
                                    type="text"
                                    class="form-control form-control-sm"
                                    :class="{ 'is-invalid': v$.contacto.$dirty && v$.contacto.$invalid }"
                                    id="contacto"
                                    name="contacto"
                                    autocomplete="off"
                                    :disabled="seGrabo"
                                    v-model.trim="v$.contacto.$model">
                                <small class="invalid-feedback"
                                    v-if="v$.contacto.$dirty && v$.contacto.maxLength.$invalid">
                                    Contacto, debe contener un máximo de {{ v$.contacto.maxLength.$params.max }} caracteres.
                                </small>
                                <small class="invalid-feedback" v-if="v$.contacto.$dirty && v$.contacto.maxLength.$invalid">
                                    Contacto, debe contener un máximo de {{ v$.contacto.maxLength.$params.max }} caracteres.
                                </small>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mt-3">
                                <label
                                    class="form-label"
                                    for="celular_contacto">Celular contacto</label>
                                <input
                                    type="text"
                                    class="form-control form-control-sm"
                                    :class="{ 'is-invalid': v$.celular_contacto.$dirty && v$.celular_contacto.$invalid }"
                                    id="celular_contacto"
                                    name="celular_contacto"
                                    autocomplete="off"
                                    :disabled="seGrabo"
                                    v-model.trim="v$.celular_contacto.$model" />
                                <small class="invalid-feedback"
                                    v-if="v$.celular_contacto.$dirty && v$.celular_contacto.maxLength.$invalid">
                                    Celular contacto, debe contener un máximo de {{ v$.celular_contacto.maxLength.$params.max }} caracteres.
                                </small>
                                <small class="invalid-feedback" v-if="v$.celular_contacto.$dirty && v$.celular_contacto.maxLength.$invalid">
                                    Celular contacto, debe contener un máximo de {{ v$.celular_contacto.maxLength.$params.max }} caracteres.
                                </small>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6" style="margin-top:47px;">
                                <div class="custom-control custom-switch">
                                    <input
                                        type="checkbox"
                                        class="custom-control-input"
                                        id="estado"
                                        name="estado"
                                        :disabled="seGrabo"
                                        v-model="proveedor.estado">
                                    <label class="custom-control-label" for="estado">Estado</label>
                                </div>
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

import useProveedores from '../composables/useProveedores';

declare let window: any;

export default defineComponent({
    emits: ['cerrarProveedorEditarComponent'],
    setup(_, { emit }) {
        const {
            grabarProveedor,
        } = useProveedores();

        const proveedor = ref<any>({
            id_proveedor: 0,
            nombre: '',
            nit: '',
            celular: '',
            contacto: '',
            celular_contacto: '',
            estado: true,
        });
        const reglasProducto = {
            nombre: { required, maxLength: maxLength(100) },
            nit: { required, maxLength: maxLength(15) },
            celular: { required, maxLength: maxLength(50) },
            contacto: { required, maxLength: maxLength(100) },
            celular_contacto: { required, maxLength: maxLength(50) },
        };
        const v$ = useVuelidate(
            reglasProducto,
            proveedor,
            { $stopPropagation: true },
        );

        const seGrabo = ref<boolean>(false);

        const nombreRef = ref();

        const abrirComponent = async (proveedorPar = undefined) => {
            if (proveedorPar) {
                proveedor.value = proveedorPar;
            }

            window.$('#proveedor-editar-component-model').modal('show');

            setTimeout(() => {
                nombreRef.value.focus();
            }, 500);
        }

        const grabar = async () => {
            if (!v$.value.$invalid) {
                const resp = await grabarProveedor(proveedor.value);
                if (resp.ok) {
                    seGrabo.value = true;
                    proveedor.value.id_proveedor = resp.data;

                    setTimeout(() => {
                        cancelar();
                    }, 1000);
                }
            } else {
                v$.value.$touch();
            }
        }

        const cancelar = () => {
            window.$('#proveedor-editar-component-model').modal('hide');

            emit('cerrarProveedorEditarComponent', seGrabo.value);

            proveedor.value = {
                id_proveedor: 0,
                nombre: '',
                nit: '',
                celular: '',
                contacto: '',
                celular_contacto: '',
                estado: true,
            };

            v$.value.$reset();

            seGrabo.value = false;
        }

        return {
            seGrabo,
            proveedor,

            nombreRef,

            v$,

            abrirComponent,
            cancelar,
            grabar,
        };
    }
});
</script>