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
                            <button type="button" class="btn btn-primary btn-sm mr-2" title="Nuevo" @click="nuevaVenta">
                                <i class="fal fa-plus-square"></i>
                                <span class="d-none d-sm-block float-right ml-1">Nuevo</span>
                            </button>
                        </div>
                        <h2>
                            Filtro de<span class="fw-300"><i>{{ $router.currentRoute.value.meta.titleForm }}</i></span>
                        </h2>
                        <div class="panel-toolbar">
                            <button class="btn btn-panel" data-action="panel-collapse" data-toggle="tooltip" data-offset="0,10"
                                data-original-title="Collapse"></button>
                            <button class="btn btn-panel" data-action="panel-fullscreen" data-toggle="tooltip" data-offset="0,10"
                                data-original-title="Fullscreen"></button>
                        </div>
                    </div>
                    <div class="panel-container">
                        <div class="panel-content">
                            <div class="row mb-1">
                                <div class="col-xl-3 col-lg-5 col-md-4 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label class="form-label" for="fecha_venta">Fecha</label>
                                        <div class="input-group">
                                            <input
                                                type="date"
                                                id="fecha_venta"
                                                name="fecha_venta"
                                                class="form-control form-control-sm"
                                                placeholder="Fecha de venta"
                                                autocomplete="off"
                                                v-model.trim="fitroBusqueda.textoBuscar"
                                                @keyup.enter="buscarVentas"/>
                                            <div class="input-group-append">
                                                <button
                                                    class="btn btn-primary btn-sm mb-2"
                                                    id="btn-buscar-ventas"
                                                    name="btn-buscar-ventas"
                                                    type="button"
                                                    @click="buscarVentas">
                                                    <i class="fal fa-search"></i>
                                                    Buscar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-12">
                <div id="panel-listado" class="panel">
                    <div class="panel-hdr mt-2">
                        <h2>
                            Listado de<span class="fw-300"><i>{{ $router.currentRoute.value.meta.titleForm }}</i></span>
                            <span class="ml-3 text-danger font-weight-bold font-italic" style="font-size:18px;">{{ `Total general: Bs. ${ numeral(totalVentas).format('0,0.00') }.-` }}</span>
                        </h2>
                        <div class="panel-toolbar">
                            <button class="btn btn-panel" data-action="panel-collapse" data-toggle="tooltip" data-offset="0,10"
                                data-original-title="Collapse"></button>
                            <button class="btn btn-panel" data-action="panel-fullscreen" data-toggle="tooltip" data-offset="0,10"
                                data-original-title="Fullscreen"></button>
                        </div>
                    </div>
                    <div class="panel-container">
                        <div class="panel-content">
                            <div class="row mb-2">
                                <div class="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="fal fa-search"></i></span>
                                            </div>
                                            <input
                                                type="text"
                                                id="texto-buscar"
                                                name="texto-buscar"
                                                class="form-control form-control-sm flex"
                                                placeholder="Buscar"
                                                v-model="textoFiltro"
                                                @input="filtrarInformacion" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <EasyDataTable
                                :headers="headers"
                                :items="ventasFiltrados"
                                border-cell
                                alternating
                                buttons-pagination>

                                <template #item-a_pagar="item">
                                    <div class="text-right">
                                        {{ numeral(item.a_pagar).format('0,0.00') }}
                                    </div>
                                </template>
                                <template #item-estado="item">
                                    <div class="custom-control custom-checkbox ml-3">
                                        <input
                                            type="checkbox"
                                            class="custom-control-input"
                                            :id="'estado' + item.id_cliente"
                                            :name="'estado' + item.id_cliente"
                                            :checked="item.estado">
                                        <label
                                            class="custom-control-label"
                                            :for="'estado_' + item.id_cliente"></label>
                                    </div>
                                </template>

                                <template #expand="item">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-sm mt-2 mb-2">
                                            <thead class="thead-dark">
                                                <tr>
                                                    <th scope="col" class="text-center" style="width:50px;">#</th>
                                                    <th scope="col" class="text-center">Producto</th>
                                                    <th scope="col" class="text-center" style="width:150px;">Cantidad</th>
                                                    <th scope="col" class="text-center" style="width:150px;">P/Unitario</th>
                                                    <th scope="col" class="text-center" style="width:150px;">Descuento</th>
                                                    <th scope="col" class="text-center" style="width:150px;">Importe</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(ventaDetalleItem, i) in item.ventas_detalle" :key="i">
                                                    <th scope="row" class="text-right" style="padding-top:11px;">{{ i + 1 }}</th>
                                                    <td style="padding-top:12px;">
                                                        {{  ventaDetalleItem.nombre_producto }}
                                                    </td>
                                                    <td class="text-right" style="padding-top:11px;">
                                                        {{ ventaDetalleItem.cantidad }}
                                                    </td>
                                                    <td class="text-right" style="padding-top:11px;">
                                                        {{ numeral(ventaDetalleItem.precio_unitario).format('0,0.00') }}.-
                                                    </td>
                                                    <td class="text-right" style="padding-top:11px;">
                                                        {{ numeral(ventaDetalleItem.descuento).format('0,0.00') }}.-
                                                    </td>
                                                    <td class="text-right" style="padding-top:11px;">
                                                        {{ numeral(ventaDetalleItem.importe).format('0,0.00') }}.-
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </template>
                            </EasyDataTable>
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

