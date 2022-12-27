
import { useStore } from 'vuex';
import { useLoading } from "vue-loading-overlay";

import utils from '@/utils/utils';
import seguridadApi from '@/modules/seguridad/api/seguridadApi';

const useRoles = () => {
    const store = useStore();
    const $loading = useLoading();

    const buscarRolesApi = async (textoBuscar: string) => {
        const respuesta = {
            ok: false,
            data: [],
        };

        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await seguridadApi.get(
                'Roles/' + textoBuscar,
                {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + store.getters['auth/getToken']
                    }
                }
            );
            loader.hide();
            
            if (data.ok) {
                respuesta.ok = true;
                respuesta.data = data.Datos;
            } else {
                utils.mostrarMensaje({
                    Descripcion: data.Mensaje.Descripcion,
                    TipoMensaje: data.Mensaje.TipoMensaje
                });
            }
        } catch (error) {
            loader.hide();
            utils.mostrarMensajeErrorApi(error);
        }
        return respuesta;
    }

    const buscarRolPorIdRol = async (idRol: number) => {
        const respuesta = {
            ok: false,
            data: {},
        };
        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await seguridadApi.get(
                'Roles/rol/' + idRol,
                {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + store.getters['auth/getToken']
                    }
                }
            );
            loader.hide();

            if (data.ok) {
                respuesta.data = data.Datos;
                respuesta.ok = true;
            } else {
                utils.mostrarMensaje({
                    Descripcion: data.Mensaje.Descripcion,
                    TipoMensaje: data.Mensaje.TipoMensaje
                });
            }
        } catch (error) {
            loader.hide();
            utils.mostrarMensajeErrorApi(error);
        }
        return respuesta;
    }

    const grabarRol = async (rol: any) => {
        const respuesta = {
            ok: false,
            data: 0,
        };

        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await seguridadApi.post(
                'Roles',
                rol,
                {
                    headers: {
                        'Authorization': 'Bearer ' + store.getters['auth/getToken']
                    }
                }
            );
            loader.hide();

            if (data.ok) {
                respuesta.data = data.Datos;
                respuesta.ok = true;
            }
            utils.mostrarMensaje({
                Descripcion: data.Mensaje.TipoMensaje === 'Information' ? 'El rol, se grabó correctamente.' : data.Mensaje.Descripcion,
                TipoMensaje: data.Mensaje.TipoMensaje === 'Information' ? 'success' : data.Mensaje.TipoMensaje
            });
        } catch (error) {
            loader.hide();
            utils.mostrarMensajeErrorApi(error);
        }
        
        return respuesta;
    }

    const obtenerRegionalesFormulariosRol = async (idRol: number) => {
        const respuesta = {
            ok: false,
            data: {},
        };
        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await seguridadApi.get(
                `Roles/RolRegionalForms/${ idRol }`,
                {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + store.getters['auth/getToken']
                    }
                }
            );
            loader.hide();

            if (data.ok) {
                respuesta.data = data.Datos;
                respuesta.ok = true;
            } else {
                utils.mostrarMensaje({
                    Descripcion: data.Mensaje.Descripcion,
                    TipoMensaje: data.Mensaje.TipoMensaje
                });
            }
        } catch (error) {
            loader.hide();
            utils.mostrarMensajeErrorApi(error);
        }
        return respuesta;
    }

    const grabarRolRegionalesFormularios = async (rolRegionalesFormularios: any) => {
        const respuesta = {
            ok: false,
            data: 0,
        };

        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await seguridadApi.post(
                'Roles/RegionalFormularios',
                rolRegionalesFormularios,
                {
                    headers: {
                        'Authorization': 'Bearer ' + store.getters['auth/getToken']
                    }
                }
            );
            loader.hide();

            if (data.ok) {
                respuesta.data = data.Datos;
                respuesta.ok = true;
            }
            utils.mostrarMensaje({
                Descripcion: data.Mensaje.TipoMensaje === 'Information' ? 'La asignación de regionales y formularios al Rol, se grabó correctamente.' : data.Mensaje.Descripcion,
                TipoMensaje: data.Mensaje.TipoMensaje === 'Information' ? 'success' : data.Mensaje.TipoMensaje
            });
        } catch (error) {
            loader.hide();
            utils.mostrarMensajeErrorApi(error);
        }
        
        return respuesta;
    }

    return {
        buscarRolesApi,
        buscarRolPorIdRol,
        grabarRol,
        grabarRolRegionalesFormularios,
        obtenerRegionalesFormulariosRol,
    }
};

export default useRoles;