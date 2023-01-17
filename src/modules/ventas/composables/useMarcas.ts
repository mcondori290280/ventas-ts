import { useStore } from 'vuex';

import authApi from '@/modules/auth/api/authApi';
import utils from '@/utils/utils';

import { useLoading } from 'vue-loading-overlay';

const useMarcas = () => {
    const store = useStore();
    const $loading = useLoading();

    const obtenerMarcas = async(nombre: string) => {
        const respuesta = {
            ok: false,
            data: undefined,
        };

        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await authApi.get(
                `/marcas/obtener-marcas/${ nombre }`,
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

    const grabarMarca = async (marca: any) => {
        const respuesta = {
            ok: false,
            data: 0,
        };

        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await authApi.post(
                '/marcas/grabar-marca',
                marca,
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
        obtenerMarcas,
        grabarMarca,
    }
};

export default useMarcas;