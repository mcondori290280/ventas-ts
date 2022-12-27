<template>
    <router-view />
    <bloqueo-component></bloqueo-component>
</template>
<script>
import useAuth from './modules/auth/composables/useAuth';
import BloqueoComponent from './modules/system/components/BloqueoComponent.vue';

export default {
    setup() {
        const { checkAuthStatus } = useAuth();
        checkAuthStatus();
    },
    components: { BloqueoComponent }
}
</script>
