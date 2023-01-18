<template>
    <div class="modal fade" tabindex="-1" id="marca-editar-component-modal" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <span v-text="marca.id_marca == 0 ? 'Nueva' : 'Editar'" /> marca
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
                                    for="nombre-marca">Nombre</label>
                                <input
                                    type="text"
                                    class="form-control form-control-sm"
                                    :class="{ 'is-invalid': v$.nombre.$dirty && v$.nombre.$invalid }"
                                    id="nombre-marca"
                                    name="nombre-marca"
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
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                                <div class="custom-control custom-switch">
                                    <input
                                        type="checkbox"
                                        class="custom-control-input"
                                        id="estado"
                                        name="estado"
                                        :disabled="seGrabo"
                                        v-model="marca.estado">
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
import useMarcas from '../composables/useMarcas';

declare let window: any;

export default defineComponent({
    setup(_, { emit }) {
        const {
            grabarMarca,
        } = useMarcas();

        const marca = ref<any>({
            id_marca: 0,
            nombre: '',
            estado: true,
        });
        const reglasMarca = {
            nombre: { required, maxLength: maxLength(100) }
        };
        const v$ = useVuelidate(
            reglasMarca,
            marca
        );

        const seGrabo = ref<boolean>(false);

        const nombreRef = ref();

        const abrirComponent = async (marcaPar = undefined) => {
            if (marcaPar) {
                marca.value = marcaPar;
            }

            window.$('#marca-editar-component-modal').modal('show');

            setTimeout(() => {
                nombreRef.value.focus();
            }, 500);
        }

        const grabar = async () => {
            if (!v$.value.$invalid) {
                const resp = await grabarMarca(marca.value);
                if (resp.ok) {
                    seGrabo.value = true;
                    marca.value.id_marca = resp.data;

                    setTimeout(() => {
                        cancelar();
                    }, 1000);
                }
            } else {
                v$.value.$touch();
            }
        }

        const cancelar = () => {
            window.$('#marca-editar-component-modal').modal('hide');

            emit('cerrarEditarMarcaComponent', seGrabo.value);

            marca.value.id_marca = 0;
            marca.value.nombre = '';
            marca.value.estado =  true;

            v$.value.$reset();

            seGrabo.value = false;
        }

        return {
            seGrabo,
            marca,

            nombreRef,

            v$,

            abrirComponent,
            cancelar,
            grabar,
        };
    }
});
</script>