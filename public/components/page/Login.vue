<template>
    <div>
      <input type="text" v-model="username" placeholder="Nom">
      <input type="password" v-model="password" placeholder="Mot de passe">
      <button @click="login">Login</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      login() {
          fetch(Const.BASE_API+'/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"username": this.username, "password": this.password}),
          }).then(response=> {     
            console.log(response);       
            if (response.ok) {
              response.json().then(data=>{
                
                console.log("DATA", data); 
                localStorage.setItem('token', data.token); 
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