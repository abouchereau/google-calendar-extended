<template>    

  <form @submit.prevent="login">   
  <div class="container min-vh-dynamic d-flex flex-column">

      <!-- LOGO -->
      <div class="text-center mt-4">
          <h1 class="big-title">Dates Saugrenue</h1>
      </div>

      <!-- FORMULAIRE (centré verticalement) -->
      <div class="flex-grow-1 d-flex align-items-center">
          <form class="w-100 px-3">

              <div class="mb-3">
                  <input type="text" v-model="username" class="form-control form-control-lg" placeholder="Nom">
              </div>

              <div class="mb-3">
                  <input type="password" v-model="password" class="form-control form-control-lg" placeholder="Mot de passe">
              </div>
              <div v-if="displayInstallBtn()" class="text-center mt-3">
                  <a @click="installApp" href="#" class="text-muted small">
                      Installer l’application
                  </a>
              </div>

          </form>
      </div>

      <!-- BOUTON EN BAS -->
      <div class="mb-4 px-3">
          <button type="submit" class="btn btn-primary btn-lg w-100">
              Se connecter
          </button>
      </div>

  </div>
  <modal-install ref="modal-install"></modal-install>
</form>

</template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        version: Const.VERSION,
        deferredPrompt: null,
        isAppInstalled: true
      };
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
      login() {
          fetch(Const.BASE_API+'/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"username": this.username, "password": this.password}),
          }).then(response=> {         
            if (response.ok) {
              response.json().then(data=>{         
                this.$main.user.register(data);
                this.$router.push("/");
              });         
            } else {
              if (response.status == 401) {
                alert("Echec de l'authentification");
              }
              else {
                alert(response.statusText);
              }
            }
          });        

      },
      displayInstallBtn() {
        console.log("isAppInstalled",this.isAppInstalled);
        console.log("isMobile", Utils.isMobile());
        return !this.isAppInstalled && Utils.isMobile();
      },
      checkIsAppInstalled() {
        if (window.matchMedia('(display-mode: standalone)').matches
            || window.navigator.standalone === true
            || window.Capacitor?.isNativePlatform()) {
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
  };
  </script>