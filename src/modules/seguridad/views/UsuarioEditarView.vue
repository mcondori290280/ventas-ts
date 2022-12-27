<template>
    <main id="js-page-content" role="main" class="page-content">
        <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-10 col-md-12 col-sm-12 col-12">
            <!-- <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"> -->
                <div class="subheader">
                    <h1 class="subheader-title">
                        <i class='subheader-icon fal fa-user'></i> {{ $router.currentRoute.value.meta.titleSingularForm }}
                    </h1>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-10 col-md-12 col-sm-12 col-12">
            <!-- <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"> -->
                <div class="panel">
                    <div class="panel-hdr mt-2">
                        <div class="float-left">
                            <button
                                type="button" 
                                class="btn btn-primary btn-sm mr-2"
                                title="Grabar"
                                v-if="!seGrabo"
                                @click="grabar">
                                <i class="fal fa-save"></i>
                                <span class="d-none d-sm-block float-right ml-1">Grabar</span>
                            </button>
                            <button
                                type="button" 
                                class="btn btn-default btn-sm mr-2"
                                title="Asignar Permisos - Usuario Interno"
                                @click="asignarPermisosUsuarioInterno"
                                v-if="!seModificoTipoUsuario && usuarioForm.IdUsuario !== 0 && usuarioForm.Estado && (usuarioForm.IdTipoUsuarioPar == USUARIO_INTERNO || usuarioForm.IdTipoUsuarioPar == USUARIO_INTERNO_EXTERNO)">
                                <i class="fal fa-align-left"></i>
                                <span class="d-none d-sm-block float-right ml-1">Asignar Permisos Internos</span>
                            </button>
                            <button
                                type="button" 
                                class="btn btn-default btn-sm mr-2"
                                title="Asignar Permisos - Usuario Externo"
                                @click="asignarPermisosUsuarioExterno"
                                v-if="!seModificoTipoUsuario && usuarioForm.IdUsuario !== 0 && usuarioForm.Estado && (usuarioForm.IdTipoUsuarioPar == USUARIO_EXTERNO || usuarioForm.IdTipoUsuarioPar == USUARIO_INTERNO_EXTERNO)">
                                <i class="fal fa-align-right"></i>
                                <span class="d-none d-sm-block float-right ml-1">Asignar Permisos Externos</span>
                            </button>
                            <button
                                type="button" 
                                class="btn btn-danger btn-sm mr-2"
                                title="Gestionar Usuario SAMI"
                                @click="asignarPermisosUsuarioSAMI"
                                v-if="!seModificoTipoUsuario && usuarioForm.IdUsuario !== 0 && usuarioForm.Estado && (usuarioForm.IdTipoUsuarioPar == USUARIO_INTERNO || usuarioForm.IdTipoUsuarioPar == USUARIO_INTERNO_EXTERNO)">
                                <i class="fal fa-medkit"></i>
                                <span class="d-none d-sm-block float-right ml-1">Gestionar Usuario SAMI</span>
                            </button>
                        </div>
                        <h2 class="d-none d-sm-block">
                            Registro de<span class="fw-300"><i>
                                {{ 
                                    $router.currentRoute.value.meta.titleSingularForm + ' ' +
                                    (
                                        usuarioForm.IdTipoUsuarioPar == USUARIO_EXTERNO
                                            ? 'Externo '
                                            : usuarioForm.IdTipoUsuarioPar == USUARIO_INTERNO
                                                ? 'Interno'
                                                : usuarioForm.IdTipoUsuarioPar == USUARIO_INTERNO_EXTERNO
                                                    ? 'Interno/Externo'
                                                    : ''
                                    )
                                }}
                            </i></span>
                        </h2>
                        <div class="float-right">
                            <button type="button" class="btn btn-danger btn-sm" @click="cancelar">
                                <i class="fal fa-arrow-alt-to-left"></i>
                                <span class="d-none d-sm-block float-right ml-1">{{ seGrabo ? 'Salir' : 'Cancelar' }}</span>
                            </button>
                        
                        </div>
                    </div>

                    <div class="panel-container">
                        <div class="panel-content">
                            <form novalidate>
                                <div
                                    class="form-row"
                                    v-if="usuarioForm.IdUsuario === 0">
                                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-1">
                                        <div class="form-group">
                                            <label
                                                class="form-label"
                                                for="buscar-persona">Persona</label>
                                            <div class="input-group input-group-sm">
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="buscar-persona"
                                                    name="buscar-persona"
                                                    autocomplete="off"
                                                    v-model.trim="textBuscarPersona"
                                                    @keyup.enter="buscarPersona" />
                                                <div class="input-group-append">
                                                    <button
                                                        class="btn btn-primary waves-effect waves-themed"
                                                        type="button"
                                                        @click="buscarPersona">Buscar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-1">
                                        <label
                                            class="form-label"
                                            for="apellido-paterno">Apellido Paterno</label>
                                        <input
                                            type="text"
                                            class="form-control form-control-sm"
                                            id="apellido-paterno"
                                            name="apellido-paterno"
                                            autocomplete="off"
                                            :readonly="usuarioForm.IdUsuario > 0"
                                            :class="{ 'is-invalid': v$.Persona.ApellidoPaterno.$dirty && v$.Persona.ApellidoPaterno.$invalid }"
                                            v-model.trim="v$.Persona.ApellidoPaterno.$model">
                                        <small
                                            class="invalid-feedback" v-if="v$.Persona.ApellidoPaterno.$dirty && v$.Persona.ApellidoPaterno.required.$invalid">
                                            Apellido Paterno, no tiene información.
                                        </small>
                                        <small class="invalid-feedback" v-if="v$.Persona.ApellidoPaterno.$dirty && v$.Persona.ApellidoPaterno.maxLength.$invalid">
                                            Apellido Paterno,, debe contener minimamente {{ v$.Persona.ApellidoPaterno.maxLength.$params.max }}.
                                        </small>
                                    </div>
                                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-1">
                                        <label
                                            class="form-label"
                                            for="apellido-materno">Apellido Materno</label>
                                        <input
                                            type="text"
                                            class="form-control form-control-sm"
                                            id="apellido-materno"
                                            name="apellido-materno"
                                            autocomplete="off"
                                            :readonly="usuarioForm.IdUsuario > 0"
                                            :class="{ 'is-invalid': v$.Persona.ApellidoMaterno.$dirty && v$.Persona.ApellidoMaterno.$invalid }"
                                            v-model.trim="v$.Persona.ApellidoMaterno.$model">
                                        <small
                                            class="invalid-feedback" v-if="v$.Persona.ApellidoMaterno.$dirty && v$.Persona.ApellidoMaterno.required.$invalid">
                                            Apellido Materno, no tiene información.
                                        </small>
                                        <small class="invalid-feedback"
                                            v-if="v$.Persona.ApellidoMaterno.$dirty && v$.Persona.ApellidoMaterno.maxLength.$invalid">
                                            Apellido Materno,, debe contener minimamente {{ v$.Persona.ApellidoMaterno.maxLength.$params.max }}.
                                        </small>
                                    </div>
                                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-1">
                                        <label
                                            class="form-label"
                                            for="nombres">Nombres</label>
                                        <input
                                            type="text"
                                            class="form-control form-control-sm"
                                            id="nombres"
                                            name="nombres"
                                            :readonly="usuarioForm.IdUsuario > 0"
                                            :class="{ 'is-invalid': v$.Persona.Nombres.$dirty && v$.Persona.Nombres.$invalid }"
                                            v-model.trim="v$.Persona.Nombres.$model">
                                        <small
                                            class="invalid-feedback" v-if="v$.Persona.Nombres.$dirty && v$.Persona.Nombres.required.$invalid">
                                            Nombres, no tiene información.
                                        </small>
                                        <small class="invalid-feedback"
                                            v-if="v$.Persona.Nombres.$dirty && v$.Persona.Nombres.maxLength.$invalid">
                                            Nombres, debe contener minimamente {{ v$.Persona.Nombres.maxLength.$params.max }}.
                                        </small>
                                    </div>
                                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-1">
                                        <label
                                            class="form-label"
                                            for="tipo-documento-identidad">Tipo de Documento de Identidad</label>
                                        <!--
                                        <select
                                            class="custom-select custom-select-sm"
                                            id="tipo-documento-identidad"
                                            name="tipo-documento-identidad"
                                            :disabled="usuarioForm.IdUsuario > 0"
                                            :class="{ 'is-invalid': v$.Persona.TipoDocumentoIdentidad.$dirty && v$.Persona.TipoDocumentoIdentidad.$invalid }"
                                            v-model="v$.Persona.TipoDocumentoIdentidad.$model">
                                            <option v-for="(tipoDocumentoIdentidad, i) in tipoDocumentos"
                                                :value="tipoDocumentoIdentidad.IdParametro"
                                                :key="i">
                                                {{ tipoDocumentoIdentidad.NombreParametro }}
                                            </option>
                                        </select>
                                        <small
                                            class="invalid-feedback">
                                            Tipo de Documento de Identidad, no tiene información.
                                        </small>
                                        -->
                                        <Select2
                                            id="tipo-documento-identidad"
                                            name="tipo-documento-identidad"
                                            :class="{ 'input-validation-error-select2': v$.Persona.TipoDocumentoIdentidad.$dirty && v$.Persona.TipoDocumentoIdentidad.$invalid }"
                                            :disabled="usuarioForm.IdUsuario > 0"
                                            v-model="v$.Persona.TipoDocumentoIdentidad.$model"
                                            :options="tipoDocumentos"
                                            :settings="{ multiple: false, placeholder: 'Seleccione', width: '100%', tags: false, }" />
                                        <small
                                            class="invalid-feedback-select2"
                                            v-if="v$.Persona.TipoDocumentoIdentidad.$dirty && v$.Persona.TipoDocumentoIdentidad.required.$invalid">
                                            Tipo de Documento de Identidad, no tiene información.
                                        </small>
                                    </div>

                                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-1">
                                        <label
                                            class="form-label"
                                            for="documento-identidad">Número de Documento de Identidad</label>
                                        <input
                                            type="text"
                                            class="form-control form-control-sm"
                                            id="documento-identidad"
                                            name="documento-identidad"
                                            autocomplete="off"
                                            :readonly="usuarioForm.IdUsuario > 0"
                                            :class="{ 'is-invalid': v$.Persona.DocumentoIdentidad.$dirty && v$.Persona.DocumentoIdentidad.$invalid }"
                                            v-model="v$.Persona.DocumentoIdentidad.$model">
                                        <small
                                            class="invalid-feedback">
                                            Número de Documento de Identidad, no tiene información.
                                        </small>
                                    </div>
                                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-1">
                                        <label
                                            class="form-label"
                                            for="extension">Extensión</label>
                                        <!--
                                        <select
                                            class="custom-select custom-select-sm"
                                            id="extension"
                                            name="extension"
                                            :disabled="usuarioForm.IdUsuario > 0"
                                            :class="{ 'is-invalid': v$.Persona.Extension.$dirty && v$.Persona.Extension.$invalid }"
                                            v-model="v$.Persona.Extension.$model">
                                            <option v-for="(extesion, i) in extensiones"
                                                :value="extesion.IdParametro"
                                                :key="i">
                                                {{ extesion.NombreParametro }}
                                            </option>
                                        </select>
                                        <small
                                            class="invalid-feedback">
                                            Extensión, no tiene información.
                                        </small>
                                        -->
                                        <Select2
                                            id="extension"
                                            name="extension"
                                            :class="{ 'input-validation-error-select2': v$.Persona.Extension.$dirty && v$.Persona.Extension.$invalid }"
                                            :disabled="usuarioForm.IdUsuario > 0"
                                            v-model="v$.Persona.Extension.$model"
                                            :options="extensiones"
                                            :settings="{ multiple: false, placeholder: 'Seleccione', width: '100%', tags: false, }" />
                                        <small
                                            class="invalid-feedback-select2"
                                            v-if="v$.Persona.Extension.$dirty && v$.Persona.Extension.required.$invalid">
                                            Extensión, no tiene información.
                                        </small>
                                    </div>
                                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-1">
                                        <label
                                            class="form-label"
                                            for="genero">Género</label>
                                        <!--
                                        <select
                                            class="custom-select custom-select-sm"
                                            id="genero"
                                            name="genero"
                                            :disabled="usuarioForm.IdUsuario > 0"
                                            :class="{ 'is-invalid': v$.Persona.Genero.$dirty && v$.Persona.Genero.$invalid }"
                                            v-model.trim="v$.Persona.Genero.$model">
                                            <option v-for="(genero, i) in generos"
                                                :value="genero.IdParametro"
                                                :key="i">
                                                {{ genero.NombreParametro }}
                                            </option>
                                        </select>
                                        -->
                                        <Select2
                                            id="genero"
                                            name="genero"
                                            :class="{ 'input-validation-error-select2': v$.Persona.Genero.$dirty && v$.Persona.Genero.$invalid }"
                                            :disabled="usuarioForm.IdUsuario > 0"
                                            v-model="v$.Persona.Genero.$model"
                                            :options="generos"
                                            :settings="{ multiple: false, placeholder: 'Seleccione', width: '100%', tags: false, }" />
                                        <small
                                            class="invalid-feedback-select2"
                                            v-if="v$.Persona.Genero.$dirty && v$.Persona.Genero.required.$invalid">
                                            Género, no tiene información.
                                        </small>
                                    </div>
                                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-1">
                                        <label
                                            class="form-label"
                                            for="celular">Teléfono Celular</label>
                                        <input
                                            type="text"
                                            class="form-control form-control-sm"
                                            id="celular"
                                            name="celular"
                                            autocomplete="off"
                                            :readonly="usuarioForm.IdUsuario > 0"
                                            :class="{ 'is-invalid': v$.Persona.Celular.$dirty && v$.Persona.Celular.$invalid }"
                                            v-model.trim="v$.Persona.Celular.$model">
                                        <small
                                            class="invalid-feedback">
                                            Teléfono Celular, no tiene información.
                                        </small>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-10 col-md-12 col-sm-12 col-12">
            <!-- <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"> -->
                <div class="panel">
                    <div class="panel-hdr">
                        <h2 class="d-none d-sm-block">
                            Registro de<span class="fw-300"><i>Datos del Usuario</i></span>
                        </h2>
                    </div>

                    <div class="panel-container">
                        <div class="panel-content">
                            <form novalidate>
                                <div class="form-row">
                                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-1">
                                        <label
                                            class="form-label"
                                            for="nombre-usuario">Usuario</label>
                                        <input
                                            type="text"
                                            class="form-control form-control-sm"
                                            id="nombre-usuario"
                                            name="nombre-usuario"
                                            autocomplete="off"
                                            :readonly="usuarioForm.IdUsuario > 0"
                                            :class="{ 'is-invalid': v$.NombreUsuario.$dirty && v$.NombreUsuario.$invalid }"
                                            v-model.trim="v$.NombreUsuario.$model">
                                        <small
                                            class="invalid-feedback"
                                            v-if="v$.NombreUsuario.$dirty && v$.NombreUsuario.required.$invalid">
                                            Usuario, no tiene información.
                                        </small>
                                        <small
                                            class="invalid-feedback"
                                            v-if="v$.NombreUsuario.$dirty && v$.NombreUsuario.minLength.$invalid">
                                            Usuario, debe contener minimamente {{ v$.NombreUsuario.minLength.$params.min }}.
                                        </small>
                                    </div>
                                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-1">
                                        <label
                                            class="form-label d-block"
                                            for="correo-electronico">Correo Electrónico</label>
                                        <input
                                            type="text"
                                            class="form-control form-control-sm"
                                            id="correo-electronico"
                                            name="correo-electronico"
                                            autocomplete="off"
                                            :readonly="seGrabo"
                                            :class="{ 'is-invalid': v$.CorreoElectronico.$dirty && v$.CorreoElectronico.$invalid }"
                                            v-model.trim="v$.CorreoElectronico.$model">
                                        <small
                                            class="invalid-feedback"
                                            v-if="v$.CorreoElectronico.$dirty && v$.CorreoElectronico.required.$invalid">
                                            Correo Electrónico, no tiene información.
                                        </small>
                                        <small
                                            class="invalid-feedback"
                                            v-if="v$.CorreoElectronico.$dirty && v$.CorreoElectronico.email.$invalid">
                                            Correo Electrónico, no tiene formato.
                                        </small>
                                    </div>
                                    <div
                                        class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-1"
                                        v-if="usuarioForm.IdUsuario === 0">
                                        <label
                                            class="form-label d-block"
                                            for="password">Contraseña</label>
                                        <input
                                            type="password"
                                            class="form-control form-control-sm"
                                            id="password"
                                            name="password"
                                            autocomplete="off"
                                            :class="{ 'is-invalid': v$.Password.$dirty && v$.Password.$invalid }"
                                            v-model.trim="v$.Password.$model">
                                        <small
                                            class="invalid-feedback"
                                            v-if="v$.Password.$dirty && v$.Password.required.$invalid">
                                            Contraseña, no tiene información.
                                        </small>
                                        <small
                                            class="invalid-feedback"
                                            v-if="v$.Password.$dirty && v$.Password.minLength.$invalid">
                                            Contraseña, debe contener como mínimo 10 caracteres.
                                        </small>
                                        <small
                                            class="invalid-feedback"
                                            v-if="v$.Password.$dirty && v$.Password.validarPassword.$invalid  && v$.Password.$model.trim().length > 0">
                                            Contraseña, debe contener maýuculas, minúsculas, números y caracteres especiales.
                                        </small>
                                    </div>
                                    <div
                                        class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-1"
                                        v-if="usuarioForm.IdUsuario === 0">
                                        <label
                                            class="form-label d-block"
                                            for="confirmar-password">Confirmación Contraseña</label>
                                        <input
                                            type="password"
                                            class="form-control form-control-sm"
                                            id="confirmar-password"
                                            name="confirmar-password"
                                            autocomplete="off"
                                            :class="{ 'is-invalid': v$.ConfirmarPassword.$dirty && v$.ConfirmarPassword.$invalid }"
                                            v-model.trim="v$.ConfirmarPassword.$model">
                                        <small
                                            class="invalid-feedback"
                                            v-if="v$.ConfirmarPassword.$dirty && v$.ConfirmarPassword.required.$invalid">
                                            Confirmación Contraseña, no tiene información.
                                        </small>
                                        <small
                                            class="invalid-feedback"
                                            v-if="v$.ConfirmarPassword.$dirty && v$.ConfirmarPassword.sameAsPassword.$invalid && v$.ConfirmarPassword.$model.trim().length > 0">
                                            Contraseña y Confirmación Contraseña, no son iguales.
                                        </small>
                                    </div>

                                    <!-- <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mt-3">
                                        <div class="custom-control custom-switch">
                                            <input
                                                type="checkbox"
                                                class="custom-control-input"
                                                id="modificar-password"
                                                name="modificar-password"
                                                v-model="usuarioForm.ModificarPassword"
                                                :disabled="true">
                                            <label class="custom-control-label" for="modificar-password">Modificar Contraseña</label>
                                        </div>
                                    </div> -->
                                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                                        <label
                                            class="form-label"
                                            for="tipo-usuario">Tipo usuario</label>
                                        <Select2
                                            id="tipo-usuario"
                                            name="tipo-usuario"
                                            :class="{ 'input-validation-error-select2': v$.IdTipoUsuarioPar.$dirty && v$.IdTipoUsuarioPar.$invalid }"
                                            :disabled="seGrabo"
                                            v-model="v$.IdTipoUsuarioPar.$model"
                                            :options="tiposUsuario"
                                            :settings="{ multiple: false, placeholder: 'Seleccione', width: '100%', tags: false, }"
                                            @update:modelValue="seCambioTipoUsuario" />
                                        <small
                                            class="invalid-feedback-select2"
                                            v-if="v$.IdTipoUsuarioPar.$dirty && v$.IdTipoUsuarioPar.required.$invalid">
                                            Tipo usuario, no tiene información.
                                        </small>
                                    </div>
                                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mt-3">
                                        <div class="custom-control custom-switch">
                                            <input
                                                type="checkbox"
                                                class="custom-control-input"
                                                id="estado"
                                                name="estado"
                                                :disabled="seGrabo || !esUsuarioNacional"
                                                v-model="usuarioForm.Estado">
                                            <label class="custom-control-label" for="estado">Estado</label>
                                        </div>
                                    </div>
                                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mt-3">
                                        <div class="custom-control custom-switch">
                                            <input
                                                type="checkbox"
                                                class="custom-control-input"
                                                id="estado-regional"
                                                name="estado-regional"
                                                :disabled="seGrabo"
                                                v-model="usuarioForm.EstadoRegional">
                                            <label class="custom-control-label" for="estado-regional">Estado Usuario en {{ nombreRegionalUsuario }}</label>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <pre>{{ usuarioForm }}</pre> -->
    </main>

    <BuscarPersonaSAFIComponent
        ref="buscarPersonaSAFIModalComponentRef"
        @personaSeleccionada="personaSeleccionadaEmit" />

    <asignar-permisos-usuario-interno-component
        ref="asignarPermisosUsuarioInternoComponentRef" />

    <asignar-permisos-usuario-sami-component
        ref="asignarPermisosUsuarioSamiComponentRef" />

    <asignar-permisos-usuario-externo-component
        ref="asignarPermisosUsuarioExternoComponentRef" />
