<template>    

  <form @submit.prevent="login">   
  <div class="container min-vh-dynamic d-flex flex-column">

      <div class="text-center mt-4">
          <h1 class="big-title" :title="'Version '+version">Dates Saugrenue</h1>
      </div>

      <div class="flex-grow-1 d-flex align-items-center">
          <form class="w-100 px-3">

              <div class="mb-3">
                  <input type="text" v-model="username" class="form-control form-control-lg" placeholder="Nom">
              </div>

              <div class="mb-3">
                  <input type="password" v-model="password" class="form-control form-control-lg" placeholder="Mot de passe">
              </div>            

          </form>
      </div>

      <div class="mb-4 px-3">
          <button type="submit" class="btn btn-primary btn-lg w-100">
              Se connecter
          </button>
      </div>

  </div>
</form>

</template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        version: Const.VERSION

      };
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

      }    
    }
  };
  </script>