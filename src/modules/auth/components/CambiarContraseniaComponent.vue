<template>
    <div id="modal-modificar-contrasenia"
        class="modal">
        <div class="modal-dialog modal-md"
            role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">
                        Modificar Contraseña
                    </h4>
                    <button type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            @click="cancelarModificarContrasenia(false)">
                        <span aria-hidden="true"><i class="fal fa-times"></i></span>
                    </button>
                </div>
                <form novalidate>
                    <div class="modal-body">
                        <div class="form-group">
                            <label class="form-label"
                                    for="contraseniaActual">Contraseña actual</label>
                            <input type="password"
                                    id="contraseniaActual"
                                    name="contraseniaActual"
                                    class="form-control form-control-sm"
                                    autocomplete="off"
                                    :class="{ 'is-invalid': v$.contraseniaActual.$dirty && v$.contraseniaActual.$invalid }"
                                    v-model.trim="v$.contraseniaActual.$model"
                                    ref="contraseniaActual">
                            <small class="invalid-feedback"
                                    v-if="v$.contraseniaActual.$dirty && v$.contraseniaActual.required.$invalid">
                                Contraseña actual, no tiene información.
                            </small>
                        </div>
                        <div class="form-group">
                            <label class="form-label"
                                    for="nuevaContrasenia">Nueva contraseña</label>
                            <input type="password"
                                    id="nuevaContrasenia"
                                    name="nuevaContrasenia"
                                    class="form-control form-control-sm"
                                    autocomplete="off"
                                    :class="{ 'is-invalid': v$.nuevaContrasenia.$dirty && v$.nuevaContrasenia.$invalid }"
                                    v-model.trim="v$.nuevaContrasenia.$model"
                                    ref="nuevaContrasenia">
                            <small class="invalid-feedback"
                                    v-if="v$.nuevaContrasenia.$dirty && v$.nuevaContrasenia.required.$invalid">
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
                            <small class="invalid-feedback" v-if="v$.nuevaContrasenia.$dirty && v$.nuevaContrasenia.tieneLetraMayuscula.$invalid">
                                Una letra mayuscula.
                            </small>
                            <small class="invalid-feedback" v-if="v$.nuevaContrasenia.$dirty && v$.nuevaContrasenia.tieneCaracterEspecial.$invalid">
                                Una caracter especial {{caracteresEspeciales}}
                            </small>
                            <small class="invalid-feedback" v-if="v$.nuevaContrasenia.$dirty && v$.nuevaContrasenia.tieneNumero.$invalid">
                                Un número.
                            </small>
                        </div>
                        <div class="form-group">
                            <label class="form-label"
                                    for="confirmarContrasenia">Confirmar contraseña</label>
                            <input type="password"
                                    id="confirmarContrasenia"
                                    name="confirmarContrasenia"
                                    class="form-control form-control-sm"
                                    autocomplete="off"
                                    :class="{ 'is-invalid': v$.confirmarContrasenia.$dirty && v$.confirmarContrasenia.$invalid }"
                                    v-model.trim="v$.confirmarContrasenia.$model"
                                    ref="confirmarContrasenia">
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
                    <div class="modal-footer">
                        <button type="button"
                                class="btn btn-primary"
                                id="btnAceptar"
                                name="btnAceptar"
                                @click="modificarContrasenia()"
                                ref="btnAceptar">
                            Aceptar
                        </button>
                        <button type="button"
                                id="btnCancelar"
                                name="btnCancelar"
                                class="btn btn-danger"
                                @click="cancelarModificarContrasenia(false)"
                                ref="btnCancelar">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { ref } from "vue";
import useVuelidate from '@vuelidate/core';
import { required, minLength, helpers } from '@vuelidate/validators';

import useAuth from "@/modules/auth/composables/useAuth";
import utils from "@/utils/utils";
import { passRegex } from '@/utils/pass_regex';

declare let window: any;

export default {
    setup(_: any, { emit }: any) {
        const { cambiarContrasenia } = useAuth();

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
                required,
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

        const modificarContrasenia = async() => {
            if (!v$.value.$invalid) {
                const resp = await cambiarContrasenia(changePasswordForm.value);
                if (resp) {
                    cancelarModificarContrasenia(true);
                }
            } else {
                v$.value.$touch();

                utils.mostrarMensaje({
                    descripcion: 'Existe información incorrecta. Por favor revise.',
                    tipoMensaje: 'error',
                });
            }
        }

        const cancelarModificarContrasenia = (seCambioContrasena: any) => {
            window.$('#modal-modificar-contrasenia').hide();

            changePasswordForm.value.contraseniaActual = '';
            changePasswordForm.value.nuevaContrasenia = '';
            changePasswordForm.value.confirmarContrasenia = '';

            v$.value.$reset();

            emit('cerrarModalCambioContrasena', seCambioContrasena);
        }

        return {
            changePasswordForm,
            v$,

            cancelarModificarContrasenia,
            modificarContrasenia,
            caracteresEspeciales
        };
    }
}
</script>
