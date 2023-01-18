<template>
    <div class="modal fade" tabindex="-1" id="categoria-editar-component-modal" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <span v-text="categoria.id_categoria == 0 ? 'Nueva' : 'Editar'" /> categoría
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
                                    for="nombre-categoria">Nombre</label>
                                <input
                                    type="text"
                                    class="form-control form-control-sm"
                                    :class="{ 'is-invalid': v$.nombre.$dirty && v$.nombre.$invalid }"
                                    id="nombre-categoria"
                                    name="nombre-categoria"
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
                                        v-model="categoria.estado">
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
import useCategorias from '../composables/useCategorias';

declare let window: any;

export default defineComponent({
    setup(_, { emit }) {
        const {
            grabarCategoria,
        } = useCategorias();

        const categoria = ref<any>({
            id_categoria: 0,
            nombre: '',
            estado: true,
        });
        const reglasCategoria = {
            nombre: { required, maxLength: maxLength(100) }
        };
        const v$ = useVuelidate(
            reglasCategoria,
            categoria
        );

        const seGrabo = ref<boolean>(false);

        const nombreRef = ref();

        const abrirComponent = async (categoriaPar = undefined) => {
            if (categoriaPar) {
                categoria.value = categoriaPar;
            }

            window.$('#categoria-editar-component-modal').modal('show');

            setTimeout(() => {
                nombreRef.value.focus();
            }, 500);
        }

        const grabar = async () => {
            if (!v$.value.$invalid) {
                const resp = await grabarCategoria(categoria.value);
                if (resp.ok) {
                    seGrabo.value = true;
                    categoria.value.id_categoria = resp.data;
                    
                    setTimeout(() => {
                        cancelar();
                    }, 1000);
                }
            } else {
                v$.value.$touch();
            }
        }

        const cancelar = () => {
            window.$('#categoria-editar-component-modal').modal('hide');

            emit('cerrarEditarCategoriaComponent', seGrabo.value);

            categoria.value.id_categoria = 0;
            categoria.value.nombre = '';
            categoria.value.estado =  true;

            v$.value.$reset();

            seGrabo.value = false;
        }

        return {
            seGrabo,
            categoria,

            nombreRef,

            v$,

            abrirComponent,
            cancelar,
            grabar,
        };
    }
});
</script>