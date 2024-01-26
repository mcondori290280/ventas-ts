export default [
    {
        nombre: 'SISTEMA DE VENTAS',
        access: [
            {
                nombre: 'Almacen',
                descripcion: 'Gestion de Almacen',
                es_agrupador: true,
                url: '',
                access: [
                    {
                        nombre: 'Categorias',
                        descripcion: 'Gestion de Categorias de Productos',
                        es_agrupador: false,
                        url: 'categorias-admin'
                    },
                    {
                        nombre: 'Presentaciones',
                        descripcion: 'Gestion de Presentaciones de Productos',
                        es_agrupador: false,
                        url: 'presentaciones-admin'
                    },
                    {
                        nombre: 'Marcas',
                        descripcion: 'Gestion de Marcas de Productos',
                        es_agrupador: false,
                        url: 'marcas-admin'
                    },
                    {
                        nombre: 'Productos',
                        descripcion: 'Gestion de Productos',
                        es_agrupador: false,
                        url: 'productos-admin'
                    },
                    {
                        nombre: 'Stock de Productos',
                        descripcion: 'Gestion de Stock de Productos',
                        es_agrupador: false,
                        url: 'productos-stock-admin'
                    }
                ]
            },
            {
                nombre: 'Ventas',
                descripcion: 'Gestion de Ventas',
                es_agrupador: true,
                url: '',
                access: [
                    {
                        nombre: 'Clientes',
                        descripcion: 'Gestion de Clientes',
                        es_agrupador: false,
                        url: 'clientes-admin'
                    },
                    {
                        nombre: 'Realizar Ventas',
                        descripcion: 'Gestion de Ventas',
                        es_agrupador: false,
                        url: 'ventas-editar'
                    },
                    {
                        nombre: 'Consultar Ventas',
                        descripcion: 'Gestion de Ventas',
                        es_agrupador: false,
                        url: 'ventas-admin'
                    }
                ]
            },
            {
                nombre: 'Inventario',
                descripcion: 'Gestion de Inventario',
                es_agrupador: true,
                url: '',
                access: [
                    {
                        nombre: 'Kardex',
                        descripcion: 'Kardex de Productos',
                        es_agrupador: false,
                        url: 'kardex-admin'
                    }
                ]
            },
            {
                nombre: 'Compras',
                descripcion: 'Gestion de Compras',
                es_agrupador: true,
                url: '',
                access: [
                    {
                        nombre: 'Proveedores',
                        descripcion: 'Gestion de Proveedores',
                        es_agrupador: false,
                        url: 'proveedores-admin'
                    },
                    {
                        nombre: 'Realizar Compra',
                        descripcion: 'Realizar Compras',
                        es_agrupador: false,
                        url: 'compra-editar'
                    },
                    {
                        nombre: 'Consultar Compras',
                        descripcion: 'Gestion de Compras',
                        es_agrupador: false,
                        url: 'compras-admin'
                    }
                ]
            }
        ]
    }
];