</template>

<script lang='ts'>
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import { ref, onMounted, defineAsyncComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import { email, minLength, required, requiredIf, maxLength } from '@vuelidate/validators';
import { useStore } from 'vuex';

import utils from '@/utils/utils';
import useParametrosGenerales from '@/modules/system/composables/useParametrosGenerales';
import useUsuarios from '../composables/useUsuarios';

const URL_NAME_ADMIN = 'usuarios-admin';
const URL_NAME_EDITAR = 'usuario-editar';

export default {
    components: {
        BuscarPersonaSAFIComponent: defineAsyncComponent(
            () => import('@/modules/system/components/BuscarPersonaSAFIComponent.vue')
        ),
        AsignarPermisosUsuarioInternoComponent: defineAsyncComponent(
            () => import('@/modules/seguridad/components/AsignarPermisosUsuarioInternoComponent.vue')
        ),
        AsignarPermisosUsuarioExternoComponent: defineAsyncComponent(
            () => import('@/modules/seguridad/components/AsignarPermisosUsuarioExternoComponent.vue')
        ),
        AsignarPermisosUsuarioSamiComponent: defineAsyncComponent(
            () => import('@/modules/seguridad/components/AsignarPermisosUsuarioSamiComponent.vue')
        ),
    },
    setup() {
        const store = useStore();

        const USUARIO_INTERNO = 1801;
        const USUARIO_EXTERNO = 1802;
        const USUARIO_INTERNO_EXTERNO = 1971;

        const router = useRouter();
        const {
            grabarUsuarioInternoExterno,
            buscarUsuarioPersonasPorIdUsuario,
            obtenerEmpresasRegionalesRolesUsuarioExterno,
        } = useUsuarios();

        const CARNET_DE_IDENTIDAD_SAFI = 1;
        const CARNET_DE_IDENTIDAD_PARAMETROS = 12;
        const GENERO_FEMENINO_PARAMETROS = 3;
        const GENERO_MASCULINO_PARAMETROS = 4;
        // const GENERO_INDETERNIMADO_PARAMETROS = 5;
        const { 
            obtenerGeneros,
            obtenerTipoDocumentos,
            obtenerExtensiones,
            obtenerTiposUsuario,
        } = useParametrosGenerales();

        const generos = ref<any>([]);
        const tipoDocumentos = ref<any>([]);
        const extensiones = ref<any>([]);
        const tiposUsuario = ref<any>([]);

        const esUsuarioNacional = store.getters['auth/getIdRegional'] === 0;
        const nombreRegionalUsuario = store.getters['auth/getRegional'];

        const passwordIsSame = () => {
            return usuarioForm.value.Password === usuarioForm.value.ConfirmarPassword;
        }

        const textBuscarPersona = ref<string>('');

        const usuarioForm = ref<any>({
            Persona: {
                IdPersona:                 0,
                ApellidoPaterno:           '',
                ApellidoMaterno:           '',
                Nombres:                   '',
                Genero:                    '',
                Celular:                   '',
                Extension:                 '',
                TipoDocumentoIdentidad:    '',
                DocumentoIdentidad:        '',

                // Estos campos no se incluyen en la validación y ni en la vista.
                NombreCompleto:            '',
                CorreoElectronico:         '',
                Telefonos:                 '',
                EstadoCivil:               '',
                FechaControl:              '',
                FechaIngreso:              '',
                Nacionalidad:              '',
                NumeroInterno:             '',
                ZonaDomicilio:             '',
                ApellidoCasada:            '',
                FechaNacimiento:           '01/01/1900',
                LugarNacimiento:           '',
                NumeroDomicilio:           '',
                UsuarioTentativo:          '',
                CorreoElectronicoPersonal: '',
                Estado:                    true,
            },
            IdUsuario:              0,
            NombreUsuario:          '',
            Password:               '',
            ConfirmarPassword:      '',
            CorreoElectronico:      '',
            NombreCompleto:         '',
            ModificarPassword:      true,
            Estado:                 true,
            EstadoRegional:         true,
            IdTipoUsuarioPar:       '',
            IdRegional:             0
        });
        const reglasUsuarioForm = {
            Persona: {
                ApellidoPaterno: { required, maxLength: maxLength(35) },
                ApellidoMaterno: { required, maxLength: maxLength(35) },
                Nombres: { required, maxLength: maxLength(40) },
                Genero:                 { required, },
                Celular:                { required, },
                Extension:              { required, },
                TipoDocumentoIdentidad: { required, },
                DocumentoIdentidad:     { required, },
            },

            NombreUsuario:          { required, minLength: minLength(5), },
            CorreoElectronico:      { required, email },
            Password:               {
                required: requiredIf(() => {
                    return usuarioForm.value.IdUsuario === 0;
                }),
                validarPassword: (value: string) => {
                    if (usuarioForm.value.IdUsuario > 0) return true;

                    const containsUppercase = /[A-Z]/.test(value)
                    const containsLowercase = /[a-z]/.test(value)
                    const containsNumber = /[0-9]/.test(value)
                    const containsSpecial = /[#?!@$%^&*-]/.test(value)

                    return containsUppercase && containsLowercase && containsNumber && containsSpecial;
                },
                minLength: minLength(10),
            },
            ConfirmarPassword:      {
                required: requiredIf(() => {
                    return usuarioForm.value.IdUsuario === 0;
                }),
                sameAsPassword: passwordIsSame,
            },
            IdTipoUsuarioPar:       { required },
        };
        const v$ = useVuelidate(
            reglasUsuarioForm,
            usuarioForm
        );

        const buscarPersonaSAFIModalComponentRef = ref();
        const asignarPermisosUsuarioInternoComponentRef = ref();
        const asignarPermisosUsuarioExternoComponentRef = ref();
        const asignarPermisosUsuarioSamiComponentRef = ref();        

        const seGrabo = ref<boolean>(false);

        const seModificoTipoUsuario = ref<boolean>(false);

        onMounted(async () => {
            // Obtenemos el registro seleccionado desde al administrador.
            const respuesta: any = await utils.recuperaValoresLocalStorage(URL_NAME_EDITAR);
            usuarioForm.value.IdRegional = store.getters['auth/getIdRegional'];
            if (respuesta.ok) {
                usuarioForm.value = (await buscarUsuarioPersonasPorIdUsuario(respuesta.data.IdUsuario)).data;

                usuarioForm.value.Password = '@ContraseniaPrueba0';
                usuarioForm.value.ConfirmarPassword = '@ContraseniaPrueba0';
                usuarioForm.value.ModificarPassword = true;
                //usuarioForm.value.EstadoRegional = respuesta.data.EstadoRegional;
                usuarioForm.value.IdTipoUsuarioPar = respuesta.data.IdTipoUsuarioPar + '';

                usuarioForm.value.Persona.TipoDocumentoIdentidad += '';
                usuarioForm.value.Persona.CorreoElectronico = '';
                usuarioForm.value.Persona.Telefonos = '';
                usuarioForm.value.Persona.EstadoCivil = '';
                usuarioForm.value.Persona.FechaControl = '';
                usuarioForm.value.Persona.FechaIngreso = '';
                usuarioForm.value.Persona.Nacionalidad = '';
                usuarioForm.value.Persona.NumeroInterno = '';
                usuarioForm.value.Persona.ZonaDomicilio = '';
                usuarioForm.value.Persona.ApellidoCasada = '';
                usuarioForm.value.Persona.FechaNacimiento = '01/01/1900';
                usuarioForm.value.Persona.LugarNacimiento = '';
                usuarioForm.value.Persona.NumeroDomicilio = '';
                usuarioForm.value.Persona.UsuarioTentativo = '';
                usuarioForm.value.Persona.CorreoElectronicoPersonal = '';
            }
            
            // Obtenemos los parámetros iniciales.
            const respuestaGeneros = await obtenerGeneros();
            if (respuestaGeneros.ok) {
                generos.value = respuestaGeneros.data;
                generos.value.forEach((genero: any) => {
                    genero.id = genero.IdParametro + '';
                    genero.text = genero.NombreParametro;
                });
            }
            const respuestaTipoDocumentos = await obtenerTipoDocumentos();
            if (respuestaTipoDocumentos.ok) {
                tipoDocumentos.value = respuestaTipoDocumentos.data;
                tipoDocumentos.value.forEach((tipoDocumento: any) => {
                    tipoDocumento.id = tipoDocumento.IdParametro + '';
                    tipoDocumento.text = tipoDocumento.NombreParametro;
                });
            }
            const respuestaExtensiones = await obtenerExtensiones();
            if (respuestaExtensiones.ok) {
                extensiones.value = respuestaExtensiones.data;
                extensiones.value.forEach((extension: any) => {
                    extension.id = extension.IdParametro + '';
                    extension.text = extension.NombreParametro;
                });
            }

            const respuestaTiposUsuario = await obtenerTiposUsuario();
            if (respuestaTiposUsuario.ok) {
                tiposUsuario.value = respuestaTiposUsuario.data;
                tiposUsuario.value.forEach((tipoUsuario: any) => {
                    tipoUsuario.id = tipoUsuario.IdParametro + '';
                    tipoUsuario.text = tipoUsuario.NombreParametro;
                });
            }
        });

        const buscarPersona = async () => {
            buscarPersonaSAFIModalComponentRef.value.abrirComponent(textBuscarPersona.value);
        }

        const personaSeleccionadaEmit = async (persona: any) => {
            textBuscarPersona.value = persona.NombreCompleto;

            usuarioForm.value.Persona.IdPersona = persona.IdPersona;
            usuarioForm.value.Persona.ApellidoPaterno = persona.ApellidoPaterno;
            usuarioForm.value.Persona.ApellidoMaterno = persona.ApellidoMaterno;
            usuarioForm.value.Persona.Nombres = persona.Nombres;
            usuarioForm.value.Persona.Genero =
                persona.Genero === 'F'
                    ? GENERO_FEMENINO_PARAMETROS
                    : persona.Genero === 'M'
                        ? GENERO_MASCULINO_PARAMETROS
                        : persona.Genero;
            usuarioForm.value.Persona.Celular = persona.Celular;
            // usuarioForm.value.Persona.Extension = persona.Extension;
            usuarioForm.value.Persona.TipoDocumentoIdentidad =
                persona.TipoDocumentoIdentidad === CARNET_DE_IDENTIDAD_SAFI
                    ? CARNET_DE_IDENTIDAD_PARAMETROS
                    : persona.TipoDocumentoIdentidad;
            usuarioForm.value.Persona.DocumentoIdentidad = persona.DocumentoIdentidad;

            usuarioForm.value.CorreoElectronico = persona.CorreoElectronico.trim();
        }

        const seCambioTipoUsuario = () => {
            seModificoTipoUsuario.value = true;
        }

        const grabar = async () => {
            if (!v$.value.$invalid) {
                const respuesta = await grabarUsuarioInternoExterno(JSON.parse(JSON.stringify(usuarioForm.value)));
                if (respuesta.ok) {
                    usuarioForm.value.IdUsuario = respuesta.data;
                    seGrabo.value = true;
                    seModificoTipoUsuario.value = false;
                }
            } else {
                v$.value.$touch();
            }
        }

        const asignarPermisosUsuarioInterno = () => {
            asignarPermisosUsuarioInternoComponentRef.value.abrirComponent(
                usuarioForm.value.IdUsuario,
                usuarioForm.value.Estado,
                usuarioForm.value.NombreCompleto
            );
        }

        const asignarPermisosUsuarioSAMI = () => {
            asignarPermisosUsuarioSamiComponentRef.value.abrirComponent(
                usuarioForm.value.IdUsuario,
                usuarioForm.value.NombreCompleto
            );
        }

        const asignarPermisosUsuarioExterno = () => {
            asignarPermisosUsuarioExternoComponentRef.value.abrirComponent(
                usuarioForm.value.IdUsuario,
                usuarioForm.value.Estado,
                usuarioForm.value.NombreCompleto
            );
        }

        const cancelar = () => {
            router.push({
                name: URL_NAME_ADMIN
            });
        }

        onBeforeRouteLeave(async () => {
            if (store.getters['auth/currentState'] !== 'not-authenticated') {
                const resp: any = await obtenerEmpresasRegionalesRolesUsuarioExterno(usuarioForm.value.IdUsuario);
                if (resp.ok && resp.data.EmpresasSAMI.length === 0) {
                    const respuestaPregunta = await utils.mensajePregunta('No asignó permisos al usuario.<br /><br />¿Está seguro de salir de la pantalla?');
                    if (!respuestaPregunta) {
                        return false;
                    }
                }
            }
        });

        return {
            // Variables.
            esUsuarioNacional,
            extensiones,
            generos,
            nombreRegionalUsuario,
            seGrabo,
            seModificoTipoUsuario,
            textBuscarPersona,
            tipoDocumentos,
            tiposUsuario,
            USUARIO_EXTERNO,
            USUARIO_INTERNO_EXTERNO,
            USUARIO_INTERNO,
            usuarioForm,

            // Validaciones.
            v$,

            // Métodos.
            asignarPermisosUsuarioExterno,
            asignarPermisosUsuarioInterno,
            asignarPermisosUsuarioSAMI,
            buscarPersona,
            cancelar,
            grabar,
            seCambioTipoUsuario,

            // Componentes.
            buscarPersonaSAFIModalComponentRef,
            asignarPermisosUsuarioInternoComponentRef,
            asignarPermisosUsuarioExternoComponentRef,
            asignarPermisosUsuarioSamiComponentRef,

            personaSeleccionadaEmit,
        };
    }
}
</script>
