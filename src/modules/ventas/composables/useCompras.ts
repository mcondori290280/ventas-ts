import { useStore } from 'vuex';

import authApi from '@/modules/auth/api/authApi';
import utils from '@/utils/utils';

import { useLoading } from 'vue-loading-overlay';

const useCompras = () => {
    const store = useStore();
    const $loading = useLoading();

    const grabarCompra = async (venta: any) => {
        const respuesta = {
            ok: false,
            data: 0,
        };

        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await authApi.post(
                '/compras/grabar-compra',
                venta,
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

    // const obtenerVentasPorFecha = async(fechaVenta: string) => {
    //     const respuesta = {
    //         ok: false,
    //         data: undefined,
    //     };

    //     const loader = $loading.show(utils.configuracionLoading);
    //     try {
    //         const { data } = await authApi.get(
    //             `/ventas/obtener-ventas-por-fecha/${ store.getters['auth/getIdSucursal'] }/${ fechaVenta }`,
    //             {
    //                 headers: {
    //                     'Content-type' : 'application/json',
    //                     'Authorization': 'Bearer ' + store.getters['auth/getToken'],
    //                 }
    //             }
    //         );
    //         loader.hide();

    //         if (data.ok) {
    //             respuesta.ok = true;
    //             respuesta.data = data.datos;
    //         } else {
    //             utils.mostrarMensaje({
    //                 descripcion: data.mensaje.descripcion,
    //                 tipoMensaje: data.mensaje.tipoMensaje
    //             });
    //         }
    //     } catch( error ) {
    //         loader.hide();

    //         utils.mostrarMensajeErrorApi(error);
    //     }

    //     return respuesta;
    // }

    return {
        grabarCompra,
        // obtenerVentasPorFecha,
    }
};

export default useCompras;