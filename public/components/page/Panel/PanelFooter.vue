
<template>
    <footer class="footer">
        <div class="container-fluid">
          <div class="row">
            <div class="col">              
              <RouterLink v-if="this.$main.user.write" to="/admin/person/list" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-offset="10,20" title="Administration"><i class="fa-solid fa-cogs fa-big"></i></RouterLink>
            </div>
            <div class="col text-center">
              <a href="#" v-if="this.$main.user.write" @click="refreshDates" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-offset="10,20" title="Recharger les dates"><i class="fa-solid fa-arrows-rotate fa-big"></i></a>
              <RouterLink class="inactive" to="/" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-offset="10,20" title="Export Excel"><i class="fa-solid fa-table-list fa-big"></i></RouterLink>
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
  name: 'panel-footer',
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
    }
  }
}
</script>
<style>

</style>