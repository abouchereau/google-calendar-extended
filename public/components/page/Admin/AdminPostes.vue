<template> 
  <div class="container my-4">
    <h1 class="mb-4">Postes</h1>


    <div class="card my-2" v-for="(jobs, cal) in cals">
      <div class="card-header">
        {{ cal }}
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item d-flex justify-content-between"  v-for="job in jobs">
          <span>{{job.label}}</span>
          <span>{{job.nb}}</span>
        </li>
        <li class="list-group-item">
          <i role="button" class="text-success fa-solid fa-plus fa-big"  data-bs-offset="10,20" data-bs-toggle="tooltip" data-bs-placement="top" title="Ajouter"></i>
          
          <div class="input-group">
            <input type="text" class="form-control" :id="cal">
            <div class="input-group-append">
              <button class="btn btn-success">Ajouter</button>
            </div>

          </div>
        </li>
      </ul>
    </div>
  </div>
  <admin-footer></admin-footer>
</template>



<script>

export default {
  name: 'admin-postes',
  inject: ['showSpinner', 'hideSpinner'],
  components: {
    'admin-footer': Vue.defineAsyncComponent( ()=>loadModule('/components/page/Admin/AdminFooter.vue', Utils.loadModuleOptions()))
  },
  data() {
    return {
        cals: {}
    }
  },
  async mounted() {
    this.showSpinner();
    this.cals = await this.$main.getAllJobs();          
    this.hideSpinner();
    let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });
  } 
}
</script>