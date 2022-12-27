<template>
    <main id="js-page-content" role="main" class="page-content">
        <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-10 col-md-12 col-sm-12 col-12">
            <!-- <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"> -->
                <div class="subheader">
                    <h1 class="subheader-title">
                        <i class='subheader-icon fal fa-user'></i> {{ $router.currentRoute.value.meta.titleSingularForm }}
                    </h1>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-10 col-md-12 col-sm-12 col-12">
            <!-- <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"> -->
                <div class="panel">
                    <div class="panel-hdr mt-2">
                        <div class="float-left">
                            <button
                                type="button" 
                                class="btn btn-primary btn-sm mr-2"
                                title="Grabar"
                                v-if="!seGrabo"
                                @click="grabar">
                                <i class="fal fa-save"></i>
                                <span class="d-none d-sm-block float-right ml-1">Grabar</span>
                            </button>
                            <button
                                type="button" 
                                class="btn btn-default btn-sm mr-2"
                                title="Asignar Regioneles Y Formularios"
                                @click="asignarPermisosUsuarioInterno"
                                v-if="rolForm.IdRol !== 0 && rolForm.Estado">
                                <i class="fal fa-align-left"></i>
                                <span class="d-none d-sm-block float-right ml-1">Asignar Regioneles y Formularios</span>
                            </button>
                        </div>
                        <h2 class="d-none d-sm-block">
                            Registro de<span class="fw-300"><i>{{ $router.currentRoute.value.meta.titleSingularForm }}</i></span>
                        </h2>
                        <div class="float-right">
                            <button type="button" class="btn btn-danger btn-sm" @click="cancelar">
                                <i class="fal fa-arrow-alt-to-left"></i>
                                <span class="d-none d-sm-block float-right ml-1">{{ seGrabo ? 'Salir' : 'Cancelar' }}</span>
                            </button>
                        
                        </div>
                    </div>

                    <div class="panel-container">
                        <div class="panel-content">
                            <form novalidate>
                                <div class="form-row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                                        <label
                                            class="form-label"
                                            for="nomnre-rol">Nombre Rol</label>
                                        <input
                                            type="text"
                                            class="form-control form-control-sm"
                                            id="nomnre-rol"
                                            name="nomnre-rol"
                                            autocomplete="off"
                                            :readonly="rolForm.IdUsuario > 0"
                                            :class="{ 'is-invalid': v$.NombreRol.$dirty && v$.NombreRol.$invalid }"
                                            v-model.trim="v$.NombreRol.$model">
                                        <small
                                            class="invalid-feedback">
                                            Nombre Rol, no tiene información.
                                        </small>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                                        <label
                                            class="form-label"
                                            for="descripcion-rol">Descripción Rol</label>
                                        <input
                                            type="text"
                                            class="form-control form-control-sm"
                                            id="descripcion-rol"
                                            name="descripcion-rol"
                                            autocomplete="off"
                                            :readonly="rolForm.IdUsuario > 0"
                                            :class="{ 'is-invalid': v$.DescripcionRol.$dirty && v$.DescripcionRol.$invalid }"
                                            v-model.trim="v$.DescripcionRol.$model">
                                        <small
                                            class="invalid-feedback">
                                            Descripción Rol, no tiene información.
                                        </small>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-2">
                                        <div class="custom-control custom-switch">
                                            <input
                                                type="checkbox"
                                                class="custom-control-input"
                                                id="es-rol-externo"
                                                name="es-rol-externo"
                                                :disabled="seGrabo"
                                                v-model="rolForm.EsRolExterno">
                                            <label class="custom-control-label" for="es-rol-externo">¿Es Rol externo?</label>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-2">
                                        <div class="custom-control custom-switch">
                                            <input
                                                type="checkbox"
                                                class="custom-control-input"
                                                id="estado"
                                                name="estado"
                                                :disabled="seGrabo"
                                                v-model="rolForm.Estado">
                                            <label class="custom-control-label" for="estado">Estado</label>
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

    <asignar-regionales-formularios-rol-component
        ref="asignarRegionalesFormulariosRolComponentRef" />
</template>

<script lang='ts'>
import { useRouter } from 'vue-router';
import { ref, onMounted, defineAsyncComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import utils from '@/utils/utils';
import useRoles from '../composables/useRoles';

const URL_NAME_ADMIN = 'roles-admin';
const URL_NAME_EDITAR = 'rol-editar';

export default {
    components: {
        AsignarRegionalesFormulariosRolComponent: defineAsyncComponent(
            () => import('@/modules/seguridad/components/AsignarRegionalesFormulariosRolComponent.vue')
        ),
    },
    setup() {
        const router = useRouter();
        const {
            grabarRol,
        } = useRoles();

        const rolForm = ref<any>({
            IdRol:          0,
            NombreRol:      '',
            DescripcionRol: '',
            EsRolExterno:   false,
            Estado:         true,
        });
        const reglasRolForm = {
            NombreRol:      { required },
            DescripcionRol: { required },
        };
        const v$ = useVuelidate(
            reglasRolForm,
            rolForm
        );

        const asignarRegionalesFormulariosRolComponentRef = ref();

        const seGrabo = ref<boolean>(false);

        onMounted(async () => {
            // Obtenemos el registro seleccionado desde al administrador.
            const respuesta: any = await utils.recuperaValoresLocalStorage(URL_NAME_EDITAR);
            if (respuesta.ok) {
                rolForm.value = respuesta.data;
            }
        });

        const grabar = async () => {
            if (!v$.value.$invalid) {
                const respuesta = await grabarRol(rolForm.value);
                if (respuesta.ok) {
                    rolForm.value.IdRol = respuesta.data;
                    seGrabo.value = true;
                }
            } else {
                v$.value.$touch();
            }
        }

        const asignarPermisosUsuarioInterno = () => {
            asignarRegionalesFormulariosRolComponentRef.value.abrirComponent(
                rolForm.value.IdRol,
                rolForm.value.NombreRol,
            );
        }

        const cancelar = () => {
            router.push({
                name: URL_NAME_ADMIN
            });
        }

        return {
            // Variables.
            seGrabo,
            rolForm,

            // Validaciones.
            v$,

            // Métodos.
            asignarPermisosUsuarioInterno,
            cancelar,
            grabar,

            // Componentes.
            asignarRegionalesFormulariosRolComponentRef,
        };
    }
}
</script>
