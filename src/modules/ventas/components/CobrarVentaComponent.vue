<template>
    <div class="modal fade" tabindex="-1" id="cobrar-venta-component-modal" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        Cobrar Venta: <span class="font-weight-bold">{{ venta.nombre_cliente }}</span>
                    </h5>
                    <button type="button" class="close" aria-label="Close" @click="cancelar">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body pt-0 pb-0">

                    <div class="form-row border-bottom pb-2">
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                            <div class="form-group">
                                <label
                                    class="form-label"
                                    for="carnet_identidad">Cliente</label>
                                <div class="input-group input-group-sm">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-user" aria-hidden="true"></i></span>
                                    </div>
                                    <input
                                        type="text"
                                        class="form-control form-control-sm"
                                        id="carnet_identidad"
                                        name="carnet_identidad"
                                        autocomplete="off"
                                        :disabled="seGrabo"
                                        v-model.trim="venta.carnet_identidad"
                                        @keypress.enter="buscarCliente"
                                        ref="idClienteRef">
                                </div>
                            </div>
                        </div>
                    <!-- </div>

                    <div class="form-row mt-3"> -->
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                            <label
                                class="form-label"
                                for="id_tipo_pago">Tipo pago</label>
                            <Select2
                                id="id_tipo_pago"
                                name="id_tipo_pago"
                                :class="{ 'input-validation-error-select2': v$.id_tipo_pago.$dirty && v$.id_tipo_pago.$invalid }"
                                :disabled="seGrabo"
                                v-model="v$.id_tipo_pago.$model"
                                :options="tiposPago"
                                :settings="{ multiple: false, placeholder: 'Seleccione', width: '100%', tags: false, dropdownParent:'#cobrar-venta-component-modal' }" />
                            <small
                                class="invalid-feedback-select2"
                                v-if="v$.id_tipo_pago.$dirty && v$.id_tipo_pago.required.$invalid">
                                Tipo pago, no tiene información.
                            </small>
                        </div>
                        <!-- <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                            <label
                                class="form-label"
                                for="fecha_venta">Fecha venta</label>
                            <input
                                type="date"
                                class="form-control form-control-sm"
                                :class="{ 'input-validation-error-select2': v$.fecha_venta.$dirty && v$.fecha_venta.$invalid }"
                                id="fecha_venta"
                                name="fecha_venta"
                                :readonly="editarFechaVenta"
                                v-model="v$.fecha_venta.$model">
                            <small
                                class="invalid-feedback-select2"
                                v-if="v$.fecha_venta.$dirty && v$.fecha_venta.required.$invalid">
                                Fecha venta, no tiene información.
                            </small>
                        </div> -->
                    </div>

                    <div class="form-row mt-3">
                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                            <label
                                class="form-label"
                                for="a_pagar">A pagar</label>
                            <input
                                type="text"
                                class="form-control form-control-sm text-right"
                                id="a_pagar"
                                name="a_pagar"
                                :disabled="true"
                                v-model.trim="venta.a_pagar">
                        </div>
                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                            <label
                                class="form-label"
                                for="efectivo_recibido">Efectivo recibido</label>
                            <input
                                type="text"
                                class="form-control form-control-sm text-right"
                                :class="{ 'is-invalid': v$.efectivo_recibido.$dirty && v$.efectivo_recibido.$invalid }"
                                id="efectivo_recibido"
                                name="efectivo_recibido"
                                autocomplete="off"
                                :disabled="seGrabo"
                                v-model.trim="v$.efectivo_recibido.$model"
                                @keyup="calcularCambio"
                                @keypress="keyPressEfectivoRecibido($event)"
                                ref="efectivoRecibidoRef">
                            <small
                                class="invalid-feedback" v-if="v$.efectivo_recibido.$dirty && v$.efectivo_recibido.required.$invalid">
                                Efectivo recibido, no tiene información.
                            </small>
                        </div>
                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                            <label
                                class="form-label"
                                for="cambio">Cambio</label>
                            <input
                                type="text"
                                class="form-control form-control-sm text-right"
                                :class="{ 'is-invalid': v$.cambio.$dirty && v$.cambio.$invalid }"
                                id="cambio"
                                name="cambio"
                                :disabled="true"
                                v-model.trim="v$.cambio.$model">
                            <small
                                class="invalid-feedback" v-if="v$.cambio.$dirty && v$.cambio.required.$invalid">
                                Cambio, no tiene información.
                            </small>
                            <small
                                class="invalid-feedback" v-if="v$.cambio.$dirty && v$.cambio.minValue.$invalid">
                                Cambio, no debe ser negativo.
                            </small>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-primary btn-sm"
                        v-if="!seGrabo"
                        @click="grabar"
                        accesskey="g">Grabar [Atl + g]</button>
                    <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        @click="cancelar"
                        accesskey="x">{{ seGrabo ? 'Salir' : 'Cancelar'}} [Atl + x]</button>
                </div>
            </div>
        </div>
    </div>

    <cliente-editar-component 
        ref="clienteEditarComponentRef"
        @cerrarClienteEditarComponent="cerrarClienteEditarComponentEmit" />
