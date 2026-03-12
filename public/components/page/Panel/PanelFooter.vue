
<template>
    <footer class="footer bg-primary">
        <div class="container-fluid">
          <div class="row">
            <div class="col text-center">  
              <a href="#" @click="openModalFiltres" class="no-underline">
                <i class="fa-solid fa-filter fa-big"></i>
                <div class="small">Filtres</div>
              </a>
            </div>
            <div v-if="this.$main.user.write" class="col text-center">              
              <RouterLink to="/admin/person/list" class="no-underline">
                <i class="fa-solid fa-cogs fa-big"></i>
                <div class="small">Administration</div>
              </RouterLink>              
            </div>
            <div v-if="this.$main.user.write" class="col text-center">
              <a href="#" @click="refreshDates" class="no-underline">
                <i class="fa-solid fa-arrows-rotate fa-big"></i>
                <div class="small">Recharger</div>
              </a>
            </div>
            <div class="col text-center">
              <a href="#" @click="exportExcel" class="no-underline">
                <i class="fa-solid fa-table-list fa-big"></i>
                <div class="small">Export</div>
              </a>
            </div>
            <div class="col text-center" v-if="!isAppInstalled">  
              <a href="#" @click="installApp" class="no-underline">
                <i class="fa-solid fa-circle-down fa-big"></i>
                <div class="small">Installer l'appli</div>
              </a>
            </div>
            <div class="col text-center align-middle">              
              <a href="#" @click="logout" class="no-underline hint--top-left hint--rounded " :aria-label="'Déconnexion '+$main.user.username">
                <i class="fa-solid fa-right-from-bracket fa-big"></i>
                <div v-if="$main.user.username" class="small">Déconnexion</div> 
              </a>
            </div>
          </div>
        </div>   
    </footer>
    <modal-install ref="modal-install"></modal-install>
</template>


<script>
export default {
  name: 'panel-footer',
  inject: ['showSpinner', 'hideSpinner'],
  data() {
    return {
      deferredPrompt: null,
      isAppInstalled: true,
      isMobile: Utils.isMobile()
    }
  },
   mounted() {
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault(); 
        this.deferredPrompt = e;
      });
      window.addEventListener('appinstalled', () => {
        this.isAppInstalled = true;
      })
      this.checkIsAppInstalled();
  },
  components: {
   'modal-install': Vue.defineAsyncComponent( ()=>loadModule('/components/block/ModalInstall.vue', Utils.loadModuleOptions()))
  },
  methods: {
    refreshDates() {
      this.showSpinner();
      this.$main.refreshDates();
      this.hideSpinner();      
      this.$emit('onReload');
      return false;
    },
    logout() {
      this.$main.user.unregister();
      window.location.reload();
    },
    exportExcel() {
      this.$main.excel.exportExcel(this.$main.allEvents);
    },
    openModalFiltres() {
      this.$emit('onShowModalFiltres');
      return false;
    },
    checkIsAppInstalled() {
      if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true || window.Capacitor?.isNativePlatform()) {
        this.isAppInstalled = true;
      }
      else {
        this.isAppInstalled = false;
      }
    },
    async installApp() {              
      if (!this.deferredPrompt) {
        this.$refs["modal-install"].open();
      }
      else {
        this.deferredPrompt.prompt();
        const choice = await this.deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          console.log('Installée');
        } else {
          console.log('Refusée');
        }
        this.deferredPrompt = null;

      }
      return false;
    }

  }
}
</script>
<style>

</style>