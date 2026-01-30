<template>
    <footer class="footer bg-primary">
      <div class="container-fluid">
        <div class="row">
            <div class="col text-center">              
              <RouterLink v-if="this.$main.user.write" to="/" class="no-underline">
                <i class="fa-solid fa-home fa-big"></i>
                <div class="small">Accueil</div>
              </RouterLink>
            </div>
            <div class="col text-center">
              <RouterLink v-if="this.$main.user.write" to="/admin/person/list" class="no-underline">
                <i class="fa-solid fa-male fa-big"></i>              
                <div class="small">Musiciens</div>
              </RouterLink>
            </div>
            <div class="col text-center">
              <RouterLink v-if="this.$main.user.write" to="/admin/job" class="no-underline">
                <i class="fa-solid fa-briefcase fa-big"></i>       
                <div class="small">Postes</div>              
              </RouterLink>
            </div>
            <div class="col text-center">
              <RouterLink v-if="this.$main.user.write" to="/admin/formulas" class="no-underline">
                <i class="fa-solid fa-tag fa-big"></i>     
                <div class="small">Formules</div>                      
              </RouterLink>
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
</template>

<script>
export default {
  name: 'admin-footer'
  
}
</script>
