<template>
    <div class="modal fade" tabindex="-1" id="cobrar-venta-component-modal" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content shadow">
                
                <div class="modal-header border-bottom-0 pb-0">
                    <div>
                        <h5 class="modal-title font-weight-bold mb-1">Cobrar Venta</h5>
                        <span v-if="venta.nombre_cliente" class="badge badge-success badge-lg px-3 py-2">
                            <i class="fa fa-check-circle mr-1"></i> {{ venta.nombre_cliente }}
                        </span>
                        <span v-else class="text-muted small">Sin cliente asignado</span>
                    </div>
                    <button type="button" class="close" aria-label="Close" @click="cancelar">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body pt-3">
                    
                    <div class="card card-custom mb-3">
                        <div class="card-body py-3">
                            <h6 class="card-title text-uppercase small font-weight-bold text-muted mb-2">
                                <i class="fa fa-user mr-1"></i> Cliente
                            </h6>
                            <div class="form-row align-items-center">
                                <div class="col-7">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">
                                                <i class="fa fa-id-card" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="carnet_identidad"
                                            name="carnet_identidad"
                                            placeholder="C.I. / RUC"
                                            autocomplete="off"
                                            :disabled="seGrabo"
                                            v-model.trim="venta.carnet_identidad"
                                            @keypress.enter="buscarCliente"
                                            ref="idClienteRef">
                                    </div>
                                </div>
                                <div class="col-5">
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-outline-primary mr-2"
                                        :disabled="!venta.carnet_identidad || seGrabo"
                                        @click="buscarCliente">
                                        <i class="fa fa-search"></i> Buscar
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-outline-success"
                                        :disabled="seGrabo"
                                        @click="crearCliente">
                                        <i class="fa fa-plus"></i> Nuevo
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card card-custom border-primary">
                        <div class="card-body py-3">
                            <h6 class="card-title text-uppercase small font-weight-bold text-muted mb-2">
                                <i class="fa fa-credit-card mr-1"></i> Pago
                            </h6>
                            <div class="form-row">
                                <div class="col-6">
                                    <label class="form-label small" for="id_tipo_pago">Tipo de pago</label>
                                    <Select2
                                        id="id_tipo_pago"
                                        name="id_tipo_pago"
                                        :class="{ 'input-validation-error-select2': v$.id_tipo_pago.$dirty && v$.id_tipo_pago.$invalid }"
                                        :disabled="seGrabo"
                                        v-model="v$.id_tipo_pago.$model"
                                        :options="tiposPago"
                                        :settings="{ multiple: false, placeholder: 'Seleccione', width: '100%', tags: false, dropdownParent: '#cobrar-venta-component-modal' }" />
                                    <small
                                        class="invalid-feedback-select2"
                                        v-if="v$.id_tipo_pago.$dirty && v$.id_tipo_pago.required.$invalid">
                                        Seleccione un tipo de pago.
                                    </small>
                                </div>
                            </div>

                            <div class="form-row mt-3">
                                <div class="col-6">
                                    <div class="monto-box monto-box-a-pagar">
                                        <span class="monto-box-label">A PAGAR</span>
                                        <span class="monto-box-value">$ {{ numeral(venta.a_pagar).format('0,0.00') }}</span>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="monto-box" :class="cambioColorClass">
                                        <span class="monto-box-label">CAMBIO</span>
                                        <span class="monto-box-value">$ {{ numeral(venta.cambio).format('0,0.00') }}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="form-row mt-3">
                                <div class="col-12">
                                    <label class="form-label small" for="efectivo_recibido">
                                        Efectivo recibido
                                        <span v-if="v$.efectivo_recibido.$dirty && v$.efectivo_recibido.$invalid" class="text-danger ml-1">
                                            <i class="fa fa-exclamation-circle"></i> Obligatorio
                                        </span>
                                    </label>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">$</span>
                                        </div>
                                        <input
                                            type="text"
                                            class="form-control form-control-lg text-right font-weight-bold"
                                            :class="{ 'is-invalid': v$.efectivo_recibido.$dirty && v$.efectivo_recibido.$invalid }"
                                            id="efectivo_recibido"
                                            name="efectivo_recibido"
                                            placeholder="0.00"
                                            autocomplete="off"
                                            :disabled="seGrabo"
                                            v-model.trim="v$.efectivo_recibido.$model"
                                            @keyup="calcularCambio"
                                            @keypress="keyPressEfectivoRecibido($event)"
                                            ref="efectivoRecibidoRef">
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex flex-wrap mt-2 gap-1">
                                <button
                                    v-for="monto in montosRapidos"
                                    :key="monto"
                                    type="button"
                                    class="btn btn-sm btn-outline-secondary mr-1 mb-1"
                                    :disabled="seGrabo"
                                    @click="agregarMonto(monto)">
                                    ${{ monto }}
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-sm btn-outline-info mr-1 mb-1"
                                    :disabled="seGrabo"
                                    @click="agregarExacto">
                                    <i class="fa fa-check-circle"></i> Exacto
                                </button>
                            </div>

                        </div>
                    </div>

                </div>

                <div class="modal-footer border-top-0 pt-0">
                    <button
                        type="button"
                        class="btn btn-sm btn-secondary"
                        @click="cancelar"
                        :disabled="loadingGrabar"
                        accesskey="x">
                        <i class="fa fa-times"></i> Cancelar [Atl + x]
                    </button>
                    <button
                        type="button"
                        class="btn btn-sm btn-success font-weight-bold px-4"
                        v-if="!seGrabo"
                        @click="grabar"
                        :disabled="loadingGrabar"
                        accesskey="g">
                        <i v-if="loadingGrabar" class="fa fa-spinner fa-spin mr-1"></i>
                        <i v-else class="fa fa-save mr-1"></i>
                        Cobrar Venta [Atl + g]
                    </button>
                    <button
                        v-else
                        type="button"
                        class="btn btn-sm btn-success font-weight-bold px-4"
                        disabled>
                        <i class="fa fa-check-circle"></i> Grabado
                    </button>
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
    computed,
    onMounted,
    defineAsyncComponent,
} from 'vue';
import { useStore } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { required, minValue } from '@vuelidate/validators';
import numeral from 'numeral';

