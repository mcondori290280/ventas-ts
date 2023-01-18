import { useStore } from 'vuex';

import authApi from '@/modules/auth/api/authApi';
import utils from '@/utils/utils';

import { useLoading } from 'vue-loading-overlay';

const usePresentaciones = () => {
    const store = useStore();
    const $loading = useLoading();

    const obtenerPresentaciones = async(nombre: string) => {
        const respuesta = {
            ok: false,
            data: undefined,
        };

        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await authApi.get(
                `/presentaciones/obtener-presentaciones/${ nombre }`,
                {
                    headers: {
                        'Content-type' : 'application/json',
                        'Authorization': 'Bearer ' + store.getters['auth/getToken'],
                    }
                }
            );
            loader.hide();

            if (data.ok) {
                respuesta.ok = true;
                respuesta.data = data.datos;
            } else {
                utils.mostrarMensaje({
                    descripcion: data.mensaje.descripcion,
                    tipoMensaje: data.mensaje.tipoMensaje
                });
            }
        } catch( error ) {
            loader.hide();

            utils.mostrarMensajeErrorApi(error);
        }

        return respuesta;
    }

    const obtenerPresentacionesHabilitadas = async() => {
        const respuesta = {
            ok: false,
            data: undefined,
        };

        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await authApi.get(
                `/presentaciones/obtener-presentaciones-habilitadas`,
                {
                    headers: {
                        'Content-type' : 'application/json',
                        'Authorization': 'Bearer ' + store.getters['auth/getToken'],
                    }
                }
            );
            loader.hide();

            if (data.ok) {
                respuesta.ok = true;
                respuesta.data = data.datos;
            } else {
                utils.mostrarMensaje({
                    descripcion: data.mensaje.descripcion,
                    tipoMensaje: data.mensaje.tipoMensaje
                });
            }
        } catch( error ) {
            loader.hide();

            utils.mostrarMensajeErrorApi(error);
        }

        return respuesta;
    }

    const grabarPresentacion = async (presentacion: any) => {
        const respuesta = {
            ok: false,
            data: 0,
        };

        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await authApi.post(
                '/presentaciones/grabar-presentacion',
                presentacion,
                {
                    headers: {
                        'Authorization': 'Bearer ' + store.getters['auth/getToken']
                    }
                }
            );
            loader.hide();

            if (data.ok) {
                respuesta.data = data.datos;
                respuesta.ok = true;
            }
            utils.mostrarMensaje({
                descripcion: data.mensaje.descripcion,
                tipoMensaje: data.mensaje.tipoMensaje
            });
        } catch (error) {
            loader.hide();
            utils.mostrarMensajeErrorApi(error);
        }
        
        return respuesta;
    }
    
    return {
        obtenerPresentaciones,
        obtenerPresentacionesHabilitadas,
        grabarPresentacion,
    }
};

export default usePresentaciones;