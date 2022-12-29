import authApi from '@/modules/auth/api/authApi';
import utils from '@/utils/utils';

export const loginUser = async ({ commit }: any, user: any) => {
    let respuesta = false;
    try {
        const { data } = await authApi.post(
            '/auth/login',
            {
                usuario: user.usuario,
                password: user.password
            }
        );
        if (data.ok) {
            const access_token = data.datos;
            const usuario = data.extraData;

            await commit('loginUser', { usuario, access_token });

            respuesta = true;
        } else {
            utils.mostrarMensaje(data.mensaje);
        }
    } catch (error) {
        utils.mostrarMensajeErrorApi(error);
    }

    return respuesta;
};
