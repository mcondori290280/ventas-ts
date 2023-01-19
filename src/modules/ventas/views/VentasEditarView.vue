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
                        <!-- <h2>
                            Filtro de<span class="fw-300"><i>{{ $router.currentRoute.value.meta.titleForm }}</i></span>
                        </h2> -->
                    </div>
                    <div class="panel-container">
                        <div class="panel-content">
                            <div class="row mb-2">
                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-6">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="fal fa-barcode"></i></span>
                                            </div>
                                            <input
                                                type="text"
                                                id="filtro_producto"
                                                name="filtro_producto"
                                                class="form-control form-control-sm flex"
                                                placeholder="Buscar producto"
                                                v-model.trim="filtroProducto"
                                                @keypress.enter="buscarProducto"
                                                ref="filtroProductoRef" />
                                        </div>
                                    </div>
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
                                        <tr>
                                            <th scope="row" class="text-right pt-2">1</th>
                                            <td class="pt-2">
                                                {{  registroItemVenta.nombre_producto }}
                                            </td>
                                            <td class="text-right">
                                                <input
                                                    type="text"
                                                    id="cantidad"
                                                    name="cantidad"
                                                    class="form-control form-control-sm text-right"
                                                    v-model="registroItemVenta.cantidad"
                                                    ref="cantidadRef" />
                                            </td>
                                            <td class="text-right">
                                                <input
                                                    type="text"
                                                    id="precio_unitario"
                                                    name="precio_unitario"
                                                    class="form-control form-control-sm text-right"
                                                    v-model="registroItemVenta.precio_unitario" />
                                            </td>
                                            <td class="text-right">
                                                <input
                                                    type="text"
                                                    id="descuento"
                                                    name="descuento"
                                                    class="form-control form-control-sm text-right"
                                                    v-model="registroItemVenta.descuento" />
                                            </td>
                                            <td class="text-right">
                                                {{ registroItemVenta.importe }}
                                            </td>
                                            <td class="text-centar">
                                                
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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

<script lang='ts'>import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import useProductos from '@/modules/ventas/composables/useProductos';
import utils from '@/utils/utils';

export default {
    setup() {
        const store = useStore();

        const { 
            buscarProductosPorCodigoBarras
        } = useProductos();

        const filtroProducto = ref<any>('');
        const registroItemVenta = ref<any>({
            id_venta_detalle: 0,
            id_venta: 0,
            id_sucursal: store.getters['auth/getIdSucursal'],
            id_producto: 0,
            nombre_producto: '',
            cantidad: 0,
            precio_unitario: 0,
            descuento: 0,
            importe: 0
        });

        const filtroProductoRef = ref();
        const cantidadRef = ref();

        
        onMounted(async() => {
            filtroProductoRef.value.focus();
        });

        const buscarProducto = async() => {
            registroItemVenta.value.id_producto = 0;
            registroItemVenta.value.nombre_producto = '';
            registroItemVenta.value.cantidad = 0;
            registroItemVenta.value.precio_unitario = 0;
            registroItemVenta.value.descuento = 0;
            registroItemVenta.value.importe = 0;

            if (filtroProducto.value.length > 0) {
                const resp = await buscarProductosPorCodigoBarras(filtroProducto.value)
                if (resp.ok && resp.data) {
                    const productoEncontrado: any = resp.data;

                    if (productoEncontrado.length > 0) {
                        registroItemVenta.value.id_producto = productoEncontrado[0].id_producto;
                        registroItemVenta.value.nombre_producto = productoEncontrado[0].nombre;
                        registroItemVenta.value.precio_unitario = productoEncontrado[0].precio_venta;

                        cantidadRef.value.focus();
                    } else {
                        utils.mostrarMensaje({
                            descripcion: 'Producto no encontrado.',
                            tipoMensaje: 'warning'
                        })
                    }
                }
            }

            filtroProducto.value = '';
        }

        const nuevaVenta = () => {
            console.log(filtroProducto.value);
        }

        return {
            filtroProducto,
            registroItemVenta,

            buscarProducto,
            nuevaVenta,

            filtroProductoRef,
            cantidadRef,
        };
    }
}
</script>
