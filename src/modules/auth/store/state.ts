export default () => ({
    status: 'not-authenticated', // 'authenticated', 'not-authenticated'
    user: {
        correo_electronico: '',
        id_usuario: 0,
        nombre_completo: '',
        usuario: '',
        id_sucursal: 0,
        sucursal: '',
        accesos: [],
        modificar_password: false,
        unica_sucursal: false,
    },
    token: null,
});