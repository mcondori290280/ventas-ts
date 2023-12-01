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
                            <button type="button" class="btn btn-primary btn-sm mr-2" title="Nueva entrada" @click="nuevaEntrada">
                                <i class="fal fa-plus-square"></i>
                                <span class="d-none d-sm-block float-right ml-1">Nueva entrada</span>
                            </button>
                            <button type="button" class="btn btn-success btn-sm mr-2" title="Nueva entrada" @click="nuevaSalida">
                                <i class="fal fa-plus-square"></i>
                                <span class="d-none d-sm-block float-right ml-1">Nueva salida</span>
                            </button>
                        </div>
                        <h2>
                            Listado de<span class="fw-300"><i>{{ $router.currentRoute.value.meta.titleForm }}</i></span>
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
                                :items="kardexsFiltrados"
                                border-cell
                                alternating
                                buttons-pagination>

                                <template #item-saldo_inicial="item">
                                    <div class="text-right">
                                        {{ numeral(item.saldo_inicial).format('0,0.00') }}
                                    </div>
                                </template>
                                <template #item-entradas="item">
                                    <div class="text-right">
                                        {{ numeral(item.entradas).format('0,0.00') }}
                                    </div>
                                </template>
                                <template #item-salidas="item">
                                    <div class="text-right">
                                        {{ numeral(item.salidas).format('0,0.00') }}
                                    </div>
                                </template>
                                <template #item-saldo="item">
                                    <div class="text-right">
                                        {{ numeral(item.saldo).format('0,0.00') }}
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

    <kardex-editar-entrada-salida-component
        ref="kardexEditarEntradaSalidaComponentRef"
        @cerrarKardexEditarEntradaSalidaComponent="cerrarKardexEditarEntradaSalidaComponentEmit" />

</template>

<script lang='ts'>
import {
  defineAsyncComponent,
    onMounted,
    ref,
 } from 'vue'; 

import useInventarios from '../composables/useInventarios';

import numeral from 'numeral';

export default {
    components: {
        KardexEditarEntradaSalidaComponent: defineAsyncComponent(
            () => import('@/modules/ventas/components/KardexEditarEntradaSalidaComponent.vue')
        ),
    },
    setup() {
        const {
            obtenerKardexProductos,
        } = useInventarios();

        const headers = [
            { text: 'Producto', value: 'nombre_producto', sortable: true },
            { text: 'Marca', value: 'nombre_marca', sortable: true },
            { text: 'Saldo Inicial', value: 'saldo_inicial', sortable: true },
            { text: 'Entradas', value: 'entradas', sortable: true },
            { text: 'Salidas', value: 'salidas', sortable: true },
            { text: 'Saldo', value: 'saldo', sortable: true },
            // { text: '', value: 'acciones', width: 15 },
        ];

        let kardexs: any = [];
        const kardexsFiltrados = ref<any[]>([]);

        const textoFiltro = ref<string>('');

        const kardexEditarEntradaSalidaComponentRef = ref();

        onMounted(async() => {
            await buscarKardex();
        });

        const buscarKardex = async () => {
            const resp = await obtenerKardexProductos();
            if (resp.ok) {
                kardexs = resp.data;
                kardexsFiltrados.value = JSON.parse(JSON.stringify(kardexs));
            }
        }

        const nuevaEntrada = async () => {
            kardexEditarEntradaSalidaComponentRef.value.abrirComponent('entrada');
        }

        const nuevaSalida = async () => {
            kardexEditarEntradaSalidaComponentRef.value.abrirComponent('salida');
        }

        const filtrarInformacion = async () => {
            kardexsFiltrados.value = JSON.parse(JSON.stringify(
                kardexs.filter(
                    (u: any) => u.nombre_producto.toLowerCase().includes(textoFiltro.value.toLowerCase())
                        || u.nombre_marca.toLowerCase().includes(textoFiltro.value.toLowerCase())
                )
            ));
        }

        const cerrarKardexEditarEntradaSalidaComponentEmit = async(seGrabo: boolean) => {
            return seGrabo;
        }

        return {
            headers,
            textoFiltro,
            kardexsFiltrados,

            buscarKardex,
            filtrarInformacion,
            nuevaEntrada,
            nuevaSalida,

            numeral,

            kardexEditarEntradaSalidaComponentRef,
            cerrarKardexEditarEntradaSalidaComponentEmit,
};
    }
}
</script>
