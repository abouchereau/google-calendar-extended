
<template>
    <footer class="footer">
        <div class="container-fluid">
          <div class="row">
            <div class="col-4">              
              <RouterLink v-if="this.$main.user.write" to="/admin/person/list" class="hint--top-right hint--rounded" aria-label="Administration"><i class="fa-solid fa-cogs fa-big"></i></RouterLink>
            </div>
            <div class="col-3 text-center">
              <a href="#" v-if="this.$main.user.write" @click="refreshDates" class="hint--top hint--rounded" aria-label="Recharger les dates"><i class="fa-solid fa-arrows-rotate fa-big"></i></a>
              <RouterLink to="/" class="inactive hint--top-right hint--rounded" aria-label="Export Excel"><i class="fa-solid fa-table-list fa-big"></i></RouterLink>
            </div>
            <div class="col-5 text-end align-middle"> 
              <span v-if="$main.user.username" class="small text-secondary" style="position:relative;bottom:4px;">{{ $main.user.username }}</span> 
              <a href="#" @click="logout" class="hint--top-left hint--rounded" aria-label="Déconnexion"><i class="fa-solid fa-right-from-bracket fa-big"></i></a>
            </div>
          </div>
        </div>
    </footer>
</template>


<script>
export default {
  name: 'panel-footer',
  inject: ['showSpinner', 'hideSpinner'],
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