export default [
    {
        nombre: 'SISTEMA DE VENTAS',
        descripcion: 'Módulo de Gestión de Ventas',
        es_agrupador: true,
        url: '',
        access: [
            {
                nombre: 'Ventas',
                descripcion: 'Gestión de Ventas',
                es_agrupador: true,
                url: '',
                accesos: [
                    {
                        nombre: 'Realizar Ventas',
                        descripcion: 'Realizar Ventas',
                        es_agrupador: false,
                        url: 'ventas-editar',
                        accesos: []
                    },
                    {
                        nombre: 'Consultar Ventas',
                        descripcion: 'Gestión de Ventas',
                        es_agrupador: false,
                        url: 'ventas-admin',
                        accesos: []
                    }
                ]
            },
      ]
    }
];