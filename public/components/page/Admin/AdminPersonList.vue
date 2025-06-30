<template> 
  <div class="container mb-4">
    <h1 class="mb-4 p-2 bg-white text-center">Personnes</h1>
    <table class="table table-striped table-bordered">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Nom</th>
          <th scope="col">Postes (Groupes)</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="person in persons" :key="person.person_id">
          <td>{{ person.firstname }} {{ person.lastname }} </td>
          <td class="p-0"><ul class="list-group" v-html="displayJobs(person.jobs)"></ul></td>
          <td>
            <div class="d-flex justify-content-between">
              <button title="Modifier" class="btn btn-primary btn-sm hint--top hint--rounded" @click="e=>openPerson(person.person_id,e)" aria-label="Modifier"><i class="fa-solid fa-edit"></i></button>
              <span class="invisible">x</span>
              <button title="Supprimer" class="btn btn-danger btn-sm hint--top hint--rounded" @click="e=>deletePerson(person.person_id)" aria-label="Supprimer"><i class="fa-solid fa-trash"></i></button>
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-center">
            <small>Ajouter une personne :</small>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <div class="input-group">            
              <input type="text" class="form-control" placeholder="Prénom" v-model="firstname" />
              <input type="text" class="form-control" placeholder="Nom" v-model="lastname" />
              <button class="btn btn-outline-success" type="button" @click="addPerson">Ajouter</button>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>



<script>

export default {
  name: 'admin-person-list',
  inject: ['showSpinner', 'hideSpinner'],
  data() {
    return {
        persons: [],
        firstname: "",
        lastname: ""
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
      const tab2 = jobs.map(item=>'<li class="list-group-item"><span class="'+(item.is_holder?'text-info':'text-warning')+'">'+item.job+" ("+item.group+")</span></li>");
      return tab2.join("");
    },
    async addPerson() {
      this.showSpinner();
      this.$main.addPerson(this.firstname, this.lastname);
      this.persons = await this.$main.getAllPersons();    
      this.firstname = "";
      this.lastname = "";
      this.hideSpinner();
    },
    async deletePerson(id) {      
      const person = this.persons.find(a=>a.person_id==id);
      if (confirm("Veux-tu vraiment supprimer "+person.firstname+" "+person.lastname)) {
        this.showSpinner();
        await this.$main.deletePerson(id);        
        this.persons = await this.$main.getAllPersons();  
        this.hideSpinner();
      }
    }
  },
  async mounted() {
    this.showSpinner();
    this.persons = await this.$main.getAllPersons();          
    this.hideSpinner();
  } 
}
</script>