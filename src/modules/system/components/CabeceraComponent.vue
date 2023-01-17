<template>
    <div>
        <!-- BEGIN Page Header -->
        <header class="page-header ml-0"
                role="banner">
            <!-- we need this logo when user switches to nav-function-top -->
            <div class="page-logo" style="padding-top:3px;">
                <!-- <router-link :to="{ name: 'inicio' }" class="page-logo-link press-scale-down d-flex align-items-center"> -->
                <div class="page-logo-link press-scale-down d-flex align-items-center">
                    <img src="/assets/img/logo-imagen.png"
                         alt="MarketBo"
                         style="height:60px;">
                    <span class="page-logo-text mr-1">
                        <img src="/assets/img/logo-letras.png"
                             alt="MarketBo"
                             style="height:60px;margin-left:-10px;">
                    </span>
                </div>
                <!-- </router-link> -->
            </div>
            <!-- DOC: nav menu layout change shortcut -->
            <div class="hidden-md-down dropdown-icon-menu position-relative">
                <a href="javascript:void(0)"
                   class="header-btn btn js-waves-off"
                   data-action="toggle"
                   data-class="nav-function-hidden"
                   title="Hide Navigation">
                    <i class="ni ni-menu"></i>
                </a>
                <ul>
                    <li>
                        <a href="javascript:void(0)"
                           class="btn js-waves-off"
                           data-action="toggle"
                           data-class="nav-function-minify"
                           title="Minify Navigation">
                            <i class="ni ni-minify-nav"></i>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)"
                           class="btn js-waves-off"
                           data-action="toggle"
                           data-class="nav-function-fixed"
                           title="Lock Navigation">
                            <i class="ni ni-lock-nav"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <!-- DOC: mobile button appears during mobile width -->
            <div class="hidden-lg-up">
                <a href="javascript:void(0)"
                   class="header-btn btn press-scale-down"
                   data-action="toggle"
                   data-class="mobile-nav-on">
                    <i class="ni ni-menu"></i>
                </a>
            </div>
            <!-- <div class="search">
                <form class="app-forms hidden-xs-down" role="search" action="search-results.html" autocomplete="off">
                    <input type="text" id="search-field" placeholder="Search for anything" class="form-control" tabindex="1">
                    <a href="javascript:void(0)" onclick="return false;" class="btn-danger btn-search-close js-waves-off d-none" data-action="toggle" data-class="mobile-search-on">
                        <i class="fal fa-times"></i>
                    </a>
                </form>
            </div> -->
            <div class="ml-auto d-flex">
                <!-- activate app search icon (mobile) -->
                <!-- <div class="hidden-sm-up">
                    <a href="javascript:void(0)" class="header-icon" data-action="toggle" data-class="mobile-search-on" data-focus="search-field" title="Search">
                        <i class="fal fa-search"></i>
                    </a>
                </div> -->

                <div class="nav-regional mt-x">
                    <h5 class="text-dark">
                        {{ nombreSucursal }}
                    </h5>
                </div>

                <!-- app settings -->
                <div class="hidden-md-down">
                    <a href="javascript:void(0)"
                       class="header-icon"
                       data-toggle="modal"
                       data-target=".js-modal-settings">
                        <i class="fal fa-cog"></i>
                    </a>
                </div>

                <!-- app shortcuts -->
                <div v-if="false">
                    <a href="javascript:void(0)"
                       class="header-icon"
                       data-toggle="dropdown"
                       title="My Apps">
                        <i class="fal fa-cube"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-animated w-auto h-auto">
                        <div class="dropdown-header bg-trans-gradient d-flex justify-content-center align-items-center rounded-top">
                            <h4 class="m-0 text-center color-white">
                                Quick Shortcut
                                <small class="mb-0 opacity-80">User Applications & Addons</small>
                            </h4>
                        </div>
                        <div class="custom-scroll h-100">
                            <ul class="app-list">
                                <li>
                                    <a href="javascript:void(0)"
                                       class="app-list-item hover-white">
                                        <span class="icon-stack">
                                            <i class="base-2 icon-stack-3x color-primary-600"></i>
                                            <i class="base-3 icon-stack-2x color-primary-700"></i>
                                            <i class="ni ni-settings icon-stack-1x text-white fs-lg"></i>
                                        </span>
                                        <span class="app-list-name">
                                            Services
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)"
                                       class="app-list-item hover-white">
                                        <span class="icon-stack">
                                            <i class="base-2 icon-stack-3x color-primary-400"></i>
                                            <i class="base-10 text-white icon-stack-1x"></i>
                                            <i class="ni md-profile color-primary-800 icon-stack-2x"></i>
                                        </span>
                                        <span class="app-list-name">
                                            Account
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)"
                                       class="app-list-item hover-white">
                                        <span class="icon-stack">
                                            <i class="base-9 icon-stack-3x color-success-400"></i>
                                            <i class="base-2 icon-stack-2x color-success-500"></i>
                                            <i class="ni ni-shield icon-stack-1x text-white"></i>
                                        </span>
                                        <span class="app-list-name">
                                            Security
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)"
                                       class="app-list-item hover-white">
                                        <span class="icon-stack">
                                            <i class="base-18 icon-stack-3x color-info-700"></i>
                                            <span class="position-absolute pos-top pos-left pos-right color-white fs-md mt-2 fw-400">28</span>
                                        </span>
                                        <span class="app-list-name">
                                            Calendar
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)"
                                       class="app-list-item hover-white">
                                        <span class="icon-stack">
                                            <i class="base-7 icon-stack-3x color-info-500"></i>
                                            <i class="base-7 icon-stack-2x color-info-700"></i>
                                            <i class="ni ni-graph icon-stack-1x text-white"></i>
                                        </span>
                                        <span class="app-list-name">
                                            Stats
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)"
                                       class="app-list-item hover-white">
                                        <span class="icon-stack">
                                            <i class="base-4 icon-stack-3x color-danger-500"></i>
                                            <i class="base-4 icon-stack-1x color-danger-400"></i>
                                            <i class="ni ni-envelope icon-stack-1x text-white"></i>
                                        </span>
                                        <span class="app-list-name">
                                            Messages
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)"
                                       class="app-list-item hover-white">
                                        <span class="icon-stack">
                                            <i class="base-4 icon-stack-3x color-fusion-400"></i>
                                            <i class="base-5 icon-stack-2x color-fusion-200"></i>
                                            <i class="base-5 icon-stack-1x color-fusion-100"></i>
                                            <i class="fal fa-keyboard icon-stack-1x color-info-50"></i>
                                        </span>
                                        <span class="app-list-name">
                                            Notes
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)"
                                       class="app-list-item hover-white">
                                        <span class="icon-stack">
                                            <i class="base-16 icon-stack-3x color-fusion-500"></i>
                                            <i class="base-10 icon-stack-1x color-primary-50 opacity-30"></i>
                                            <i class="base-10 icon-stack-1x fs-xl color-primary-50 opacity-20"></i>
                                            <i class="fal fa-dot-circle icon-stack-1x text-white opacity-85"></i>
                                        </span>
                                        <span class="app-list-name">
                                            Photos
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)"
                                       class="app-list-item hover-white">
                                        <span class="icon-stack">
                                            <i class="base-19 icon-stack-3x color-primary-400"></i>
                                            <i class="base-7 icon-stack-2x color-primary-300"></i>
                                            <i class="base-7 icon-stack-1x fs-xxl color-primary-200"></i>
                                            <i class="base-7 icon-stack-1x color-primary-500"></i>
                                            <i class="fal fa-globe icon-stack-1x text-white opacity-85"></i>
                                        </span>
                                        <span class="app-list-name">
                                            Maps
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)"
                                       class="app-list-item hover-white">
                                        <span class="icon-stack">
                                            <i class="base-5 icon-stack-3x color-success-700 opacity-80"></i>
                                            <i class="base-12 icon-stack-2x color-success-700 opacity-30"></i>
                                            <i class="fal fa-comment-alt icon-stack-1x text-white"></i>
                                        </span>
                                        <span class="app-list-name">
                                            Chat
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)"
                                       class="app-list-item hover-white">
                                        <span class="icon-stack">
                                            <i class="base-5 icon-stack-3x color-warning-600"></i>
                                            <i class="base-7 icon-stack-2x color-warning-800 opacity-50"></i>
                                            <i class="fal fa-phone icon-stack-1x text-white"></i>
                                        </span>
                                        <span class="app-list-name">
                                            Phone
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)"
                                       class="app-list-item hover-white">
                                        <span class="icon-stack">
                                            <i class="base-6 icon-stack-3x color-danger-600"></i>
                                            <i class="fal fa-chart-line icon-stack-1x text-white"></i>
                                        </span>
                                        <span class="app-list-name">
                                            Projects
                                        </span>
                                    </a>
                                </li>
                                <li class="w-100">
                                    <a href="javascript:void(0)"
                                       class="btn btn-default mt-4 mb-2 pr-5 pl-5"> Add more apps </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- app message -->
                <a v-if="false"
                   href="javascript:void(0)"
                   class="header-icon"
                   data-toggle="modal"
                   data-target=".js-modal-messenger">
                    <i class="fal fa-globe"></i>
                    <span class="badge badge-icon">!</span>
                </a>

                <!-- app notification -->
                <div v-if="false">
                    <a href="javascript:void(0)"
                       class="header-icon"
                       data-toggle="dropdown"
                       title="You got 11 notifications">
                        <i class="fal fa-bell"></i>
                        <span class="badge badge-icon">11</span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-animated dropdown-xl">
                        <div class="dropdown-header bg-trans-gradient d-flex justify-content-center align-items-center rounded-top mb-2">
                            <h4 class="m-0 text-center color-white">
                                11 New
                                <small class="mb-0 opacity-80">User Notifications</small>
                            </h4>
                        </div>
                        <ul class="nav nav-tabs nav-tabs-clean"
                            role="tablist">
                            <li class="nav-item">
                                <a class="nav-link px-4 fs-md js-waves-on fw-500"
                                   data-toggle="tab"
                                   href="#tab-messages"
                                   data-i18n="drpdwn.messages">Messages</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link px-4 fs-md js-waves-on fw-500"
                                   data-toggle="tab"
                                   href="#tab-feeds"
                                   data-i18n="drpdwn.feeds">Feeds</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link px-4 fs-md js-waves-on fw-500"
                                   data-toggle="tab"
                                   href="#tab-events"
                                   data-i18n="drpdwn.events">Events</a>
                            </li>
                        </ul>
                        <div class="tab-content tab-notification">
                            <div class="tab-pane active p-3 text-center">
                                <h5 class="mt-4 pt-4 fw-500">
                                    <span class="d-block fa-3x pb-4 text-muted">
                                        <i class="ni ni-arrow-up text-gradient opacity-70"></i>
                                    </span> Select a tab above to activate
                                    <small class="mt-3 fs-b fw-400 text-muted">
                                        This blank page message helps protect your privacy, or you can show the first message here automatically through
                                        <a href="javascript:void(0)">settings page</a>
                                    </small>
                                </h5>
                            </div>
                            <div class="tab-pane"
                                 id="tab-messages"
                                 role="tabpanel">
                                <div class="custom-scroll h-100">
                                    <ul class="notification">
                                        <li class="unread">
                                            <a href="javascript:void(0)"
                                               class="d-flex align-items-center">
                                                <span class="status mr-2">
                                                    <span class="profile-image rounded-circle d-inline-block"
                                                          style="background-image:url('/assets/img/demo/avatars/avatar-c.png')"></span>
                                                </span>
                                                <span class="d-flex flex-column flex-1 ml-1">
                                                    <span class="name">Melissa Ayre <span class="badge badge-primary fw-n position-absolute pos-top pos-right mt-1">INBOX</span></span>
                                                    <span class="msg-a fs-sm">Re: New security codes</span>
                                                    <span class="msg-b fs-xs">Hello again and thanks for being part...</span>
                                                    <span class="fs-nano text-muted mt-1">56 seconds ago</span>
                                                </span>
                                            </a>
                                        </li>
                                        <li class="unread">
                                            <a href="javascript:void(0)"
                                               class="d-flex align-items-center">
                                                <span class="status mr-2">
                                                    <span class="profile-image rounded-circle d-inline-block"
                                                          style="background-image:url('/assets/img/demo/avatars/avatar-a.png')"></span>
                                                </span>
                                                <span class="d-flex flex-column flex-1 ml-1">
                                                    <span class="name">Adison Lee</span>
                                                    <span class="msg-a fs-sm">Msed quia non numquam eius</span>
                                                    <span class="fs-nano text-muted mt-1">2 minutes ago</span>
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)"
                                               class="d-flex align-items-center">
                                                <span class="status status-success mr-2">
                                                    <span class="profile-image rounded-circle d-inline-block"
                                                          style="background-image:url('/assets/img/demo/avatars/avatar-b.png')"></span>
                                                </span>
                                                <span class="d-flex flex-column flex-1 ml-1">
                                                    <span class="name">Oliver Kopyuv</span>
                                                    <span class="msg-a fs-sm">Msed quia non numquam eius</span>
                                                    <span class="fs-nano text-muted mt-1">3 days ago</span>
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)"
                                               class="d-flex align-items-center">
                                                <span class="status status-warning mr-2">
                                                    <span class="profile-image rounded-circle d-inline-block"
                                                          style="background-image:url('/assets/img/demo/avatars/avatar-e.png')"></span>
                                                </span>
                                                <span class="d-flex flex-column flex-1 ml-1">
                                                    <span class="name">Dr. John Cook PhD</span>
                                                    <span class="msg-a fs-sm">Msed quia non numquam eius</span>
                                                    <span class="fs-nano text-muted mt-1">2 weeks ago</span>
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)"
                                               class="d-flex align-items-center">
                                                <span class="status status-success mr-2">
                                                    <!-- <img src="/assets/img/demo/avatars/avatar-m.png" data-src="/assets/img/demo/avatars/avatar-h.png" class="profile-image rounded-circle" alt="Sarah McBrook" /> -->
                                                    <span class="profile-image rounded-circle d-inline-block"
                                                          style="background-image:url('/assets/img/demo/avatars/avatar-h.png')"></span>
                                                </span>
                                                <span class="d-flex flex-column flex-1 ml-1">
                                                    <span class="name">Sarah McBrook</span>
                                                    <span class="msg-a fs-sm">Msed quia non numquam eius</span>
                                                    <span class="fs-nano text-muted mt-1">3 weeks ago</span>
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)"
                                               class="d-flex align-items-center">
                                                <span class="status status-success mr-2">
                                                    <span class="profile-image rounded-circle d-inline-block"
                                                          style="background-image:url('/assets/img/demo/avatars/avatar-m.png')"></span>
                                                </span>
                                                <span class="d-flex flex-column flex-1 ml-1">
                                                    <span class="name">Anothony Bezyeth</span>
                                                    <span class="msg-a fs-sm">Msed quia non numquam eius</span>
                                                    <span class="fs-nano text-muted mt-1">one month ago</span>
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)"
                                               class="d-flex align-items-center">
                                                <span class="status status-danger mr-2">
                                                    <span class="profile-image rounded-circle d-inline-block"
                                                          style="background-image:url('/assets/img/demo/avatars/avatar-j.png')"></span>
                                                </span>
                                                <span class="d-flex flex-column flex-1 ml-1">
                                                    <span class="name">Lisa Hatchensen</span>
                                                    <span class="msg-a fs-sm">Msed quia non numquam eius</span>
                                                    <span class="fs-nano text-muted mt-1">one year ago</span>
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="tab-pane"
                                 id="tab-feeds"
                                 role="tabpanel">
                                <div class="custom-scroll h-100">
                                    <ul class="notification">
                                        <li class="unread">
                                            <div class="d-flex align-items-center show-child-on-hover">
                                                <span class="d-flex flex-column flex-1">
                                                    <span class="name d-flex align-items-center">Administrator <span class="badge badge-success fw-n ml-1">UPDATE</span></span>
                                                    <span class="msg-a fs-sm">
                                                        System updated to version <strong>4.0.0</strong> <a href="intel_build_notes.html">(patch notes)</a>
                                                    </span>
                                                    <span class="fs-nano text-muted mt-1">5 mins ago</span>
                                                </span>
                                                <div class="show-on-hover-parent position-absolute pos-right pos-bottom p-3">
                                                    <a href="javascript:void(0)"
                                                       class="text-muted"
                                                       title="delete"><i class="fal fa-trash-alt"></i></a>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="d-flex align-items-center show-child-on-hover">
                                                <div class="d-flex flex-column flex-1">
                                                    <span class="name">
                                                        Adison Lee <span class="fw-300 d-inline">replied to your video <a href="javascript:void(0)" class="fw-400"> Cancer Drug</a> </span>
                                                    </span>
                                                    <span class="msg-a fs-sm mt-2">Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day...</span>
                                                    <span class="fs-nano text-muted mt-1">10 minutes ago</span>
                                                </div>
                                                <div class="show-on-hover-parent position-absolute pos-right pos-bottom p-3">
                                                    <a href="javascript:void(0)"
                                                       class="text-muted"
                                                       title="delete"><i class="fal fa-trash-alt"></i></a>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="d-flex align-items-center show-child-on-hover">
                                                <!--<img src="/assets/img/demo/avatars/avatar-m.png" data-src="/assets/img/demo/avatars/avatar-k.png" class="profile-image rounded-circle" alt="k" />-->
                                                <div class="d-flex flex-column flex-1">
                                                    <span class="name">
                                                        Troy Norman'<span class="fw-300">s new connections</span>
                                                    </span>
                                                    <div class="fs-sm d-flex align-items-center mt-2">
                                                        <span class="profile-image-md mr-1 rounded-circle d-inline-block"
                                                              style="background-image:url('/assets/img/demo/avatars/avatar-a.png'); background-size: cover;"></span>
                                                        <span class="profile-image-md mr-1 rounded-circle d-inline-block"
                                                              style="background-image:url('/assets/img/demo/avatars/avatar-b.png'); background-size: cover;"></span>
                                                        <span class="profile-image-md mr-1 rounded-circle d-inline-block"
                                                              style="background-image:url('/assets/img/demo/avatars/avatar-c.png'); background-size: cover;"></span>
                                                        <span class="profile-image-md mr-1 rounded-circle d-inline-block"
                                                              style="background-image:url('/assets/img/demo/avatars/avatar-e.png'); background-size: cover;"></span>
                                                        <div data-hasmore="+3"
                                                             class="rounded-circle profile-image-md mr-1">
                                                            <span class="profile-image-md mr-1 rounded-circle d-inline-block"
                                                                  style="background-image:url('/assets/img/demo/avatars/avatar-h.png'); background-size: cover;"></span>
                                                        </div>
                                                    </div>
                                                    <span class="fs-nano text-muted mt-1">55 minutes ago</span>
                                                </div>
                                                <div class="show-on-hover-parent position-absolute pos-right pos-bottom p-3">
                                                    <a href="javascript:void(0)"
                                                       class="text-muted"
                                                       title="delete"><i class="fal fa-trash-alt"></i></a>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="d-flex align-items-center show-child-on-hover">
                                                <!--<img src="/assets/img/demo/avatars/avatar-m.png" data-src="/assets/img/demo/avatars/avatar-e.png" class="profile-image-sm rounded-circle align-self-start mt-1" alt="k" />-->
                                                <div class="d-flex flex-column flex-1">
                                                    <span class="name">Dr John Cook <span class="fw-300">sent a <span class="text-danger">new signal</span></span></span>
                                                    <span class="msg-a fs-sm mt-2">Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.</span>
                                                    <span class="fs-nano text-muted mt-1">10 minutes ago</span>
                                                </div>
                                                <div class="show-on-hover-parent position-absolute pos-right pos-bottom p-3">
                                                    <a href="javascript:void(0)"
                                                       class="text-muted"
                                                       title="delete"><i class="fal fa-trash-alt"></i></a>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="d-flex align-items-center show-child-on-hover">
                                                <div class="d-flex flex-column flex-1">
                                                    <span class="name">Lab Images <span class="fw-300">were updated!</span></span>
                                                    <div class="fs-sm d-flex align-items-center mt-1">
                                                        <a href="javascript:void(0)"
                                                           class="mr-1 mt-1"
                                                           title="Cell A-0012">
                                                            <span class="d-block img-share"
                                                                  style="background-image:url('/assets/img/thumbs/pic-7.png'); background-size: cover;"></span>
                                                        </a>
                                                        <a href="javascript:void(0)"
                                                           class="mr-1 mt-1"
                                                           title="Patient A-473 saliva">
                                                            <span class="d-block img-share"
                                                                  style="background-image:url('/assets/img/thumbs/pic-8.png'); background-size: cover;"></span>
                                                        </a>
                                                        <a href="javascript:void(0)"
                                                           class="mr-1 mt-1"
                                                           title="Patient A-473 blood cells">
                                                            <span class="d-block img-share"
                                                                  style="background-image:url('/assets/img/thumbs/pic-11.png'); background-size: cover;"></span>
                                                        </a>
                                                        <a href="javascript:void(0)"
                                                           class="mr-1 mt-1"
                                                           title="Patient A-473 Membrane O.C">
                                                            <span class="d-block img-share"
                                                                  style="background-image:url('/assets/img/thumbs/pic-12.png'); background-size: cover;"></span>
                                                        </a>
                                                    </div>
                                                    <span class="fs-nano text-muted mt-1">55 minutes ago</span>
                                                </div>
                                                <div class="show-on-hover-parent position-absolute pos-right pos-bottom p-3">
                                                    <a href="javascript:void(0)"
                                                       class="text-muted"
                                                       title="delete"><i class="fal fa-trash-alt"></i></a>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="d-flex align-items-center show-child-on-hover">
                                                <!--<img src="/assets/img/demo/avatars/avatar-m.png" data-src="/assets/img/demo/avatars/avatar-h.png" class="profile-image rounded-circle align-self-start mt-1" alt="k" />-->
                                                <div class="d-flex flex-column flex-1">
                                                    <div class="name mb-2">
                                                        Lisa Lamar<span class="fw-300"> updated project</span>
                                                    </div>
                                                    <div class="row fs-b fw-300">
                                                        <div class="col text-left">
                                                            Progress
                                                        </div>
                                                        <div class="col text-right fw-500">
                                                            45%
                                                        </div>
                                                    </div>
                                                    <div class="progress progress-sm d-flex mt-1">
                                                        <span class="progress-bar bg-primary-500 progress-bar-striped"
                                                              role="progressbar"
                                                              style="width: 45%"
                                                              aria-valuenow="45"
                                                              aria-valuemin="0"
                                                              aria-valuemax="100"></span>
                                                    </div>
                                                    <span class="fs-nano text-muted mt-1">2 hrs ago</span>
                                                    <div class="show-on-hover-parent position-absolute pos-right pos-bottom p-3">
                                                        <a href="javascript:void(0)"
                                                           class="text-muted"
                                                           title="delete"><i class="fal fa-trash-alt"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="tab-pane"
                                 id="tab-events"
                                 role="tabpanel">
                                <div class="d-flex flex-column h-100">
                                    <div class="h-auto">
                                        <table class="table table-bordered table-calendar m-0 w-100 h-100 border-0">
                                            <tbody>
                                                <tr>
                                                    <th colspan="7"
                                                        class="pt-3 pb-2 pl-3 pr-3 text-center">
                                                        <div class="js-get-date h5 mb-2">[your date here]</div>
                                                    </th>
                                                </tr>
                                                <tr class="text-center">
                                                    <th>Sun</th>
                                                    <th>Mon</th>
                                                    <th>Tue</th>
                                                    <th>Wed</th>
                                                    <th>Thu</th>
                                                    <th>Fri</th>
                                                    <th>Sat</th>
                                                </tr>
                                                <tr>
                                                    <td class="text-muted bg-faded">30</td>
                                                    <td>1</td>
                                                    <td>2</td>
                                                    <td>3</td>
                                                    <td>4</td>
                                                    <td>5</td>
                                                    <td><i class="fal fa-birthday-cake mt-1 ml-1 position-absolute pos-left pos-top text-primary"></i> 6</td>
                                                </tr>
                                                <tr>
                                                    <td>7</td>
                                                    <td>8</td>
                                                    <td>9</td>
                                                    <td class="bg-primary-300 pattern-0">10</td>
                                                    <td>11</td>
                                                    <td>12</td>
                                                    <td>13</td>
                                                </tr>
                                                <tr>
                                                    <td>14</td>
                                                    <td>15</td>
                                                    <td>16</td>
                                                    <td>17</td>
                                                    <td>18</td>
                                                    <td>19</td>
                                                    <td>20</td>
                                                </tr>
                                                <tr>
                                                    <td>21</td>
                                                    <td>22</td>
                                                    <td>23</td>
                                                    <td>24</td>
                                                    <td>25</td>
                                                    <td>26</td>
                                                    <td>27</td>
                                                </tr>
                                                <tr>
                                                    <td>28</td>
                                                    <td>29</td>
                                                    <td>30</td>
                                                    <td>31</td>
                                                    <td class="text-muted bg-faded">1</td>
                                                    <td class="text-muted bg-faded">2</td>
                                                    <td class="text-muted bg-faded">3</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="flex-1 custom-scroll">
                                        <div class="p-2">
                                            <div class="d-flex align-items-center text-left mb-3">
                                                <div class="width-5 fw-300 text-primary l-h-n mr-1 align-self-start fs-xxl">
                                                    15
                                                </div>
                                                <div class="flex-1">
                                                    <div class="d-flex flex-column">
                                                        <span class="l-h-n fs-md fw-500 opacity-70">
                                                            October 2020
                                                        </span>
                                                        <span class="l-h-n fs-nano fw-400 text-secondary">
                                                            Friday
                                                        </span>
                                                    </div>
                                                    <div class="mt-3">
                                                        <p>
                                                            <strong>2:30PM</strong> - Doctor's appointment
                                                        </p>
                                                        <p>
                                                            <strong>3:30PM</strong> - Report overview
                                                        </p>
                                                        <p>
                                                            <strong>4:30PM</strong> - Meeting with Donnah V.
                                                        </p>
                                                        <p>
                                                            <strong>5:30PM</strong> - Late Lunch
                                                        </p>
                                                        <p>
                                                            <strong>6:30PM</strong> - Report Compression
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="py-2 px-3 bg-faded d-block rounded-bottom text-right border-faded border-bottom-0 border-right-0 border-left-0">
                            <a href="javascript:void(0)"
                               class="fs-xs fw-500 ml-auto">view all notifications</a>
                        </div>
                    </div>
                </div>

                <!-- app user menu -->
                <div id="app-user-menu">
                    <a href="javascript:void(0)"
                       data-toggle="dropdown"
                       :title="email"
                       class="header-icon d-flex align-items-center justify-content-center ml-2">
                        <!-- <img src="/assets/img/demo/avatars/avatar-admin.png"
                             class="profile-image rounded-circle"
                             :alt="fullNameUser"> -->
                        <img src="/assets/img/demo/avatars/default.png"
                             class="profile-image rounded-circle"
                             :alt="fullNameUser">
                        <!-- you can also add username next to the avatar with the codes below:
                        <span class="ml-1 mr-1 text-truncate text-truncate-header hidden-xs-down">Me</span>
                        <i class="ni ni-chevron-down hidden-xs-down"></i> -->
                    </a>
                    <div class="dropdown-menu dropdown-menu-animated dropdown-lg">
                        <div class="dropdown-header bg-trans-gradient d-flex flex-row py-4 rounded-top">
                            <div class="d-flex flex-row align-items-center mt-1 mb-1 color-white">
                                <span class="mr-2">
                                    <!-- <img src="/assets/img/demo/avatars/avatar-admin.png"
                                         class="rounded-circle profile-image"
                                         :alt="fullNameUser"> -->
                                    <img src="/assets/img/demo/avatars/default.png"
                                         class="rounded-circle profile-image"
                                         :alt="fullNameUser">
                                </span>
                                <div class="info-card-text">
                                    <div class="fs-lg text-truncate text-truncate-lg">{{ fullNameUser }}</div>
                                    <span class="text-truncate text-truncate-md opacity-80">{{ email }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="dropdown-divider m-0"></div>
                        <a href="javascript:void(0)"
                           class="dropdown-item"
                           data-action="app-reset">
                            <span data-i18n="drpdwn.reset_layout">Restablecer diseño</span>
                        </a>
                        <a href="javascript:void(0)"
                           class="dropdown-item"
                           data-toggle="modal"
                           data-target=".js-modal-settings">
                            <span data-i18n="drpdwn.settings">Ajustes</span>
                        </a>
                        <div class="dropdown-divider m-0"></div>
                        <a href="javascript:void(0)"
                           class="dropdown-item"
                           data-action="app-fullscreen">
                            <span data-i18n="drpdwn.fullscreen">Pantalla completa</span>
                            <i class="float-right text-muted fw-n">F11</i>
                        </a>
                        <a href="javascript:void(0)"
                           class="dropdown-item"
                           data-action="app-print">
                            <span data-i18n="drpdwn.print">Imprimir</span>
                            <i class="float-right text-muted fw-n">Ctrl + P</i>
                        </a>
                        <!-- <div class="dropdown-multilevel dropdown-multilevel-left">
                            <div class="dropdown-item">
                                Language
                            </div>
                            <div class="dropdown-menu">
                                <a href="#?lang=fr"
                                   class="dropdown-item"
                                   data-action="lang"
                                   data-lang="fr">Français</a>
                                <a href="#?lang=en"
                                   class="dropdown-item active"
                                   data-action="lang"
                                   data-lang="en">English (US)</a>
                                <a href="#?lang=es"
                                   class="dropdown-item"
                                   data-action="lang"
                                   data-lang="es">Español</a>
                                <a href="#?lang=ru"
                                   class="dropdown-item"
                                   data-action="lang"
                                   data-lang="ru">Русский язык</a>
                                <a href="#?lang=jp"
                                   class="dropdown-item"
                                   data-action="lang"
                                   data-lang="jp">日本語</a>
                                <a href="#?lang=ch"
                                   class="dropdown-item"
                                   data-action="lang"
                                   data-lang="ch">中文</a>
                            </div>
                        </div> -->
                        <div class="dropdown-divider m-0"></div>
                        <a href="javascript:void(0)"
                           class="dropdown-item"
                           @click="abrirModalModificarContrasenia()">
                            Modificar Contraseña
                        </a>
                        <a href="javascript:void(0)"
                           class="dropdown-item"
                           @click="cambiarSucursal()"
                           v-if="!unicaSucursal">
                            Cambiar Sucursal
                        </a>
                        <a class="dropdown-item fw-500 pt-3 pb-3"
                           href="javascript:void(0)"
                           @click="cerrarSesion()">
                            <span data-i18n="drpdwn.page-logout">Cerrar sesión</span>
                        </a>
                    </div>
                </div>
            </div>
        </header>
        <!-- END Page Header -->

        <!-- BEGIN Shortcuts -->
        <!-- modal shortcut -->
        <!-- <div class="modal fade modal-backdrop-transparent" id="modal-shortcut" tabindex="-1" role="dialog" aria-labelledby="modal-shortcut" aria-hidden="true">
            <div class="modal-dialog modal-dialog-top modal-transparent" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <ul class="app-list w-auto h-auto p-0 text-left">
                            <li>
                                <a href="intel_introduction.html" class="app-list-item text-white border-0 m-0">
                                    <div class="icon-stack">
                                        <i class="base base-7 icon-stack-3x opacity-100 color-primary-500 "></i>
                                        <i class="base base-7 icon-stack-2x opacity-100 color-primary-300 "></i>
                                        <i class="fal fa-home icon-stack-1x opacity-100 color-white"></i>
                                    </div>
                                    <span class="app-list-name">
                                        Home
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="page_inbox.html" class="app-list-item text-white border-0 m-0">
                                    <div class="icon-stack">
                                        <i class="base base-7 icon-stack-3x opacity-100 color-success-500 "></i>
                                        <i class="base base-7 icon-stack-2x opacity-100 color-success-300 "></i>
                                        <i class="ni ni-envelope icon-stack-1x text-white"></i>
                                    </div>
                                    <span class="app-list-name">
                                        Inbox
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="intel_introduction.html" class="app-list-item text-white border-0 m-0">
                                    <div class="icon-stack">
                                        <i class="base base-7 icon-stack-2x opacity-100 color-primary-300 "></i>
                                        <i class="fal fa-plus icon-stack-1x opacity-100 color-white"></i>
                                    </div>
                                    <span class="app-list-name">
                                        Add More
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div> -->
        <!-- END Shortcuts -->

        <!-- BEGIN Page Settings -->
        <div class="modal fade js-modal-settings modal-backdrop-transparent"
             tabindex="-1"
             role="dialog"
             aria-hidden="true">
            <div class="modal-dialog modal-dialog-right modal-md">
                <div class="modal-content">
                    <div class="dropdown-header bg-trans-gradient d-flex justify-content-center align-items-center w-100">
                        <h4 class="m-0 text-center color-white">
                            Opcciones de diseño
                            <small class="mb-0 opacity-80">Configuración de la interfaz de usuario</small>
                        </h4>
                        <button type="button"
                                class="close text-white position-absolute pos-top pos-right p-2 m-1 mr-2"
                                data-dismiss="modal"
                                aria-label="Close">
                            <span aria-hidden="true"><i class="fal fa-times"></i></span>
                        </button>
                    </div>
                    <div class="modal-body p-0">
                        <div class="settings-panel">
                            <div class="mt-4 d-table w-100 px-5">
                                <div class="d-table-cell align-middle">
                                    <h5 class="p-0">
                                        Diseño de la aplicación
                                    </h5>
                                </div>
                            </div>
                            <div class="list"
                                 id="fh">
                                <a href="javascript:void(0)"
                                   onclick="return false;"
                                   class="btn btn-switch"
                                   data-action="toggle"
                                   data-class="header-function-fixed"></a>
                                <span class="onoffswitch-title">Encabezado fijo</span>
                                <span class="onoffswitch-title-desc">La cabecera está fija en todo momento.</span>
                            </div>
                            <div class="list"
                                 id="nff">
                                <a href="javascript:void(0)"
                                   onclick="return false;"
                                   class="btn btn-switch"
                                   data-action="toggle"
                                   data-class="nav-function-fixed"></a>
                                <span class="onoffswitch-title">Navegación fija</span>
                                <span class="onoffswitch-title-desc">Panel izquierdo es fijo.</span>
                            </div>
                            <div class="list"
                                 id="nfm">
                                <a href="javascript:void(0)"
                                   onclick="return false;"
                                   class="btn btn-switch"
                                   data-action="toggle"
                                   data-class="nav-function-minify"></a>
                                <span class="onoffswitch-title">Reducir la navegación</span>
                                <span class="onoffswitch-title-desc">Skew nav para maximizar el espacio.</span>
                            </div>
                            <div class="list"
                                 id="nfh">
                                <a href="javascript:void(0)"
                                   onclick="return false;"
                                   class="btn btn-switch"
                                   data-action="toggle"
                                   data-class="nav-function-hidden"></a>
                                <span class="onoffswitch-title">Ocultar navegación</span>
                                <span class="onoffswitch-title-desc">Rueda el mouse sobre el borde para revelar.</span>
                            </div>
                            <div class="list"
                                 id="nft">
                                <a href="javascript:void(0)"
                                   onclick="return false;"
                                   class="btn btn-switch"
                                   data-action="toggle"
                                   data-class="nav-function-top"></a>
                                <span class="onoffswitch-title">Navegación superior</span>
                                <span class="onoffswitch-title-desc">Reubica el panel izquierdo hacia arriba.</span>
                            </div>
                            <div class="list"
                                 id="mmb">
                                <a href="javascript:void(0)"
                                   onclick="return false;"
                                   class="btn btn-switch"
                                   data-action="toggle"
                                   data-class="mod-main-boxed"></a>
                                <span class="onoffswitch-title">Diseño en caja</span>
                                <span class="onoffswitch-title-desc">Se encapsula a un contenedor.</span>
                            </div>
                            <div class="expanded">
                                <ul class="">
                                    <li>
                                        <div class="bg-fusion-50"
                                             data-action="toggle"
                                             data-class="mod-bg-1"></div>
                                    </li>
                                    <li>
                                        <div class="bg-warning-200"
                                             data-action="toggle"
                                             data-class="mod-bg-2"></div>
                                    </li>
                                    <li>
                                        <div class="bg-primary-200"
                                             data-action="toggle"
                                             data-class="mod-bg-3"></div>
                                    </li>
                                    <li>
                                        <div class="bg-success-300"
                                             data-action="toggle"
                                             data-class="mod-bg-4"></div>
                                    </li>
                                </ul>
                                <div class="list"
                                     id="mbgf">
                                    <a href="javascript:void(0)"
                                       onclick="return false;"
                                       class="btn btn-switch"
                                       data-action="toggle"
                                       data-class="mod-fixed-bg"></a>
                                    <span class="onoffswitch-title">Fondo fijo</span>
                                </div>
                            </div>
                            <div class="mt-4 d-table w-100 px-5">
                                <div class="d-table-cell align-middle">
                                    <h5 class="p-0">
                                        Menú móvil
                                    </h5>
                                </div>
                            </div>
                            <div class="list"
                                 id="nmp">
                                <a href="javascript:void(0)"
                                   onclick="return false;"
                                   class="btn btn-switch"
                                   data-action="toggle"
                                   data-class="nav-mobile-push"></a>
                                <span class="onoffswitch-title">Contenido de inserción</span>
                                <span class="onoffswitch-title-desc">Contenido empujado en el menú revelar.</span>
                            </div>
                            <div class="list"
                                 id="nmno">
                                <a href="javascript:void(0)"
                                   onclick="return false;"
                                   class="btn btn-switch"
                                   data-action="toggle"
                                   data-class="nav-mobile-no-overlay"></a>
                                <span class="onoffswitch-title">Sin superposición</span>
                                <span class="onoffswitch-title-desc">Elimina la malla en el menú revelado.</span>
                            </div>
                            <div class="list"
                                 id="sldo">
                                <a href="javascript:void(0)"
                                   onclick="return false;"
                                   class="btn btn-switch"
                                   data-action="toggle"
                                   data-class="nav-mobile-slide-out"></a>
                                <span class="onoffswitch-title">Off-Canvas <sup>(beta)</sup></span>
                                <span class="onoffswitch-title-desc">Menú de solapamiento de contenido.</span>
                            </div>
                            <div class="mt-4 d-table w-100 px-5">
                                <div class="d-table-cell align-middle">
                                    <h5 class="p-0">
                                        Accesibilidad
                                    </h5>
                                </div>
                            </div>
                            <div class="list"
                                 id="mbf">
                                <a href="javascript:void(0)"
                                   onclick="return false;"
                                   class="btn btn-switch"
                                   data-action="toggle"
                                   data-class="mod-bigger-font"></a>
                                <span class="onoffswitch-title">Fuente de contenido más grande</span>
                                <span class="onoffswitch-title-desc">fuentes de contenido son más grandes para la legibilidad.</span>
                            </div>
                            <div class="list"
                                 id="mhc">
                                <a href="javascript:void(0)"
                                   onclick="return false;"
                                   class="btn btn-switch"
                                   data-action="toggle"
                                   data-class="mod-high-contrast"></a>
                                <span class="onoffswitch-title">Texto de alto contraste (WCAG 2 AA)</span>
                                <span class="onoffswitch-title-desc">Relación de contraste de texto 4.5: 1</span>
                            </div>
                            <!-- <div class="list" id="mcb">
                                <a href="javascript:void(0)" onclick="return false;" class="btn btn-switch" data-action="toggle" data-class="mod-color-blind"></a>
                                <span class="onoffswitch-title">Daltonism <sup>(beta)</sup> </span>
                                <span class="onoffswitch-title-desc">color vision deficiency</span>
                            </div> -->
                            <div class="list"
                                 id="mpc">
                                <a href="javascript:void(0)"
                                   onclick="return false;"
                                   class="btn btn-switch"
                                   data-action="toggle"
                                   data-class="mod-pace-custom"></a>
                                <span class="onoffswitch-title">Precargador dentro</span>
                                <span class="onoffswitch-title-desc">preloader estará dentro del contenido.</span>
                            </div>
                            <div class="mt-4 d-table w-100 px-5">
                                <div class="d-table-cell align-middle">
                                    <h5 class="p-0">
                                        Modificaciones globales
                                    </h5>
                                </div>
                            </div>
                            <div class="list"
                                 id="mcbg">
                                <a href="javascript:void(0)"
                                   onclick="return false;"
                                   class="btn btn-switch"
                                   data-action="toggle"
                                   data-class="mod-clean-page-bg"></a>
                                <span class="onoffswitch-title">Limpie el fondo de la página</span>
                                <span class="onoffswitch-title-desc">añade más espacios en blanco.</span>
                            </div>
                            <div class="list"
                                 id="mhni">
                                <a href="javascript:void(0)"
                                   onclick="return false;"
                                   class="btn btn-switch"
                                   data-action="toggle"
                                   data-class="mod-hide-nav-icons"></a>
                                <span class="onoffswitch-title">Ocultar íconos de navegación</span>
                                <span class="onoffswitch-title-desc">íconos de navegación invisibles.</span>
                            </div>
                            <div class="list"
                                 id="dan">
                                <a href="javascript:void(0)"
                                   onclick="return false;"
                                   class="btn btn-switch"
                                   data-action="toggle"
                                   data-class="mod-disable-animation"></a>
                                <span class="onoffswitch-title">Desactivar la animación CSS</span>
                                <span class="onoffswitch-title-desc">Animaciones deshabilitadas basadas en CSS.</span>
                            </div>
                            <div class="list"
                                 id="mhic">
                                <a href="javascript:void(0)"
                                   onclick="return false;"
                                   class="btn btn-switch"
                                   data-action="toggle"
                                   data-class="mod-hide-info-card"></a>
                                <span class="onoffswitch-title">Ocultar tarjeta de información</span>
                                <span class="onoffswitch-title-desc">Oculta la tarjeta de información del panel izquierdo.</span>
                            </div>
                            <div class="list"
                                 id="mlph">
                                <a href="javascript:void(0)"
                                   onclick="return false;"
                                   class="btn btn-switch"
                                   data-action="toggle"
                                   data-class="mod-lean-subheader"></a>
                                <span class="onoffswitch-title">Lean Subheader</span>
                                <span class="onoffswitch-title-desc">encabezado de página distinguido.</span>
                            </div>
                            <div class="list"
                                 id="mnl">
                                <a href="javascript:void(0)"
                                   onclick="return false;"
                                   class="btn btn-switch"
                                   data-action="toggle"
                                   data-class="mod-nav-link"></a>
                                <span class="onoffswitch-title">Navegación jerárquica</span>
                                <span class="onoffswitch-title-desc">Borrar desglose de enlaces de navegación.</span>
                            </div>
                            <div class="list mt-3">
                                <span class="onoffswitch-title">Tamaño de fuente global <small>(Se reestablece al refrescar)</small> </span>
                                <div class="btn-group btn-group-sm btn-group-toggle my-2"
                                     data-toggle="buttons">
                                    <label class="btn btn-default btn-sm"
                                           data-action="toggle-swap"
                                           data-class="root-text-sm"
                                           data-target="html">
                                        <input type="radio"
                                               name="changeFrontSize"> SM
                                    </label>
                                    <label class="btn btn-default btn-sm"
                                           data-action="toggle-swap"
                                           data-class="root-text"
                                           data-target="html">
                                        <input type="radio"
                                               name="changeFrontSize"
                                               checked=""> MD
                                    </label>
                                    <label class="btn btn-default btn-sm"
                                           data-action="toggle-swap"
                                           data-class="root-text-lg"
                                           data-target="html">
                                        <input type="radio"
                                               name="changeFrontSize"> LG
                                    </label>
                                    <label class="btn btn-default btn-sm"
                                           data-action="toggle-swap"
                                           data-class="root-text-xl"
                                           data-target="html">
                                        <input type="radio"
                                               name="changeFrontSize"> XL
                                    </label>
                                </div>
                                <span class="onoffswitch-title-desc d-block mb-g">Cambiar el tamaño de fuente de la <strong>raíz</strong> para afectar los valores rem.</span>
                            </div>
                            <hr class="m-0">
                            <div class="p-3 d-flex align-items-center justify-content-center bg-faded">
                                <a href="javascript:void(0)"
                                   class="btn btn-outline-danger fw-500 mr-2"
                                   data-action="app-reset">Reiniciar ajustes</a>
                                <a href="javascript:void(0)"
                                   class="btn btn-danger fw-500"
                                   data-action="factory-reset">Restablecimiento de fábrica</a>
                            </div>
                        </div>
                        <span id="saving"></span>
                    </div>
                </div>
            </div>
        </div>
        <!-- END Page Settings -->

        <!-- BEGIN Messenger -->
        <div class="modal fade js-modal-messenger modal-backdrop-transparent"
             tabindex="-1"
             role="dialog"
             aria-hidden="true">
            <div class="modal-dialog modal-dialog-right">
                <div class="modal-content h-100">
                    <div class="dropdown-header bg-trans-gradient d-flex align-items-center w-100">
                        <div class="d-flex flex-row align-items-center mt-1 mb-1 color-white">
                            <span class="mr-2">
                                <span class="rounded-circle profile-image d-block"
                                      style="background-image:url('/assets/img/demo/avatars/avatar-d.png'); background-size: cover;"></span>
                            </span>
                            <div class="info-card-text">
                                <a href="javascript:void(0);"
                                   class="fs-lg text-truncate text-truncate-lg text-white"
                                   data-toggle="dropdown"
                                   aria-expanded="false">
                                    Tracey Chang
                                    <i class="fal fa-angle-down d-inline-block ml-1 text-white fs-md"></i>
                                </a>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item"
                                       href="javascript:void(0)">Send Email</a>
                                    <a class="dropdown-item"
                                       href="javascript:void(0)">Create Appointment</a>
                                    <a class="dropdown-item"
                                       href="javascript:void(0)">Block User</a>
                                </div>
                                <span class="text-truncate text-truncate-md opacity-80">IT Director</span>
                            </div>
                        </div>
                        <button type="button"
                                class="close text-white position-absolute pos-top pos-right p-2 m-1 mr-2"
                                data-dismiss="modal"
                                aria-label="Close">
                            <span aria-hidden="true"><i class="fal fa-times"></i></span>
                        </button>
                    </div>
                    <div class="modal-body p-0 h-100 d-flex">
                        <!-- BEGIN msgr-list -->
                        <div class="msgr-list d-flex flex-column bg-faded border-faded border-top-0 border-right-0 border-bottom-0 position-absolute pos-top pos-bottom">
                            <div>
                                <div class="height-4 width-3 h3 m-0 d-flex justify-content-center flex-column color-primary-500 pl-3 mt-2">
                                    <i class="fal fa-search"></i>
                                </div>
                                <input type="text"
                                       class="form-control bg-white"
                                       id="msgr_listfilter_input"
                                       placeholder="Filter contacts"
                                       aria-label="FriendSearch"
                                       data-listfilter="#js-msgr-listfilter">
                            </div>
                            <div class="flex-1 h-100 custom-scroll">
                                <div class="w-100">
                                    <ul id="js-msgr-listfilter"
                                        class="list-unstyled m-0">
                                        <li>
                                            <a href="javascript:void(0)"
                                               class="d-table w-100 px-2 py-2 text-dark hover-white"
                                               data-filter-tags="tracey chang online">
                                                <div class="d-table-cell align-middle status status-success status-sm ">
                                                    <span class="profile-image-md rounded-circle d-block"
                                                          style="background-image:url('/assets/img/demo/avatars/avatar-d.png'); background-size: cover;"></span>
                                                </div>
                                                <div class="d-table-cell w-100 align-middle pl-2 pr-2">
                                                    <div class="text-truncate text-truncate-md">
                                                        Tracey Chang
                                                        <small class="d-block font-italic text-success fs-xs">
                                                            Online
                                                        </small>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)"
                                               class="d-table w-100 px-2 py-2 text-dark hover-white"
                                               data-filter-tags="oliver kopyuv online">
                                                <div class="d-table-cell align-middle status status-success status-sm ">
                                                    <span class="profile-image-md rounded-circle d-block"
                                                          style="background-image:url('/assets/img/demo/avatars/avatar-b.png'); background-size: cover;"></span>
                                                </div>
                                                <div class="d-table-cell w-100 align-middle pl-2 pr-2">
                                                    <div class="text-truncate text-truncate-md">
                                                        Oliver Kopyuv
                                                        <small class="d-block font-italic text-success fs-xs">
                                                            Online
                                                        </small>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)"
                                               class="d-table w-100 px-2 py-2 text-dark hover-white"
                                               data-filter-tags="dr john cook phd away">
                                                <div class="d-table-cell align-middle status status-warning status-sm ">
                                                    <span class="profile-image-md rounded-circle d-block"
                                                          style="background-image:url('/assets/img/demo/avatars/avatar-e.png'); background-size: cover;"></span>
                                                </div>
                                                <div class="d-table-cell w-100 align-middle pl-2 pr-2">
                                                    <div class="text-truncate text-truncate-md">
                                                        Dr. John Cook PhD
                                                        <small class="d-block font-italic fs-xs">
                                                            Away
                                                        </small>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)"
                                               class="d-table w-100 px-2 py-2 text-dark hover-white"
                                               data-filter-tags="ali amdaney online">
                                                <div class="d-table-cell align-middle status status-success status-sm ">
                                                    <span class="profile-image-md rounded-circle d-block"
                                                          style="background-image:url('/assets/img/demo/avatars/avatar-g.png'); background-size: cover;"></span>
                                                </div>
                                                <div class="d-table-cell w-100 align-middle pl-2 pr-2">
                                                    <div class="text-truncate text-truncate-md">
                                                        Ali Amdaney
                                                        <small class="d-block font-italic fs-xs text-success">
                                                            Online
                                                        </small>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)"
                                               class="d-table w-100 px-2 py-2 text-dark hover-white"
                                               data-filter-tags="sarah mcbrook online">
                                                <div class="d-table-cell align-middle status status-success status-sm">
                                                    <span class="profile-image-md rounded-circle d-block"
                                                          style="background-image:url('/assets/img/demo/avatars/avatar-h.png'); background-size: cover;"></span>
                                                </div>
                                                <div class="d-table-cell w-100 align-middle pl-2 pr-2">
                                                    <div class="text-truncate text-truncate-md">
                                                        Sarah McBrook
                                                        <small class="d-block font-italic fs-xs text-success">
                                                            Online
                                                        </small>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)"
                                               class="d-table w-100 px-2 py-2 text-dark hover-white"
                                               data-filter-tags="ali amdaney offline">
                                                <div class="d-table-cell align-middle status status-sm">
                                                    <span class="profile-image-md rounded-circle d-block"
                                                          style="background-image:url('/assets/img/demo/avatars/avatar-a.png'); background-size: cover;"></span>
                                                </div>
                                                <div class="d-table-cell w-100 align-middle pl-2 pr-2">
                                                    <div class="text-truncate text-truncate-md">
                                                        oliver.kopyuv@gotbootstrap.com
                                                        <small class="d-block font-italic fs-xs">
                                                            Offline
                                                        </small>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)"
                                               class="d-table w-100 px-2 py-2 text-dark hover-white"
                                               data-filter-tags="ali amdaney busy">
                                                <div class="d-table-cell align-middle status status-danger status-sm">
                                                    <span class="profile-image-md rounded-circle d-block"
                                                          style="background-image:url('/assets/img/demo/avatars/avatar-j.png'); background-size: cover;"></span>
                                                </div>
                                                <div class="d-table-cell w-100 align-middle pl-2 pr-2">
                                                    <div class="text-truncate text-truncate-md">
                                                        oliver.kopyuv@gotbootstrap.com
                                                        <small class="d-block font-italic fs-xs text-danger">
                                                            Busy
                                                        </small>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)"
                                               class="d-table w-100 px-2 py-2 text-dark hover-white"
                                               data-filter-tags="ali amdaney offline">
                                                <div class="d-table-cell align-middle status status-sm">
                                                    <span class="profile-image-md rounded-circle d-block"
                                                          style="background-image:url('/assets/img/demo/avatars/avatar-c.png'); background-size: cover;"></span>
                                                </div>
                                                <div class="d-table-cell w-100 align-middle pl-2 pr-2">
                                                    <div class="text-truncate text-truncate-md">
                                                        oliver.kopyuv@gotbootstrap.com
                                                        <small class="d-block font-italic fs-xs">
                                                            Offline
                                                        </small>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)"
                                               class="d-table w-100 px-2 py-2 text-dark hover-white"
                                               data-filter-tags="ali amdaney inactive">
                                                <div class="d-table-cell align-middle">
                                                    <span class="profile-image-md rounded-circle d-block"
                                                          style="background-image:url('/assets/img/demo/avatars/avatar-m.png'); background-size: cover;"></span>
                                                </div>
                                                <div class="d-table-cell w-100 align-middle pl-2 pr-2">
                                                    <div class="text-truncate text-truncate-md">
                                                        +714651347790
                                                        <small class="d-block font-italic fs-xs opacity-50">
                                                            Missed Call
                                                        </small>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                    <div class="filter-message js-filter-message"></div>
                                </div>
                            </div>
                            <div>
                                <a class="fs-xl d-flex align-items-center p-3">
                                    <i class="fal fa-cogs"></i>
                                </a>
                            </div>
                        </div>
                        <!-- END msgr-list -->
                        <!-- BEGIN msgr -->
                        <div class="msgr d-flex h-100 flex-column bg-white">
                            <!-- BEGIN custom-scroll -->
                            <div class="custom-scroll flex-1 h-100">
                                <div id="chat_container"
                                     class="w-100 p-4">
                                    <!-- start .chat-segment -->
                                    <div class="chat-segment">
                                        <div class="time-stamp text-center mb-2 fw-400">
                                            Jun 19
                                        </div>
                                    </div>
                                    <!--  end .chat-segment -->
                                    <!-- start .chat-segment -->
                                    <div class="chat-segment chat-segment-sent">
                                        <div class="chat-message">
                                            <p>
                                                Hey Ching, did you get my files?
                                            </p>
                                        </div>
                                        <div class="text-right fw-300 text-muted mt-1 fs-xs">
                                            3:00 pm
                                        </div>
                                    </div>
                                    <!--  end .chat-segment -->
                                    <!-- start .chat-segment -->
                                    <div class="chat-segment chat-segment-get">
                                        <div class="chat-message">
                                            <p>
                                                Hi
                                            </p>
                                            <p>
                                                Sorry going through a busy time in office. Yes I analyzed the solution.
                                            </p>
                                            <p>
                                                It will require some resource, which I could not manage.
                                            </p>
                                        </div>
                                        <div class="fw-300 text-muted mt-1 fs-xs">
                                            3:24 pm
                                        </div>
                                    </div>
                                    <!--  end .chat-segment -->
                                    <!-- start .chat-segment -->
                                    <div class="chat-segment chat-segment-sent chat-start">
                                        <div class="chat-message">
                                            <p>
                                                Okay
                                            </p>
                                        </div>
                                    </div>
                                    <!--  end .chat-segment -->
                                    <!-- start .chat-segment -->
                                    <div class="chat-segment chat-segment-sent chat-end">
                                        <div class="chat-message">
                                            <p>
                                                Sending you some dough today, you can allocate the resources to this project.
                                            </p>
                                        </div>
                                        <div class="text-right fw-300 text-muted mt-1 fs-xs">
                                            3:26 pm
                                        </div>
                                    </div>
                                    <!--  end .chat-segment -->
                                    <!-- start .chat-segment -->
                                    <div class="chat-segment chat-segment-get chat-start">
                                        <div class="chat-message">
                                            <p>
                                                Perfect. Thanks a lot!
                                            </p>
                                        </div>
                                    </div>
                                    <!--  end .chat-segment -->
                                    <!-- start .chat-segment -->
                                    <div class="chat-segment chat-segment-get">
                                        <div class="chat-message">
                                            <p>
                                                I will have them ready by tonight.
                                            </p>
                                        </div>
                                    </div>
                                    <!--  end .chat-segment -->
                                    <!-- start .chat-segment -->
                                    <div class="chat-segment chat-segment-get chat-end">
                                        <div class="chat-message">
                                            <p>
                                                Cheers
                                            </p>
                                        </div>
                                    </div>
                                    <!--  end .chat-segment -->
                                    <!-- start .chat-segment for timestamp -->
                                    <div class="chat-segment">
                                        <div class="time-stamp text-center mb-2 fw-400">
                                            Jun 20
                                        </div>
                                    </div>
                                    <!--  end .chat-segment for timestamp -->
                                </div>
                            </div>
                            <!-- END custom-scroll  -->
                            <!-- BEGIN msgr__chatinput -->
                            <div class="d-flex flex-column">
                                <div class="border-faded border-right-0 border-bottom-0 border-left-0 flex-1 mr-3 ml-3 position-relative shadow-top">
                                    <div class="pt-3 pb-1 pr-0 pl-0 rounded-0"
                                         tabindex="-1">
                                        <div id="msgr_input"
                                             contenteditable="true"
                                             data-placeholder="Type your message here..."
                                             class="height-10 form-content-editable"></div>
                                    </div>
                                </div>
                                <div class="height-8 px-3 d-flex flex-row align-items-center flex-wrap flex-shrink-0">
                                    <a href="javascript:void(0);"
                                       class="btn btn-icon fs-xl width-1 mr-1"
                                       data-toggle="tooltip"
                                       data-original-title="More options"
                                       data-placement="top">
                                        <i class="fal fa-ellipsis-v-alt color-fusion-300"></i>
                                    </a>
                                    <a href="javascript:void(0);"
                                       class="btn btn-icon fs-xl mr-1"
                                       data-toggle="tooltip"
                                       data-original-title="Attach files"
                                       data-placement="top">
                                        <i class="fal fa-paperclip color-fusion-300"></i>
                                    </a>
                                    <a href="javascript:void(0);"
                                       class="btn btn-icon fs-xl mr-1"
                                       data-toggle="tooltip"
                                       data-original-title="Insert photo"
                                       data-placement="top">
                                        <i class="fal fa-camera color-fusion-300"></i>
                                    </a>
                                    <div class="ml-auto">
                                        <a href="javascript:void(0);"
                                           class="btn btn-info">Send</a>
                                    </div>
                                </div>
                            </div>
                            <!-- END msgr__chatinput -->
                        </div>
                        <!-- END msgr -->
                    </div>
                </div>
            </div>
        </div>
        <!-- END Messenger -->

        <cambiar-contrasenia-component @cerrarModalCambioContrasena="cerrarModalCambioContrasena($event)" />
    </div>
