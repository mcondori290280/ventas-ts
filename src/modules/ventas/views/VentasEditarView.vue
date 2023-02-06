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
            <div class="col-xl-12">
                <div class="panel">
                    <div class="panel-hdr mt-2">
                        <div class="float-left">
                            <button type="button" class="btn btn-primary btn-sm mr-2" title="Nueva venta" @click="nuevaVenta">
                                <i class="fal fa-plus-square"></i>
                                <span class="d-none d-sm-block float-right ml-1">Nueva</span>
                            </button>
                        </div>
                    </div>
                    <div class="panel-container">
                        <div class="panel-content mb-0 pb-0">
                            <div class="row mb-2">
                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-6">
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
                                                ref="filtroProductoRef" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-6">
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
                                            <th scope="col" class="text-center" style="width:150px;">Descuento</th>
                                            <th scope="col" class="text-center" style="width:150px;">Importe</th>
                                            <th scope="col" class="text-center" style="width:30px;"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(ventaDetalleItem, i) in ventasDetalle" :key="i">
                                            <th scope="row" class="text-right" style="padding-top:12px;">{{ i + 1 }}</th>
                                            <td style="padding-top:12px;">
                                                {{  ventaDetalleItem.nombre_producto }}
                                            </td>
                                            <td class="text-right">
                                                {{ ventaDetalleItem.cantidad }}
                                            </td>
                                            <td class="text-right">
                                                {{ numeral(ventaDetalleItem.precio_unitario).format('0,0.00') }}.-
                                            </td>
                                            <td class="text-right">
                                                {{ numeral(ventaDetalleItem.descuento).format('0,0.00') }}.-
                                            </td>
                                            <td class="text-right">
                                                {{ numeral(ventaDetalleItem.importe).format('0,0.00') }}.-
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

                                        <tr v-if="ventaDetalle.id_producto > 0" class="bg-warning-50">
                                            <th scope="row" class="text-right" style="padding-top:12px;">-</th>
                                            <td style="padding-top:12px;">
                                                {{  ventaDetalle.nombre_producto }}
                                            </td>
                                            <td class="text-right">
                                                <input
                                                    type="text"
                                                    id="cantidad"
                                                    name="cantidad"
                                                    class="form-control form-control-sm text-right"
                                                    :class="{ 'is-invalid': vvd$.cantidad.$dirty && vvd$.cantidad.$invalid }"
                                                    v-model="vvd$.cantidad.$model"
                                                    @focus="$event.target.select();"
                                                    @keyup="calcularImporte"
                                                    @keypress="keyPressCantidad($event)"
                                                    @keypress.enter="adicionarDetalleVenta"
                                                    ref="cantidadRef" />
                                            </td>
                                            <td class="text-right">
                                                <input
                                                    type="text"
                                                    id="precio_unitario"
                                                    name="precio_unitario"
                                                    class="form-control form-control-sm text-right"
                                                    :class="{ 'is-invalid': vvd$.precio_unitario.$dirty && vvd$.precio_unitario.$invalid }"
                                                    v-model="vvd$.precio_unitario.$model"
                                                    @keyup="calcularImporte"
                                                    @keypress="keyPressPrecioUnitario($event)"
                                                    @keypress.enter="adicionarDetalleVenta" />
                                            </td>
                                            <td class="text-right">
                                                <input
                                                    type="text"
                                                    id="descuento"
                                                    name="descuento"
                                                    class="form-control form-control-sm text-right"
                                                    :class="{ 'is-invalid': vvd$.descuento.$dirty && vvd$.descuento.$invalid }"
                                                    v-model="vvd$.descuento.$model"
                                                    @keyup="calcularImporte"
                                                    @keypress.enter="adicionarDetalleVenta" />
                                            </td>
                                            <td class="text-right">
                                                {{ numeral(ventaDetalle.importe).format('0,0.00') }}.-
                                            </td>
                                            <td class="text-centar">
                                                &nbsp;
                                            </td>
                                        </tr>

                                        <tr>
                                            <th scope="row" colspan="5" class="text-right"><h5 class="font-weight-bold">TOTAL</h5></th>
                                            <td class="text-right">
                                                <h5 class="font-weight-bold">{{ numeral(total).format('0,0.00') }}.-</h5>
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
                                        title="Cobrar venta" @click="cobrarVenta"
                                        :disabled="ventasDetalle.length === 0"
                                        accesskey="c">
                                        <span class="font-weight-bold">$</span> Cobrar [Atl + c]
                                    </button>
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

    <cobrar-venta-component
        ref="cobrarVentaComponentRef"
        @cerrarCobrarVentaComponent="cerrarCobrarVentaComponentEmit" />
