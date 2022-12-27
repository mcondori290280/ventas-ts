
import { useStore } from 'vuex';
import { useLoading } from "vue-loading-overlay";

import utils from '@/utils/utils';
import seguridadApi from '@/modules/seguridad/api/seguridadApi';

const useUsuarios = () => {
    const store = useStore();
    const $loading = useLoading();

    const buscarUsuariosInternosExternos = async (textoBuscar: string) => {
        const respuesta = {
            ok: false,
            data: [],
        };

        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await seguridadApi.get(
                'UsuarioEmpresas/' + textoBuscar,
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

    const grabarUsuarioInternoExterno = async (usuario: any) => {
        usuario.Persona.Genero += '';
        usuario.Persona.Extension += '';
        usuario.Persona.CorreoElectronico = usuario.CorreoElectronico;

        usuario.IdTipoUsuarioPar = parseInt(usuario.IdTipoUsuarioPar);
        usuario.IdRegional = store.getters['auth/getIdRegional'];

        const respuesta = {
            ok: false,
            data: 0,
        };

        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await seguridadApi.post(
                'Usuario',
                usuario,
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
                Descripcion: data.Mensaje.TipoMensaje === 'Information' ? 'El usuario, se grabó correctamente.' : data.Mensaje.Descripcion,
                TipoMensaje: data.Mensaje.TipoMensaje === 'Information' ? 'success' : data.Mensaje.TipoMensaje
            });
        } catch (error) {
            loader.hide();
            utils.mostrarMensajeErrorApi(error);
        }
        
        return respuesta;
    }

    const buscarPersonasSAFI = async (textoBuscar: string) => {
        const respuesta = {
            ok: false,
            data: [],
        };
        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await seguridadApi.get(
                'Persona/' + textoBuscar,
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

    const buscarUsuarioPersonasPorIdUsuario = async (idUsuario: number) => {
        const respuesta = {
            ok: false,
            data: {},
        };
        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await seguridadApi.get(
                'Usuario/ObtieneUsuario/' + idUsuario + '/' + store.getters['auth/getIdRegional'],
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

    const buscarEmpresasUsuarioExterno = async (empresaBuscar: string) => {
        const respuesta = {
            ok: false,
            data: [],
        };
        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await seguridadApi.get(
                'Empresas/' + empresaBuscar,
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

    const obtenerRolesPorRegionalExterno = async (idRegional: number) => {
        const respuesta = {
            ok: false,
            data: [],
        };
        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await seguridadApi.get(
                `Rol/${ idRegional }`,
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

    const obtenerRegionalDelRolesInterno = async (idRol: number) => {
        const respuesta = {
            ok: false,
            data: [],
        };
        const loader = $loading.show(utils.configuracionLoading);
        try {   
            const { data } = await seguridadApi.get(
                `Rol/RolXRegional/${idRol}/${store.getters['auth/getIdRegional']}`,
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

    const obtenerRolesUsuarioInterno = async () => {
        const respuesta = {
            ok: false,
            data: [],
        };
        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await seguridadApi.get(
                `Rol/Regional/${ store.getters['auth/getIdRegional'] }`,
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

    const obtenerEmpresasRegionalesRolesUsuarioExterno = async (idUsuario: number) => {
        const respuesta = {
            ok: false,
            data: [],
        };
        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await seguridadApi.get(
                'UsuarioEmpresas/obtiene/' + idUsuario,
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

    const obtenerRolesRegionalesUsuarioInterno = async (idUsuario: number) => {
        const respuesta = {
            ok: false,
            data: [],
        };
        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await seguridadApi.get(
                `Usuario/ObtieneRolRegional/${idUsuario}/${store.getters['auth/getIdRegional']}`,
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

    const grabarEmpresasRegionalesRolesUsuarioExterno = async (usuarioEmpresasRegionalesRoles: any) => {
        const respuesta = {
            ok: false,
            data: 0,
        };

        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await seguridadApi.post(
                'UsuarioEmpresas',
                usuarioEmpresasRegionalesRoles,
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
                Descripcion: data.Mensaje.TipoMensaje === 'Information' ? 'La asignación de empresas, regionales y roles, se grabó correctamente.' : data.Mensaje.Descripcion,
                TipoMensaje: data.Mensaje.TipoMensaje === 'Information' ? 'success' : data.Mensaje.TipoMensaje
            });
        } catch (error) {
            loader.hide();
            utils.mostrarMensajeErrorApi(error);
        }
        
        return respuesta;
    }

    const grabarRolesRegionalesUsuarioInterno = async (usuarioRolesRegionales: any) => {
        const respuesta = {
            ok: false,
            data: 0,
        };

        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await seguridadApi.post(
                'Usuario/RolesYRegionales' +'/'+ store.getters['auth/getIdRegional'],
                usuarioRolesRegionales,
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
                Descripcion: data.Mensaje.TipoMensaje === 'Information' ? 'La asignación de empresas, regionales y roles, se grabó correctamente.' : data.Mensaje.Descripcion,
                TipoMensaje: data.Mensaje.TipoMensaje === 'Information' ? 'success' : data.Mensaje.TipoMensaje
            });
        } catch (error) {
            loader.hide();
            utils.mostrarMensajeErrorApi(error);
        }
        
        return respuesta;
    }

    const obtenerUsuarioCentroYGrupoSami = async (idUsuario: number) => {
        const respuesta = {
            ok: false,
            data: [],
        };

        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await seguridadApi.get(
                `UsuarioSAMI/UsuarioCentroYGrupo/${ store.getters['auth/getIdRegional'] }/${ idUsuario }`,
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

    const obtieneMedicosNoAsignadosSami = async (idUsuario: number) => {
        const respuesta = {
            ok: false,
            data: [],
        };

        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await seguridadApi.get(
                `UsuarioSAMI/MedicosNoAsignadosIncluso/${ store.getters['auth/getIdRegional'] }/${ idUsuario }`,
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

    const grabarModificarUsuarioSAMI = async (usuarioSAMI: any) => {
        const respuesta = {
            ok: false,
            data: 0,
        };

        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await seguridadApi.post(
                'UsuarioSAMI',
                usuarioSAMI,
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
                Descripcion: data.Mensaje.TipoMensaje === 'Information' ? 'La asignación de Centros de Atención y accesos, se realizó correctamente.' : data.Mensaje.Descripcion,
                TipoMensaje: data.Mensaje.TipoMensaje === 'Information' ? 'success' : data.Mensaje.TipoMensaje
            });
        } catch (error) {
            loader.hide();
            utils.mostrarMensajeErrorApi(error);
        }
        
        return respuesta;
    }

    const reestablecerContraseniaApi = async (reseteoContraseniaForm: any) => {
        const respuesta = {
            ok: false,
            data: 0,
        };

        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await seguridadApi.put(
                'Usuario/ResetPass',
                reseteoContraseniaForm,
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
                Descripcion: data.Mensaje.TipoMensaje === 'Success' ? 'La contrasela se reestableció correctamente.' : data.Mensaje.Descripcion,
                TipoMensaje: data.Mensaje.TipoMensaje === 'Success' ? 'success' : data.Mensaje.TipoMensaje
            });
        } catch (error) {
            loader.hide();
            utils.mostrarMensajeErrorApi(error);
        }
        
        return respuesta;
    }

    const UsuariosVigentesInternos = async () => {
        const respuesta = {
            ok: false,
            data: [],
        };

        const loader = $loading.show(utils.configuracionLoading);
        try {
            const { data } = await seguridadApi.get(
                'Usuario/UsuariosVigentesInternos',
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

    return {
        buscarEmpresasUsuarioExterno,
        buscarPersonasSAFI,
        buscarUsuarioPersonasPorIdUsuario,
        buscarUsuariosInternosExternos,
        grabarEmpresasRegionalesRolesUsuarioExterno,
        grabarModificarUsuarioSAMI,
        grabarRolesRegionalesUsuarioInterno,
        grabarUsuarioInternoExterno,
        obtenerEmpresasRegionalesRolesUsuarioExterno,
        obtenerRegionalDelRolesInterno,
        obtenerRolesPorRegionalExterno,
        obtenerRolesRegionalesUsuarioInterno,
        obtenerRolesUsuarioInterno,
        obtenerUsuarioCentroYGrupoSami,
        obtieneMedicosNoAsignadosSami,
        reestablecerContraseniaApi,
        UsuariosVigentesInternos,
    }
};

export default useUsuarios;