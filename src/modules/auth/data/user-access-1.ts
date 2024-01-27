export default [
    {
        nombre: 'SISTEMA DE VENTAS',
        descripcion: 'Módulo de Gestión de Ventas',
        es_agrupador: true,
        url: '',
        icon: '',
        accesos: [
            {
                nombre: 'Almacén',
                descripcion: 'Gestión de Almacén',
                es_agrupador: true,
                url: '',
                icon: 'fal fa-archive',
                accesos: [
                    {
                        nombre: 'Categorías',
                        descripcion: 'Gestión de Categoría de Productos',
                        es_agrupador: false,
                        url: 'categorias-admin',
                        icon: '',
                        accesos: []
                    },
                    {
                        nombre: 'Presentaciones',
                        descripcion: 'Gestión de Presentación de Productos',
                        es_agrupador: false,
                        url: 'presentaciones-admin',
                        icon: '',
                        accesos: []
                    },
                    {
                        nombre: 'Marcas',
                        descripcion: 'Gestión de Marca de Productos',
                        es_agrupador: false,
                        url: 'marcas-admin',
                        icon: '',
                        accesos: []
                    },
                    {
                        nombre: 'Productos',
                        descripcion: 'Gestión de Productos',
                        es_agrupador: false,
                        url: 'productos-admin',
                        icon: '',
                        accesos: []
                    },
                    {
                        nombre: 'Stock de Productos',
                        descripcion: 'Gestión de Stock de Productos',
                        es_agrupador: false,
                        url: 'productos-stock-admin',
                        icon: '',
                        accesos: []
                    }
                ]
            },
            {
                nombre: 'Ventas',
                descripcion: 'Gestión de Ventas',
                es_agrupador: true,
                url: '',
                icon: 'fal fa-shopping-cart',
                accesos: [
                    {
                        nombre: 'Clientes',
                        descripcion: 'Gestión de Clientes',
                        es_agrupador: false,
                        url: 'clientes-admin',
                        icon: '',
                        accesos: []
                    },
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
            {
                nombre: 'Inventario',
                descripcion: 'Gestión de Inventario',
                es_agrupador: true,
                url: '',
                icon: 'fal fa-th-large',
                accesos: [
                    {
                        nombre: 'Kardex',
                        descripcion: 'Kardex de Productos',
                        es_agrupador: false,
                        url: 'kardex-admin',
                        icon: '',
                        accesos: []
                    }
                ]
            },
            {
                nombre: 'Compras',
                descripcion: 'Gestión de Compras',
                es_agrupador: true,
                url: '',
                icon: 'fal fa-truck',
                accesos: [
                    {
                        nombre: 'Proveedores',
                        descripcion: 'Gestión de Proveedores',
                        es_agrupador: false,
                        url: 'proveedores-admin',
                        icon: '',
                        accesos: []
                    },
                    {
                        nombre: 'Realizar Compra',
                        descripcion: 'Realizar Compras',
                        es_agrupador: false,
                        url: 'compra-editar',
                        icon: '',
                        accesos: []
                    },
                    {
                        nombre: 'Consultar Compras',
                        descripcion: 'Gestión de Compras',
                        es_agrupador: false,
                        url: 'compras-admin',
                        icon: '',
                        accesos: []
                    }
                ]
            }
        ]
    }
];