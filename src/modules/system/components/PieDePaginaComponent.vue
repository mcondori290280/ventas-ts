<template>
    <!-- BEGIN Page Footer -->
    <footer class="page-footer position-absolute pos-bottom bg-transparent" role="contentinfo">
        <div class="d-flex align-items-center flex-1 text-muted">
            <span class="hidden-md-down fw-700">
                {{ anioActual }} © {{ nombreEmpresa }}&nbsp;-&nbsp;
                <a :href='sitioWebEmpresa' class='text-primary fw-500' :title='sitioWebEmpresa' target='_blank'>{{ sitioWebEmpresa }}</a>
            </span>
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
import appConfig from '@/app.config';

export default {
    data() {
        return {
            anioActual: 0,
            nombreEmpresa: appConfig.NOMBRE_EMPRESA,
            sitioWebEmpresa: appConfig.SITIO_WEB_EMPRESA,
        }
    },

    mounted() {
        const fecha = new Date();
        this.anioActual = fecha.getFullYear();
    },
}
</script>