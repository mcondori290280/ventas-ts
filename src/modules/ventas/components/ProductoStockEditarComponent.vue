<template>
    <div class="modal fade" tabindex="-1" id="producto-stock-editar-component-modal" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <span v-text="productoStock.id_producto_stock == 0 ? 'Nuevo' : 'Editar'" /> producto stock
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
                                :disabled="seGrabo || !esNuevoRegistro"
                                v-model="v$.id_producto.$model"
                                @select="asignarProductoSeleccionado"
                                :options="productos"
                                :settings="{ multiple: false, placeholder: 'Seleccione', width: '100%', tags: false, dropdownParent:'#producto-stock-editar-component-modal' }" />
                            <small
                                class="invalid-feedback-select2"
                                v-if="v$.id_producto.$dirty && v$.id_producto.required.$invalid">
                                Producto, no tiene información.
                            </small>
                        </div>

                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mt-2">
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
                                        id="codigo_barras"
                                        name="codigo_barras"
                                        :readonly="true"
                                        v-model="productoStock.codigo_barras">
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-2">
                            <label
                                class="form-label"
                                for="nombre-producto">Nombre</label>
                            <input
                                type="text"
                                class="form-control form-control-sm"
                                id="nombre-producto"
                                name="nombre-producto"
                                :readonly="true"
                                v-model.trim="productoStock.nombre">
                        </div>

                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mt-2">
                            <label
                                class="form-label"
                                for="nombre_categoria">Categoría</label>
                            <input
                                type="text"
                                class="form-control form-control-sm"
                                id="nombre_categoria"
                                name="nombre_categoria"
                                :readonly="true"
                                v-model.trim="productoStock.nombre_categoria">
                        </div>

                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mt-2">
                            <label
                                class="form-label"
                                for="nombre_marca">Marca</label>
                            <input
                                type="text"
                                class="form-control form-control-sm"
                                id="nombre_marca"
                                name="nombre_marca"
                                :readonly="true"
                                v-model.trim="productoStock.nombre_marca">
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mt-2">
                            <label
                                class="form-label"
                                for="nombre_presentacion">Presentación</label>
                            <input
                                type="text"
                                class="form-control form-control-sm"
                                id="nombre_presentacion"
                                name="nombre_presentacion"
                                :readonly="true"
                                v-model.trim="productoStock.nombre_presentacion">
                        </div>
                    </div>

                    <h5
                        class="form-label mt-3"
                        v-if="productoStock.id_presentacion != PRESENTACION_PAQUETE">Stock y cantidades</h5>
                    <div
                        class="form-row"
                        v-if="productoStock.id_presentacion != PRESENTACION_PAQUETE">
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mt-2">
                            <div class="form-group">
                                <label
                                    class="form-label"
                                    for="precio_compra">Precio compra</label>
                                <div class="input-group input-group-sm">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">$</span>
                                    </div>
                                    <input
                                        type="text"
                                        class="form-control form-control-sm"
                                        :class="{ 'is-invalid': v$.precio_compra.$dirty && v$.precio_compra.$invalid }"
                                        id="precio_compra"
                                        name="precio_compra"
                                        autocomplete="off"
                                        :disabled="seGrabo"
                                        v-model.trim="v$.precio_compra.$model">
                                    <small
                                        class="invalid-feedback" v-if="v$.precio_compra.$dirty && v$.precio_compra.required.$invalid">
                                        Precio compra, no tiene información.
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mt-2">
                            <div class="form-group">
                                <label
                                    class="form-label"
                                    for="porcentaje_ganancia">% Ganancia</label>
                                <div class="input-group input-group-sm">
                                    <div class="input-group-prepend">
                                        <button
                                            type="button"
                                            class="btn btn-default btn-sm"
                                            title="Menos"
                                            @click="
                                                if (productoStock.porcentaje_ganancia > 0) {
                                                    productoStock.porcentaje_ganancia = productoStock.porcentaje_ganancia - 1;
                                                    productoStock.precio_venta = Number(productoStock.precio_compra) + Number((productoStock.precio_compra * ( productoStock.porcentaje_ganancia / 100 )).toFixed(2));
                                                }
                                            ">
                                            -
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        class="form-control form-control-sm"
                                        :class="{ 'is-invalid': v$.porcentaje_ganancia.$dirty && v$.porcentaje_ganancia.$invalid }"
                                        id="porcentaje_ganancia"
                                        name="porcentaje_ganancia"
                                        autocomplete="off"
                                        :disabled="seGrabo"
                                        :readonly="true"
                                        v-model.trim="v$.porcentaje_ganancia.$model">
                                    <div class="input-group-prepend">
                                        <button
                                            type="button"
                                            class="btn btn-default btn-sm"
                                            title="Más"
                                            @click="
                                                if (productoStock.porcentaje_ganancia < 100) {
                                                    productoStock.porcentaje_ganancia = productoStock.porcentaje_ganancia + 1;
                                                    productoStock.precio_venta = Number(productoStock.precio_compra) + Number((productoStock.precio_compra * ( productoStock.porcentaje_ganancia / 100 )).toFixed(2));
                                                }
                                            ">
                                            +
                                        </button>
                                    </div>
                                    <small
                                        class="invalid-feedback" v-if="v$.porcentaje_ganancia.$dirty && v$.porcentaje_ganancia.required.$invalid">
                                        % Ganancia, no tiene información.
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mt-2">
                            <div class="form-group">
                                <label
                                    class="form-label"
                                    for="precio_venta">Precio venta</label>
                                <div class="input-group input-group-sm">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">$</span>
                                    </div>
                                    <input
                                        type="text"
                                        class="form-control form-control-sm"
                                        :class="{ 'is-invalid': v$.precio_venta.$dirty && v$.precio_venta.$invalid }"
                                        id="precio_venta"
                                        name="precio_venta"
                                        autocomplete="off"
                                        :disabled="seGrabo"
                                        v-model.trim="v$.precio_venta.$model">
                                    <small
                                        class="invalid-feedback" v-if="v$.precio_venta.$dirty && v$.precio_venta.required.$invalid">
                                        Precio venta, no tiene información.
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mt-2">
                            <div class="form-group">
                                <label
                                    class="form-label"
                                    for="precio_venta_por_mayor">Precio venta por mayor</label>
                                <div class="input-group input-group-sm">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">$</span>
                                    </div>
                                    <input
                                        type="text"
                                        class="form-control form-control-sm"
                                        :class="{ 'is-invalid': v$.precio_venta_por_mayor.$dirty && v$.precio_venta_por_mayor.$invalid }"
                                        id="precio_venta_por_mayor"
                                        name="precio_venta_por_mayor"
                                        autocomplete="off"
                                        :disabled="seGrabo"
                                        v-model.trim="v$.precio_venta_por_mayor.$model">
                                    <small
                                        class="invalid-feedback" v-if="v$.precio_venta_por_mayor.$dirty && v$.precio_venta_por_mayor.required.$invalid">
                                        Precio venta por mayor, no tiene información.
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mt-2">
                            <label
                                class="form-label"
                                for="stock">Stock</label>
                            <input
                                type="text"
                                class="form-control form-control-sm"
                                :class="{ 'is-invalid': v$.stock.$dirty && v$.stock.$invalid }"
                                id="stock"
                                name="stock"
                                autocomplete="off"
                                :disabled="seGrabo || productoStock.id_producto_stock > 0"
                                v-model.trim="v$.stock.$model">
                            <small
                                class="invalid-feedback" v-if="v$.stock.$dirty && v$.stock.required.$invalid">
                                Stock, no tiene información.
                            </small>
                        </div>

                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mt-2">
                            <label
                                class="form-label"
                                for="stock_minimo">Stock mínimo</label>
                            <input
                                type="text"
                                class="form-control form-control-sm"
                                :class="{ 'is-invalid': v$.stock_minimo.$dirty && v$.stock_minimo.$invalid }"
                                id="stock_minimo"
                                name="stock_minimo"
                                autocomplete="off"
                                :disabled="seGrabo"
                                v-model.trim="v$.stock_minimo.$model">
                            <small
                                class="invalid-feedback" v-if="v$.stock_minimo.$dirty && v$.stock_minimo.required.$invalid">
                                Stock mínimo, no tiene información.
                            </small>
                        </div>
                    </div>

                    <h5
                        class="form-label mt-3"
                        v-if="productoStock.id_presentacion == PRESENTACION_PAQUETE">Producto detalle</h5>
                    <div
                        class="form-row"
                        v-if="productoStock.id_presentacion == PRESENTACION_PAQUETE">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-2">
                            <div class="form-group">
                                <label
                                    class="form-label"
                                    for="id_producto_detalle_paquete">Producto detalle</label>
                                <Select2
                                    id="id_producto_detalle_paquete"
                                    name="id_producto_detalle_paquete"
                                    :class="{ 'input-validation-error-select2': v$.id_producto_detalle_paquete.$dirty && v$.id_producto_detalle_paquete.$invalid }"
                                    :disabled="seGrabo || !esNuevoRegistro"
                                    v-model="v$.id_producto_detalle_paquete.$model"
                                    :options="productosDetallePaquete"
                                    :settings="{ multiple: false, placeholder: 'Seleccione', width: '100%', tags: false, dropdownParent:'#producto-stock-editar-component-modal' }" />
                                <small
                                    class="invalid-feedback-select2"
                                    v-if="v$.id_producto_detalle_paquete.$dirty && v$.id_producto_detalle_paquete.required.$invalid">
                                    Producto detalle, no tiene información.
                                </small>
                            </div>
                        </div>

                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mt-2">
                            <label
                                class="form-label"
                                for="cantidad_paquete">Cantidad paquete</label>
                            <input
                                type="text"
                                class="form-control form-control-sm"
                                :class="{ 'is-invalid': v$.cantidad_paquete.$dirty && v$.cantidad_paquete.$invalid }"
                                id="cantidad_paquete"
                                name="cantidad_paquete"
                                autocomplete="off"
                                v-model.trim="v$.cantidad_paquete.$model">
                            <small
                                class="invalid-feedback" v-if="v$.cantidad_paquete.$dirty && v$.cantidad_paquete.required.$invalid">
                                Cantidad paquete, no tiene información.
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
} from 'vue';
import useVuelidate from '@vuelidate/core';
import { minValue, required, requiredIf } from '@vuelidate/validators';
import { useStore } from 'vuex';

