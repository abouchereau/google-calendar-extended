const { loadModule } = window['vue3-sfc-loader'];

const vueApp = Vue.createApp({
    components: {
        'app': Vue.defineAsyncComponent( () => loadModule('/components/App.vue', Utils.loadModuleOptions()) )
    }
});

const routes = [
    { name:"login", path: '/login', component: () => loadModule('/components/page/Login.vue', Utils.loadModuleOptions()), meta:{requiresAuth: false, requiresWrite: false}  },
    { name:"home", path: '/', component: () => loadModule('/components/page/Panel.vue', Utils.loadModuleOptions()), meta:{requiresAuth: true, requiresWrite: false}},
    { name:"event-view", path: '/event/view/:id', component: () => loadModule('/components/page/Event.vue', Utils.loadModuleOptions()), meta:{requiresAuth: true, requiresWrite: false}  },
    { name:"event-edit", path: '/event/edit/:id', component: () => loadModule('/components/page/Event.vue', Utils.loadModuleOptions()), meta:{requiresAuth: true, requiresWrite: true}  },
    { name:"admin-person-list", path: '/admin/person/list', component: () => loadModule('/components/page/Admin/Admin.vue', Utils.loadModuleOptions()), meta:{requiresAuth: true, requiresWrite: true}  },
    { name:"admin-person-edit", path: '/admin/person/edit/:id', component: () => loadModule('/components/page/Admin/Admin.vue', Utils.loadModuleOptions()), meta:{requiresAuth: true, requiresWrite: true}  },
    { name:"admin-job", path: '/admin/job', component: () => loadModule('/components/page/Admin/Admin.vue', Utils.loadModuleOptions()), meta:{requiresAuth: true, requiresWrite: true}  },
    { name:"admin-formulas", path: '/admin/formulas', component: () => loadModule('/components/page/Admin/Admin.vue', Utils.loadModuleOptions()), meta:{requiresAuth: true, requiresWrite: true}  },
    
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
});

let main = new Main();

router.beforeEach((to, from) => {
    
    alert("router.beforeEach");
    if (to.meta.requiresAuth && !main.user.isAuthenticated() && to.name !== 'login') {
      return { name: 'login'};       
    }
    if (to.meta.requiresWrite && !main.user.write) {
        return { name: 'home'};       
    }
  });

vueApp.use(router);
vueApp.component('multiselect', VueMultiselect.default)
vueApp.config.globalProperties.$main = main;
vueApp.mount('#app');