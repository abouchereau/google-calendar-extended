<template>
    <footer class="footer">
      <div class="container-fluid">
        <div class="row">
            <div class="col">              
              <RouterLink v-if="this.$main.user.write" to="/" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-offset="10,20" title="Accueil"><i class="fa-solid fa-home fa-big"></i></RouterLink>
            </div>
            <div class="col text-center">
              <RouterLink v-if="this.$main.user.write" to="/admin/person/list" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-offset="10,20" title="Musiciens"><i class="fa-solid fa-male fa-big"></i></RouterLink>
              <RouterLink v-if="this.$main.user.write" to="/admin/job" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-offset="10,20" title="Postes"><i class="fa-solid fa-briefcase fa-big"></i></RouterLink>
              <RouterLink v-if="this.$main.user.write" to="/admin/formulas" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-offset="10,20" title="Formules"><i class="fa-solid fa-tag fa-big"></i></RouterLink>
            </div>
            <div class="col text-end align-middle"> 
              <span v-if="$main.user.username" class="small text-secondary" style="position:relative;bottom:4px;">{{ $main.user.username }}</span> 
              <a href="#" @click="logout" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-offset="10,20" title="Déconnexion"><i class="fa-solid fa-right-from-bracket fa-big"></i></a>
            </div>
          </div>       
      </div> 
    </footer>  
</template>

<script>
export default {
  name: 'admin-footer',
  inject: ['showSpinner', 'hideSpinner'],  
  data() {
    return {
      tooltipList: []
    }
  },
  mounted() {
    let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    this.tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });
  },
  unmounted() {    
    this.tooltipList.forEach(t=>t.dispose());
  },
}
</script>
