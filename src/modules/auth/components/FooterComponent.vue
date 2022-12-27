<template>
    <!-- BEGIN Page Footer -->
    <footer class="page-footer position-absolute pos-bottom bg-transparent" role="contentinfo">
        <div class="d-flex align-items-center flex-1 text-muted">
            <span class="hidden-md-down fw-700">{{ anioActual }} © Caja de Salud Banca Privada&nbsp;-&nbsp;<a href='http://portal.csbp.com.bo' class='text-primary fw-500' title='http://portal.csbp.com.bo' target='_blank'>portal.csbp.com.bo</a></span>
        </div>
        <!-- <div>
            <ul class="list-table m-0">
                <li><a href="javascript:void(0)" class="text-secondary fw-700">About</a></li>
                <li class="pl-3"><a href="javascript:void(0)" class="text-secondary fw-700">License</a></li>
                <li class="pl-3"><a href="javascript:void(0)" class="text-secondary fw-700">Documentation</a></li>
                <li class="pl-3 fs-xl"><a href="javascript:void(0)" class="text-secondary"><i class="fal fa-question-circle" aria-hidden="true"></i></a></li>
            </ul>
        </div> -->
    </footer>
    <!-- END Page Footer -->
</template>
<script>
import { computed } from 'vue';

export default {
    setup() {
        const anioActual = computed(() => new Date().getUTCFullYear())

        return {
            anioActual,
        };
    }
}
</script>