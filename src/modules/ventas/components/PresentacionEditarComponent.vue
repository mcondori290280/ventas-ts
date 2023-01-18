<template>
    <div class="modal fade" tabindex="-1" id="presentacion-editar-component-modal" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <span v-text="presentacion.id_presentacion == 0 ? 'Nueva' : 'Editar'" /> presentación
                    </h5>
                    <button type="button" class="close" aria-label="Close" @click="cancelar">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body pt-0 pb-0">

                    <form novalidate>
                        <div class="form-row">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                                <label
                                    class="form-label"
                                    for="nombre-presentacion">Nombre</label>
                                <input
                                    type="text"
                                    class="form-control form-control-sm"
                                    :class="{ 'is-invalid': v$.nombre.$dirty && v$.nombre.$invalid }"
                                    id="nombre-presentacion"
                                    name="nombre-presentacion"
                                    autocomplete="off"
                                    :disabled="seGrabo"
                                    v-model.trim="v$.nombre.$model"
                                    ref="nombreRef">
                                <small
                                    class="invalid-feedback" v-if="v$.nombre.$dirty && v$.nombre.required.$invalid">
                                    Nombre, no tiene información.
                                </small>
                                <small class="invalid-feedback" v-if="v$.nombre.$dirty && v$.nombre.maxLength.$invalid">
                                    Nombre, debe contener minimamente {{ v$.nombre.maxLength.$params.max }}.
                                </small>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                                <label
                                    class="form-label"
                                    for="sigla">Sigla</label>
                                <input
                                    type="text"
                                    class="form-control form-control-sm"
                                    :class="{ 'is-invalid': v$.sigla.$dirty && v$.sigla.$invalid }"
                                    id="sigla"
                                    name="sigla"
                                    autocomplete="off"
                                    :disabled="seGrabo"
                                    v-model.trim="v$.sigla.$model">
                                <small
                                    class="invalid-feedback" v-if="v$.sigla.$dirty && v$.sigla.required.$invalid">
                                    Sigla, no tiene información.
                                </small>
                                <small class="invalid-feedback" v-if="v$.sigla.$dirty && v$.sigla.maxLength.$invalid">
                                    Sigla, debe contener un máximo de {{ v$.sigla.maxLength.$params.max }} caracteres.
                                </small>
                            </div>
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                                <div class="custom-control custom-switch">
                                    <input
                                        type="checkbox"
                                        class="custom-control-input"
                                        id="estado"
                                        name="estado"
                                        :disabled="seGrabo"
                                        v-model="presentacion.estado">
                                    <label class="custom-control-label" for="estado">Estado</label>
                                </div>
                            </div>
                        </div>
                    </form>

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
import {
    defineComponent,
    ref,
} from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, maxLength } from '@vuelidate/validators';
import usePresentaciones from '../composables/usePresentaciones';

declare let window: any;

export default defineComponent({
    setup(_, { emit }) {
        const {
            grabarPresentacion,
        } = usePresentaciones();

        const presentacion = ref<any>({
            id_presentacion: 0,
            nombre: '',
            sigla: '',
            estado: true,
        });
        const reglasPresentacion = {
            nombre: { required, maxLength: maxLength(100) },
            sigla: { required, maxLength: maxLength(10) },
        };
        const v$ = useVuelidate(
            reglasPresentacion,
            presentacion
        );

        const seGrabo = ref<boolean>(false);

        const nombreRef = ref();

        const abrirComponent = async (presentacionPar = undefined) => {
            if (presentacionPar) {
                presentacion.value = presentacionPar;
            }

            window.$('#presentacion-editar-component-modal').modal('show');

            setTimeout(() => {
                nombreRef.value.focus();
            }, 500);
        }

        const grabar = async () => {
            if (!v$.value.$invalid) {
                const resp = await grabarPresentacion(presentacion.value);
                if (resp.ok) {
                    seGrabo.value = true;
                    presentacion.value.id_presentacion = resp.data;

                    setTimeout(() => {
                        cancelar();
                    }, 1000);
                }
            } else {
                v$.value.$touch();
            }
        }

        const cancelar = () => {
            window.$('#presentacion-editar-component-modal').modal('hide');

            emit('cerrarEditarPresentacionComponent', seGrabo.value);

            presentacion.value.id_presentacion = 0;
            presentacion.value.nombre = '';
            presentacion.value.sigla = '';
            presentacion.value.estado =  true;

            v$.value.$reset();

            seGrabo.value = false;
        }

        return {
            seGrabo,
            presentacion,

            nombreRef,

            v$,

            abrirComponent,
            cancelar,
            grabar,
        };
    }
});
</script>