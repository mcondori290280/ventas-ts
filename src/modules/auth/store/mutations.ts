import CryptoJS from 'crypto-js';

export const loginUser = (state: any, { usuario, access_token }: any) => {
    state.user.correo_electronico = usuario.correo_electronico;
    state.user.id_usuario = usuario.id_usuario;
    state.user.nombre_completo = usuario.nombre_completo;
    state.user.usuario = usuario.usuario;
    state.user.id_sucursal = usuario.id_sucursal;
    state.user.sucursal = usuario.sucursal;
    state.user.accesos = usuario.accesos;
    state.user.modificar_password = usuario.modificar_password;
    state.user.unica_sucursal = usuario.unica_sucursal;

    const userEncrypt = CryptoJS.AES.encrypt(
        JSON.stringify(state.user),
        "Secreto"
    ).toString();

    if ( access_token ) {
        localStorage.setItem('_token', access_token + '|' + userEncrypt);
        state.token = access_token;
    }

    state.status = 'authenticated';
};

export const logout = (state: any) => {
    state.status = 'not-authenticated';
    state.user = {
        correo_electronico: '',
        id_usuario: 0,
        nombre_completo: '',
        usuario: '',
        id_sucursal: 0,
        sucursal: '',
        accesos: [],
        modificar_password: false,
        unica_sucursal: false,
    };
    state.token = null;

    localStorage.removeItem('_token');

    sessionStorage.removeItem('acceso-menu');
    sessionStorage.removeItem('menu-item');
};

export const setSucursal = async (state: any, sucursal: any) => {
    const token = localStorage.getItem('_token');
    if (token) {
        let user: any = token.split('|')[1];
        const access_token = token.split('|')[0];

        user = JSON.parse(
            CryptoJS.AES.decrypt(
                user,
                "Secreto"
            ).toString(CryptoJS.enc.Utf8)
        );
        
        user.id_sucursal = sucursal.id_sucursal;
        user.sucursal = sucursal.sucursal;
        user.unica_sucursal = sucursal.unica_sucursal;

        const userEncrypt = CryptoJS.AES.encrypt(
            JSON.stringify(user),
            "Secreto"
        ).toString();

        localStorage.setItem('_token', access_token + '|' + userEncrypt);
        state.user = user;
    }
};

export const setAccess = (state: any, access: any) => {
    const token = localStorage.getItem('_token');
    if (token) {
        let user: any = token.split('|')[1];
        const access_token = token.split('|')[0];
    
        user = JSON.parse(
            CryptoJS.AES.decrypt(
                user,
                "Secreto"
            ).toString(CryptoJS.enc.Utf8)
        );
        
        user.accesos = access;
    
        const userEncrypt = CryptoJS.AES.encrypt(
            JSON.stringify(user),
            "Secreto"
        ).toString();
    
        localStorage.setItem('_token', access_token + '|' + userEncrypt);
        state.user = user;
    }
};









export const setTokenUser = (state: any, { access_token }: any) => {

    const userEncrypt = CryptoJS.AES.encrypt(
        JSON.stringify(state.user),
        "Secreto"
    ).toString();

    if (access_token) {
        localStorage.setItem('_token', access_token + '|' + userEncrypt);
        state.token = access_token;
    }
};