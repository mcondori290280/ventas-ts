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
    const accesos = store.getters['auth/getAccesosModulo'];
    let tieneAcceso = false;
    accesos.forEach((primerNivel: any) => {
        if (!tieneAcceso)
            tieneAcceso = (primerNivel.EsFormulario && primerNivel.url == to.path) ? true : false;
        if (primerNivel.Children.length > 0 && !tieneAcceso) {
            primerNivel.Children.forEach((segundoNivel: any) => {
                if (!tieneAcceso)
                    tieneAcceso = (segundoNivel.EsFormulario && segundoNivel.url == to.path) ? true : false;
                if (segundoNivel.Children.length > 0 && !tieneAcceso) { 
                    segundoNivel.Children.forEach((tercerNivel: any) => {
                        if(!tieneAcceso)
                            tieneAcceso = (tercerNivel.EsFormulario && tercerNivel.url == to.path) ? true : false;
                        if (tercerNivel.Children.length > 0 && !tieneAcceso) { 
                            tercerNivel.Children.forEach((cuartoNivel: any) => {
                                tieneAcceso = (cuartoNivel.EsFormulario && cuartoNivel.url == to.path) ? true : false;
                            });
                        }
                    });
                }
            });
         }
    });
    if (tieneAcceso) {
        next();
    } else { 
        next({ name: 'system' });
    }

}

export {
    isNotAuthenticatedGuard,
    isAuthenticatedGuard,
    isWithAccessGuard
};
