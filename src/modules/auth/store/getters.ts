export const currentState = (state: any) => {
    return state.status;
}

export const getIdUsuario = (state: any) => {
    return state.user.id_usuario;
}

export const getIdSucursal = (state: any) => {
    return state.user.id_sucursal;
}

export const getSucursal = (state: any) => {
    return state.user.sucursal;
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

export const getAccesos = (state: any) => {
    return state.user.accesos;
}

export const getModificarPassword = (state: any) => {
    return state.user.modificar_password;
}

export const getUnicaSucursal = (state: any) => {
    return state.user.unica_sucursal;
}
