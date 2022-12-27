export const currentState = (state: any) => {
    return state.status;
}

export const getIdUsuario = (state: any) => {
    return state.user.id_usuario;
}

export const getIdRegional = (state: any) => {
    return state.user.id_regional;
}

export const getRegional = (state: any) => {
    return state.user.regional;
}

export const getIdModulo = (state: any) => {
    return state.user.id_modulo;
}

export const getUserName = (state: any) => {
    return state.user.usuario;
}

export const getFullNameUser = (state: any) => {
    return state.user.nombre_completo;
}

export const getEmail = (state: any) => {
    return state.user.correo_electronico;
}

export const getToken = (state: any) => {
    return state.token;
}

export const getUnicaRegionalModulo = (state: any) => {
    return state.user.unica_regional_modulo;
}
export const getAccesosModulo = (state: any) => {
    return state.user.accesos;
}

export const getCaducoPassword = (state: any) => {
    return state.user.caduco;
}
export const getModificarPassword = (state: any) => {
    return state.user.modificar_password;
}
export const getDocumentoIdentidad = (state: any) => {
    return state.user.documento_identidad;
}

