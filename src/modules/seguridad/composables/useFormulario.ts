
import { useStore } from 'vuex';
import { useLoading } from "vue-loading-overlay";

import utils from '@/utils/utils';
import seguridadApi from '@/modules/seguridad/api/seguridadApi';

const useFormulario = () => {
    const store = useStore();
    const $loading = useLoading();

    const buscarFormularios = async (buscar: string) => {
        let formularios = [];
        const loader = $loading.show(utils.configuracionLoading);
        try {
            // Recuperamos los Producto
            const respuesta = await seguridadApi.get(
                'FormulariosWeb/'+buscar, {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + store.getters['auth/getToken']
                }
            }
            );
            
            if (respuesta.data.ok) {
                formularios = respuesta.data.Datos;
                formularios.forEach((element: { Estado: string; SeMuestraEnMenu: string}) => {
                    element.Estado = element.Estado ? 'Habilitado' : 'Deshabilitado';
                    element.SeMuestraEnMenu = element.SeMuestraEnMenu  ? 'Visible' : 'No Visible';
                });
            } else {
                utils.mostrarMensaje({ Descripcion: respuesta.data.Mensaje.Descripcion, TipoMensaje: respuesta.data.Mensaje.TipoMensaje });
            }
        } catch (error) {
            console.log(error);
            utils.mostrarMensajeErrorApi(error);
        }
        loader.hide();
        return formularios;
    }

    const obtenerFormularioXid = async (idFormulario: number) => {
        let formulario: any;
        const loader = $loading.show(utils.configuracionLoading);
        try {
            // Recuperamos los Producto
            const respuesta = await seguridadApi.get(
                'FormulariosWeb/obtener/' + idFormulario.toString(), {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + store.getters['auth/getToken']
                    }
                }
            );

            if (!respuesta.data.Mensaje.ok) {
                formulario = respuesta.data.Datos;
            } else {
                utils.mostrarMensaje({ Descripcion: respuesta.data.Mensaje.Descripcion, TipoMensaje: respuesta.data.Mensaje.TipoMensaje });
            }
        } catch (error) {
            utils.mostrarMensajeErrorApi(error);
        }
        loader.hide();
        return formulario;
    }

    const listarModulos = async () => {
        let modulos = [];
        const loader = $loading.show(utils.configuracionLoading);
        try {
            // Recuperamos los Producto
            const respuesta = await seguridadApi.get(
                'Sistemas', {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + store.getters['auth/getToken']
                    }
                }
            );
            
            if (respuesta.data.ok) {
                modulos = respuesta.data.Datos;
            } else {
                utils.mostrarMensaje({ Descripcion: respuesta.data.Mensaje.Descripcion, TipoMensaje: respuesta.data.Mensaje.TipoMensaje });
            }
        } catch (error) {
            utils.mostrarMensajeErrorApi(error);
        }
        loader.hide();
        return modulos;
    }

    const listaFormulariosPadre = async (idsistem: number) => {
        let formulariosPadre = [];
        const loader = $loading.show(utils.configuracionLoading);
        try {
            // Recuperamos los Producto
            const respuesta = await seguridadApi.get(
                'FormulariosWeb/indentado/'+idsistem.toString(), {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + store.getters['auth/getToken']
                }
            }
            );

            if (respuesta.data.ok) {
                formulariosPadre = respuesta.data.Datos;
                
            } else {
                utils.mostrarMensaje({ Descripcion: respuesta.data.Mensaje.Descripcion, TipoMensaje: respuesta.data.Mensaje.TipoMensaje });
            }
        } catch (error) {
            utils.mostrarMensajeErrorApi(error);
        }
        loader.hide();
        return formulariosPadre;
    }

    const grabarFormulario = async (formulario: any) =>{
        let ok = false;
        const loader = $loading.show(utils.configuracionLoading);
        try {
            formulario.IdUsuarioCreacion = store.getters['auth/getIdUsuario'];
            const respuesta = await seguridadApi.post(
                'FormulariosWeb', 
                formulario,
                {
                    headers: {
                        'Authorization': 'Bearer ' + store.getters['auth/getToken']
                    }
                }
            );

            if (respuesta.data.ok) {
                if (respuesta.data.Mensaje.TieneMensaje) { 
                    utils.mostrarMensaje({ Descripcion: respuesta.data.Mensaje.Descripcion, TipoMensaje: respuesta.data.Mensaje.TipoMensaje });    
                    formulario.IdFormularioweb = respuesta.data.Datos;
                    ok = true;
                }
            } else {
                utils.mostrarMensaje({ Descripcion: respuesta.data.Mensaje.Descripcion, TipoMensaje: respuesta.data.Mensaje.TipoMensaje });
            }
        } catch (error) {
            utils.mostrarMensajeErrorApi(error);
            
        }
        loader.hide();
        return ok;
    }

    return {
        buscarFormularios,
        obtenerFormularioXid,
        listarModulos,
        listaFormulariosPadre,
        grabarFormulario
    }
};

export default useFormulario;