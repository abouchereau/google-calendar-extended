<template> 
  <div class="container my-4">
    <h1 class="mb-4">Personnes</h1>
    <table class="table table-striped table-bordered table-hover">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Nom</th>
          <th scope="col">Postes (Groupes)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="person in persons" :key="person.person_id">
          <td>{{ person.lastname }} {{ person.firstname }} {{ person.person_id }}</td>
          <td>{{ person.jobs }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <admin-footer></admin-footer>
</template>



<script>

export default {
  name: 'admin-musiciens',
  inject: ['showSpinner', 'hideSpinner'],
  components: {
    'admin-footer': Vue.defineAsyncComponent( ()=>loadModule('/components/page/Admin/AdminFooter.vue', Utils.loadModuleOptions()))
  },
  data() {
    return {
        persons: []
    }
  },
  async mounted() {
    this.showSpinner();
    this.persons = await this.$main.getAllPersons();          
    this.hideSpinner();
  } 
}
</script>