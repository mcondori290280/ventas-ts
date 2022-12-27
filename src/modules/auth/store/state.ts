export default () => ({
    status: 'not-authenticated', // 'authenticated', 'not-authenticated'
    user: {
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
        modificar_password: false,
        documento_identidad: '0'
    },
    token: null,
});