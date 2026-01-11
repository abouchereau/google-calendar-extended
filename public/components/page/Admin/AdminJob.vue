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
              <span>
                <img v-if="job.icon" :src="'/images/instru/'+job.icon" :alt="job.icon" style="height: 30px;" />
                <span>{{job.label}}</span>
              </span>
              <span v-if="job.nb==0" ><button class="btn btn-danger btn-sm hint--top hint--rounded" @click="e=>deleteJob(job.id)" aria-label="Supprimer"><i class="fa-solid fa-trash"></i></button></span>
            </li>
            <li class="list-group-item">   
              <div class="input-group">               
                <input type="text" class="form-control" placeholder="Nom de l'instrument" v-model="newJob">
                <button class="btn btn-outline-secondary" @click="e=>modal.show()" type="button" title="Choisir une icône" style="width:190px;">
                  <img v-if="choosenIcon" :src="'/images/instru/'+choosenIcon" 
                       alt="Icône" title="Choisir une icône" style="height:32px;" />
                       <div v-else>                        
                          <span class="fa-solid fa-image fa-lg text-secondary" 
                                title="Choisir une icône" 
                                style="cursor:pointer;" ></span> Choisir une icône
                       </div>
                </button>
                <button class="btn btn-outline-success"  type="button" @click="addJob">Ajouter</button>

              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  

    <div class="modal modal-lg fade" tabindex="-1" id="modalIcons">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-info">
                  <h5 class="modal-title text-white">Choisir une icône</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="row">
                  <div v-for="icon in iconList" class="col mb-4">
                    <div :class="{'text-center':true, 'p-1': true, 'border-3':true, 'border': true, 'border-light': icon!=choosenIcon, 'border-success': icon==choosenIcon, 'rounded':true}" @click="choosenIcon=icon; modal.hide();">
                      <img :src="'/images/instru/'+icon" :alt="icon"  :title="icon" class="mb-2 img-instru" />
                    </div>                        
                  </div>
                </div>
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
        iconList: [],
        choosenIcon: null,
        newJob: "",
        modal: null
    }
  },
  methods: {
    async addJob() {
      this.showSpinner();
      await this.$main.addJob(this.curCal, this.newJob, this.choosenIcon);
      this.cals = await this.$main.getAllJobs(); 
      this.newJob = "";
      this.choosenIcon = null;
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
    this.iconList = await this.$main.getAllIcons();     
    this.calList = Object.keys(this.cals);
    this.curCal = this.calList[0];
    this.modal = new bootstrap.Modal(document.getElementById("modalIcons"));
    this.hideSpinner();
  } 
}
</script>

<style>
.img-instru {
  height: 64px;
  cursor: pointer;
  transition: transform 0.2s;
}
.img-instru:hover {
  transform: scale(1.1);
}
</style>