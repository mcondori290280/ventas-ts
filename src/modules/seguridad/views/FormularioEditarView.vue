<template>
    <main id="js-page-content" role="main" class="page-content">
        <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-10 col-md-12 col-sm-12 col-12">
                <div class="subheader">
                    <h1 class="subheader-title">
                        <i class='subheader-icon fal fa-credit-card-front'></i> {{ $router.currentRoute.value.meta.titleForm }}
                    </h1>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-10 col-md-12 col-sm-12 col-12">
                <div class="panel">
                    <div class="panel-hdr mt-2">
                        <div class="float-left">
                            <button type="button" 
                                class="btn btn-primary btn-sm mr-2" title="Grabar"
                                @click="grabaFormulario" v-if="!seGrabo">
                                <i class="fal fa-save"></i>
                                <span class="d-none d-sm-block float-right ml-1">Grabar</span>
                            </button>
                            <button type="button" 
                                class="btn btn-primary btn-sm mr-2" title="Nuevo" 
                                @click="nuevoFormulario" v-if="seGrabo">
                                <i class="fal fa-plus-square"></i>
                                <span class="d-none d-sm-block float-right ml-1">Nuevo</span>
                            </button>
                        </div>
                        <h2 class="d-none d-sm-block">
                            Registro de<span class="fw-300"><i>{{ $router.currentRoute.value.meta.titleForm
                            }}</i></span>
                        </h2>
                        <div class="float-right">
                            <button type="button" class="btn btn-danger btn-sm" @click="cancelar">
                                <i class="fal fa-arrow-alt-to-left"></i>
                                <span class="d-none d-sm-block float-right ml-1">Cancelar</span>
                            </button>
                        
                        </div>
                    </div>
                    <div class="panel-container">
                        <div class="panel-content">
                            <form novalidate>
                                <div class="row mb-2">
                                    <div class="col-sm-4">
                                        <label class="form-label d-block " for="IdSistema">Módulo</label>
                                        <select id="IdSistema" name="IdSistema" class="custom-select custom-select-sm"
                                            :class="{ 'is-invalid':v$.IdSistema.$dirty && v$.IdSistema.$invalid }"
                                            @change="onChangeModulos" v-model.trim="v$.IdSistema.$model">
                                            <option v-for="modulo in modulos" :value="modulo.IdSistema"
                                                :key="modulo.IdSistema">
                                                {{modulo.NombreSistema}}
                                            </option>
                                        </select>
                                        <small class="invalid-feedback" v-if="v$.IdSistema.$invalid">
                                            Debe seleccionar un Módulo.
                                        </small>
                                    </div>
                                    <div class="col-sm-4">
                                        <label class="form-label d-block " for="IdFormularioWebPadre">Formulario Padre</label>
                                        <select id="IdFormularioPadre" name="IdFormularioWebPadre" class="custom-select custom-select-sm" 
                                            :class="{ 'is-invalid': v$.IdFormularioWebPadre.$dirty && v$.IdFormularioWebPadre.$invalid }"
                                            v-model.trim="v$.IdFormularioWebPadre.$model"
                                            >
                                            <option v-for="formularioPadre in formulariosPadre" :value="formularioPadre.IdFormularioWeb"
                                                :key="formularioPadre.IdFormularioWeb">
                                                {{ formularioPadre.EtiquetaFormularioWeb.toUpperCase() }}
                                            </option>
                                        </select>
                                        <small class="invalid-feedback" v-if="v$.IdFormularioWebPadre.$invalid">
                                            Debe seleccionar un Formulario Padre.
                                        </small>
                                    </div>
                                   
                                </div>
                                <div class="row mb-2">
                                    <div class="col-sm-4">
                                        <label class="form-label d-block" for="etiqueta">Etiqueta para el menú</label>
                                        <input type="text" class="form-control form-control-sm" id="etiqueta" name="etiqueta"
                                            :class="{ 'is-invalid': v$.EtiquetaFormularioWeb.$dirty && v$.EtiquetaFormularioWeb.$invalid }"
                                            v-model.trim="v$.EtiquetaFormularioWeb.$model"
                                            >
                                        <small class="invalid-feedback"
                                            v-if="v$.EtiquetaFormularioWeb.$dirty && v$.EtiquetaFormularioWeb.required.$invalid">
                                            Debe ingresar la etiqueta del formulario.
                                        </small>
                                    </div>
                                    <div class="col-sm-4">
                                        <label class="form-label d-block" for="descripcion">Descripción</label>
                                        <input type="text" class="form-control form-control-sm" id="descripcion" name="descripcion"
                                            :class="{ 'is-invalid': v$.DescripcionFormularioWeb.$dirty && v$.DescripcionFormularioWeb.$invalid }"
                                            v-model.trim="v$.DescripcionFormularioWeb.$model">
                                        <small class="invalid-feedback" v-if="v$.DescripcionFormularioWeb.$dirty && v$.DescripcionFormularioWeb.required.$invalid">
                                            Debe ingresar la descripcion del formulario.
                                        </small>
                                    </div>
                                    
                                </div>
                                <div class="row mb-2" v-if="formulario.SeMuestraAreaControladorAccion">
                                    <div class="col-sm-4">
                                        <label class="form-label d-block" for="area">Area</label>
                                        <input type="text" class="form-control form-control-sm" id="area" name="area"
                                         v-model="formulario.Area">
                                    </div>
                                    <div class="col-sm-4">
                                        <label class="form-label d-block" for="controlador">Controlador</label>
                                        <input type="text" class="form-control form-control-sm" id="controlador" name="controlador"
                                         v-model="formulario.Controlador">
                                    </div>
                                    <div class="col-sm-4">
                                        <label class="form-label d-block" for="accion">Acción Principal</label>
                                        <input type="text" class="form-control form-control-sm" id="accion" name="accion"
                                        v-model="formulario.AccionPrincipal" />
                                    </div>
                                </div>
                                <div class="row mb-2">
                                    <div class="col-sm-4">
                                        <label class="form-label d-block" for="estilo-css">Estilo css</label>
                                        <input type="text" class="form-control form-control-sm" id="estilo-css" name="estilo-css"
                                        :class="{ 'is-invalid': v$.CssImagen.$dirty && v$.CssImagen.$invalid }"
                                         v-model.trim="v$.CssImagen.$model" >
                                        <small class="invalid-feedback"
                                            v-if="v$.CssImagen.$dirty && v$.CssImagen.required.$invalid">
                                            Debe ingresar el estilo CSS para el acceso del formulario.
                                        </small>
                                    </div>
                                    <div class="col-sm-4">
                                        <label class="form-label d-block" for="url">Nombre de Ruta</label>
                                        <input type="text" class="form-control form-control-sm" id="url" name="url" 
                                        :class="{ 'is-invalid': v$.Ruta.$dirty && v$.Ruta.$invalid }"
                                         v-model.trim="v$.Ruta.$model"/>
                                        <small class="invalid-feedback" v-if="v$.Ruta.$dirty && v$.Ruta.required.$invalid">
                                            Debe ingresar la ruta de acceso al formulario desde el Frontend.
                                        </small>
                                    </div>
                                    <div class="col-sm-4">
                                        <label class="form-label d-block" for="orden">Orden Visualización</label>
                                        <input type="text" class="form-control form-control-sm" id="orden" name="orden" 
                                        :class="{ 'is-invalid': v$.Orden.$dirty && v$.Orden.$invalid }"
                                        v-model.trim="v$.Orden.$model"/>
                                        <small class="invalid-feedback" v-if="v$.Orden.$dirty && v$.Orden.required.$invalid">
                                            Debe ingresar la orden en que aparecerz el acceso en menú.
                                        </small>
                                    </div>
                                </div>
                                <div class="row mb-2">
                                    <div class="col-sm-4">
                                        <label class="form-label d-block" for="estado">¿Es formulario de registro?</label>
                                        <div class="custom-control custom-switch">
                                            <input type="checkbox" class="custom-control-input" id="esFormulario" name="esFormulario" v-model="formulario.EsFormulario"/>
                                            <label class="form-label d-block custom-control-label" for="esFormulario">&nbsp;</label>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <label class="form-label d-block" for="estado">¿Es visible en el Menú?</label>
                                        <div class="custom-control custom-switch">
                                            <input type="checkbox" class="custom-control-input" id="seMuestraEnMenu" name="seMuestraEnMenu" v-model="formulario.SeMuestraEnMenu" />
                                            <label class="form-label d-block custom-control-label" for="seMuestraEnMenu">&nbsp;</label>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <label class="form-label d-block" for="estado">Estado</label>
                                        <div class="custom-control custom-switch">
                                            <input type="checkbox" class="custom-control-input" id="estado" name="estado" v-model="formulario.Estado"/>
                                            <label class="form-label d-block custom-control-label" for="estado">&nbsp;</label>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { ref, onMounted } from 'vue';
