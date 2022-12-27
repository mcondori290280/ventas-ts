<template>
    <div style="background-image: url('/assets/img/backgrounds/background.jpg');position:absolute;bottom:0;width:100%;height:100%; padding-top: 40px;">
        <div class="m-auto"
            style="width:350px;padding-top:48px;">
            <div class="page-logo m-0 w-100 align-items-center justify-content-center rounded-top border-bottom-left-radius-0 border-bottom-right-radius-0"
                style="position:relative;background-image:none;background:#fff;-webkit-box-shadow: none;padding-top:9px;">
                <a href="javascript:void(0)"
                class="page-logo-link press-scale-down align-items-center">
                    <img src="/assets/img/logo-letras-csbp.png"
                        alt="Caja de Salud Banca Privada" style="height: 60px;"
                        aria-roledescription="logo">
                </a>
                
            </div>
            
            <div class="card border-top-left-radius-0 border-top-right-radius-0 rounded-bottom"
                style="background:#fff;-webkit-box-shadow: none;padding: 10px 20px 20px 20px;">
                
                    <label for="" class="form-label text-center">Ingrese su correo electrónico y le enviaremos un enlace para reestablecer su
                    contraseña</label>
                
                <hr class="mt-1 mb-3"
                    style="border-bottom: 1px solid #ddd;" />
                <form novalidate
                    @submit.prevent="enviarCorreoDeRecuperacion()">
                    <div class="form-group">
                        <label class="form-label"
                            for="correoEletronico">Correo electrónico</label>
                        <input type="email"
                            id="correoEletronico"
                            name="correoEletronico"
                            class="form-control"
                            autocomplete="off"
                            :class="{ 'is-invalid': v$.correoElectronico.$dirty && v$.correoElectronico.$invalid }"
                            v-model.trim="v$.correoElectronico.$model"
                            ref="txtCorreoElectronicoId">
                        <small class="invalid-feedback"
                            v-if="v$.correoElectronico.$dirty && v$.correoElectronico.email.$invalid">
                            Correo electrónico, no es válido.
                        </small>
                        <small class="invalid-feedback"
                            v-if="v$.correoElectronico.$dirty && v$.correoElectronico.required.$invalid">
                            Correo electrónico, no tiene información.
                        </small>
                    </div>
                    <div class="form-group ">
                        <VueRecaptcha :sitekey="siteKey" :load-recaptcha-script="true" @verify="handleSuccess" @error="handleError"
                            @expired="expiredMethod">
                        </VueRecaptcha>
                        <small class="invalid-feedback">
                            Debe indicar, si No es un robot.
                        </small>
                    </div>
                    <button type="submit"
                            class="btn btn-primary btn-block">Confirmar</button>
                </form>
                <div class="col-12 text-right mt-3">
                    <router-link :to="{ name: 'login' }">
                        Volver al Inicio de sesión
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { onMounted, ref, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import { useRouter } from "vue-router";
import { VueRecaptcha } from 'vue-recaptcha';
import appConfig from '@/app.config';
import utils from '@/utils/utils';
import useAuth from '@/modules/auth/composables/useAuth';

export default {
    name: 'ForgotYourPasswordView',
    components: {
        VueRecaptcha
    },
    setup() {
        const router = useRouter();
        const { solicitaReestablecerContrasenia } = useAuth();

        const txtCorreoElectronicoId = ref();
        const forgotYourPassword = ref({
            correoElectronico: ''
        });

        const reglas = {
            correoElectronico: {
                required,
                email
            },
        };
        const v$ = useVuelidate(reglas, forgotYourPassword);

        onMounted(() => {
            txtCorreoElectronicoId.value.focus();
        });

        const enviarCorreoDeRecuperacion = async () => {
            if (statusRecaptcha) {
                if (!v$.value.$invalid) {
                    const ok = await solicitaReestablecerContrasenia(forgotYourPassword.value.correoElectronico);
                    if (ok) {
                        router.push({ name: 'login' });
                    }
                } else {
                    v$.value.$touch();
                }
            } else {
                utils.mostrarMensaje({ Descripcion: 'Debe marcar la casilla de "No soy un robot".', TipoMensaje: 'warning' });
            }
        }

        let statusRecaptcha = false;
        const siteKey = computed(() => {
            return appConfig.KEY_RECAPTCHA;
        });

        const handleError = () => {
            statusRecaptcha = false;
        };

        const handleSuccess = () => {
            statusRecaptcha = true;
        };
        const expiredMethod = () => {
            statusRecaptcha = false;
        };
        return {
            txtCorreoElectronicoId,
            v$,

            enviarCorreoDeRecuperacion,
            siteKey,
            handleError,
            handleSuccess,
            expiredMethod
        }
    }
}
</script>
