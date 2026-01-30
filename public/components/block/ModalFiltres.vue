<template>
    <div class="modal fade" tabindex="-1" id="modal-filtres">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-light">
                    <h5 class="modal-title">Filtres</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">                   
                    <div class="form-group mb-2">
                        <label for="filterCal">Calendrier</label>
                        <select id="filterCal" class="form-control" v-model="$main.filter.cal">
                            <option value="">Tous</option>
                            <option v-for="(cal, index) in cals" :value="cal.id" :key="index" v-bind:style="{color:cal.color_front, backgroundColor:cal.color_back}">{{ cal.summary }}</option>
                        </select>                        
                    </div>           
                    <div class="form-group mb-3">
                        <label for="filterYear">Date</label>
                        <select id="filterYear" class="form-control" v-model="$main.filter.year">
                            <option value="-2">A venir</option>
                            <option v-for="n in (yearMax - yearMin +1)" :value="yearMax - n + 1">{{ yearMax - n +1 }}</option>                
                            <option value="-1">Tout</option>
                        </select>
                    </div>                           
                    <div class="form-check form-switch d-flex align-items-center text-start">
                        <input class="form-check-input" type="checkbox" role="switch" id="filterDisplayDeleted" v-model="$main.filter.displayDeleted">
                        <label class="form-check-label ms-2" for="filterDisplayDeleted"> Afficher les dates supprimées</label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="accept()">Valider</button>
                 </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'modal-filtres',
    inject: ['showSpinner', 'hideSpinner'],
    data() {
      return {
        modal: null,
        uniqueId: "modal-filtres",
        cals: [],
        appName: Const.APP_NAME,
        yearMin: Const.FIRST_YEAR,
        yearMax: Const.LAST_YEAR,
        monthList: Const.MONTH_LIST,
        
      }
    },
    async mounted() {
        this.showSpinner();        
        this.modal = new bootstrap.Modal(document.getElementById(this.uniqueId));
        this.cals = await this.$main.loadCals(); 
        this.hideSpinner();
        this.$emit('onChange');
        this.refresh++;
    },
    methods: {
        open() {
            this.modal.show();
        },
        accept() {
            this.modal.hide();
            this.$emit('onChange');
        }
    }
}
</script>