import useFormulario from '../composables/useFormulario';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export default {
    setup() {
        const router = useRouter();
        const { obtenerFormularioXid, listarModulos, listaFormulariosPadre, grabarFormulario } = useFormulario();
        let idFormularioWeb = 0;
        try {
            idFormularioWeb = parseInt(router.currentRoute.value.params.id.toString());
        } catch (error) {
            idFormularioWeb = 0;
        }
        const seGrabo = ref(false);
        const formulario = ref(
            {
                AccionPrincipal: '#',
                Area: '#',
                Controlador: '#',
                CssImagen: '',
                DescripcionFormularioWeb: '',
                EsFormulario: false,
                Estado: false,
                EtiquetaFormularioWeb: '',
                FormulariosWeb_Operaciones: [],
                IdFormularioWeb: 0,
                IdFormularioWebPadre: 0,
                IdSistema: 0,
                IdUsuarioCreacion: 0,
                IdUsuarioModificacion: 0,
                Orden: 0,
                Ruta: '',
                SeMuestraEnMenu: false,
                SeMuestraAreaControladorAccion: false,
            }
        );
        const formularioCereado = {...formulario.value};
        const seleccionoSistema = (value: any) => { return (value > 0 ? true : false); };
        const seleccionoFormularioPadre = (value: any) => { return (value > 0 ? true : false); };
        const reglas = {
            IdSistema: {
                seleccionoSistema
            },
            IdFormularioWebPadre: {
                seleccionoFormularioPadre
            },
            EtiquetaFormularioWeb: {
                required
            },
            DescripcionFormularioWeb: {
                required
            },
            
            CssImagen: {
                required
            },
            Ruta: {
                required
            },
            Orden: {
                required
            },
        };

        const v$ = useVuelidate(reglas, formulario);

        const modulos: any = ref([]);
        const formulariosPadre: any = ref([]);

        onMounted(async () => {
            await obtenerModulos();
            await obtenerFormulario();
            if (formulario.value.IdSistema == null)
                formulario.value.IdSistema = 0;

            obtenerFormulariosPadre(formulario.value.IdSistema);
        });

        const obtenerFormulario= async () => {

            if (idFormularioWeb > 0)
                formulario.value = await obtenerFormularioXid(idFormularioWeb);
            
            //obtenerFormulariosPadre(formulario.value.IdSistema);
            //onChangeModulos();
        }

        const obtenerModulos = async () => {
            modulos.value = await listarModulos();
            modulos.value.push({
                IdSistema: 0,
                NombreSistema: "SELECCIONE UN MÓDULO",
            });
        }

        const obtenerFormulariosPadre = async (idModulo: number) => {
            formulariosPadre.value = await listaFormulariosPadre(idModulo);
        }
        const onChangeModulos = async () => { 
            obtenerFormulariosPadre(formulario.value.IdSistema);
        }
        const cancelar = () => {
            router.push({ name: 'formulario-admin' });
        }

        const grabaFormulario = async () => {
            if (!v$.value.$invalid) {
                seGrabo.value = await grabarFormulario(formulario.value);    
            } else {
                v$.value.$touch();
            }
        }
        const nuevoFormulario = async () => { 
            formulario.value = { ...formularioCereado }
            seGrabo.value = false;
        }
        //obtenerFormulario();
        return {
            formulario,
            modulos,
            formulariosPadre,
            v$,
            seGrabo,

            obtenerFormulariosPadre,
            obtenerFormulario,
            onChangeModulos,
            cancelar,
            grabaFormulario,
            nuevoFormulario
        }
    }
}
</script>