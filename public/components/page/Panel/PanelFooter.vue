
<template>
    <footer class="footer">
        <div class="container">
          <div class="row">
            <div class="col"></div>
            <div class="col text-center">
              <a href="#" @click="refreshDates" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-offset="10,20" title="Recharger les dates"><i class="fa-solid fa-arrows-rotate fa-big"></i></a>
              <RouterLink to="/" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-offset="10,20" title="Export Excel"><i class="fa-solid fa-table-list fa-big"></i></RouterLink>
            </div>
            <div class="col text-end">
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
  mounted() {
    let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });
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
      
    }
  }
}
</script>
<style>

</style>