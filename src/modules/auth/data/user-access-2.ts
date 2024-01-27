export default [
    {
        nombre: 'SISTEMA DE VENTAS',
        descripcion: 'Módulo de Gestión de Ventas',
        es_agrupador: true,
        url: '',
        icon: '',
        accesos: [
            {
                nombre: 'Ventas',
                descripcion: 'Gestión de Ventas',
                es_agrupador: true,
                url: '',
                icon: 'fal fa-shopping-cart',
                accesos: [
                    {
                        nombre: 'Realizar Ventas',
                        descripcion: 'Realizar Ventas',
                        es_agrupador: false,
                        url: 'ventas-editar',
                        icon: '',
                        accesos: []
                    },
                    {
                        nombre: 'Consultar Ventas',
                        descripcion: 'Gestión de Ventas',
                        es_agrupador: false,
                        url: 'ventas-admin',
                        icon: '',
                        accesos: []
                    }
                ]
            },
        ]
    }
];