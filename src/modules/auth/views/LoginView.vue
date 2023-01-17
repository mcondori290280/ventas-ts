<template>
    <div
        style="background-image: url('/assets/img/backgrounds/page-bg.png');position:absolute;bottom:0;width:100%;height:100%; padding-top: 40px;">
        <div class="m-auto" style="width:350px;padding-top:48px;">
            <div class="page-logo m-0 w-100 align-items-center justify-content-center rounded-top border-bottom-left-radius-0 border-bottom-right-radius-0"
                style="position:relative;background-image:none;background:#fff;-webkit-box-shadow:none;padding-top:7px;height:120px;">
                <a href="javascript:void(0)" class="page-logo-link press-scale-down align-items-center">
                    <img src="/assets/img/logo.png" alt="MarketBo" style="height: 70px;">
                </a>
            </div>

            <div class="card border-top-left-radius-0 border-top-right-radius-0 rounded-bottom"
                style="background:#fff;-webkit-box-shadow: none;padding: 0px 20px 20px 20px;">
                <hr class="mt-1 mb-4" style="border-bottom: 1px solid #ddd;" />
                <form novalidate @submit.prevent="iniciarSesion()">
                    <div class="form-group">
                        <label class="form-label" for="usuario"><b>Usuario</b></label>
                        <input type="email" id="usuario" name="usuario" class="form-control form-control-md"
                            :class="{ 'is-invalid': v$.usuario.$dirty && v$.usuario.$invalid }" placeholder="Usuario"
                            v-model.trim="v$.usuario.$model" ref="txtUsuarioId">
                        <small class="invalid-feedback" v-if="v$.usuario.$dirty && v$.usuario.required.$invalid">
                            Usuario, no tiene información.
                        </small>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="password">Contraseña </label>
                        <input type="password" id="password" name="password" class="form-control form-control-md"
                            autocomplete="off"
                            :class="{ 'is-invalid': v$.password.$dirty && v$.password.$invalid }"
                            placeholder="Contraseña" v-model.trim="v$.password.$model">
                        <small class="invalid-feedback"
                            v-if="v$.password.$dirty && v$.password.required.$invalid">
                            Contraseña, no tiene información.
                        </small>
                    </div>

                    <div class="form-group ">
                        <VueRecaptcha :sitekey="siteKey" :load-recaptcha-script="true" @verify="handleSuccess"
                            @error="handleError" @expired="expiredMethod">
                        </VueRecaptcha>
                        <small class="invalid-feedback">
                            Debe indicar, si No es un robot.
                        </small>
                    </div>
                    <button type="submit" class="btn btn-primary float-right">Iniciar Sesión</button>
                </form>
                <div class="blankpage-footer text-right mt-3">
                    <router-link :to="{ name: 'olvidaste-tu-contrasena' }">
                        Restablecer contraseña
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref, computed} from 'vue';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useRouter } from "vue-router";

import useAuth from '@/modules/auth/composables/useAuth';

import appConfig from '@/app.config';
import { VueRecaptcha } from 'vue-recaptcha';
import utils from '@/utils/utils';

export default {
    name: 'LoginView',    
    components: {
        VueRecaptcha
    },
    setup() {
        const router = useRouter();
        const { loginUser, logout, checkVersion } = useAuth();
        
        const login = ref({
            usuario: '',
            password: ''           
        });
        const reglas = {
            usuario: {
                required
            },
            password: {
                required
            }
        };
        const v$ = useVuelidate(reglas, login);
        const txtUsuarioId = ref();

        let statusRecaptcha = false;

        onMounted(async() => {
            await checkVersion('version.json');

            txtUsuarioId.value.focus();
            logout();
        });

        const iniciarSesion = async () => {
            if (statusRecaptcha) {
                if (!v$.value.$invalid) {
                    const inicioSesion = JSON.parse(JSON.stringify(login.value));
                    const respuesta = await loginUser(inicioSesion);

                    if (respuesta) {
                        router.push({ name: 'seleccionar-sucursal' });
                    }
                }
                else {
                    v$.value.$touch();
                }
            } else { 
                utils.mostrarMensaje({ Descripcion: 'Debe marcar la casilla de "No soy un robot".', TipoMensaje:'warning'});
            }
        }

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
            txtUsuarioId,
            v$,

            iniciarSesion,
            siteKey,
            handleError,
            handleSuccess,
            expiredMethod
        };
    }
}
</script>