</template>

<script lang='ts'>
import { computed, defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import useAuth from '@/modules/auth/composables/useAuth';
// import useVentas from '@/modules/facturacion/composables/useVentas';

declare let window: any;

export default {
    components: {
        CambiarContraseniaComponent: defineAsyncComponent(() => import('@/modules/auth/components/CambiarContraseniaComponent.vue')),
    },  
    setup() {
        const store = useStore();
        const router = useRouter();
        const { email, fullNameUser, unicaSucursal, logout } = useAuth();
        
        const cambiarSucursal = () => {
            // Cerramos el menu de login.
            const html = document.querySelector('html');
            if (html) {
                html.click();
            }

            router.push({ name: 'seleccionar-sucursal' });
        }

        const abrirModalModificarContrasenia = () => {
            // Cerramos el menu de login.
            const html = document.querySelector('html');
            if (html) {
                html.click();
            }
            
            window.$('#modal-modificar-contrasenia').show();
            window.$('#contraseniaActual').focus();
        }

        const cerrarModalCambioContrasena = (cambioContrasena: any) => {
            if (cambioContrasena) {
                logout();
                router.push({ name: 'login' });
            }
        }

        const cerrarSesion = () => {
            router.push({ name: 'login' });
            logout();
        }

        return {
            email,
            fullNameUser,
            unicaSucursal,
            nombreSucursal: computed(() => store.getters['auth/getSucursal']),

            cerrarSesion,
            cambiarSucursal,
            abrirModalModificarContrasenia,
            cerrarModalCambioContrasena,
        };
    },
}
</script>

<style scoped>
@media (min-width: 992px) {
    .nav-function-top .page-header {
        margin-top: 0;
        height: 4.125rem;
        background-image: none;
        background-image: none;
        background-color: #fff;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        -webkit-box-shadow: 0px 0px 14px 0px rgb(86 61 124 / 13%);
        box-shadow: 0px 0px 14px 0px rgb(86 61 124 / 13%);
    }
}

.nav-regional {
    text-transform: uppercase;
    /* margin: 0; */
    color: #8268a8;
    /* padding: 1rem 2rem; */
    /* margin-top: 1.5rem; */
    font-size: 0.7rem;
    letter-spacing: 1px;
    font-weight: 500;
}
.mt-x {
    margin-top: 26px;
}
</style>
