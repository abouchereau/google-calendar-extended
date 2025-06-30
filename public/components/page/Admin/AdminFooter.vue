<template>
    <footer class="footer">
      <div class="container-fluid">
        <div class="row">
            <div class="col">              
              <RouterLink v-if="this.$main.user.write" to="/" class="hint--top-right hint--rounded" aria-label="Accueil"><i class="fa-solid fa-home fa-big"></i></RouterLink>
            </div>
            <div class="col text-center">
              <RouterLink v-if="this.$main.user.write" to="/admin/person/list" class="hint--top hint--rounded" aria-label="Musiciens"><i class="fa-solid fa-male fa-big"></i></RouterLink>
              <RouterLink v-if="this.$main.user.write" to="/admin/job" class="hint--top hint--rounded"  aria-label="Postes"><i class="fa-solid fa-briefcase fa-big"></i></RouterLink>
              <RouterLink v-if="this.$main.user.write" to="/admin/formulas" class="hint--top hint--rounded"  aria-label="Formules"><i class="fa-solid fa-tag fa-big"></i></RouterLink>
            </div>
            <div class="col text-end align-middle"> 
              <span v-if="$main.user.username" class="small text-secondary" style="position:relative;bottom:4px;">{{ $main.user.username }}</span> 
              <a href="#" @click="logout" class="hint--top-left hint--rounded" aria-label="Déconnexion"><i class="fa-solid fa-right-from-bracket fa-big"></i></a>
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
