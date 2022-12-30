<template>
    <div class="page-wrapper p-0">
        <div class="page-inner">
            <div class="page-content-wrapper p-0">
                <cabecera-sucursal-component :mostrarOpcionesUsuario="false" />

                <main id="js-page-content" role="main" class="page-content">
                    <div class="row justify-content-center">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="subheader">
                                <h1 class="subheader-title">
                                    <i class="subheader-icon fal fa-box-check"></i>{{ titulo }}
                                    <small> Debe establecer su nueva contraseña.</small>
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                            <div class="panel">
                                <div class="panel-container show">
                                    <div class="panel-content">
                                        <form novalidate>
                                            <div class="modal-body p-2">
                                                <!-- <div class="form-group text-center">
                                                    <label class="form-label">{{ leyenda }}</label>
                                                </div> -->
                                                <div class="form-group mb-1" v-if="esParaModificarContrasena">
                                                    <label class="form-label" for="contraseniaActual">Contraseña actual</label>
                                                    <input type="password" id="contraseniaActual" name="contraseniaActual" class="form-control form-control-sm"
                                                        autocomplete="off"
                                                        :class="{ 'is-invalid': v$.contraseniaActual.$dirty && v$.contraseniaActual.$invalid }"
                                                        v-model.trim="v$.contraseniaActual.$model" ref="contraseniaActualRef"
                                                        v-on:keyup.enter="nuevaContraseniaRef.focus();">
                                                    <small class="invalid-feedback"
                                                        v-if="v$.contraseniaActual.$dirty && v$.contraseniaActual.required.$invalid">
                                                        Contraseña actual, no tiene información.
                                                    </small>
                                                </div>
                                                <div class="form-group mb-1">
                                                    <label class="form-label" for="nuevaContrasenia">Nueva contraseña</label>
                                                    <input type="password" id="nuevaContrasenia" name="nuevaContrasenia" class="form-control form-control-sm"
                                                        autocomplete="off" :class="{ 'is-invalid': v$.nuevaContrasenia.$dirty && v$.nuevaContrasenia.$invalid }"
                                                        v-model.trim="v$.nuevaContrasenia.$model" ref="nuevaContraseniaRef"
                                                        v-on:keyup.enter="confirmarContraseniaRef.focus();">
                                                    <small class="invalid-feedback" v-if="v$.nuevaContrasenia.$dirty && v$.nuevaContrasenia.required.$invalid">
                                                        Nueva contraseña, no tiene información.
                                                    </small>
                                                    <small class="invalid-feedback" v-if="v$.nuevaContrasenia.$dirty && v$.nuevaContrasenia.tieneTodasReglas.$invalid">
                                                        Su contraseña minimamente debe contar con:
                                                    </small>
                                                    <small class="invalid-feedback" v-if="v$.nuevaContrasenia.$dirty && v$.nuevaContrasenia.minLength.$invalid">
                                                        Mínimo {{ v$.nuevaContrasenia.minLength.$params.min }} caracteres.
                                                    </small>
                                                    <small class="invalid-feedback" v-if="v$.nuevaContrasenia.$dirty && v$.nuevaContrasenia.tieneLetraMinuscula.$invalid">
                                                        Una letra minuscula.
                                                    </small>
                                                    <small class="invalid-feedback" v-if="v$.nuevaContrasenia.$dirty && v$.nuevaContrasenia.tieneLetraMayuscula.$invalid" >
                                                        Una letra mayuscula.
                                                    </small>
                                                    <small class="invalid-feedback" v-if="v$.nuevaContrasenia.$dirty && v$.nuevaContrasenia.tieneCaracterEspecial.$invalid">
                                                        Una caracter especial  {{caracteresEspeciales}}
                                                    </small>
                                                    <small class="invalid-feedback" v-if="v$.nuevaContrasenia.$dirty && v$.nuevaContrasenia.tieneNumero.$invalid">
                                                        Un número.
                                                    </small>
                                                </div>
                                                <div class="form-group mb-1">
                                                    <label class="form-label" for="confirmarContrasenia">Confirmar contraseña</label>
                                                    <input type="password" id="confirmarContrasenia" name="confirmarContrasenia"
                                                        class="form-control form-control-sm" autocomplete="off"
                                                        :class="{ 'is-invalid': v$.confirmarContrasenia.$dirty && v$.confirmarContrasenia.$invalid }"
                                                        v-model.trim="v$.confirmarContrasenia.$model" ref="confirmarContraseniaRef"
                                                        v-on:keyup.enter="btnAceptarRef.focus();">
                                                    <small class="invalid-feedback"
                                                        v-if="v$.confirmarContrasenia.$dirty && v$.confirmarContrasenia.required.$invalid">
                                                        Confirmar contraseña, no tiene información.
                                                    </small>
                                                    <small class="invalid-feedback"
                                                        v-if="v$.confirmarContrasenia.$dirty && v$.confirmarContrasenia.minLength.$invalid">
                                                        Confirmar contraseña, mínimo de caracteres es {{ v$.confirmarContrasenia.minLength.$params.min }}.
                                                    </small>
                                                    <small class="invalid-feedback"
                                                        v-if="v$.confirmarContrasenia.$dirty && v$.confirmarContrasenia.sameAsPassword.$invalid">
                                                        Nueva contraseña y confirmar contraseña, no son iguales.
                                                    </small>
                                                </div>
                                            </div>
                                            <div class="modal-footer p-2 mt-0">
                                                <button type="button" class="btn btn-primary" id="btnAceptar" name="btnAceptar" 
                                                    @click="esParaModificarContrasena ? modificarContrasenia(): reestablecerContrasenia()"
                                                    ref="btnAceptarRef">
                                                    Aceptar
                                                </button>
                                                <button type="button" id="btnCancelar" name="btnCancelar" class="btn btn-danger"
                                                    @click="cancelarModificarContrasenia()" ref="btnCancelar">
                                                    Cancelar
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <!-- this overlay is activated only when mobile menu is triggered -->
                <div class="page-content-overlay" data-action="toggle" data-class="mobile-nav-on"></div>
                <!-- END Page Content -->

                <footer-component />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, onMounted, defineAsyncComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
