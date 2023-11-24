<template>
    <!-- BEGIN Page Content -->
    <!-- the #js-page-content id is needed for some plugins to initialize -->
    <main id="js-page-content"
          role="main"
          class="page-content">
        <div class="subheader">
            <h1 class="subheader-title">
                <i class='subheader-icon fal fa-users'></i> {{ $router.currentRoute.value.meta.titleForm }}
            </h1>
        </div>
        <div class="row">
            <div class="col-xl-8">
                <div class="panel">
                    <div class="panel-hdr mt-2">
                        <div class="float-left">
                            <button type="button" class="btn btn-primary btn-sm mr-2" title="Nueva venta" @click="nuevaCompra">
                                <i class="fal fa-plus-square"></i>
                                <span class="d-none d-sm-block float-right ml-1">Nueva</span>
                            </button>
                        </div>
                    </div>
                    <div class="panel-container">
                        <div class="panel-content mb-0 pb-0">
                            <div class="row mb-2">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <label
                                        class="form-label"
                                        for="filtro_codigo_barras">Código de barras producto</label>
                                    <div class="form-group">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="fal fa-barcode"></i></span>
                                            </div>
                                            <input
                                                type="text"
                                                id="filtro_codigo_barras"
                                                name="filtro_codigo_barras"
                                                class="form-control form-control-sm flex"
                                                placeholder="Buscar producto"
                                                v-model.trim="filtroCodigoBarras"
                                                @keypress.enter="buscarProducto"
                                                :readonly="seGrabo"
                                                ref="filtroProductoRef" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <label
                                        class="form-label"
                                        for="filtro_nombre_producto">Nombre producto</label>
                                    <Select2
                                        id="filtro_nombre_producto"
                                        name="filtro_nombre_producto"
                                        :options="productos"
                                        aria-placeholder="Seleccione"
                                        v-model="filtroNombreProducto"
                                        :settings="{ multiple: false, placeholder: 'Seleccione', width: '100%', tags: false }"
                                        @select="asignarProductoSeleccionado" />
                                </div>
                            </div>

                            <div class="table-responsive">
                                <table class="table table-bordered table-sm">
                                    <thead>
                                        <tr>
                                            <th scope="col" class="text-center" style="width:50px;">#</th>
                                            <th scope="col" class="text-center">Producto</th>
                                            <th scope="col" class="text-center" style="width:150px;">Cantidad</th>
                                            <th scope="col" class="text-center" style="width:150px;">P/Unitario</th>
                                            <!-- <th scope="col" class="text-center" style="width:150px;">Descuento</th> -->
                                            <th scope="col" class="text-center" style="width:150px;">Importe</th>
                                            <th scope="col" class="text-center" style="width:30px;"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(compraDetalleItem, i) in compra.comprasDetalle" :key="i">
                                            <th scope="row" class="text-right" style="padding-top:12px;">{{ i + 1 }}</th>
                                            <td style="padding-top:12px;">
                                                {{  compraDetalleItem.nombre_producto }}
                                            </td>
                                            <td class="text-right">
                                                {{ compraDetalleItem.cantidad }}
                                            </td>
                                            <td class="text-right">
                                                {{ numeral(compraDetalleItem.precio_compra).format('0,0.00') }}.-
                                            </td>
                                            <td class="text-right">
                                                {{ numeral(compraDetalleItem.importe).format('0,0.00') }}.-
                                            </td>
                                            <td class="text-centar">
                                                <button type="button"
                                                        class="btn btn-danger btn-xs"
                                                        title="Eliminar"
                                                        @click="eliminarDetalleFactura(i)">
                                                    <i class="fal fa-trash-alt"></i>
                                                </button>
                                            </td>
                                        </tr>

                                        <tr v-if="compraDetalle.id_producto > 0" class="bg-warning-50">
                                            <th scope="row" class="text-right" style="padding-top:12px;">-</th>
                                            <td style="padding-top:12px;">
                                                {{  compraDetalle.nombre_producto }}
                                            </td>
                                            <td class="text-right">
                                                <input
                                                    type="text"
                                                    id="cantidad"
                                                    name="cantidad"
                                                    class="form-control form-control-sm text-right"
                                                    :class="{ 'is-invalid': vcd$.cantidad.$dirty && vcd$.cantidad.$invalid }"
                                                    v-model="vcd$.cantidad.$model"
                                                    @focus="$event.target.select();"
                                                    @keyup="calcularImporte"
                                                    @keypress="keyPressCantidad($event)"
                                                    @keypress.enter="adicionarDetalleVenta"
                                                    ref="cantidadRef" />
                                            </td>
                                            <td class="text-right">
                                                <input
                                                    type="text"
                                                    id="precio_compra"
                                                    name="precio_compra"
                                                    class="form-control form-control-sm text-right"
                                                    :class="{ 'is-invalid': vcd$.precio_compra.$dirty && vcd$.precio_compra.$invalid }"
                                                    v-model="vcd$.precio_compra.$model"
                                                    @keyup="calcularImporte"
                                                    @keypress="keyPressPrecioCompra($event)"
                                                    @keypress.enter="adicionarDetalleVenta" />
                                            </td>
                                            <td class="text-right">
                                                {{ numeral(compraDetalle.importe).format('0,0.00') }}.-
                                            </td>
                                            <td class="text-centar">
                                                &nbsp;
                                            </td>
                                        </tr>

                                        <tr>
                                            <th scope="row" colspan="4" class="text-right"><h5 class="font-weight-bold">TOTAL</h5></th>
                                            <td class="text-right">
                                                <h5 class="font-weight-bold">{{ numeral(compra.total).format('0,0.00') }}.-</h5>
                                            </td>
                                            <td class="text-centar">
                                                
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div class="text-right mb-3">
                                    <button
                                        type="button"
                                        class="btn btn-warning btn-sm"
                                        title="Grabar compra" @click="grabarCompraFunction"
                                        :disabled="compra.comprasDetalle.length === 0 || seGrabo"
                                        accesskey="g">
                                        Grabar [Atl + g]
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xl-4">
                <div class="panel">
                    <div class="panel-hdr mt-2">
                        <div class="float-left">
                            <h2>
                                Seleccione<span class="fw-300"><i>Proveedor</i></span>
                            </h2>
                        </div>
                    </div>
                    <div class="panel-container">
                        <div class="panel-content">
                            <div class="form-row">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-3">
                                    <div class="form-group">
                                        <label
                                            class="form-label"
                                            for="id_proveedor">Proveedor</label>
                                        <Select2
                                            id="id_proveedor"
                                            name="id_proveedor"
                                            :class="{ 'input-validation-error-select2': v$.id_proveedor.$dirty && v$.id_proveedor.$invalid }"
                                            v-model="v$.id_proveedor.$model"
                                            :options="proveedores"
                                            :disabled="seGrabo"
                                            :settings="{ multiple: false, placeholder: 'Seleccione', width: '100%', tags: false }" />
                                        <small
                                            class="invalid-feedback-select2"
                                            v-if="v$.id_proveedor.$dirty && v$.id_proveedor.required.$invalid">
                                            Proveedor, no tiene información.
                                        </small>
                                    </div>
                                </div>

                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mb-3">
                                    <label
                                        class="form-label"
                                        for="fecha_compra">Fecha</label>
                                    <input
                                        type="date"
                                        class="form-control form-control-sm"
                                        :class="{ 'input-validation-error-select2': v$.fecha_compra.$dirty && v$.fecha_compra.$invalid }"
                                        id="fecha_compra"
                                        name="fecha_compra"
                                        :readonly="seGrabo"
                                        v-model="v$.fecha_compra.$model">
                                    <small
                                        class="invalid-feedback-select2"
                                        v-if="v$.fecha_compra.$dirty && v$.fecha_compra.required.$invalid">
                                        Fecha, no tiene información.
                                    </small>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mb-3">
                                    <label
                                        class="form-label"
                                        for="id_tipo_pago">Tipo pago</label>
                                    <Select2
                                        id="id_tipo_pago"
                                        name="id_tipo_pago"
                                        :class="{ 'input-validation-error-select2': v$.id_tipo_pago.$dirty && v$.id_tipo_pago.$invalid }"
                                        v-model="v$.id_tipo_pago.$model"
                                        :disabled="seGrabo"
                                        :options="tiposPago"
                                        :settings="{ multiple: false, placeholder: 'Seleccione', width: '100%', tags: false }" />
                                    <small
                                        class="invalid-feedback-select2"
                                        v-if="v$.id_tipo_pago.$dirty && v$.id_tipo_pago.required.$invalid">
                                        Tipo pago, no tiene información.
                                    </small>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-4">
                                    <label
                                        class="form-label"
                                        for="total">Efectivo recibido</label>
                                    <input
                                        type="text"
                                        class="form-control form-control-sm text-right"
                                        id="total"
                                        name="total"
                                        autocomplete="off"
                                        :readonly="true"
                                        v-model="compra.total">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- this overlay is activated only when mobile menu is triggered -->
    <div class="page-content-overlay" data-action="toggle" data-class="mobile-nav-on"></div>
    <!-- END Page Content -->

