import { isAuthenticatedGuard } from '@/modules/auth/router/authGuard';

import SystemLayout from '@/modules/system/layouts/SystemLayout.vue';
import FormularioAdminView from '@/modules/seguridad/views/FormularioAdminView.vue';
import FormularioEditView from '@/modules/seguridad/views/FormularioEditarView.vue';
import UsuariosAdminView from '@/modules/seguridad/views/UsuariosAdminView.vue';
import UsuarioEditarView from '@/modules/seguridad/views/UsuarioEditarView.vue';
import RolesAdminView from '@/modules/seguridad/views/RolesAdminView.vue';
import RolEditarView from '@/modules/seguridad/views/RolEditarView.vue';
import RestablecerContrasenaAdminView from '@/modules/seguridad/views/RestablecerContrasenaAdminView.vue';

import appConfig from '@/app.config';

export default {
    name: 'seguridad',
    component: SystemLayout,
    children: [
        
        {
            path: '/formulario-admin',
            name: 'formulario-admin',
            component: FormularioAdminView,
            beforeEnter: [isAuthenticatedGuard],
            meta: {
                title: appConfig.TITULO_SISTEMA + ' - Formularios',
                titleForm: 'Formularios'
            },
        },
        {
            path: '/formulario-editar/:id',
            name: 'formulario-editar',
            component: FormularioEditView,
            beforeEnter: isAuthenticatedGuard,
            meta: {
                title: appConfig.TITULO_SISTEMA + ' - Formulario',
                titleForm: 'Formulario'
            },
        },
        {
            path: '/usuarios-admin',
            name: 'usuarios-admin',
            component: UsuariosAdminView,
            beforeEnter: isAuthenticatedGuard,
            meta: {
                title: appConfig.TITULO_SISTEMA + ' - Usuarios',
                titleForm: 'Usuarios',
                titleSingularForm: 'Usuario'
            },
        },
        {
            path: '/usuario-editar',
            name: 'usuario-editar',
            component: UsuarioEditarView,
            beforeEnter: isAuthenticatedGuard,
            meta: {
                title: appConfig.TITULO_SISTEMA + ' - Usuarios',
                titleForm: 'Usuarios',
                titleSingularForm: 'Usuario'
            },
        },
        {
            path: '/roles-admin',
            name: 'roles-admin',
            component: RolesAdminView,
            beforeEnter: isAuthenticatedGuard,
            meta: {
                title: appConfig.TITULO_SISTEMA + ' - Roles',
                titleForm: 'Roles',
                titleSingularForm: 'Rol'
            },
        },
        {
            path: '/rol-editar',
            name: 'rol-editar',
            component: RolEditarView,
            beforeEnter: isAuthenticatedGuard,
            meta: {
                title: appConfig.TITULO_SISTEMA + ' - Roles',
                titleForm: 'Roles',
                titleSingularForm: 'Rol'
            },
        },
        {
            path: '/restablecer-contrasena-admin',
            name: 'restablecer-contrasena-admin',
            component: RestablecerContrasenaAdminView,
            beforeEnter: isAuthenticatedGuard,
            meta: {
                title: appConfig.TITULO_SISTEMA + ' - Restablecer Contraseña',
                titleForm: 'Restablecer Contraseña',
            },
        },
    ],
};