</template>

<script lang='ts'>
import {
    defineComponent,
    ref,
    onMounted,
    defineAsyncComponent,
} from 'vue';
import { useStore } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { required, minValue } from '@vuelidate/validators';

import useClientes from '../composables/useClientes';
import useParametros from '../composables/useParametros';
import useVentas from '../composables/useVentas';
import utils from '@/utils/utils';
// import appConfig from '@/app.config';

declare let window: any;

export default defineComponent({
    components: {
        ClienteEditarComponent: defineAsyncComponent(
            () => import('@/modules/ventas/components/ClienteEditarComponent.vue')
        ),
    },
    emits: ['cerrarCobrarVentaComponent'],
    setup(_, { emit }) {
        const store = useStore();

        const seGrabo = ref<boolean>(false);
        const idClienteRef = ref();
        const efectivoRecibidoRef = ref();

        const clienteEditarComponentRef = ref();

        const TIPO_PAGO_EFECTIVO = '1';

        // const hoy = new Date();

        // const editarFechaVenta = ref<boolean>(!appConfig.FECHA_VENTA_EDITABLE);

        const {
            obtenerClientes,
        } = useClientes();

        const {
            obtenerTiposPago,
        } = useParametros();

        const {
            grabarVenta
        } = useVentas();

        const venta = ref<any>({
            id_venta: 0,
            id_sucursal: store.getters['auth/getIdSucursal'],
            id_cliente: 0,
            // fecha_venta:  hoy.getFullYear().toString()
            //     + '-' + ((hoy.getMonth() + 1) < 10 ? '0' + (hoy.getMonth() + 1).toString() : (hoy.getMonth() + 1).toString())
            //     + '-' + (hoy.getDate() < 10 ? '0' + hoy.getDate().toString() : hoy.getDate().toString()),
            fecha_venta: '',
            id_tipo_pago: TIPO_PAGO_EFECTIVO,
            a_pagar: 0,
            efectivo_recibido: 0,
            cambio: 0,
            estado: true,

            ventas_detalle: [],

            carnet_identidad: '',
            nombre_cliente: '',
        });
        const reglasVenta = {
            id_tipo_pago: { required, },
            // fecha_venta: { required, },
            efectivo_recibido: { required, minValue: minValue(0.01), },
            cambio: { required, minValue: minValue(0.00), },
        };
        const v$ = useVuelidate(
            reglasVenta,
            venta,
            { $stopPropagation: true }
        );

        const tiposPago = ref<any>([]);
        let clientes: any[] = [];

        onMounted(async() => {
            const resp = await obtenerTiposPago();
            if (!resp.ok) {
                return;
            }
            tiposPago.value = resp.data;

            await obtenerClientesBackend();
        });

        async function obtenerClientesBackend() {
            const resp = await obtenerClientes('');
            if (!resp.ok) {
                return;
            }
            clientes = resp.data ?? [];
        }

        const abrirComponent = async (ventasDetalle: any, aPagar: number) => {
            venta.value.ventas_detalle = ventasDetalle;
            venta.value.a_pagar = aPagar;
            window.$('#cobrar-venta-component-modal').modal('show');

            setTimeout(() => {
                idClienteRef.value.focus();
            }, 500);
        }

        const buscarCliente = async() => {
            venta.value.nombre_cliente = '';
            if (venta.value.carnet_identidad.length > 0) {
                const cliente = clientes.filter((c: any) => c.carnet_identidad === venta.value.carnet_identidad)[0] ?? undefined;
                if (cliente) {
                    venta.value.id_cliente = cliente.id_cliente;
                    venta.value.nombre_cliente = cliente.nombre;

                    efectivoRecibidoRef.value.focus();
                    efectivoRecibidoRef.value.select();
                } else {
                    utils.mostrarMensaje({
                        descripcion: '¡Ups!, no existe el cliente con el criterio de búsqueda.',
                        tipoMensaje: 'warning'
                    });

                    clienteEditarComponentRef.value.abrirComponent(undefined, venta.value.carnet_identidad);
                }
            }
        }

        const calcularCambio = async() => {
            venta.value.cambio = venta.value.efectivo_recibido - venta.value.a_pagar;
        }

        const keyPressEfectivoRecibido = ($event: any) => {
            if (venta.value.efectivo_recibido.toString().split('.').length == 2) {
                if (venta.value.efectivo_recibido.toString().split('.')[1].length == 2) {
                    $event.preventDefault();
                }
            }
        }

        const grabar = async () => {
            if (!v$.value.$invalid) {
                const respPregunta = await utils.mensajePregunta('¿Está seguro de grabar la venta?')
                if (respPregunta) {
                    const resp = await grabarVenta(venta.value);
                    if (resp.ok) {
                        seGrabo.value = true;
                        venta.value.id_venta = resp.data;

                        setTimeout(() => {
                            cancelar();
                        }, 1000);
                    }
                }
            } else {
                v$.value.$touch();
            }
        }

        const cancelar = () => {
            window.$('#cobrar-venta-component-modal').modal('hide');

            emit('cerrarCobrarVentaComponent', seGrabo.value);

            v$.value.$reset();

            seGrabo.value = false;

            venta.value = {
                id_venta: 0,
                id_sucursal: store.getters['auth/getIdSucursal'],
                id_cliente: 0,
                // fecha_venta:  hoy.getFullYear().toString()
                //     + '-' + ((hoy.getMonth() + 1) < 10 ? '0' + (hoy.getMonth() + 1).toString() : (hoy.getMonth() + 1).toString())
                //     + '-' + (hoy.getDate() < 10 ? '0' + hoy.getDate().toString() : hoy.getDate().toString()),
                fecha_venta: '',
                id_tipo_pago: TIPO_PAGO_EFECTIVO,
                a_pagar: 0,
                efectivo_recibido: 0,
                cambio: 0,
                estado: true,

                ventas_detalle: [],

                carnet_identidad: '',
                nombre_cliente: '',
            };
        }

        const cerrarClienteEditarComponentEmit = async (resultado: boolean, carnetIdentidad: string) => {
            await obtenerClientesBackend();

            if (resultado) {
                venta.value.carnet_identidad = carnetIdentidad;
                buscarCliente();
            }
        }

        return {
            buscarCliente,
            abrirComponent,
            calcularCambio,
            keyPressEfectivoRecibido,

            seGrabo,
            venta,
            tiposPago,
            // editarFechaVenta,

            v$,

            idClienteRef,
            efectivoRecibidoRef,

            clienteEditarComponentRef,
            cerrarClienteEditarComponentEmit,

            cancelar,
            grabar,
        };
    }
});
</script>