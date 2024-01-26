import store from "@/store";

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

    if (buscarAccesos(store.getters['auth/getAccesos'], to)) {
        next();
    } else { 
        next({ name: 'system' });
    }

}

const buscarAccesos = (accesos: any[], to: any): boolean => {
    for (let i = 0; i < accesos.length; i++) {
        if (accesos[i].url === to.name) {
            return true;
        } else {
            return buscarAccesos(accesos[i].accesos, to)
        }
    }
    return false;
}

export {
    isNotAuthenticatedGuard,
    isAuthenticatedGuard,
    isWithAccessGuard
};
