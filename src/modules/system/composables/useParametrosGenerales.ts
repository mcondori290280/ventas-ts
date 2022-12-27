import { useStore } from 'vuex';

import { useLoading } from 'vue-loading-overlay';

import seguridadApi from '@/modules/seguridad/api/seguridadApi';
import utils from '@/utils/utils';

const useParametrosGenerales = () => {
    const store = useStore();
    const $loading = useLoading();

    const obtenerGeneros = async () => {
        const respuesta = {
            ok: false,
            data: [],
        };

        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await seguridadApi.post(
                `Persona/Genero`,
                {},
                {
                    headers: {
                        'Authorization': 'Bearer ' + store.getters['auth/getToken'],
                    }
                }
            );
            if (!data.Mensaje.TieneMensaje) {
                respuesta.ok = true;
                respuesta.data = data.Datos;
            }
        } catch(error) {
            utils.mostrarMensajeErrorApi(error, false);
        }
        loader.hide();

        return respuesta;
    }

    const obtenerTipoDocumentos = async () => {
        const respuesta = {
            ok: false,
            data: [],
        };

        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await seguridadApi.post(
                `Persona/TipoDocumento`,
                {},
                {
                    headers: {
                        'Authorization': 'Bearer ' + store.getters['auth/getToken'],
                    }
                }
            );
            if (!data.Mensaje.TieneMensaje) {
                respuesta.ok = true;
                respuesta.data = data.Datos;
            }
        } catch(error) {
            utils.mostrarMensajeErrorApi(error, false);
        }
        loader.hide();

        return respuesta;
    }

    const obtenerExtensiones = async () => {
        const respuesta = {
            ok: false,
            data: [],
        };

        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await seguridadApi.post(
                `Persona/Extension`,
                {},
                {
                    headers: {
                        'Authorization': 'Bearer ' + store.getters['auth/getToken'],
                    }
                }
            );
            if (!data.Mensaje.TieneMensaje) {
                respuesta.ok = true;
                respuesta.data = data.Datos;
            }
        } catch(error) {
            utils.mostrarMensajeErrorApi(error, false);
        }
        loader.hide();

        return respuesta;
    }

    const obtenerTiposUsuario = async () => {
        const respuesta = {
            ok: false,
            data: [],
        };

        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await seguridadApi.post(
                `Persona/TiposUsuario`,
                {},
                {
                    headers: {
                        'Authorization': 'Bearer ' + store.getters['auth/getToken'],
                    }
                }
            );
            if (!data.Mensaje.TieneMensaje) {
                respuesta.ok = true;
                respuesta.data = data.Datos;
            }
        } catch(error) {
            utils.mostrarMensajeErrorApi(error, false);
        }
        loader.hide();

        return respuesta;
    }

    return {
        obtenerExtensiones,
        obtenerGeneros,
        obtenerTipoDocumentos,
        obtenerTiposUsuario,
    };
};

export default useParametrosGenerales;