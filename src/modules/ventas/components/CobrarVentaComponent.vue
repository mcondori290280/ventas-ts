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
                    </div>

                    <div class="form-row mt-3">
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
                                @keypress="keyPressEfectivoRecibido($event)">
                            <small
                                class="invalid-feedback" v-if="v$.efectivo_recibido.$dirty && v$.efectivo_recibido.required.$invalid">
                                A pagar, no tiene información.
                            </small>
                        </div>
                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                            <label
                                class="form-label"
                                for="cambio">Cambio</label>
                            <input
                                type="text"
                                class="form-control form-control-sm text-right"
                                id="cambio"
                                name="cambio"
                                :disabled="true"
                                v-model.trim="venta.cambio">
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-primary btn-sm"
                        v-if="!seGrabo"
                        @click="grabar">Grabar</button>
                    <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        @click="cancelar">{{ seGrabo ? 'Salir' : 'Cancelar'}}</button>
                </div>
                <pre>{{  venta  }}</pre>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import {
    defineComponent,
    ref,
    onMounted,
} from 'vue';
import { useStore } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { required, minValue } from '@vuelidate/validators';

import useClientes from '../composables/useClientes';
import useParametros from '../composables/useParametros';

declare let window: any;

export default defineComponent({
    setup(_, { emit }) {
        const store = useStore();

        const seGrabo = ref<boolean>(false);
        const idClienteRef = ref();

        const TIPO_PAGO_EFECTIVO = '1';

        const {
            buscarClientePorCarnetIdentidad,
        } = useClientes();

        const {
            obtenerTiposPago,
        } = useParametros();

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

            carnet_identidad: '',
            nombre_cliente: '',
        });
        const reglasVenta = {
            id_tipo_pago: { required, },
            efectivo_recibido: { required, minValue: minValue(0.01), },
        };
        const v$ = useVuelidate(
            reglasVenta,
            venta,
            { $stopPropagation: true }
        );

        const tiposPago = ref<any>([]);

        onMounted(async() => {
            const resp = await obtenerTiposPago();
            if (resp.ok) {
                tiposPago.value = resp.data;
            }
        });

        const abrirComponent = async (aPagar: number) => {
            venta.value.a_pagar = aPagar;
            window.$('#cobrar-venta-component-modal').modal('show');

            setTimeout(() => {
                idClienteRef.value.focus();
            }, 500);
        }

        const buscarCliente = async() => {
            venta.value.nombre_cliente = '';
            if (venta.value.carnet_identidad.length > 0) {
                const resp = await buscarClientePorCarnetIdentidad(venta.value.carnet_identidad);
                if (resp.ok) {
                    const clientes: any = resp.data;
                    if (clientes.length > 0) {
                        console.log(clientes);
                        venta.value.id_cliente = clientes[0].id_cliente;
                        venta.value.nombre_cliente = clientes[0].nombre;
                    }
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
                console.log(v$.value.$invalid);
                // const resp = await grabarProducto(producto.value);
                // if (resp.ok) {
                //     seGrabo.value = true;
                //     producto.value.id_producto = resp.data;

                //     setTimeout(() => {
                //         cancelar();
                //     }, 1000);
                // }
            } else {
                v$.value.$touch();
            }
        }

        const cancelar = () => {
            window.$('#cobrar-venta-component-modal').modal('hide');

            emit('cerrarCobrarVentaComponent', seGrabo.value);

            v$.value.$reset();

            seGrabo.value = false;
        }

        return {
            buscarCliente,
            abrirComponent,
            calcularCambio,
            keyPressEfectivoRecibido,

            seGrabo,
            venta,
            tiposPago,

            v$,

            idClienteRef,

            cancelar,
            grabar,
        };
    }
});
</script>