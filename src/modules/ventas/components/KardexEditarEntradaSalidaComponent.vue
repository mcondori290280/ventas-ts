<template>
    <div class="modal fade" tabindex="-1" id="kardex-editar-entrada-salida-component-modal" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        Registro de {{ tipoMovimiento }} de productos
                    </h5>
                    <button type="button" class="close" aria-label="Close" @click="cancelar">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body pt-0 pb-0">

                    <div class="form-row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <label
                                class="form-label"
                                for="id_producto">Producto</label>
                            <Select2
                                id="id_producto"
                                name="id_producto"
                                :class="{ 'input-validation-error-select2': v$.id_producto.$dirty && v$.id_producto.$invalid }"
                                :disabled="seGrabo"
                                v-model="v$.id_producto.$model"
                                :options="productos"
                                @select="productoSeleccionado"
                                :settings="{ multiple: false, placeholder: 'Seleccione', width: '100%', tags: false, dropdownParent:'#kardex-editar-entrada-salida-component-modal' }" />
                            <small
                                class="invalid-feedback-select2"
                                v-if="v$.id_producto.$dirty && v$.id_producto.required.$invalid">
                                Producto, no tiene información.
                            </small>
                        </div>

                        <div
                            class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mt-3"
                            v-if="tipoMovimiento === 'entrada'">
                            <label
                                class="form-label"
                                for="concepto">Concepto de {{ tipoMovimiento }}</label>
                            <Select2
                                id="concepto"
                                name="concepto"
                                :class="{ 'input-validation-error-select2': v$.concepto.$dirty && v$.concepto.$invalid }"
                                :disabled="seGrabo"
                                v-model="v$.concepto.$model"
                                :options="motivosEntrada"
                                :settings="{ multiple: false, placeholder: 'Seleccione', width: '100%', tags: false, dropdownParent:'#kardex-editar-entrada-salida-component-modal' }" />
                            <small
                                class="invalid-feedback-select2"
                                v-if="v$.concepto.$dirty && v$.concepto.required.$invalid">
                                Concepto, no tiene información.
                            </small>
                        </div>
                        <div
                            class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mt-3"
                            v-if="tipoMovimiento === 'salida'">
                            <label
                                class="form-label"
                                for="concepto">Concepto de {{ tipoMovimiento }}</label>
                            <Select2
                                id="concepto"
                                name="concepto"
                                :class="{ 'input-validation-error-select2': v$.concepto.$dirty && v$.concepto.$invalid }"
                                :disabled="seGrabo"
                                v-model="v$.concepto.$model"
                                :options="motivosSalida"
                                :settings="{ multiple: false, placeholder: 'Seleccione', width: '100%', tags: false, dropdownParent:'#kardex-editar-entrada-salida-component-modal' }" />
                            <small
                                class="invalid-feedback-select2"
                                v-if="v$.concepto.$dirty && v$.concepto.required.$invalid">
                                Concepto, no tiene información.
                            </small>
                        </div>
                        <!-- <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mt-3">
                            <div class="form-group">
                                <label
                                    class="form-label"
                                    for="fecha">Fecha</label>
                                <input
                                    type="date"
                                    class="form-control form-control-sm"
                                    :class="{ 'is-invalid': v$.fecha.$dirty && v$.fecha.$invalid }"
                                    id="fecha"
                                    name="fecha"
                                    autocomplete="off"
                                    :disabled="seGrabo"
                                    v-model.trim="v$.fecha.$model">
                                <small
                                    class="invalid-feedback" v-if="v$.fecha.$dirty && v$.fecha.required.$invalid">
                                    Código de barras, no tiene información.
                                </small>
                            </div>
                        </div> -->

                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mt-3">
                            <label
                                class="form-label"
                                for="movimiento">Cantidad movimiento</label>
                            <input
                                type="text"
                                class="form-control form-control-sm text-right"
                                :class="{ 'is-invalid': v$.movimiento.$dirty && v$.movimiento.$invalid }"
                                id="movimiento"
                                name="movimiento"
                                autocomplete="off"
                                v-model.trim="v$.movimiento.$model">
                            <small
                                class="invalid-feedback" v-if="v$.movimiento.$dirty && v$.movimiento.required.$invalid">
                                Cantidad paquete, no tiene información.
                            </small>
                            <small
                                class="invalid-feedback" v-if="v$.movimiento.$dirty && v$.movimiento.minValue.$invalid">
                                Cantidad paquete, no tiene un valor correcto.
                            </small>
                        </div>
                    </div>

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
    onMounted,
} from 'vue';
import useVuelidate from '@vuelidate/core';
import { minValue, required } from '@vuelidate/validators';
import { useStore } from 'vuex';

