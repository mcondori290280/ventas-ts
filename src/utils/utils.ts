import Swal from 'sweetalert2';
import router from '@/router';

import CryptoJS from 'crypto-js';

declare let window: any;

export default {
    /**
     * Funciones globales.
     */
    /**
     * Despliega el error que se genera del API.
     * @param {*} app 
     * @param {*} error Error del servicio API
     * @param {*} seCargoInformacionDesdeMounted Define si la información de API se cargó desde el
     *                                           método mounted de un componente.
     * @param {*} recargar Define si se recargará la página, después de mostrar el mensaje.
     */
    mostrarMensajeErrorApi(error: any, recargar: any = false): void {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-primary btn-sm',
              cancelButton: 'btn btn-danger btn-sm'
            },
            buttonsStyling: false
        });
        
        if (error.response) {
            let mensaje: any = 'Has experimentado un error técnico. ';
            switch (error.response.status) {
                case 400:
                    if (error.response.data.Datos) {
                        mensaje = error.response.data.Mensaje.descripcion;
                    }
                    if (error.response.data.Error_logueo) {
                        mensaje                    }
                    swalWithBootstrapButtons.fire({
                        html: mensaje,
                        toast: true,
                        timer: 5000,
                        position: 'top-end',
                        icon: 'error',
                        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Aceptar',
                    });
                    break;
                case 401:
                    swalWithBootstrapButtons.fire({
                        html: 'Su sesión a expirado. Por favor vuelva a iniciar sesión.',
                        toast: true,
                        timer: 5000,
                        position: 'top-end',
                        icon: 'error',
                        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Aceptar',
                    });
                    
                    // Visualizamos el modal '#modal-bloqueo-sistema' que se define en App.vue.
                    setTimeout(() => {
                        window.$('#modal-bloqueo-sistema').modal('toggle');
                        sessionStorage.setItem('recargar', recargar ? 'si' : 'no');
                        setTimeout(() => {
                            window.$('#contrasenia').focus();
                        }, 500);
                    }, 1000);
                    break;
                case 404:
                case 500:
                    swalWithBootstrapButtons.fire({
                        html: 'Has experimentado un error técnico. Pedimos disculpas.',
                        toast: true,
                        timer: 5000,
                        position: 'top-end',
                        icon: 'error',
                        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Aceptar',
                    }).then(() => {
                        if (recargar) {
                            setTimeout(() => {
                                location.reload();
                            }, 500);
                        }
                    });
                    break;
                case 0:
                    swalWithBootstrapButtons.fire({
                        html: 'El servicio no esta disponible ó no tiene conexión hacia Internet.',
                        toast: true,
                        timer: 5000,
                        position: 'top-end',
                        icon: 'error',
                        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Aceptar',
                    });
                    break;
            }
        } else {
            swalWithBootstrapButtons.fire({
                html: 'Has experimentado un error técnico. Pedimos disculpas.',
                toast: true,
                timer: 5000,
                position: 'top-end',
                icon: 'error',
                confirmButtonText: '<i class="fa fa-thumbs-up"></i> Aceptar',
            }).then(() => {
                if (recargar) {
                    setTimeout(() => {
                        location.reload();
                    }, 500);
                }
            });
        }
    },

        /**
     * Despliega el mensaje que retorna del API.
     * @param {*} app 
     * @param {*} mensaje 
     * mensaje = {
     *     descripcion: ""
     *     descripcionDeveloper: ""
     *     descripcionTipoMensaje: "nothing"
     *     idMensaje: "0"
     *     informacionExtra: ""
     *     tieneMensaje: false
     *     tipoMensaje: 0
     *     titulo: "Titulo"
     * }
     * o
     * mesaje = texto
     * @param redirect URL dónde se quiere que se direccione.
     */
    mostrarMensaje(mensaje: any, redirect:  any = null) {
        if (mensaje.descripcion && mensaje.tipoMensaje) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-primary btn-sm',
                  cancelButton: 'btn btn-danger btn-sm'
                },
                buttonsStyling: false
            });

            swalWithBootstrapButtons.fire({
                html: `<p>${mensaje.descripcion}</p>` + ((typeof mensaje.IdMensaje === 'undefined')? '': `<p style="font-size:0.7em;text-align: center;"> ${mensaje.IdMensaje}</p>`),
                toast: true,
                timer: 5000, 
                position: 'top-end',
                icon: (mensaje.tipoMensaje === 'Information' ? 'info' : mensaje.tipoMensaje.toLowerCase()),
                confirmButtonText: '<i class="fa fa-thumbs-up"></i> Aceptar',
            }); 
            if (redirect) {
                router.push({ name: redirect });
            }
        } else {
            alert(`Error: El objeto mensaje no tienen la estructura siguiente:
            {
                descripcion: 'Texto-mensaje',
                tipoMensaje: 'tipo-mensaje'
            }`);
        }
    },

    /**
     * Construye una string de una longitud especificada a partir de la string original,
     * donde la string se rellena a la izquierda con el carácter especificado.
     * Tenga en cuenta que si la longitud de la string original es mayor que la longitud especificada,
     * el PadLeft() El método no truncará la string.
     * @param {*} number 
     * @param {*} width 
     * @returns 
     */
    padLeft(number: number, width: number) {
        const numberOutput = Math.abs(number);
        const length = number.toString().length;
        const zero = "0";
        
        if (width <= length) {
            if (number < 0) {
                 return ("-" + numberOutput.toString()); 
            } else {
                 return numberOutput.toString(); 
            }
        } else {
            if (number < 0) {
                return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
            } else {
                return ((zero.repeat(width - length)) + numberOutput.toString()); 
            }
        }
    },
    /**
     * Despliega el mensaje que retorna del API.
     * @param {*} app 
     * @param {*} mensaje 
     * mensaje = {
     *     descripcion: ""
     *     descripcionDeveloper: ""
     *     descripcionTipoMensaje: "nothing"
     *     idMensaje: "0"
     *     informacionExtra: ""
     *     tieneMensaje: false
     *     tipoMensaje: 0
     *     titulo: "Titulo"
     * }
     * o
     * mesaje = texto
     * @param redirect URL dónde se quiere que se direccione.
     */
     mostrarMensajeModal(mensaje: any, redirect = null) {
        if (mensaje.descripcion && mensaje.tipoMensaje) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-primary btn-sm',
                  cancelButton: 'btn btn-danger btn-sm'
                },
                buttonsStyling: false
            });
            swalWithBootstrapButtons.fire({
                html: mensaje.descripcion,
                icon: (mensaje.tipoMensaje === 'Information' ? 'info' : mensaje.tipoMensaje.toLowerCase()),
                confirmButtonText: '<i class="fa fa-thumbs-up"></i> Aceptar',
            });
            if (redirect) {
                router.push(redirect);
            }
        } else {
            alert(`Error: El objeto mensaje no tienen la estructura siguiente:
            {
                descripcion: 'Texto-mensaje',
                tipoMensaje: 'tipo-mensaje'
            }`);
        }
    },

    async mensajePregunta (mensaje: string) {
        let respuesta = false;
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-primary btn-sm mr-2',
              cancelButton: 'btn btn-danger btn-sm'
            },
            buttonsStyling: false
        });
        await swalWithBootstrapButtons.fire({
            html: `${ mensaje }`,
            showCancelButton: true,
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> Aceptar',
            cancelButtonText: '<i class="fa fa-thumbs-down"></i> Cancelar',
            allowOutsideClick: false,
            focusCancel: true,
        }).then((result) => {
            respuesta = result.isConfirmed;
        });

        return respuesta;
    },

    /**
     * Método que almacena información de los formularios en el localStorage.
     * @param {*} informacionAlmacenar 
     */
    async almacenaValoresLocalStorage(llave: any, informacionAlmacenar: any) {
        localStorage.setItem(
            llave,
            CryptoJS.AES.encrypt(
                JSON.stringify(informacionAlmacenar),
                "Secreto"
            ).toString()
        );
    },

    /**
     * Recupera información del localStorage.
     * @param {*} llaveRecuperar 
     * @returns 
     */
    async recuperaValoresLocalStorage(llaveRecuperar: any) {
        const respuesta = {
            ok: false,
            data: null
        }

        const valorRecuperado = localStorage.getItem(llaveRecuperar);
        if (valorRecuperado) {
            respuesta.ok = true;

            respuesta.data = JSON.parse(
                CryptoJS.AES.decrypt(
                    valorRecuperado,
                    'Secreto'
                ).toString(CryptoJS.enc.Utf8)
            );
        }
        return respuesta;
    },

    async eliminarValoresLocalStorage(llave: string) {
        localStorage.removeItem(llave);
    },

    getBase64(file: any) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result?.toString() || '');
          reader.onerror = error => reject(error);
        });
    },

    configuracionLoading: {
        canCancel: false,
        zIndex: 99999999999,
        color: '#00619C',
        backgroundColor: '#00619C',
        opacity: 0.1,
    },
};
