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
        <tr v-for="person in persons" :key="person.person_id"  @click="e=>openPerson(person.person_id,e)" class="cursor-pointer">
          <td>{{ person.lastname }} {{ person.firstname }} {{ person.person_id }}</td>
          <td>{{ displayJobs(person.jobs) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <admin-footer></admin-footer>
</template>



<script>

export default {
  name: 'admin-person-list',
  inject: ['showSpinner', 'hideSpinner'],
  components: {
    'admin-footer': Vue.defineAsyncComponent( ()=>loadModule('/components/page/Admin/AdminFooter.vue', Utils.loadModuleOptions()))
  },
  data() {
    return {
        persons: []
    }
  },
  methods: {
    async openPerson(id,e) {
      this.showSpinner();
      if (e.ctrlKey || e.metaKey) {
        let routeData = this.$router.resolve({name:"admin-person-edit", params: {id}});
        window.open(routeData.href, '_blank');
      }
      else {
          this.$router.push({name:"admin-person-edit", params: {id}});
      }   
      this.hideSpinner();      
    },
    displayJobs(jobs) {
      const tab = JSON.parse(jobs);
      const tab2 = tab.map(item=>item.job+" ("+item.group+")");
      return tab2.join(", ");
    }
  },
  async mounted() {
    this.showSpinner();
    this.persons = await this.$main.getAllPersons();          
    this.hideSpinner();
  } 
}
</script>