import useAuth from "@/modules/auth/composables/useAuth";
import useVuelidate from '@vuelidate/core';
import { required, minLength, helpers, requiredIf } from '@vuelidate/validators';

import utils from "@/utils/utils";
import { passRegex } from '@/utils/pass_regex';

export default {
    components: {
        CabeceraSucursalComponent: defineAsyncComponent(() => import('../components/CabeceraSucursalComponent.vue')),
        FooterComponent: defineAsyncComponent(() => import('../components/FooterComponent.vue')),
    },
    setup() {
        const { cambiarContrasenia, logout, verificaEnlace, reestablecerContrasena } = useAuth();
        const router = useRouter();
        const route = useRoute();

        const leyenda = ref();
        
        const esParaModificarContrasena = route.params.tipo ? true : false;

        const tipoOEnlace = esParaModificarContrasena ? route.params.tipo.toString() : route.params.enlace.toString()

        if ((esParaModificarContrasena && (tipoOEnlace != '2' && tipoOEnlace != '1'))
            || (!esParaModificarContrasena && (tipoOEnlace == '2' || tipoOEnlace == '1'))) {
            logout();
            router.push({ name: 'login' });
        } 

        const contraseniaActualRef = ref();
        const nuevaContraseniaRef = ref();
        const confirmarContraseniaRef = ref(); 
        const btnAceptarRef = ref();

        leyenda.value = tipoOEnlace === '1'
            ? ' Estimado usuario su contraseña ha caducado, por favor ingrese su contraseña actual e ingrese su nueva contraseña.  ' 
            : (tipoOEnlace === '2'
                ? 'Estimado usuario, por favor ingrese su contraseña actual e ingrese su nueva contraseña.'
                : 'Estimado usuario, por favor establezca su nueva contraseña.');

        const titulo = ref('');
        titulo.value = tipoOEnlace === '1'
            ? ' Modificar Contraseña  '
            : (tipoOEnlace === '2'
                ? 'Modificar Contraseña '
                : 'Establezca su Contraseña.');

        const passwordIsSame = () => {
            return changePasswordForm.value.nuevaContrasenia === changePasswordForm.value.confirmarContrasenia;
        }

        const tieneTodasReglas = helpers.regex(passRegex.patternPasswordCompleto);
        const tieneLetraMinuscula = helpers.regex(passRegex.patternPasswordLetraMinuscula);
        const tieneLetraMayuscula = helpers.regex(passRegex.patternPasswordLetraMayuscula);
        const tieneNumero = helpers.regex(passRegex.patternPasswordNumero);
        const tieneCaracterEspecial = helpers.regex(passRegex.patternPasswordCaracterEspecial);
        const caracteresEspeciales = passRegex.patterncaracteresEspeciales;

        const changePasswordForm = ref(
            {
                contraseniaActual: '',
                nuevaContrasenia: '',
                confirmarContrasenia: '',
            }
        );
        const reglas = {
            contraseniaActual: {
                required: requiredIf(() => {
                    return esParaModificarContrasena;
                }),
            },
            nuevaContrasenia: {
                required,
                minLength: minLength(10),
                tieneLetraMayuscula,
                tieneLetraMinuscula,
                tieneNumero,
                tieneCaracterEspecial,
                tieneTodasReglas
            },
            confirmarContrasenia: {
                required,
                minLength: minLength(10),
                sameAsPassword: passwordIsSame,
            },
        };
        const v$ = useVuelidate(reglas, changePasswordForm);

        onMounted(async () => {
            if (esParaModificarContrasena) {
                contraseniaActualRef.value.focus();
            } else {
                await verificaEnlace(tipoOEnlace);
                nuevaContraseniaRef.value.focus();
            }
        });

        const modificarContrasenia = async () => {
            if (!v$.value.$invalid) {
                const resp = await cambiarContrasenia(changePasswordForm.value);
                if (!resp) {
                    changePasswordForm.value.contraseniaActual = '';
                    changePasswordForm.value.nuevaContrasenia = '';
                    changePasswordForm.value.confirmarContrasenia = '';
                    v$.value.$reset();
                }
                else { 
                    logout();
                    router.push({ name: 'login' });
                }
            } else {
                v$.value.$touch();
                utils.mostrarMensaje({
                    Descripcion: 'Existe información incorrecta. Por favor revise.',
                    TipoMensaje: 'error',
                });
            }
        }
        
        const cancelarModificarContrasenia = () => {
            changePasswordForm.value.contraseniaActual = '';
            changePasswordForm.value.nuevaContrasenia = '';
            changePasswordForm.value.confirmarContrasenia = '';

            logout();
            router.push({ name: 'login' });
        }

        const reestablecerContrasenia = async () => {
            if (!v$.value.$invalid) {
                const resp = await reestablecerContrasena(tipoOEnlace, changePasswordForm.value.nuevaContrasenia, changePasswordForm.value.confirmarContrasenia);
                if (!resp) {
                    changePasswordForm.value.contraseniaActual = '';
                    changePasswordForm.value.nuevaContrasenia = '';
                    changePasswordForm.value.confirmarContrasenia = '';
                    v$.value.$reset();
                }
            } else {
                v$.value.$touch();
                utils.mostrarMensaje({
                    Descripcion: 'Existe información incorrecta. Por favor revise.',
                    TipoMensaje: 'error',
                });
            }
        }

        return {
            changePasswordForm,
            v$,

            cancelarModificarContrasenia,
            modificarContrasenia,
            reestablecerContrasenia,

            contraseniaActualRef,
            nuevaContraseniaRef,
            confirmarContraseniaRef,
            btnAceptarRef,

            leyenda,
            titulo,
            caracteresEspeciales,
            esParaModificarContrasena
        };
    }
}
</script>