</template>

<script lang='ts'>
import { computed, defineAsyncComponent, onMounted, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { minValue, required } from '@vuelidate/validators';

import numeral from 'numeral';

import useProductos from '@/modules/ventas/composables/useProductos';
import utils from '@/utils/utils';

export default {
    components: {
        CobrarVentaComponent: defineAsyncComponent(
            () => import('@/modules/ventas/components/CobrarVentaComponent.vue')
        ),
    },
    setup() {
        const PRESENTACION_PAQUETE = 2;

        const { 
            buscarProductosPorCodigoBarras,
            buscarProductosPorIdProducto,
            obtenerProductosParaLaVentaCompra,
        } = useProductos();

        const filtroCodigoBarras = ref<any>('');
        const filtroNombreProducto = ref<any>('');

        const total = ref<number>(0);

        const ventasDetalle = ref<any>([]);
        const ventaDetalle = ref<any>({
            id_venta_detalle: 0,
            id_venta: 0,
            id_producto: 0,
            id_producto_stock: 0,
            nombre_producto: '',
            cantidad: 1,
            precio_unitario: 0,
            descuento: 0,
            importe: 0,
            precio_compra: 0
        });
        const reglasVentaDetalle = computed(() => ({
            cantidad: { required, minValue: minValue(0.01) },
            precio_unitario: { required, minValue: minValue(0.01) },
            descuento: { required, minValue: minValue(0.00) },
        }));
        const vvd$ = useVuelidate(reglasVentaDetalle, ventaDetalle);

        const filtroProductoRef = ref();
        const cantidadRef = ref();

        const productos = ref<any>([]);

        // Varaibles del componente de cobro de la venta.
        const cobrarVentaComponentRef = ref();

        onMounted(async() => {
            filtroProductoRef.value.focus();

            const resp = await obtenerProductosParaLaVentaCompra();
            if (resp.ok) {
                productos.value = resp.data;
            }
        });

        const buscarProducto = async() => {
            ventaDetalle.value.id_producto = 0;
            ventaDetalle.value.id_producto_stock = 0;
            ventaDetalle.value.nombre_producto = '';
            ventaDetalle.value.cantidad = 1;
            ventaDetalle.value.precio_unitario = 0;
            ventaDetalle.value.descuento = 0;
            ventaDetalle.value.importe = 0;
            ventaDetalle.value.precio_compra = 0;

            if (filtroCodigoBarras.value.length > 0) {
                const resp = await buscarProductosPorCodigoBarras(filtroCodigoBarras.value)
                if (resp.ok && resp.data) {
                    const productoEncontrado: any = resp.data;

                    if (productoEncontrado.length > 0) {
                        ventaDetalle.value.id_producto = productoEncontrado[0].id_producto;
                        ventaDetalle.value.id_producto_stock = productoEncontrado[0].id_producto_stock;
                        ventaDetalle.value.nombre_producto = productoEncontrado[0].nombre;
                        ventaDetalle.value.precio_unitario = productoEncontrado[0].precio_venta;
                        ventaDetalle.value.precio_compra = productoEncontrado[0].precio_compra;

                        // Si el producto es por paquete.
                        if (productoEncontrado[0].id_presentacion == PRESENTACION_PAQUETE) {
                            ventaDetalle.value.cantidad = productoEncontrado[0].cantidad_paquete;

                            const respProductoDetalle = await buscarProductosPorIdProducto(productoEncontrado[0].id_producto_detalle_paquete);
                            if (respProductoDetalle.ok) {
                                const productoDetalleEncintrado: any = respProductoDetalle.data;
                                
                                ventaDetalle.value.id_producto = productoDetalleEncintrado[0].id_producto;
                                ventaDetalle.value.id_producto_stock = productoDetalleEncintrado[0].id_producto_stock;
                                ventaDetalle.value.nombre_producto = productoDetalleEncintrado[0].nombre;
                                ventaDetalle.value.precio_unitario = productoDetalleEncintrado[0].precio_venta;
                                ventaDetalle.value.precio_compra = productoDetalleEncintrado[0].precio_compra;
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
            ventaDetalle.value.id_producto = 0;
            ventaDetalle.value.id_producto_stock = 0;
            ventaDetalle.value.nombre_producto = '';
            ventaDetalle.value.cantidad = 1;
            ventaDetalle.value.precio_unitario = 0;
            ventaDetalle.value.descuento = 0;
            ventaDetalle.value.importe = 0;
            ventaDetalle.value.precio_compra = 0;

            const productoEncontrado = productos.value.filter((p: any) => p.id_producto == filtroNombreProducto.value);

            ventaDetalle.value.id_producto = productoEncontrado[0].id_producto;
            ventaDetalle.value.id_producto_stock = productoEncontrado[0].id_producto_stock;
            ventaDetalle.value.nombre_producto = productoEncontrado[0].nombre;
            ventaDetalle.value.precio_unitario = productoEncontrado[0].precio_venta;
            ventaDetalle.value.precio_compra = productoEncontrado[0].precio_compra;

            // Si el producto es por paquete.
            if (productoEncontrado[0].id_presentacion == PRESENTACION_PAQUETE) {
                ventaDetalle.value.cantidad = productoEncontrado[0].cantidad_paquete;

                const respProductoDetalle = await buscarProductosPorIdProducto(productoEncontrado[0].id_producto_detalle_paquete);
                if (respProductoDetalle.ok) {
                    const productoDetalleEncintrado: any = respProductoDetalle.data;
                    
                    ventaDetalle.value.id_producto = productoDetalleEncintrado[0].id_producto;
                    ventaDetalle.value.id_producto_stock = productoDetalleEncintrado[0].id_producto_stock;
                    ventaDetalle.value.nombre_producto = productoDetalleEncintrado[0].nombre;
                    ventaDetalle.value.precio_unitario = productoDetalleEncintrado[0].precio_venta;
                    ventaDetalle.value.precio_compra = productoDetalleEncintrado[0].precio_compra;
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
            ventaDetalle.value.importe = ((ventaDetalle.value.precio_unitario - ventaDetalle.value.descuento) * ventaDetalle.value.cantidad).toFixed(2);
        }

        const keyPressCantidad = ($event: any) => {
            if ($event.key === '.') {
                $event.preventDefault();
            }
        }

        const keyPressPrecioUnitario = ($event: any) => {
            if (ventaDetalle.value.precio_unitario.toString().split('.').length == 2) {
                if (ventaDetalle.value.precio_unitario.toString().split('.')[1].length == 2) {
                    $event.preventDefault();
                }
            }
        }

        const adicionarDetalleVenta = async () => {
            if (!vvd$.value.$invalid) {
                ventasDetalle.value.push(JSON.parse(JSON.stringify(ventaDetalle.value)));
                total.value = ventasDetalle.value.reduce((sumaParcial: number, i: any) => sumaParcial + Number(i.importe), 0);

                ventaDetalle.value.id_producto = 0;
                ventaDetalle.value.id_producto_stock = 0;
                ventaDetalle.value.nombre_producto = '';
                ventaDetalle.value.cantidad = 1;
                ventaDetalle.value.precio_unitario = 0;
                ventaDetalle.value.descuento = 0;
                ventaDetalle.value.importe = 0;
                ventaDetalle.value.precio_compra = 0;

                filtroProductoRef.value.focus();
                vvd$.value.$reset();
            } else {
                vvd$.value.$touch();
            }
        }

        const eliminarDetalleFactura = (index: number) => {
            ventasDetalle.value.splice(index, 1);

            total.value = ventasDetalle.value.reduce((sumaParcial: number, i: any) => sumaParcial + Number(i.importe), 0);
        }

        const cobrarVenta = () => {
            cobrarVentaComponentRef.value.abrirComponent(ventasDetalle, total.value)
        }

        const nuevaVenta = () => {
            total.value = 0;
            ventasDetalle.value = [];

            ventaDetalle.value.id_venta_detalle = 0;
            ventaDetalle.value.id_venta = 0;
            ventaDetalle.value.id_producto = 0;
            ventaDetalle.value.id_producto_stock = 0;
            ventaDetalle.value.nombre_producto = '';
            ventaDetalle.value.cantidad = 1;
            ventaDetalle.value.precio_unitario = 0;
            ventaDetalle.value.descuento = 0;
            ventaDetalle.value.importe = 0;
            ventaDetalle.value.precio_compra = 0;

            filtroProductoRef.value.focus();
        }

        // Todo obre el componente de cobro de la venta.
        const cerrarCobrarVentaComponentEmit = (resultado: boolean) => {
            if (resultado) {
                nuevaVenta();
            }
        }

        return {
            filtroCodigoBarras,
            filtroNombreProducto,
            ventasDetalle,
            ventaDetalle,
            total,
            productos,

            buscarProducto,
            asignarProductoSeleccionado,
            nuevaVenta,
            calcularImporte,
            keyPressCantidad,
            keyPressPrecioUnitario,
            adicionarDetalleVenta,
            numeral,
            cobrarVenta,
            eliminarDetalleFactura,

            vvd$,

            filtroProductoRef,
            cantidadRef,

            // Componente.
            cobrarVentaComponentRef,
            cerrarCobrarVentaComponentEmit,
        };
    }
}
</script>
