import CryptoJS from 'crypto-js';

export const loginUser = (state: any, { user, access_token }: any) => {
    state.user.id_usuario = user.id_usuario;
    state.user.usuario = user.usuario;
    state.user.nombre_completo = user.nombre_completo;
    state.user.correo_electronico = user.correo_electronico;
    state.user.id_regional = user.id_regional ? user.id_regional : 0;
    state.user.regional = user.regional ? user.regional : '';
    state.user.id_modulo = user.id_modulo ? user.id_modulo : 0;
    state.user.unica_regional_modulo = user.unica_regional_modulo ? user.unica_regional_modulo : false;
    state.user.accesos = user.accesos ? user.accesos : [];
    state.user.caduco = user.caduco;
    state.user.modificar_password = user.modificar_password;
    state.user.documento_identidad = user.documento_identidad;

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

export const setRegionalModule = (state: any, regionalModule: any) => {
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
        
        user.id_regional = regionalModule.id_regional;
        user.id_modulo = regionalModule.id_modulo;
        user.unica_regional_modulo = regionalModule.unica_regional_modulo;
        user.regional = regionalModule.regional;

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

export const logout = (state: any) => {
    state.status = 'not-authenticated';
    state.user = {
        correo_electronico: '',
        id_usuario: 0,
        nombre_completo: '',
        usuario: '',
        id_regional: 0,
        regional: '',
        id_modulo: 0,
        unica_regional_modulo: false,
        accesos: [],
        caduco: false,
        modificar_password: false
    };
    state.token = null;

    localStorage.removeItem('_token');

    sessionStorage.removeItem('acceso-menu');
    sessionStorage.removeItem('menu-item');
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