import useClientes from '../composables/useClientes';
import useParametros from '../composables/useParametros';
import useVentas from '../composables/useVentas';
import utils from '@/utils/utils';

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
        const loadingGrabar = ref<boolean>(false);
        const idClienteRef = ref();
        const efectivoRecibidoRef = ref();

        const clienteEditarComponentRef = ref();

        const TIPO_PAGO_EFECTIVO = '1';

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
            id_tipo_pago: { required },
            efectivo_recibido: { required, minValue: minValue(0.01) },
            cambio: { required, minValue: minValue(0.00) },
        };

        const v$ = useVuelidate(reglasVenta, venta, { $stopPropagation: true });

        const tiposPago = ref<any>([]);
        let clientes: any[] = [];

        const montosRapidos = [10, 20, 50, 100];

        const cambioColorClass = computed(() => {
            const cambio = Number(venta.value.cambio);
            if (cambio > 0) return 'monto-box-cambio-positivo';
            if (cambio < 0) return 'monto-box-cambio-negativo';
            return '';
        });

        onMounted(async () => {
            const resp = await obtenerTiposPago();
            if (!resp.ok) return;
            tiposPago.value = resp.data;
            await obtenerClientesBackend();
        });

        async function obtenerClientesBackend() {
            const resp = await obtenerClientes('');
            if (!resp.ok) return;
            clientes = resp.data ?? [];
        }

        const abrirComponent = async (ventasDetalle: any, aPagar: number) => {
            venta.value.ventas_detalle = ventasDetalle;
            venta.value.a_pagar = aPagar;
            window.$('#cobrar-venta-component-modal').modal('show');

            setTimeout(() => {
                idClienteRef.value?.focus();
            }, 500);
        }

        const buscarCliente = async () => {
            venta.value.nombre_cliente = '';
            if (venta.value.carnet_identidad.length > 0) {
                const cliente = clientes.filter(
                    (c: any) => c.carnet_identidad === venta.value.carnet_identidad
                )[0] ?? undefined;
                if (cliente) {
                    venta.value.id_cliente = cliente.id_cliente;
                    venta.value.nombre_cliente = cliente.nombre;
                    efectivoRecibidoRef.value?.focus();
                    efectivoRecibidoRef.value?.select();
                } else {
                    utils.mostrarMensaje({
                        descripcion: 'No existe el cliente con el criterio de búsqueda.',
                        tipoMensaje: 'warning'
                    });
                    clienteEditarComponentRef.value?.abrirComponent(undefined, venta.value.carnet_identidad);
                }
            }
        }

        const crearCliente = () => {
            clienteEditarComponentRef.value?.abrirComponent(undefined, '');
        }

        const calcularCambio = async () => {
            venta.value.cambio = Math.round(
                (Number(venta.value.efectivo_recibido) - Number(venta.value.a_pagar)) * 100
            ) / 100;
        }

        const keyPressEfectivoRecibido = ($event: any) => {
            const val = venta.value.efectivo_recibido?.toString() ?? '';
            if (val.split('.').length === 2 && val.split('.')[1].length >= 2) {
                $event.preventDefault();
            }
        }

        const agregarMonto = (monto: number) => {
            if (seGrabo.value) return;
            const actual = Number(venta.value.efectivo_recibido) || 0;
            venta.value.efectivo_recibido = Math.round((actual + monto) * 100) / 100;
            calcularCambio();
            efectivoRecibidoRef.value?.focus();
        }

        const agregarExacto = () => {
            if (seGrabo.value) return;
            venta.value.efectivo_recibido = Number(venta.value.a_pagar);
            calcularCambio();
            efectivoRecibidoRef.value?.focus();
        }

        const grabar = async () => {
            if (!v$.value.$invalid) {
                const respPregunta = await utils.mensajePregunta('¿Está seguro de grabar la venta?');
                if (respPregunta) {
                    loadingGrabar.value = true;
                    const resp = await grabarVenta(venta.value);
                    loadingGrabar.value = false;
                    if (resp.ok) {
                        seGrabo.value = true;
                        venta.value.id_venta = resp.data;
                        setTimeout(() => {
                            cancelar();
                        }, 1200);
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
            loadingGrabar.value = false;
            seGrabo.value = false;
            venta.value = {
                id_venta: 0,
                id_sucursal: store.getters['auth/getIdSucursal'],
                id_cliente: 0,
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
            numeral,
            buscarCliente,
            crearCliente,
            abrirComponent,
            calcularCambio,
            keyPressEfectivoRecibido,
            agregarMonto,
            agregarExacto,
            seGrabo,
            loadingGrabar,
            venta,
            tiposPago,
            montosRapidos,
            cambioColorClass,
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

<style scoped>
.card-custom {
    border: 1px solid #e9ecef;
    border-radius: 8px;
    background: #fff;
}
.card-custom.border-primary {
    border-color: #cce5ff;
}

.monto-box {
    border-radius: 8px;
    padding: 12px 16px;
    text-align: center;
    transition: background 0.2s;
}
.monto-box-a-pagar {
    background: #e8f4ff;
    border: 1px solid #b8daff;
}
.monto-box-cambio-positivo {
    background: #e8f8e8;
    border: 1px solid #b8e6b8;
}
.monto-box-cambio-negativo {
    background: #ffe8e8;
    border: 1px solid #f5c6cb;
}
.monto-box-label {
    display: block;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #6c757d;
    margin-bottom: 4px;
}
.monto-box-value {
    display: block;
    font-size: 1.5rem;
    font-weight: 800;
    color: #212529;
}

.gap-1 {
    gap: 0.25rem;
}

.modal-content.shadow {
    box-shadow: 0 8px 32px rgba(0,0,0,0.15);
}
</style>
