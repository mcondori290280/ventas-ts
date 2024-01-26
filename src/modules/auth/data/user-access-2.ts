export default [
    {
        nombre: 'SISTEMA DE VENTAS',
        descripcion: 'Modulo de Gestion de Ventas',
        es_agrupador: true,
        url: '',
        access: [
            {
                nombre: 'Ventas',
                descripcion: 'Gestion de Ventas',
                es_agrupador: true,
                url: '',
                access: [
                    {
                        nombre: 'Realizar Ventas',
                        descripcion: 'Gestion de Ventas',
                        es_agrupador: false,
                        url: 'ventas-editar',
                        accesos: []
                    },
                    {
                        nombre: 'Consultar Ventas',
                        descripcion: 'Gestion de Ventas',
                        es_agrupador: false,
                        url: 'ventas-admin',
                        accesos: []
                    }
                ]
            },
        ]
    }
];