<template>
    <div class="modal fade" tabindex="-1" id="producto-editar-component-modal" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <span v-text="producto.id_producto == 0 ? 'Nuevo' : 'Editar'" /> producto
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
                                        for="codigo_barras">Código de barras</label>
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fa fa-barcode" aria-hidden="true"></i></span>
                                        </div>
                                        <input
                                            type="text"
                                            class="form-control form-control-sm"
                                            :class="{ 'is-invalid': v$.codigo_barras.$dirty && v$.codigo_barras.$invalid }"
                                            id="codigo_barras"
                                            name="codigo_barras"
                                            autocomplete="off"
                                            :disabled="seGrabo"
                                            v-model.trim="v$.codigo_barras.$model"
                                            ref="codigoBarrasRef">
                                        <small
                                            class="invalid-feedback" v-if="v$.codigo_barras.$dirty && v$.codigo_barras.required.$invalid">
                                            Código de barras, no tiene información.
                                        </small>
                                        <small class="invalid-feedback" v-if="v$.codigo_barras.$dirty && v$.codigo_barras.maxLength.$invalid">
                                            Código de barras, debe contener un máximo de {{ v$.codigo_barras.maxLength.$params.max }} caracteres.
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
                                    for="id_categoria">Categoría</label>
                                <Select2
                                    id="id_categoria"
                                    name="id_categoria"
                                    :class="{ 'input-validation-error-select2': v$.id_categoria.$dirty && v$.id_categoria.$invalid }"
                                    :disabled="seGrabo"
                                    v-model="v$.id_categoria.$model"
                                    :options="categorias"
                                    :settings="{ multiple: false, placeholder: 'Seleccione', width: '100%', tags: false, dropdownParent:'#producto-editar-component-modal' }" />
                                <small
                                    class="invalid-feedback-select2"
                                    v-if="v$.id_categoria.$dirty && v$.id_categoria.required.$invalid">
                                    Categoría, no tiene información.
                                </small>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mt-3">
                                <label
                                    class="form-label"
                                    for="id_marca">Marca</label>
                                <Select2
                                    id="id_marca"
                                    name="id_marca"
                                    :class="{ 'input-validation-error-select2': v$.id_marca.$dirty && v$.id_marca.$invalid }"
                                    :disabled="seGrabo"
                                    v-model="v$.id_marca.$model"
                                    :options="marcas"
                                    :settings="{ multiple: false, placeholder: 'Seleccione', width: '100%', tags: false, dropdownParent:'#producto-editar-component-modal' }" />
                                <small
                                    class="invalid-feedback-select2"
                                    v-if="v$.id_marca.$dirty && v$.id_marca.required.$invalid">
                                    Marca, no tiene información.
                                </small>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mt-3">
                                <label
                                    class="form-label"
                                    for="id_presentacion">Presentación</label>
                                <Select2
                                    id="id_presentacion"
                                    name="id_presentacion"
                                    :class="{ 'input-validation-error-select2': v$.id_presentacion.$dirty && v$.id_presentacion.$invalid }"
                                    :disabled="seGrabo"
                                    v-model="v$.id_presentacion.$model"
                                    :options="presentaciones"
                                    :settings="{ multiple: false, placeholder: 'Seleccione', width: '100%', tags: false, dropdownParent:'#producto-editar-component-modal' }" />
                                <small
                                    class="invalid-feedback-select2"
                                    v-if="v$.id_presentacion.$dirty && v$.id_presentacion.required.$invalid">
                                    Presentación, no tiene información.
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
                                        v-model="producto.estado">
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
    onMounted,
} from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, maxLength } from '@vuelidate/validators';
import useProductos from '../composables/useProductos';
import useCategorias from '../composables/useCategorias';
import useMarcas from '../composables/useMarcas';
import usePresentaciones from '../composables/usePresentaciones';

declare let window: any;

export default defineComponent({
    setup(_, { emit }) {
        const {
            grabarProducto,
        } = useProductos();

        const {
            obtenerCategoriasHabilitadas,
        } = useCategorias();

        const {
            obtenerMarcasHabilitadas
        } = useMarcas();

        const {
            obtenerPresentacionesHabilitadas
        } = usePresentaciones();

        const producto = ref<any>({
            id_producto: 0,
            codigo_barras: '',
            nombre: '',
            id_categoria: '',
            id_marca: '',
            id_presentacion: '',
            imagen: 'IMAGEN',
            estado: true,
        });
        const reglasProducto = {
            codigo_barras: { required, maxLength: maxLength(50) },
            nombre: { required, maxLength: maxLength(100) },
            id_categoria: { required, },
            id_marca: { required, },
            id_presentacion: { required, },
            imagen: { required, },
        };
        const v$ = useVuelidate(
            reglasProducto,
            producto
        );

        const categorias = ref<any>([]);
        const marcas = ref<any>([]);
        const presentaciones = ref<any>([]);

        const seGrabo = ref<boolean>(false);

        const codigoBarrasRef = ref();

        onMounted(async() => {
            let resp = await obtenerCategoriasHabilitadas();
            if (resp.ok) {
                categorias.value = resp.data;
            }

            resp = await obtenerMarcasHabilitadas();
            if (resp.ok) {
                marcas.value = resp.data;
            }

            resp = await obtenerPresentacionesHabilitadas();
            if (resp.ok) {
                presentaciones.value = resp.data;
            }
        });

        const abrirComponent = async (productoPar = undefined) => {
            if (productoPar) {
                producto.value = productoPar;
            }

            window.$('#producto-editar-component-modal').modal('show');

            setTimeout(() => {
                codigoBarrasRef.value.focus();
            }, 500);
        }

        const grabar = async () => {
            if (!v$.value.$invalid) {
                const resp = await grabarProducto(producto.value);
                if (resp.ok) {
                    seGrabo.value = true;
                    producto.value.id_producto = resp.data;

                    setTimeout(() => {
                        cancelar();
                    }, 1000);
                }
            } else {
                v$.value.$touch();
            }
        }

        const cancelar = () => {
            window.$('#producto-editar-component-modal').modal('hide');

            emit('cerrarEditarProductoComponent', seGrabo.value);

            producto.value.id_producto = 0;
            producto.value.codigo_barras = '';
            producto.value.nombre = '';
            producto.value.id_categoria = '';
            producto.value.id_marca = '';
            producto.value.id_presentacion = '';
            producto.value.imagen = 'IMAGEN';
            producto.value.estado =  true;

            v$.value.$reset();

            seGrabo.value = false;
        }

        return {
            seGrabo,
            producto,
            categorias,
            marcas,
            presentaciones,

            codigoBarrasRef,

            v$,

            abrirComponent,
            cancelar,
            grabar,
        };
    }
});
</script>