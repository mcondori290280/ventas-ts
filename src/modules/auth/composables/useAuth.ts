import { computed } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';

import authApi from '@/modules/auth/api/authApi';
import utils from '@/utils/utils';

import { useLoading } from 'vue-loading-overlay';

import CryptoJS from 'crypto-js';

const useAuth = () => {
    const store = useStore();
    const $loading = useLoading();

    const loginUser = async(user: any) => {
        const loader = $loading.show(utils.configuracionLoading);
        const respuesta = await store.dispatch('auth/loginUser', user);
        loader.hide();

        return respuesta;
    }

    const obtenerSucursales = async() => {
        let sucursales = [];

        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await authApi.get(
                `/sucursales/obtener-sucursales-usuario/${ store.getters['auth/getIdUsuario'] }`,
                {
                    headers: {
                        'Content-type' : 'application/json',
                        'Authorization': 'Bearer ' + store.getters['auth/getToken'],
                    }
                }
            );

            if (data.ok) {
                sucursales = data.datos;
            }
        } catch( error ) {
            utils.mostrarMensajeErrorApi(error);
        }
        loader.hide();

        return sucursales;
    }

    const checkAuthStatus = async() => {
        const token = localStorage.getItem('_token');
        if (token) {
            let usuario = token.split('|')[1];
            const access_token = token.split('|')[0];
    
            usuario = JSON.parse(
                CryptoJS.AES.decrypt(
                    usuario,
                    "Secreto"
                ).toString(CryptoJS.enc.Utf8)
            );
            store.commit('auth/loginUser', { usuario, access_token });
        } else {
            store.commit('auth/logout');
        }
    }

    const logout = () => {
        store.commit('auth/logout');
    }

    const checkVersion = async (url: any) => {
        let hash = '';
        let currentHash: any = '';

        try {
            const respuesta = await axios.get(
                url + '?t=' + new Date().getTime(),
                {
                    headers: {
                        'Content-type' : 'application/json',
                        'Authorization': 'Bearer ' + store.getters['auth/getToken'],
                    }
                }
            );
            hash = respuesta.data.hash;
            currentHash = localStorage.getItem('ad7a024142e0256d760f0deee43e7699')
                ? localStorage.getItem('ad7a024142e0256d760f0deee43e7699')
                : '';
            localStorage.setItem('ad7a024142e0256d760f0deee43e7699', hash);

            if (currentHash !== hash) {
                console.log('Recarga...');
                location.reload();
            }
        } catch (error) {
            console.error(error, 'No se pudo obtener la versión.');
        }
    }

    const solicitaReestablecerContrasenia = async (correo: string) => { 
        let ok = false;

        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await authApi.post(
                `/usuarios/enviar-correo-recuperar-contrasenia`,
                {
                    correoElectronico: correo
                },
            );
            loader.hide();

            if (data.ok) {
                ok = true;
            }

            utils.mostrarMensaje(data.mensaje);
        } catch (error) {
            loader.hide();

            utils.mostrarMensajeErrorApi(error);
        }
        return ok;
    }









    const getTokenUser = async (user: any) => {
        const loader = $loading.show(utils.configuracionLoading);
        const ok = await store.dispatch('auth/getTokenUser', user);
        loader.hide();
        return ok;
    }

    const obtenerAccesos = async() => {
        await store.dispatch('auth/obtenerAccesos');
    }

    const cambiarContrasenia = async(changePasswordForm: any) => {
        let resultado = false;

        const loader = $loading.show(utils.configuracionLoading);
        try {
            const respuesta = await authApi.put(
                'CambiarContrasena', {
                    contrasenaActual: changePasswordForm.contraseniaActual,
                    contrasenaNueva: changePasswordForm.nuevaContrasenia,
                    contrasenaRepite: changePasswordForm.confirmarContrasenia,
                    idUsuario: store.getters['auth/getIdUsuario'],
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + store.getters['auth/getToken']
                    }
                }
            );

             if (respuesta.data.Mensaje.TipoMensaje === 'Success') {
                 utils.mostrarMensaje({
                     Descripcion: 'La contraseña fue modificada correctamente. Por favor vuelva a iniciar sesión.',
                     TipoMensaje: 'success',
                 });
                 resultado = true;
             } else {
                 utils.mostrarMensaje({
                     Descripcion: respuesta.data.Mensaje.Descripcion,
                     TipoMensaje: 'warning',
                 });
            }
        } catch( error ) {
            utils.mostrarMensajeErrorApi(error);
        }
        loader.hide();

        return resultado;
    }

    const verificaEnlace = async (enlace: string) => {
        let ok = false;
        // Mostramos la ventana loading.
        const loader = $loading.show(utils.configuracionLoading);
        try {
            const respSolicita = await authApi.post(
                `ReestablecerContrasena/verificaEnlace`,
                {
                    Token: enlace,
                },
                {
                    headers: {
                        'Authorization': 'Bearer ' + store.getters['auth/getToken'],
                    }
                }
            );

            if (respSolicita.data.Mensaje.TieneMensaje) {
               
                utils.mostrarMensaje({
                    Descripcion: respSolicita.data.Mensaje.Descripcion,
                    TipoMensaje: respSolicita.data.Mensaje.TipoMensaje, 
                }, 'login');
            } 
            ok = true;
        } catch (error) {
            utils.mostrarMensajeErrorApi(error);
        }
        loader.hide();
        return ok;
    }

    const reestablecerContrasena = async (enlace: string, contrasenaNueva: string, contrasenaRepite: string) => {
        let ok = false;
        // Mostramos la ventana loading.
        const loader = $loading.show(utils.configuracionLoading);
        try {
            const respSolicita = await authApi.put(
                `ReestablecerContrasena/reestablece`,
                {
                    Token: enlace,
                    contrasenaNueva: contrasenaNueva,
                    contrasenaRepite: contrasenaRepite
                },
                {
                    headers: {
                        'Authorization': 'Bearer ' + store.getters['auth/getToken'],
                    }
                }
            );
            
            if (respSolicita.data.Mensaje.TieneMensaje) {

                utils.mostrarMensaje({
                    Descripcion: respSolicita.data.Mensaje.Descripcion,
                    TipoMensaje: respSolicita.data.Mensaje.TipoMensaje,
                });
            }
            else {
                ok = true;
                utils.mostrarMensaje({
                    Descripcion: 'Información actualizada correctamente, por favor vuelva a ingresar con su nueva contraseña.',
                    TipoMensaje: 'success',
                }, 'login');
            }

        } catch (error) {
            utils.mostrarMensajeErrorApi(error);
        }
        loader.hide();
        return ok;
    }
    
    return {
        loginUser,
        obtenerSucursales,
        checkAuthStatus,
        checkVersion,
        logout,
        solicitaReestablecerContrasenia,





        cambiarContrasenia,
        getTokenUser,
        obtenerAccesos,
        verificaEnlace,
        reestablecerContrasena,
        accesos: computed(() => store.getters['auth/getAccesosModulo']),
        email: computed(() => store.getters['auth/getEmail']),
        fullNameUser: computed(() => store.getters['auth/getFullNameUser']),
        unicaSucursal: computed(() => store.getters['auth/getUnicaSucursal']),
        userName: computed(() => store.getters['auth/getUserName']),
    }
};

export default useAuth;