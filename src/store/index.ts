import { createStore } from 'vuex';

import auth from '@/modules/auth/store';
// import facturacion from '@/modules/facturacion/store';
// import prevencion from '@/modules/medico/prevencion/store';

const store = createStore({
    modules: {
        auth,
        // facturacion,
    }
});

export default store;