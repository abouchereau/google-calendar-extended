<template> 
  <div class="container my-4">
    <div class="row">

      <div class="col col-sm-12 col-lg-6 offset-lg-3">

        <h1 class="mb-4">Personne</h1>

        <div class="card my-2">
          <div class="card-header">
            {{ person.firstname }} {{ person.lastname }}
          </div>      
          <div>
            <h4 class="text-center">Postes</h4>
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between align-items-center" v-for="item in person_jobs">
                <span>{{ item.job }} ({{ item.group }})</span>
                <span><a href="#" title="Déconnexion" class="btn btn-danger btn-sm" @click="deleteJob(item.id);return false;"><i class="fa-solid fa-trash"></i></a></span>
              </li>
              <li class="list-group-item">                 
                <div class="row">
                  <div class="col">                  
                    <div class="input-group">                       
                      <input type="radio" class="btn-check" name="is_holder" id="1" autocomplete="off" checked>
                      <label class="btn btn-outline-info rounded-start " for="1">Titulaire</label>    
                      <input type="radio" class="btn-check" name="is_holder" id="0" autocomplete="off">
                      <label class="btn btn-outline-info" for="0">Remplaçant</label>    
                    </div>
                  </div>
                  <div class="col">   

                    <div class="input-group">               
                      <select class="form-control" v-model="newJob">
                        <option v-for="job in jobs" :value="job.id">({{job.summary}}) {{ job.label }}</option>
                      </select>
                      <button class="btn btn-outline-success" type="button" @click="addJob">Ajouter</button>
                    </div>
                  </div>
                </div>
                
              </li>
            </ul>
          </div>    
        </div>
      </div>
    </div>
  </div>   
  <admin-footer></admin-footer>
</template>



<script>

export default {
  name: 'admin-person-edit',
  inject: ['showSpinner', 'hideSpinner'],
  components: {
    'admin-footer': Vue.defineAsyncComponent( ()=>loadModule('/components/page/Admin/AdminFooter.vue', Utils.loadModuleOptions()))
  },
  data() {
    return {
        person: {},
        person_jobs: [],
        jobs: [],
        newJob: -1
    }
  },
  methods: {
    isPersonLoaded() {
      return Object.keys(this.person).length>0;
    },
    deleteJob(id) {
      console.log(id);
    },
    addJob(id) {
      console.log(id);
    }
  },
  async mounted() {
    this.showSpinner();    
    const persons = await this.$main.getAllPersons(); 
    this.person = persons.find(e=>e.person_id==this.$route.params.id);
    this.person_jobs = JSON.parse(this.person.jobs);
    this.jobs = await this.$main.getAllJobs(true);
    this.hideSpinner();
  } 
}
</script>