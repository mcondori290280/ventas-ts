import store from '@/store';
import utils from '@/utils/utils';

const isAuthenticatedGuard = async(to: any, _: any, next: any) => {
    document.title = to.meta.title;
    const status = store.getters['auth/currentState'];
    if (status == 'authenticated') {
        next();
    } else {
        next({ name: 'login' });
    }
}

const isNotAuthenticatedGuard = async(to: any, _: any, next: any) => {
    document.title = to.meta.title;
    next();
}

const isWithAccessGuard = async (to: any, _: any, next: any) => {
    document.title = to.meta.title;

    const acceso = { tieneAcceso: false };
    buscarAccesos(store.getters['auth/getAccesos'], to, acceso)
    if (acceso.tieneAcceso) {
        next();
    } else { 
        next({ name: 'system' });
        utils.mostrarMensaje({
            descripcion: 'No tiene acceso a esta opción del sistema.',
            tipoMensaje: 'error'
        });
    }

}

const buscarAccesos = (accesos: any[], to: any, acceso: any) => {
    for (let i = 0; i < accesos.length; i++) {
        if (accesos[i].url === to.name) {
            acceso.tieneAcceso = true;
            break;
        }
        buscarAccesos(accesos[i].accesos, to, acceso);
    }
}

export {
    isNotAuthenticatedGuard,
    isAuthenticatedGuard,
    isWithAccessGuard
};
