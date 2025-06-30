<template> 
  <div class="container my-4">
    <div class="row">

      <div class="col col-sm-12 col-lg-6 offset-lg-3">

        <h1 class="mb-4">Postes</h1>

        <div class="card my-2">
          <div class="card-header">
            <select class="form-select" v-model="curCal">
              <option v-for="cal in calList" :value="cal">{{ cal }}</option>
            </select>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between align-items-center"  v-for="job in cals[curCal]">
              <span>{{job.label}}</span>
              <span v-if="job.nb==0" ><button class="btn btn-danger btn-sm hint--top hint--rounded" @click="e=>deleteJob(job.id)" aria-label="Supprimer"><i class="fa-solid fa-trash"></i></button></span>
            </li>
            <li class="list-group-item">   
              <div class="input-group">               
                <input type="text" class="form-control" v-model="newJob">
                <button class="btn btn-outline-success"  type="button" @click="addJob">Ajouter</button>

              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>



<script>

export default {
  name: 'admin-postes',
  inject: ['showSpinner', 'hideSpinner'],
  data() {
    return {
        cals: {},
        curCal: "",
        calList: [],
        newJob: ""
    }
  },
  methods: {
    async addJob() {
      this.showSpinner();
      await this.$main.addJob(this.curCal, this.newJob);
      this.cals = await this.$main.getAllJobs(); 
      this.newJob = "";
      this.hideSpinner();      
    },
    async deleteJob(id) {
      const job = this.cals[this.curCal].find(a=>a.id==id);
      if (confirm("Veux-tu vraiment supprimer le poste "+job.label)) {
          this.showSpinner();
          await this.$main.deleteJob(id);
          this.cals = await this.$main.getAllJobs();  
          this.hideSpinner();
      }
    }
  },
  async mounted() {
    this.showSpinner();
    this.cals = await this.$main.getAllJobs();        
    this.calList = Object.keys(this.cals);
    this.curCal = this.calList[0];
    this.hideSpinner();
  } 
}
</script>