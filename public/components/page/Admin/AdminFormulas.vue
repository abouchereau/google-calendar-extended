<template> 
  <div class="container my-4">
    <div class="row">

      <div class="col col-md-12 col-sm-12 col-lg-8 offset-lg-2">

        <h1 class="mb-4">Formules</h1>

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
                  <form onsubmit="return false">
                    <input type="text" class="form-control" v-model="formula.formule" />
                    <input type="number" class="form-control" v-model="formula.loading_time" />
                    <input type="number" class="form-control" v-model="formula.slow_pct" />
                    <input type="hidden" v-model="formula.id" />
                    <button class="btn btn-outline-primary" type="button" @click="editFormula(formula)">Enregistrer</button>
                  </form>   
                  <button class="btn btn-outline-danger btn-sm" @click="deleteFormula(formula.id)"><i class="fa-solid fa-trash"></i></button>
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
  <admin-footer></admin-footer>
</template>



<script>

export default {
  name: 'admin-formulas',
  inject: ['showSpinner', 'hideSpinner'],
  components: {
    'admin-footer': Vue.defineAsyncComponent( ()=>loadModule('/components/page/Admin/AdminFooter.vue', Utils.loadModuleOptions()))
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
      console.log("Add", this.newFormula);
    },
    async editFormula(formula) {
      console.log("edit", formula);
    },
    async deleteFormula(id) {
      console.log("delete", id);
    }   
  },
  async mounted() {
    this.showSpinner();
    this.cals = await this.$main.loadCals();
    this.hideSpinner();
    let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });
  } 
}
</script>