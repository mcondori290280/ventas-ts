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
                            <button type="button" class="btn btn-primary btn-sm mr-2" title="Nuevo" @click="nuevaCompra">
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
                                        <label class="form-label" for="fecha_compra">Fecha</label>
                                        <div class="input-group">
                                            <input
                                                type="date"
                                                id="fecha_compra"
                                                name="fecha_compra"
                                                class="form-control form-control-sm"
                                                placeholder="Fecha de compra"
                                                autocomplete="off"
                                                v-model.trim="fitroBusqueda.textoBuscar"
                                                @keyup.enter="buscarCompras"/>
                                            <div class="input-group-append">
                                                <button
                                                    class="btn btn-primary btn-sm mb-2"
                                                    id="btn-buscar-compras"
                                                    name="btn-buscar-compras"
                                                    type="button"
                                                    @click="buscarCompras">
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
                            <span class="ml-3 text-danger font-weight-bold font-italic" style="font-size:18px;">{{ `Total general: Bs. ${ numeral(totalCompras).format('0,0.00') }.-` }}</span>
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
                                :items="comprasFiltrados"
                                border-cell
                                alternating
                                buttons-pagination>

                                <template #item-total="item">
                                    <div class="text-right">
                                        {{ numeral(item.total).format('0,0.00') }}
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
                                                    <th scope="col" class="text-center" style="width:150px;">Importe</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(compraDetalleItem, i) in item.compras_detalle" :key="i">
                                                    <th scope="row" class="text-right" style="padding-top:11px;">{{ i + 1 }}</th>
                                                    <td style="padding-top:12px;">
                                                        {{  compraDetalleItem.nombre_producto }}
                                                    </td>
                                                    <td class="text-right" style="padding-top:11px;">
                                                        {{ compraDetalleItem.cantidad }}
                                                    </td>
                                                    <td class="text-right" style="padding-top:11px;">
                                                        {{ numeral(compraDetalleItem.precio_compra).format('0,0.00') }}.-
                                                    </td>
                                                    <td class="text-right" style="padding-top:11px;">
                                                        {{ numeral(compraDetalleItem.importe).format('0,0.00') }}.-
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

import useCompras from '../composables/useCompras';

const router = useRouter();
const {
    obtenerComprasPorFecha,
} = useCompras();

const totalCompras = ref<any>(0);

const hoy = new Date();
const fitroBusqueda = ref<any>({
    textoBuscar: hoy.getFullYear().toString()
        + '-' + ((hoy.getMonth() + 1) < 10 ? '0' + (hoy.getMonth() + 1).toString() : (hoy.getMonth() + 1).toString())
        + '-' + (hoy.getDate() < 10 ? '0' + hoy.getDate().toString() : hoy.getDate().toString())
});

const headers = [
    { text: 'Sucursal', value: 'nombre_sucursal', sortable: true },
    { text: 'Proveedor', value: 'nombre_proveedor', sortable: true },
    { text: 'Fecha', value: 'fecha_compra', sortable: true },
    { text: 'Tipo Pago', value: 'nombre_tipo_pago', sortable: true },
    { text: 'Total', value: 'total', sortable: true },
    { text: 'Estado', value: 'estado', sortable: true },
];

let compras: any = [];
const comprasFiltrados = ref<any[]>([]);

const textoFiltro = ref<string>('');

onMounted(async() => {
    await buscarCompras();
});

const buscarCompras = async () => {
    textoFiltro.value = '';
    const resp = await obtenerComprasPorFecha(fitroBusqueda.value.textoBuscar);
    if (resp.ok) {
        compras = resp.data;
        comprasFiltrados.value = JSON.parse(JSON.stringify(compras));

        calcularTotalCompras();
    }
}

const calcularTotalCompras = async() => {
    totalCompras.value = 0;
    comprasFiltrados.value.forEach((compra: any) => {
        totalCompras.value += Number(compra.total);
    });
}

const nuevaCompra = async () => {
    router.push({ name: 'compras-editar' });
}

const filtrarInformacion = async () => {
    comprasFiltrados.value = JSON.parse(JSON.stringify(
        compras.filter(
            (u: any) => u.nombre_sucursal.toLowerCase().includes(textoFiltro.value.toLowerCase())
                || u.nombre_proveedor.toLowerCase().includes(textoFiltro.value.toLowerCase())
                || u.fecha_compra.toLowerCase().includes(textoFiltro.value.toLowerCase())
                || u.nombre_tipo_pago.toLowerCase().includes(textoFiltro.value.toLowerCase())
                || u.total.toLowerCase().includes(textoFiltro.value.toLowerCase())
        )
    ));

    calcularTotalCompras();
}
</script>
