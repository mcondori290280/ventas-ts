export default [
    {
        id: 1,
        nombre: 'SISTEMA DE VENTAS',
        descripcion: 'Módulo de Gestión de Ventas',
        es_agrupador: true,
        es_modulo: true,
        url: '',
        icon: '',
        accesos: [
            {
                id: 2,
                nombre: 'Ventas',
                descripcion: 'Gestión de Ventas',
                es_agrupador: true,
                es_modulo: false,
                url: '',
                icon: 'fal fa-shopping-cart',
                accesos: [
                    {
                        id: 3,
                        nombre: 'Realizar Ventas',
                        descripcion: 'Realizar Ventas',
                        es_agrupador: false,
                        es_modulo: false,
                        url: 'ventas-editar',
                        icon: '',
                        accesos: []
                    },
                    {
                        id: 4,
                        nombre: 'Consultar Ventas',
                        descripcion: 'Gestión de Ventas',
                        es_agrupador: false,
                        es_modulo: false,
                        url: 'ventas-admin',
                        icon: '',
                        accesos: []
                    }
                ]
            },
        ]
    }
];