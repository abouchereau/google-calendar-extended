<template>
  <div class="row5">
    <div class="col-xl-4 offset-xl-4 col-lg-4 offset-lg-4 col-sm-12">
      <div class="card my-1">
        <div class="card-header d-flex justify-content-between">
            <span>Se connecter au calendrier</span>
            <span class="text-secondary">{{ version }}</span>
        </div>        
        
        <div class="card-body"> 
          <form @submit.prevent="login">                   
            <div class="row my-5">
              <div class="col">
                  <input type="text" v-model="username" placeholder="Nom" class="form-control">
              </div>
            </div>
            <div class="row my-5">
              <div class="col">
                  <input type="password" v-model="password" placeholder="Mot de passe" class="form-control">
              </div>
            </div>
            <div class="row my-5">
              <div class="col d-grid gap-2">
                <button type="submit" class="btn btn-success btn-lg btn-block">Se connecter</button>
              </div>
            </div>
          </form>
        </div>
      </div>   
    </div>
  </div>
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