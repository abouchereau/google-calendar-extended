<template> 
  <div class="container my-4">
    <div class="row">
      <div class="col col-sm-12 col-lg-3">
        <RouterLink to="/admin/person/list" class="btn btn-success btn-lg"><span class="fa fa-arrow-left fa-big"></span></RouterLink>
      </div>
      <div class="col col-sm-12 col-lg-6">
        <div class="card my-2">
          <div class="card-header">
            {{ person.firstname }} {{ person.lastname }}
          </div>      
          <div>
            <h4 class="text-center">Postes</h4>
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between align-items-center" v-for="item in person_jobs">
                <span :class="{'text-info': item.is_holder==1,'text-warning': item.is_holder==0}">{{ item.job }} ({{ item.group }})</span>
                <span><a href="#" title="Déconnexion" class="btn btn-danger btn-sm" @click="deleteJob(item.id)"><i class="fa-solid fa-trash"></i></a></span>
              </li>
              <li class="list-group-item"> 
                <div class="row align-items-center pt-3 pb-1">
                  <div class="col text-center"><small>Ajouter un poste :</small></div>
                </div>                
                <div class="row align-items-center pb-3">
                  <div class="col">                  
                    <div class="input-group text-center">                       
                      <input type="radio" v-model="isHolder" class="btn-check" name="is_holder" id="1" value="1" autocomplete="off">
                      <label class="btn btn-outline-info rounded-start " for="1">Titulaire</label>    
                      <input type="radio" v-model="isHolder" class="btn-check" name="is_holder" id="0" value="0" autocomplete="off">
                      <label class="btn btn-outline-warning" for="0">Remplaçant</label>    
                    </div>
                  </div>
                  <div class="col">   
                    <div class="input-group">               
                      <select class="form-control" v-model="newJob">
                        <option value="-1" disabled>Choisir un poste</option>
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
        newJob: "-1",
        isHolder: "1"
    }
  },
  methods: {
    isPersonLoaded() {
      return Object.keys(this.person).length>0;
    },
    async deleteJob(id) {
      this.showSpinner();   
      await this.$main.deleteJobPerson(id);
      await this.loadJobPerson();
      this.hideSpinner();
      return false;
    },
    async addJob() {
      this.showSpinner();   
      await this.$main.addJobPerson(this.$route.params.id, this.newJob, this.isHolder);
      await this.loadJobPerson();
      this.hideSpinner();
    },
    async loadJobPerson() {
      const persons = await this.$main.getAllPersons(); 
      this.person = persons.find(e=>e.person_id==this.$route.params.id);
      this.person_jobs = JSON.parse(this.person.jobs);
      this.jobs = await this.$main.getAllJobs(true);
    }
  },
  async mounted() {
    this.showSpinner();    
    await this.loadJobPerson();
    this.hideSpinner();
  } 
}
</script>