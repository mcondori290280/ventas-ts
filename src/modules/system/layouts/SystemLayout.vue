<template>
    <!-- BEGIN Page Wrapper -->
    <div class="page-wrapper">
        <div class="page-inner">
            <sidebar-component />
            <div class="page-content-wrapper">
                <header-component></header-component>
                <router-view />
                <footer-component />
            </div>
        </div>
    </div>
    <!-- END Page Wrapper -->

    <!-- BEGIN Quick Menu -->
    <!-- <nav class="shortcut-menu hidden-sm-down">
        <input type="checkbox" class="menu-open" name="menu-open" id="menu_open" />
        <label for="menu_open" class="menu-open-button ">
            <span class="app-shortcut-icon d-block"></span>
        </label>
        <a href="javascript:void(0)" class="menu-item btn" data-toggle="tooltip" data-placement="left" title="Scroll Top">
            <i class="fal fa-arrow-up"></i>
        </a>
        <a href="page_login-alt.html" class="menu-item btn" data-toggle="tooltip" data-placement="left" title="Logout">
            <i class="fal fa-sign-out"></i>
        </a>
        <a href="javascript:void(0)" class="menu-item btn" data-action="app-fullscreen" data-toggle="tooltip" data-placement="left" title="Full Screen">
            <i class="fal fa-expand"></i>
        </a>
        <a href="javascript:void(0)" class="menu-item btn" data-action="app-print" data-toggle="tooltip" data-placement="left" title="Print page">
            <i class="fal fa-print"></i>
        </a>
    </nav> -->
    <!-- END Quick Menu -->
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
    components: {
        SidebarComponent: defineAsyncComponent(() => import('../components/SidebarComponent')),
        HeaderComponent: defineAsyncComponent(() => import('../components/HeaderComponent')),
        FooterComponent: defineAsyncComponent(() => import('../components/FooterComponent')),
    },
}
</script>