### Config Producción
```
export default {
    TITULO_SISTEMA: 'CSBP',

    // Apis
    API_FACTURACION: 'https://api.csbp.com.bo/api/',
    API_SEGURIDAD: 'https://innovoservicios.csbp.com.bo/Seguridad/2.0.0/api/',

    KEY_RECAPTCHA: '6Lerw3UUAAAAAEkfwN4jS6a7CdfCbPAIHh5pFD1F',
    IMPRIMIR_FACTURA_MODAL: true,
};
```
# ventas-ts

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build

node build/post-build.js

```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
