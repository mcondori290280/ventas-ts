<template>
    <div>
        <!-- BEGIN Page Content -->
        <!-- the #js-page-content id is needed for some plugins to initialize -->
        <main id="js-page-content" role="main" class="page-content">
            <!-- <ol class="breadcrumb page-breadcrumb">
                <li class="breadcrumb-item"><a href="javascript:void(0);">SmartAdmin</a></li>
                <li class="breadcrumb-item">Page Views</li>
                <li class="breadcrumb-item">Error Pages</li>
                <li class="breadcrumb-item active">Server Error</li>
                <li class="position-absolute pos-top pos-right d-none d-sm-block"><span class="js-get-date"></span></li>
            </ol> -->
            <div class="h-alt-hf d-flex flex-column align-items-center justify-content-center text-center">
                <h1 class="page-error color-fusion-500">
                    ERROR <span class="text-gradient">404</span>
                    <small class="fw-500">
                        !Algo salido mal!
                    </small>
                </h1>
                <h2 class="fw-500 mb-5">
                    Ha experimentado un error técnico. Pedimos disculpas.
                </h2>
                <h3>
                    Estamos trabajando arduamente para corregir este problema. Espere unos momentos y vuelva a intentar la búsqueda.
                </h3>
            </div>
        </main>
        <!-- this overlay is activated only when mobile menu is triggered -->
        <div class="page-content-overlay" data-action="toggle" data-class="mobile-nav-on"></div> <!-- END Page Content -->
        
    </div>
</template>
