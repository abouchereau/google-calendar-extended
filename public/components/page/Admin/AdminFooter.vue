<template>
    <footer class="footer">
      <div class="container-fluid">
        <div class="row" style="width:100%/*why?*/">                      
          <div class="col">     
            <RouterLink v-if="this.$main.user.write" to="/admin/musiciens" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-offset="10,20" title="Musiciens"><i class="fa-solid fa-male fa-big"></i></RouterLink>
            <RouterLink v-if="this.$main.user.write" to="/admin/postes" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-offset="10,20" title="Postes"><i class="fa-solid fa-briefcase fa-big"></i></RouterLink>
          </div>
        </div>
      </div> 
    </footer>  
</template>

<script>
export default {
  name: 'admin-footer',
  inject: ['showSpinner', 'hideSpinner'],
  mounted() {
    let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });
  }
}
</script>
