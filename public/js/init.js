const { loadModule } = window['vue3-sfc-loader'];

const vueApp = Vue.createApp({
    components: {
        'navbar': Vue.defineAsyncComponent( ()=>loadModule('/components/block/Navbar.vue', Utils.loadModuleOptions())),
        'app': Vue.defineAsyncComponent( () => loadModule('/components/App.vue', Utils.loadModuleOptions()) )
    }
});

const routes = [
    { name:"login", path: '/login', component: () => loadModule('/components/page/Login.vue', Utils.loadModuleOptions()), meta:{requiresAuth: false}  },
    { name:"home", path: '/', component: () => loadModule('/components/page/Panel.vue', Utils.loadModuleOptions()), meta:{requiresAuth: true}},
    { name:"event-view", path: '/event/view/:id', component: () => loadModule('/components/page/Event.vue', Utils.loadModuleOptions()), meta:{requiresAuth: false}  },
    { name:"event-edit", path: '/event/edit/:id', component: () => loadModule('/components/page/Event.vue', Utils.loadModuleOptions()), meta:{requiresAuth: true}  },
    
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
});

let main = new Main();

router.beforeEach((to, from) => {
    if (to.meta.requiresAuth && !main.isAuthenticated() && to.name !== 'login') {
      console.log("-----------------------------------");
      return { name: 'login'};       
    } 
  });

vueApp.use(router);
vueApp.component('multiselect', VueMultiselect.default)
vueApp.config.globalProperties.$main = main;
vueApp.mount('#app');