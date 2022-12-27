<template>
    <!-- Bloqueo del sistema -->
    <div id="modal-bloqueo-sistema" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true"
        data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">

                <div class="page-wrapper p-0">
                    <div class="page-inner bg-brand-gradient" style="min-height: auto !important;">
                        <div class="page-content-wrapper bg-transparent m-0 p-0">
                            <div class="d-flex flex-1"
                                style="background: url(/assets/img/svg/pattern-1.svg) no-repeat center bottom fixed; background-size: cover;">
                                <div
                                    class="container py-4 py-lg-5 my-lg-5 px-4 px-sm-0 text-white d-flex align-items-center justify-content-center">
                                    <form class="text-center text-white mb-5 pb-5" novalidate @submit.prevent="iniciarSesion">
                                        <div class="py-3">
                                            <img src="/assets/img/demo/avatars/default.png"
                                                class="img-responsive rounded-circle img-thumbnail" :alt="fullNameUser">
                                        </div>
                                        <div class="form-group">
                                            <h3>
                                                {{ fullNameUser }}
                                                <small>
                                                    {{ email }}
                                                </small>
                                            </h3>
                                            <p class="text-white opacity-50">Ingrese su contraseña para desbloquear el
                                                sistema.</p>
                                            <div class="input-group">
                                                <input type="password" id="contrasenia" name="contrasenia"
                                                    class="form-control form-control-md" autocomplete="off"
                                                    :class="{ 'is-invalid': v$.contrasenia.$dirty && v$.contrasenia.$invalid }"
                                                    placeholder="Contraseña" v-model.trim="v$.contrasenia.$model">
                                                <div class="input-group-append">
                                                    <button
                                                        class="btn btn-success shadow-0"
                                                        type="submit"
                                                        id="btn-desbloquear-sistema">
                                                        <i class="fal fa-key"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <small class="invalid-feedback"
                                                v-if="v$.contrasenia.$dirty && v$.contrasenia.required.$invalid">
                                                Contraseña, no tiene información.
                                            </small>
                                        </div>
                                        
                                        <div class="text-center">
                                            <a href="javascript:void(0)" class="text-white opacity-90"
                                                @click="noEsUsuario()">
                                                ¿No es {{ fullNameUser }}?
                                            </a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>

import { ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import useAuth from '@/modules/auth/composables/useAuth';
import { useRouter } from 'vue-router';

export default {
    name: 'bloqueo-sistema',
    setup() {
        const router = useRouter();
        const { fullNameUser, userName, email, getTokenUser } = useAuth();
        
        const login = ref(
            {
                usuario: '',
                contrasenia: ''
            }
        );
        const reglas = {
            contrasenia: {
                required
            },
        };
        const v$ = useVuelidate(reglas, login);

        const iniciarSesion = async () => {
            
            if (!v$.value.$invalid) {
                login.value.usuario = userName;
                const inicioSesion = JSON.parse(JSON.stringify(login.value));
                const ok = await getTokenUser(inicioSesion);
                login.value.contrasenia = '';
                if (ok) {
                    if (router.currentRoute.value.path === '/regional-module')
                    {
                        window.location.reload();
                    } else if (sessionStorage.getItem('recargar') === 'si') {
                        window.location.reload();
                    } else {
                        window.$('#modal-bloqueo-sistema').modal('toggle');
                    }
                    sessionStorage.removeItem('recargar');
                }
            }
             else {
                 v$.value.$touch();
            }
        }

        const noEsUsuario = () =>  {
            // Escondemos el modal '#modal-bloqueo-sistema' que se define en App.vue.
            window.$('#modal-bloqueo-sistema').modal('hide');

            setTimeout(() => {
                router.push('/');
            }, 100);
        }

        return {
            v$,
            fullNameUser,
            userName,
            email,

            iniciarSesion,
            noEsUsuario,
        }
    }
    // data() {
    //     return {
    //         passwordModalBloqueoSistema: null,

    //         loader: null,
    //     }
    // },

    // computed: { 
    //     ...mapState(['datosUsuario']),
    // },

    // methods: {
    //     ...mapMutations([
    //         'actualizarToken',
    //     ]),

    //     async desbloquearSistema() {
    //         this.dispositivo = JSON.stringify({
    //             browser: '',
    //             browser_version: '',
    //             os: '',
    //             os_version: '',
    //             IpPublico: '',
    //             IpPrivado: '',
    //             device: ''
    //         });

    //         if (this.passwordModalBloqueoSistema.length > 0) {
    //             this.loader = this.$loading.show(utils.configuracionLoading);
    //             try {
    //                 const respuesta = await axios.post(
    //                     process.env.VUE_APP_URL_API_SEGURIDAD + 'Auth/login', {
    //                     userName: this.datosUsuario.nombre_usuario.toLowerCase(),
    //                     password: this.passwordModalBloqueoSistema.toLowerCase(),
    //                     Dispositivo: this.dispositivo
    //                 }, {
    //                     headers: {
    //                         'Content-type': 'application/json'
    //                     }
    //                 }
    //                 );
    //                 this.passwordModalBloqueoSistema = '';

    //                 if (sessionStorage.getItem('seCargoInformacionDesdeMounted') === 'si') {
    //                     sessionStorage.removeItem('seCargoInformacionDesdeMounted');

    //                     location.reload();
    //                 } else {
    //                     sessionStorage.removeItem('seCargoInformacionDesdeMounted');

    //                     // Escondemos el modal '#modal-bloqueo-sistema' que se define en App.vue.
    //                     window.$('#modal-bloqueo-sistema').modal('hide');            
    //                 }

    //                 this.actualizarToken(respuesta.data.access_token);
    //             } catch (e) {
    //                 utils.mostrarMensajeErrorApi(this, e, false, false);

    //                 // Asignamos el foco al input txtPasswordModalBloqueoSistema.
    //                 this.$refs.txtPasswordModalBloqueoSistema.focus();
    //                 this.passwordModalBloqueoSistema = '';
    //             }
    //             this.loader.hide();
    //         } else {
    //             utils.mostrarMensaje(this, {
    //                 Descripcion: 'Contraseña, no tiene información.',
    //                 DescripcionTipoMensaje: 'warning',
    //             });

    //             // Asignamos el foco al input txtPasswordModalBloqueSistema.
    //             this.$refs.txtPasswordModalBloqueoSistema.focus();
    //         }
    //     },

    //     noEsUsuario() {
    //         // Escondemos el modal '#modal-bloqueo-sistema' que se define en App.vue.
    //         window.$('#modal-bloqueo-sistema').modal('hide');
    //         //window.$('#modal-bloqueo-sistema').modal('show');

    //         setTimeout(() => {
    //             this.$router.push('/login');
    //         }, 100);
    //     },
    // },
}
</script>
