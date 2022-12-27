import authApi from '@/modules/auth/api/authApi';
import utils from '@/utils/utils';

export const loginUser = async ({ commit }: any, user: any) => {
    try {
        const { data } = await authApi.post(
            'auth/login',
            {
                usuario: user.usuario,
                password: user.password
            }
        );
        if (data.ok) {
            const access_token = data.datos.token;
            const usuario = data.datos.usuario;

            user.id_usuario = usuario.id_usuario;
            user.nombre_completo = usuario.nombre_completo;
            user.correo_electronico = '';
            user.caduco = false;
            user.modificar_password = usuario.modificar_password;
            user.documento_identidad = '';
            
            commit('loginUser', { user, access_token });
        } else {
            utils.mostrarMensaje(data.Mensaje);
        }
    } catch (error) {
        utils.mostrarMensajeErrorApi(error);
    }
};
