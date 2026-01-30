
<template>
    <footer class="footer bg-primary">
        <div class="container-fluid">
          <div class="row">
            <div class="col text-center">  
              <a href="#" @click="openModalFiltres" class="no-underline">
                <i class="fa-solid fa-filter fa-big"></i>
                <div class="small">Filtres</div>
              </a>
            </div>
            <div v-if="this.$main.user.write" class="col text-center">              
              <RouterLink to="/admin/person/list" class="no-underline">
                <i class="fa-solid fa-cogs fa-big"></i>
                <div class="small">Administration</div>
              </RouterLink>              
            </div>
            <div v-if="this.$main.user.write" class="col text-center">
              <a href="#" @click="refreshDates" class="no-underline">
                <i class="fa-solid fa-arrows-rotate fa-big"></i>
                <div class="small">Recharger</div>
              </a>
            </div>
            <div class="col text-center">
              <a href="#" @click="exportExcel" class="no-underline">
                <i class="fa-solid fa-table-list fa-big"></i>
                <div class="small">Export</div>
              </a>
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
    },
    exportExcel() {
      this.$main.excel.exportExcel(this.$main.allEvents);
    },
    openModalFiltres() {
      this.$emit('onShowModalFiltres');
    }
  }
}
</script>
<style>

</style>