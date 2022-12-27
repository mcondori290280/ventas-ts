<template>
    <!-- BEGIN Page Content -->
    <!-- the #js-page-content id is needed for some plugins to initialize -->
    <main id="js-page-content"
          role="main"
          class="page-content">
        <div class="subheader">
            <h1 class="subheader-title">
                <i class='subheader-icon fal fa-credit-card-front'></i> {{ $router.currentRoute.value.meta.titleForm }}
            </h1>
        </div>
        <div class="row">
            <div class="col-xl-12">
                <div class="panel">
                    <div class="panel-hdr mt-2">
                        <div class="float-left">
                            <button type="button" class="btn btn-primary btn-sm mr-2" title="Nuevo" @click="nuevoFormulario">
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
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="producto">Formulario </label>
                                        <div class="input-group">
                                            <input type="text" id="formulario" name="formulario" class="form-control form-control-sm"
                                                placeholder="Nombre del forumlario" v-model.trim="filtro.formulario" @keyup.enter="buscarFormulario"/>
                                            <div class="input-group-append">
                                                <button class="btn btn-primary btn-sm mb-2" id="btn_buscar_consultas_medicas"
                                                    name="btn_buscar_consultas_medicas" type="button" @click="buscarFormulario"
                                                    >
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
                    <div class="panel-hdr">
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
                            <EasyDataTable :headers="headers" :items="items" border-cell alternating buttons-pagination>
                                <template #item-acciones="item">
                                    <div class="input-group-append">
                                        <button type="button" class="btn btn-primary btn-xs" title="Editar formulario"
                                            @click="modificarFormulario(item)">
                                            <i class="fal fa-edit"></i>
                                        </button>
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

<script lang='ts'>
import { useRouter } from "vue-router";
import { onMounted, ref } from 'vue'; 

import utils from '@/utils/utils';
import useFormulario from '../composables/useFormulario';

const URL_NAME_EDITAR = 'formulario-editar';

export default {
    setup() {
        const router = useRouter();
        const { buscarFormularios } = useFormulario();
        const filtro = ref<any>(
            {
                formulario: ''
            }
        );

        const headers = [
            { text: "Módulo", value: "Sistemas.NombreSistema" },
            { text: "Etiqueta", value: "EtiquetaFormularioWeb", sortable: true },
            { text: "Descripción", value: "DescripcionFormularioWeb", sortable: true },
            { text: "Habilitado", value: "Estado", sortable: true },
            { text: "Visible en Menú", value: "SeMuestraEnMenu", sortable: true },
            { text: "Editar", value: "acciones", width: 20 },
        ];

        const items = ref([]);

        onMounted(async() => {
            const ruta = router.options.history.state.back + '';
            if (ruta.includes(URL_NAME_EDITAR)) {
                const respuesta = await utils.recuperaValoresLocalStorage('filtro-busqueda-formulario');
                if (respuesta.ok) {
                    filtro.value = respuesta.data;
                    await buscarFormulario();
                }
            } else {
                utils.eliminarValoresLocalStorage('filtro-busqueda-formulario');
            }
        });

        const buscarFormulario = async () => {
            let mensaje = '';
            items.value = await buscarFormularios(filtro.value.formulario);
            if (items.value.length <= 0) {
                mensaje = `Lo sentimos no se tiene formularios registrados con el criterio de búsqueda solicitado.`;
                utils.mostrarMensajeModal({ Descripcion: mensaje, TipoMensaje: 'info' });
            }
        }

        const nuevoFormulario = async () => {
            filtro.value.formulario.trim().length > 0
                ? await utils.almacenaValoresLocalStorage('filtro-busqueda-formulario', filtro.value)
                : '';

            router.push({ name: "formulario-editar", params: { id: 0 } });
        }

        const modificarFormulario = async (formulario: any) => {
            filtro.value.formulario.trim().length > 0
                ? await utils.almacenaValoresLocalStorage('filtro-busqueda-formulario', filtro.value)
                : '';

            router.push({ name: "formulario-editar", params: { id: formulario .IdFormularioWeb} });
        }

        return {
            headers,
            items,
            filtro,

            nuevoFormulario,
            buscarFormulario,
            modificarFormulario
        };
    }
}
</script>