<script lang='ts' setup>
import { onMounted, ref, } from 'vue'; 
import { useRouter } from 'vue-router';
import numeral from 'numeral';

import useVentas from '../composables/useVentas';

const router = useRouter();
const {
    obtenerVentasPorFecha,
} = useVentas();

const totalVentas = ref<any>(0);

const hoy = new Date();
const fitroBusqueda = ref<any>({
    textoBuscar: hoy.getFullYear().toString()
        + '-' + ((hoy.getMonth() + 1) < 10 ? '0' + (hoy.getMonth() + 1).toString() : (hoy.getMonth() + 1).toString())
        + '-' + (hoy.getDate() < 10 ? '0' + hoy.getDate().toString() : hoy.getDate().toString())
});

const headers = [
    { text: 'Sucursal', value: 'nombre_sucursal', sortable: true },
    { text: 'Cliente', value: 'nombre_cliente', sortable: true },
    { text: 'Fecha', value: 'fecha_venta', sortable: true },
    { text: 'Tipo Pago', value: 'nombre_tipo_pago', sortable: true },
    { text: 'Total', value: 'a_pagar', sortable: true },
    { text: 'Estado', value: 'estado', sortable: true },
];

let ventas: any = [];
const ventasFiltrados = ref<any[]>([]);

const textoFiltro = ref<string>('');

onMounted(async() => {
    await buscarVentas();
});

const buscarVentas = async () => {
    textoFiltro.value = '';
    const resp = await obtenerVentasPorFecha(fitroBusqueda.value.textoBuscar);
    if (resp.ok) {
        ventas = resp.data;
        ventasFiltrados.value = JSON.parse(JSON.stringify(ventas));

        calcularTotalVentas();
    }
}

const calcularTotalVentas = async() => {
    totalVentas.value = 0;
    ventasFiltrados.value.forEach((venta: any) => {
        totalVentas.value += Number(venta.a_pagar);
    });
}

const nuevaVenta = async () => {
    router.push({ name: 'ventas-editar' });
}

const filtrarInformacion = async () => {
    ventasFiltrados.value = JSON.parse(JSON.stringify(
        ventas.filter(
            (u: any) => u.nombre_sucursal.toLowerCase().includes(textoFiltro.value.toLowerCase())
                || u.nombre_cliente.toLowerCase().includes(textoFiltro.value.toLowerCase())
                || u.fecha_venta.toLowerCase().includes(textoFiltro.value.toLowerCase())
                || u.nombre_tipo_pago.toLowerCase().includes(textoFiltro.value.toLowerCase())
                || u.a_pagar.toLowerCase().includes(textoFiltro.value.toLowerCase())
        )
    ));

    calcularTotalVentas();
}
</script>
