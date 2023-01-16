import { useStore } from 'vuex';

import authApi from '@/modules/auth/api/authApi';
import utils from '@/utils/utils';

import { useLoading } from 'vue-loading-overlay';

const useCategorias = () => {
    const store = useStore();
    const $loading = useLoading();

    const obtenerCategorias = async() => {
        const respuesta = {
            ok: false,
            data: undefined,
        };

        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await authApi.get(
                `/categorias/obtener-categorias`,
                {
                    headers: {
                        'Content-type' : 'application/json',
                        'Authorization': 'Bearer ' + store.getters['auth/getToken'],
                    }
                }
            );
            loader.hide();
            console.log(data);
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
    
    return {
        obtenerCategorias,
    }
};

export default useCategorias;