import useProductos from '../composables/useProductos';

declare let window: any;

export default defineComponent({
    setup(_, { emit }) {
        const PRESENTACION_PAQUETE = 2;

        const store = useStore();

        const {
            grabarProductoStock,
            obtenerProductosFiltro,
        } = useProductos();

        const productoStock = ref<any>({
            id_producto_stock: 0,
            id_producto: '',
            id_sucursal: store.getters['auth/getIdSucursal'],
            codigo_barras: '',
            nombre: '',
            nombre_categoria: '',
            nombre_marca: '',
            id_presentacion: 0,
            nombre_presentacion: '',

            precio_compra: 0,
            porcentaje_ganancia: 0,
            precio_venta: 0,
            precio_venta_por_mayor: 0,
            stock: 0,
            stock_minimo: 0,

            id_producto_detalle_paquete: '',
            cantidad_paquete: 0,
        });
        const reglasProductoStock = {
            id_producto: { required, },
            precio_compra: { required, minValue: minValue(0.00), },
            porcentaje_ganancia: { required, minValue: minValue(0.00), },
            precio_venta: { required, minValue: minValue(0.00), },
            precio_venta_por_mayor: { required, minValue: minValue(0.00), },
            stock: { required, minValue: minValue(0.00), },
            stock_minimo: { required, minValue: minValue(0.00), },

            id_producto_detalle_paquete: {
                required: requiredIf(() => {
                    return productoStock.value.id_presentacion == PRESENTACION_PAQUETE;
                }),
            },
            cantidad_paquete: {
                required: requiredIf(() => {
                    return productoStock.value.id_presentacion == PRESENTACION_PAQUETE;
                }),
                minValue: minValue(0.00),
            },
        };
        const v$ = useVuelidate(
            reglasProductoStock,
            productoStock
        );

        const productos = ref<any>([]);
        const productosDetallePaquete = ref<any>([]);

        const seGrabo = ref<boolean>(false);
        const esNuevoRegistro = ref<boolean>(false);

        const abrirComponent = async (productoStockPar = undefined, productosIds: any, esNuevo: boolean) => {
            esNuevoRegistro.value = esNuevo;

            const resp = await obtenerProductosFiltro();
            if (resp.ok) {
                productos.value = resp.data;
                productosDetallePaquete.value = JSON.parse(JSON.stringify(productos.value.filter((p: any) => p.id_presentacion == 1)));

                if (esNuevoRegistro.value) {
                    productos.value = productos.value.filter((p: any) => !productosIds.includes(p.id_producto));
                    // for (let i = 0; i < productosIds.length; i++) {
                    //     productos.value.splice(
                    //         productos.value.findIndex((p: any) => p.id_producto == productosIds[i]),
                    //         1
                    //     );
                    // }
                }

                if (productoStockPar) {
                    productoStock.value = productoStockPar;
                    productoStock.value.id_producto = productoStock.value.id_producto + '';
                    productoStock.value.id_producto_detalle_paquete = productoStock.value.id_producto_detalle_paquete + '';
                }

                window.$('#producto-stock-editar-component-modal').modal('show');
            }
        }

        const asignarProductoSeleccionado = async() => {
            productoStock.value.precio_compra = 0;
            productoStock.value.porcentaje_ganancia = 0;
            productoStock.value.precio_venta = 0;
            productoStock.value.precio_venta_por_mayor = 0;
            productoStock.value.stock = 0;
            productoStock.value.stock_minimo = 0;
            productoStock.value.id_producto_detalle_paquete = '';
            productoStock.value.cantidad_paquete = 0;

            const productoSeleccionado = productos.value.filter((p: any) => p.id_producto == productoStock.value.id_producto)[0];

            productoStock.value.codigo_barras = productoSeleccionado.codigo_barras;
            productoStock.value.nombre = productoSeleccionado.nombre;
            productoStock.value.nombre_categoria = productoSeleccionado.nombre_categoria;
            productoStock.value.nombre_marca = productoSeleccionado.nombre_marca;
            productoStock.value.id_presentacion = productoSeleccionado.id_presentacion;
            productoStock.value.nombre_presentacion = productoSeleccionado.nombre_presentacion;
        }

        const grabar = async () => {
            if (!v$.value.$invalid) {
                const resp = await grabarProductoStock(productoStock.value);
                if (resp.ok) {
                    seGrabo.value = true;
                    productoStock.value.id_producto_stock = resp.data;

                    setTimeout(() => {
                        cancelar();
                    }, 1000);
                }
            } else {
                v$.value.$touch();
            }
        }

        const cancelar = () => {
            window.$('#producto-stock-editar-component-modal').modal('hide');

            emit('cerrarEditarProductoStockComponent', seGrabo.value);

            productoStock.value.id_producto_stock = 0;
            productoStock.value.id_producto = '';
            productoStock.value.id_sucursal = store.getters['auth/getIdSucursal'];
            productoStock.value.codigo_barras = '';
            productoStock.value.nombre = '';
            productoStock.value.nombre_categoria = '';
            productoStock.value.nombre_marca = '';
            productoStock.value.nombre_presentacion = '';

            productoStock.value.precio_compra = 0;
            productoStock.value.porcentaje_ganancia = 0;
            productoStock.value.precio_venta = 0;
            productoStock.value.precio_venta_por_mayor = 0;
            productoStock.value.stock = 0;
            productoStock.value.stock_minimo = 0;
            productoStock.value.id_producto_detalle_paquete = '';
            productoStock.value.cantidad_paquete = 0;

            v$.value.$reset();

            seGrabo.value = false;
        }

        return {
            seGrabo,
            productos,
            productosDetallePaquete,
            productoStock,
            esNuevoRegistro,

            PRESENTACION_PAQUETE,

            v$,

            asignarProductoSeleccionado,
            abrirComponent,
            cancelar,
            grabar,
        };
    }
});
</script>