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
                nombre: 'Almacén',
                descripcion: 'Gestión de Almacén',
                es_agrupador: true,
                es_modulo: false,
                url: '',
                icon: 'fal fa-archive',
                accesos: [
                    {
                        id: 3,
                        nombre: 'Categorías',
                        descripcion: 'Gestión de Categoría de Productos',
                        es_agrupador: false,
                        es_modulo: false,
                        url: 'categorias-admin',
                        icon: '',
                        accesos: []
                    },
                    {
                        id: 4,
                        nombre: 'Presentaciones',
                        descripcion: 'Gestión de Presentación de Productos',
                        es_agrupador: false,
                        es_modulo: false,
                        url: 'presentaciones-admin',
                        icon: '',
                        accesos: []
                    },
                    {
                        id: 5,
                        nombre: 'Marcas',
                        descripcion: 'Gestión de Marca de Productos',
                        es_agrupador: false,
                        es_modulo: false,
                        url: 'marcas-admin',
                        icon: '',
                        accesos: []
                    },
                    {
                        id: 6,
                        nombre: 'Productos',
                        descripcion: 'Gestión de Productos',
                        es_agrupador: false,
                        es_modulo: false,
                        url: 'productos-admin',
                        icon: '',
                        accesos: []
                    },
                    {
                        id: 7,
                        nombre: 'Stock de Productos',
                        descripcion: 'Gestión de Stock de Productos',
                        es_agrupador: false,
                        es_modulo: false,
                        url: 'productos-stock-admin',
                        icon: '',
                        accesos: []
                    }
                ]
            },
            {
                id: 8,
                nombre: 'Ventas',
                descripcion: 'Gestión de Ventas',
                es_agrupador: true,
                es_modulo: false,
                url: '',
                icon: 'fal fa-shopping-cart',
                accesos: [
                    {
                        id: 9,
                        nombre: 'Clientes',
                        descripcion: 'Gestión de Clientes',
                        es_agrupador: false,
                        es_modulo: false,
                        url: 'clientes-admin',
                        icon: '',
                        accesos: []
                    },
                    {
                        id: 10,
                        nombre: 'Realizar Ventas',
                        descripcion: 'Realizar Ventas',
                        es_agrupador: false,
                        es_modulo: false,
                        url: 'ventas-editar',
                        icon: '',
                        accesos: []
                    },
                    {
                        id: 11,
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
            {
                id: 12,
                nombre: 'Inventario',
                descripcion: 'Gestión de Inventario',
                es_agrupador: true,
                es_modulo: false,
                url: '',
                icon: 'fal fa-th-large',
                accesos: [
                    {
                        id: 13,
                        nombre: 'Kardex',
                        descripcion: 'Kardex de Productos',
                        es_agrupador: false,
                        es_modulo: false,
                        url: 'kardex-admin',
                        icon: '',
                        accesos: []
                    }
                ]
            },
            {
                id: 14,
                nombre: 'Compras',
                descripcion: 'Gestión de Compras',
                es_agrupador: true,
                es_modulo: false,
                url: '',
                icon: 'fal fa-truck',
                accesos: [
                    {
                        id: 15,
                        nombre: 'Proveedores',
                        descripcion: 'Gestión de Proveedores',
                        es_agrupador: false,
                        es_modulo: false,
                        url: 'proveedores-admin',
                        icon: '',
                        accesos: []
                    },
                    {
                        id: 16,
                        nombre: 'Realizar Compra',
                        descripcion: 'Realizar Compras',
                        es_agrupador: false,
                        es_modulo: false,
                        url: 'compra-editar',
                        icon: '',
                        accesos: []
                    },
                    {
                        id: 17,
                        nombre: 'Consultar Compras',
                        descripcion: 'Gestión de Compras',
                        es_agrupador: false,
                        es_modulo: false,
                        url: 'compras-admin',
                        icon: '',
                        accesos: []
                    }
                ]
            }
        ]
    }
];