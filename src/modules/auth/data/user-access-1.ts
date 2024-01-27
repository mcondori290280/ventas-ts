export default [
    {
        nombre: 'SISTEMA DE VENTAS',
        descripcion: 'Módulo de Gestión de Ventas',
        es_agrupador: true,
        url: '',
        accesos: [
            {
                nombre: 'Almacén',
                descripcion: 'Gestión de Almacén',
                es_agrupador: true,
                url: '',
                accesos: [
                    {
                        nombre: 'Categorías',
                        descripcion: 'Gestión de Categoría de Productos',
                        es_agrupador: false,
                        url: 'categorias-admin',
                        accesos: []
                    },
                    {
                        nombre: 'Presentaciones',
                        descripcion: 'Gestión de Presentación de Productos',
                        es_agrupador: false,
                        url: 'presentaciones-admin',
                        accesos: []
                    },
                    {
                        nombre: 'Marcas',
                        descripcion: 'Gestión de Marca de Productos',
                        es_agrupador: false,
                        url: 'marcas-admin',
                        accesos: []
                    },
                    {
                        nombre: 'Productos',
                        descripcion: 'Gestión de Productos',
                        es_agrupador: false,
                        url: 'productos-admin',
                        accesos: []
                    },
                    {
                        nombre: 'Stock de Productos',
                        descripcion: 'Gestión de Stock de Productos',
                        es_agrupador: false,
                        url: 'productos-stock-admin',
                        accesos: []
                    }
                ]
            },
            {
                nombre: 'Ventas',
                descripcion: 'Gestión de Ventas',
                es_agrupador: true,
                url: '',
                accesos: [
                    {
                        nombre: 'Clientes',
                        descripcion: 'Gestión de Clientes',
                        es_agrupador: false,
                        url: 'clientes-admin',
                        accesos: []
                    },
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
            {
                nombre: 'Inventario',
                descripcion: 'Gestión de Inventario',
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
                descripcion: 'Gestión de Compras',
                es_agrupador: true,
                url: '',
                accesos: [
                    {
                        nombre: 'Proveedores',
                        descripcion: 'Gestión de Proveedores',
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
                        descripcion: 'Gestión de Compras',
                        es_agrupador: false,
                        url: 'compras-admin',
                        accesos: []
                    }
                ]
            }
        ]
    }
];