</template>

<script lang='ts'>
import { computed, onMounted, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { minValue, required } from '@vuelidate/validators';
import { useStore } from 'vuex';

import numeral from 'numeral';

import useProductos from '@/modules/ventas/composables/useProductos';
import useProveedores from '../composables/useProveedores';
import useParametros from '../composables/useParametros';
import useCompras from '../composables/useCompras';

import utils from '@/utils/utils';

export default {
    setup() {
        const store = useStore();
        
        const PRESENTACION_PAQUETE = 2;

        const hoy = new Date();

        const { 
            buscarProductosPorCodigoBarras,
            buscarProductosPorIdProducto,
            obtenerProductosParaLaVentaCompra,
        } = useProductos();

        const { 
            obtenerProveedores
        } = useProveedores();

        const {
            obtenerTiposPago,
        } = useParametros();

        const {
            grabarCompra,
        } = useCompras();

        const filtroCodigoBarras = ref<any>('');
        const filtroNombreProducto = ref<any>('');

        const compra = ref<any>({
            id_compra: 0,
            id_sucursal: store.getters['auth/getIdSucursal'],
            id_proveedor: '',
            fecha_compra: hoy.getFullYear().toString()
                + '-' + ((hoy.getMonth() + 1) < 10 ? '0' + (hoy.getMonth() + 1).toString() : (hoy.getMonth() + 1).toString())
                + '-' + (hoy.getDate() < 10 ? '0' + hoy.getDate().toString() : hoy.getDate().toString()),
            id_tipo_pago: '1',
            total: 0.00,
            estado: true,
            comprasDetalle: [],
        });
        const reglasCompra = computed(() => ({
            id_proveedor: { required },
            fecha_compra: { required },
            id_tipo_pago: { required },
        }));
        const v$ = useVuelidate(reglasCompra, compra);
        const compraDetalle = ref<any>({
            id_compra_detalle: 0,
            id_compra: 0,
            id_producto: 0,
            id_producto_stock: 0,
            nombre_producto: '',
            cantidad: 1,
            precio_compra: 0,
            importe: 0
        });
        const reglasCompraDetalle = computed(() => ({
            cantidad: { required, minValue: minValue(0.01) },
            precio_compra: { required, minValue: minValue(0.01) },
        }));
        const vcd$ = useVuelidate(reglasCompraDetalle, compraDetalle);

        const proveedores = ref<any>([]);
        const tiposPago = ref<any>([]);

        const filtroProductoRef = ref();
        const cantidadRef = ref();

        const productos = ref<any>([]);

        const seGrabo = ref<boolean>(false);

        onMounted(async() => {
            filtroProductoRef.value.focus();

            let resp = await obtenerProveedores('');
            if (resp.ok) {
                proveedores.value = resp.data;
            }

            resp = await obtenerTiposPago();
            if (resp.ok) {
                tiposPago.value = resp.data;
            }

            resp = await obtenerProductosParaLaVentaCompra();
            if (resp.ok) {
                productos.value = resp.data;
            }
        });

        const buscarProducto = async() => {
            compraDetalle.value.id_producto = 0;
            compraDetalle.value.id_producto_stock = 0;
            compraDetalle.value.nombre_producto = '';
            compraDetalle.value.cantidad = 1;
            compraDetalle.value.precio_compra = 0;
            compraDetalle.value.importe = 0;

            if (filtroCodigoBarras.value.length > 0) {
                const resp = await buscarProductosPorCodigoBarras(filtroCodigoBarras.value)
                if (resp.ok && resp.data) {
                    const productoEncontrado: any = resp.data;

                    if (productoEncontrado.length > 0) {
                        compraDetalle.value.id_producto = productoEncontrado[0].id_producto;
                        compraDetalle.value.id_producto_stock = productoEncontrado[0].id_producto_stock;
                        compraDetalle.value.nombre_producto = productoEncontrado[0].nombre;
                        compraDetalle.value.precio_compra = productoEncontrado[0].precio_compra;
                        // Si el producto es por paquete.
                        if (productoEncontrado[0].id_presentacion == PRESENTACION_PAQUETE) {
                            compraDetalle.value.cantidad = productoEncontrado[0].cantidad_paquete;

                            const respProductoDetalle = await buscarProductosPorIdProducto(productoEncontrado[0].id_producto_detalle_paquete);
                            if (respProductoDetalle.ok) {
                                const productoDetalleEncintrado: any = respProductoDetalle.data;
                                
                                compraDetalle.value.id_producto = productoDetalleEncintrado[0].id_producto;
                                compraDetalle.value.id_producto_stock = productoDetalleEncintrado[0].id_producto_stock;
                                compraDetalle.value.nombre_producto = productoDetalleEncintrado[0].nombre;
                                compraDetalle.value.precio_compra = productoDetalleEncintrado[0].precio_compra;
                            }
                        }

                        calcularImporte();

                        setTimeout(() => {
                            cantidadRef.value.focus();
                        }, 0);
                    } else {
                        utils.mostrarMensaje({
                            descripcion: 'Producto no encontrado.',
                            tipoMensaje: 'warning'
                        })
                    }
                }
            }

            setTimeout(() => {
                filtroCodigoBarras.value = '';
                filtroNombreProducto.value = '';
            }, 0);
        }

        const asignarProductoSeleccionado = async() => {
            compraDetalle.value.id_producto = 0;
            compraDetalle.value.id_producto_stock = 0;
            compraDetalle.value.nombre_producto = '';
            compraDetalle.value.cantidad = 1;
            compraDetalle.value.precio_compra = 0;
            compraDetalle.value.importe = 0;

            const productoEncontrado = productos.value.filter((p: any) => p.id_producto == filtroNombreProducto.value);

            compraDetalle.value.id_producto = productoEncontrado[0].id_producto;
            compraDetalle.value.id_producto_stock = productoEncontrado[0].id_producto_stock;
            compraDetalle.value.nombre_producto = productoEncontrado[0].nombre;
            compraDetalle.value.precio_compra = productoEncontrado[0].precio_compra;
            // Si el producto es por paquete.
            if (productoEncontrado[0].id_presentacion == PRESENTACION_PAQUETE) {
                compraDetalle.value.cantidad = productoEncontrado[0].cantidad_paquete;

                const respProductoDetalle = await buscarProductosPorIdProducto(productoEncontrado[0].id_producto_detalle_paquete);
                if (respProductoDetalle.ok) {
                    const productoDetalleEncintrado: any = respProductoDetalle.data;
                    
                    compraDetalle.value.id_producto = productoDetalleEncintrado[0].id_producto;
                    compraDetalle.value.id_producto_stock = productoDetalleEncintrado[0].id_producto_stock;
                    compraDetalle.value.nombre_producto = productoDetalleEncintrado[0].nombre;
                    compraDetalle.value.precio_compra = productoDetalleEncintrado[0].precio_compra;
                }
            }

            calcularImporte();

            setTimeout(() => {
                cantidadRef.value.focus();

                filtroCodigoBarras.value = '';
                filtroNombreProducto.value = '';
            }, 0);
        }

        const calcularImporte = () => {
            compraDetalle.value.importe = (compraDetalle.value.precio_compra * compraDetalle.value.cantidad).toFixed(2);
        }

        const keyPressCantidad = ($event: any) => {
            if ($event.key === '.') {
                $event.preventDefault();
            }
        }

        const keyPressPrecioCompra = ($event: any) => {
            if (compraDetalle.value.precio_compra.toString().split('.').length == 2) {
                if (compraDetalle.value.precio_compra.toString().split('.')[1].length == 2) {
                    $event.preventDefault();
                }
            }
        }

        const adicionarDetalleVenta = async () => {
            if (!vcd$.value.$invalid) {
                calcularImporte();
                compra.value.comprasDetalle.push(JSON.parse(JSON.stringify(compraDetalle.value)));
                compra.value.total = compra.value.comprasDetalle.reduce((sumaParcial: number, i: any) => sumaParcial + Number(i.importe), 0);

                compraDetalle.value.id_producto = 0;
                compraDetalle.value.id_producto_stock = 0;
                compraDetalle.value.nombre_producto = '';
                compraDetalle.value.cantidad = 1;
                compraDetalle.value.precio_compra = 0;
                compraDetalle.value.importe = 0;

                filtroProductoRef.value.focus();
                vcd$.value.$reset();
            } else {
                vcd$.value.$touch();
            }
        }

        const eliminarDetalleFactura = (index: number) => {
            compra.value.comprasDetalle.splice(index, 1);

            compra.value.total = compra.value.comprasDetalle.reduce((sumaParcial: number, i: any) => sumaParcial + Number(i.importe), 0);
        }

        const nuevaCompra = () => {
            compra.value = {
                id_compra: 0,
                id_sucursal: store.getters['auth/getIdSucursal'],
                id_proveedor: '',
                fecha_compra: hoy.getFullYear().toString()
                    + '-' + ((hoy.getMonth() + 1) < 10 ? '0' + (hoy.getMonth() + 1).toString() : (hoy.getMonth() + 1).toString())
                    + '-' + (hoy.getDate() < 10 ? '0' + hoy.getDate().toString() : hoy.getDate().toString()),
                id_tipo_pago: '1',
                total: 0.00,
                estado: true,
                comprasDetalle: [],
            };

            compraDetalle.value.id_compra_detalle = 0;
            compraDetalle.value.id_compra = 0;
            compraDetalle.value.id_producto = 0;
            compraDetalle.value.id_producto_stock = 0;
            compraDetalle.value.nombre_producto = '';
            compraDetalle.value.cantidad = 1;
            compraDetalle.value.precio_compra = 0;
            compraDetalle.value.importe = 0;

            filtroProductoRef.value.focus();

            v$.value.$reset();
            vcd$.value.$reset();

            seGrabo.value = false;
        }

        const grabarCompraFunction = async() => {
            if (!v$.value.$invalid) {
                const respPregunta = await utils.mensajePregunta('¿Está seguro de grabar la compra?')
                if (respPregunta) {
                    const resp = await grabarCompra(compra.value);
                    if (resp.ok) {
                        compra.value.id_compra = resp.data;

                        seGrabo.value = true;
                    }
                }
            } else {
                v$.value.$touch();
            }
        }

        return {
            filtroCodigoBarras,
            filtroNombreProducto,
            compra,
            compraDetalle,
            proveedores,
            productos,
            tiposPago,
            seGrabo,

            buscarProducto,
            asignarProductoSeleccionado,
            nuevaCompra,
            grabarCompraFunction,
            calcularImporte,
            keyPressCantidad,
            keyPressPrecioCompra,
            adicionarDetalleVenta,
            numeral,
            eliminarDetalleFactura,

            v$,
            vcd$,

            filtroProductoRef,
            cantidadRef,
        };
    }
}
</script>
