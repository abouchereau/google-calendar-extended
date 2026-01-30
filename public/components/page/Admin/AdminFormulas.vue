<template> 
  <div class="container mb-5">
    <div class="row sticky-title bg-primary text-white">
      <div class="col">    
        <h5 class="p-2 text-center">Formules</h5>
      </div>
    </div>
    <div class="row">

      <div class="col col-md-12 col-sm-12 col-lg-8 offset-lg-2">
        <div class="card my-2">
          <div class="card-header">
            <select class="form-select" v-model="curCal" @change="loadFormulas">
              <option v-for="cal in cals" :value="cal.cal_id">{{ cal.summary }}</option>
            </select>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item" v-if="curCal">
              <div class="input-group">          
                  <input type="text" class="form-control text-secondary border-0" value="Nom Formule" />
                  <input type="text" class="form-control text-secondary border-0" value="Chargement (minutes)" />
                  <input type="text" class="form-control text-secondary border-0" value="Marge trajet (%)" />
                  <button class="btn invisible" type="button">Modifier</button>
              </div>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center" v-for="formula in formulas">
            <div class="input-group">       
                  <input type="text" class="form-control" v-model="formula.formule" />
                  <input type="number" class="form-control" v-model="formula.loading_time" />
                  <input type="number" class="form-control" v-model="formula.slow_pct" />
                  <input type="hidden" v-model="formula.id" />
                  <button class="btn btn-outline-primary" type="button" @click="editFormula(formula)">Enregistrer</button>
                  <button class="btn btn-outline-danger btn-sm hint--top hint--rounded" @click="deleteFormula(formula)" aria-label="Supprimer"><i class="fa-solid fa-trash"></i></button>
              </div>
            </li>
            <li class="list-group-item" v-if="curCal">   
              <div class="input-group">               
                <input type="text" class="form-control" placeholder="Nouvelle Formule" v-model="newFormula" />
                <button class="btn btn-outline-success" type="button" @click="addFormula">Ajouter</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <modal-info ref="modal-info"></modal-info>
</template>



<script>

export default {
  name: 'admin-formulas',
  inject: ['showSpinner', 'hideSpinner'],
  components: {
    'modal-info': Vue.defineAsyncComponent( ()=>loadModule('/components/block/ModalInfo.vue', Utils.loadModuleOptions()))
  },
  data() {
    return {
        cals: [],
        curCal: "",
        formulas: [],
        newFormula : ""       
    }
  },
  methods: {
    async loadFormulas() {
      this.showSpinner();
      this.formulas = await this.$main.getFormules(this.curCal);
      this.hideSpinner();
    },
    async addFormula() {      
      this.showSpinner();
      await this.$main.addFormule(this.newFormula, this.curCal);
      this.formulas = await this.$main.getFormules(this.curCal);
      this.hideSpinner();
      this.$refs['modal-info'].open("La formule "+this.newFormula+" a été ajoutée.");
      this.newFormula = "";
    },
    async editFormula(formula) {
      this.showSpinner();
      await this.$main.updateFormule(formula.id, formula.formule, formula.loading_time, formula.slow_pct);
      this.formulas = await this.$main.getFormules(this.curCal);
      this.hideSpinner();
      this.$refs['modal-info'].open("La formule "+formula.formule+" a été modifiée.");
    },
    async deleteFormula(formula) {
        if (confirm("Supprimer la formule "+formula.formule+" ?")) {
          let nomFormule = formula.formule;
          this.showSpinner();
          await this.$main.deleteFormule(formula.id);
          this.formulas = await this.$main.getFormules(this.curCal);
          this.hideSpinner();          
          this.$refs['modal-info'].open("La formule "+nomFormule+" a été supprimée.");
        }
    }   
  },
  async mounted() {
    this.showSpinner();
    this.cals = await this.$main.loadCals();
    this.hideSpinner();
  } 
}
</script>