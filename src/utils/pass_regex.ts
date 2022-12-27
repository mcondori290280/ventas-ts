export const passRegex = {
    patternPasswordCompleto: /^(?=.*[a-z\u00f1])(?=.*[A-Z\u00d1])(?=.*[0-9])(?=.*[$@=$!%*?.&#])([A-Za-z\u00f1\u00d10-9$@=$!%*?.&#]|[^]){10,30}$/,
    patternPasswordLetraMayuscula: /^(?=.*[A-Z\u00d1])([A-Z\u00d1]|[^]){1,30}$/,
    patternPasswordLetraMinuscula: /^(?=.*[a-z\u00f1])([a-z\u00f1]|[^]){1,30}$/,
    patternPasswordCaracterEspecial: /^(?=.*[$@=$!%*?.&#])([$@=$!%*?.&#]|[^]){1,30}$/,
    patternPasswordNumero: /^(?=.*[0-9])([0-9]|[^]){1,30}$/,
    patterncaracteresEspeciales: '$@=!%*?.&#',
}