import useProductos from '../composables/useProductos';
import useKardex from '../composables/useKardex';

declare let window: any;

export default defineComponent({
    setup(_, { emit }) {
        const store = useStore();
        
        const {
            obtenerProductosParaLaVentaCompra,
        } = useProductos();

        const {
            grabarKardexEntradaSalida
        } = useKardex();

        // const hoy = new Date();
        const tipoMovimiento = ref<string>('');

        const kardex = ref<any>({
            id_kardex: 0,
            id_producto: '',
            id_producto_stock: 0,
            id_sucursal: store.getters['auth/getIdSucursal'],
            inventario_inicial: 0,
            // fecha: hoy.getFullYear().toString()
            //     + '-' + ((hoy.getMonth() + 1) < 10 ? '0' + (hoy.getMonth() + 1).toString() : (hoy.getMonth() + 1).toString())
            //     + '-' + (hoy.getDate() < 10 ? '0' + hoy.getDate().toString() : hoy.getDate().toString()),
            fecha: '',
            concepto: '',
            movimiento: 0,
            estado: true,
        });
        const reglasKardex = {
            id_producto: { required },
            // fecha: { required },
            concepto: { required },
            movimiento: { required, minValue: minValue(1) },

        };
        const v$ = useVuelidate(
            reglasKardex,
            kardex
        );

        const seGrabo = ref<boolean>(false);

        const productos = ref<any>([]);

        const motivosEntrada = ref<any>([
            { id: 'por_ajuste_de_inventario_entrada', text: 'POR AJUSTE DE INVENTARIO'},
            { id: 'por_promocion_de_proveedor_entrada', text: 'POR PROMOCIÓN DE PROVEEDOR'}
        ]);

        const motivosSalida = ref<any>([
            { id: 'por_ajuste_de_inventario_salida', text: 'POR AJUSTE DE INVENTARIO'},
            { id: 'por_averia_de_producto_salida', text: 'POR AVERÍA DE PRODUTCO'}
        ]);

        onMounted(async() => {
            const resp = await obtenerProductosParaLaVentaCompra();
            if (resp.ok) {
                productos.value = resp.data;
            }
        });

        const abrirComponent = async (tipoMovimientoPar: string) => {
            tipoMovimiento.value = tipoMovimientoPar;

            window.$('#kardex-editar-entrada-salida-component-modal').modal('show');
        }

        const productoSeleccionado = async() => {
            kardex.value.id_producto_stock = productos.value.filter((p: any) => p.id_producto == kardex.value.id_producto)[0].id_producto_stock;
        }

        const grabar = async () => {
            if (!v$.value.$invalid) {
                const resp = await grabarKardexEntradaSalida(kardex.value);
                if (resp.ok) {
                    seGrabo.value = true;
                    kardex.value.id_kardex = resp.data;

                    setTimeout(() => {
                        cancelar();
                    }, 1000);
                }
            } else {
                v$.value.$touch();
            }
        }

        const cancelar = () => {
            window.$('#kardex-editar-entrada-salida-component-modal').modal('hide');

            emit('cerrarKardexEditarEntradaSalidaComponent', seGrabo.value);

            kardex.value = {
                id_kardex: 0,
                id_producto: '',
                id_producto_stock: 0,
                id_sucursal: store.getters['auth/getIdSucursal'],
                inventario_inicial: 0,
                // fecha: hoy.getFullYear().toString()
                //     + '-' + ((hoy.getMonth() + 1) < 10 ? '0' + (hoy.getMonth() + 1).toString() : (hoy.getMonth() + 1).toString())
                //     + '-' + (hoy.getDate() < 10 ? '0' + hoy.getDate().toString() : hoy.getDate().toString()),
                fecha: '',
                concepto: '',
                movimiento: 0,
                estado: true,
            };

            v$.value.$reset();

            seGrabo.value = false;
        }

        return {
            tipoMovimiento,
            seGrabo,
            kardex,
            productos,
            motivosEntrada,
            motivosSalida,

            v$,

            abrirComponent,
            cancelar,
            grabar,
            productoSeleccionado,
        };
    }
});
</script>