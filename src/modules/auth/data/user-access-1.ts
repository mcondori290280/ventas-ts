export default [
    {
        nombre: 'SISTEMA DE VENTAS',
        descripcion: 'Modulo de Gestion de Ventas',
        es_agrupador: true,
        url: '',
        accesos: [
            {
                nombre: 'Almacen',
                descripcion: 'Gestion de Almacen',
                es_agrupador: true,
                url: '',
                accesos: [
                    {
                        nombre: 'Categorias',
                        descripcion: 'Gestion de Categorias de Productos',
                        es_agrupador: false,
                        url: 'categorias-admin',
                        accesos: []
                    },
                    {
                        nombre: 'Presentaciones',
                        descripcion: 'Gestion de Presentaciones de Productos',
                        es_agrupador: false,
                        url: 'presentaciones-admin',
                        accesos: []
                    },
                    {
                        nombre: 'Marcas',
                        descripcion: 'Gestion de Marcas de Productos',
                        es_agrupador: false,
                        url: 'marcas-admin',
                        accesos: []
                    },
                    {
                        nombre: 'Productos',
                        descripcion: 'Gestion de Productos',
                        es_agrupador: false,
                        url: 'productos-admin',
                        accesos: []
                    },
                    {
                        nombre: 'Stock de Productos',
                        descripcion: 'Gestion de Stock de Productos',
                        es_agrupador: false,
                        url: 'productos-stock-admin',
                        accesos: []
                    }
                ]
            },
            {
                nombre: 'Ventas',
                descripcion: 'Gestion de Ventas',
                es_agrupador: true,
                url: '',
                accesos: [
                    {
                        nombre: 'Clientes',
                        descripcion: 'Gestion de Clientes',
                        es_agrupador: false,
                        url: 'clientes-admin',
                        accesos: []
                    },
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
            {
                nombre: 'Inventario',
                descripcion: 'Gestion de Inventario',
                es_agrupador: true,
                url: '',
                accesos: [
                    {
                        nombre: 'Kardex',
                        descripcion: 'Kardex de Productos',
                        es_agrupador: false,
                        url: 'kardex-admin',
                        accesos: []
                    }
                ]
            },
            {
                nombre: 'Compras',
                descripcion: 'Gestion de Compras',
                es_agrupador: true,
                url: '',
                accesos: [
                    {
                        nombre: 'Proveedores',
                        descripcion: 'Gestion de Proveedores',
                        es_agrupador: false,
                        url: 'proveedores-admin',
                        accesos: []
                    },
                    {
                        nombre: 'Realizar Compra',
                        descripcion: 'Realizar Compras',
                        es_agrupador: false,
                        url: 'compra-editar',
                        accesos: []
                    },
                    {
                        nombre: 'Consultar Compras',
                        descripcion: 'Gestion de Compras',
                        es_agrupador: false,
                        url: 'compras-admin',
                        accesos: []
                    }
                ]
            }
        ]
    }
];