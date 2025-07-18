<template>     
    <div class="card my-1">
        <div class="card-header text-white bg-primary">
            Horaires
        </div>
        
        <div class="card-body">                        
            <div class="row">
                <div class="col-xl-12 col-lg-12 col-sm-12 py-1">
                    <label>Précisions</label>
                    <textarea rows="2" :disabled="!editable" id="precisions" v-model="$main.item.precisions"  class="form-control" />  
                </div>
                <div class="col-xl-6 col-lg-8 col-sm-12 py-1">
                    <label>Lieu RDV</label>
                    <input :disabled="!editable" id="lieuRdv" type="text" v-model="$main.item.lieuRdv" class="form-control" />
                </div>
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Heure RDV <span class="hint--top hint--rounded" aria-label="Peut être calculée automatiquement en renseignant la formule, la durée de trajet et l'heure d'arrivée"><span class="fa fa-info-circle"></span></span></label>
                    <input :disabled="!editable" id="heureDepart" type="time" step="300" v-model="$main.item.heureDepart" class="form-control" :key="refreshKey" />
                </div>                
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1" @keyup.enter="$emit('targetHeureDepart')">
                    <label>Heure Arrivée</label>
                    <input :disabled="!editable" id="heureArrivee" type="time" step="300" v-model="$main.item.heureArrivee" class="form-control" @blur="$emit('targetHeureDepart')"/>
                </div>                
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Heure Balances</label>
                    <input :disabled="!editable" id="heureBalance" type="time" step="300" v-model="$main.item.heureBalance" class="form-control" />
                </div>                
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Heure RDV Repas</label>
                    <input :disabled="!editable" id="heureRdvRepas" type="time" step="300" v-model="$main.item.heureRdvRepas" class="form-control" />
                </div>
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Heure Début Concert</label>
                    <input :disabled="!editable" id="heureDebutConcert" type="time" step="300" v-model="$main.item.heureDebutConcert" class="form-control" />
                </div>                
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Heure Retour</label>
                    <input :disabled="!editable" id="heureRetour" type="time" step="300" v-model="$main.item.heureRetour" class="form-control" />
                </div>

               
            </div>
        </div>
    </div>
  <modal-route ref="modal-route" :item="$main.item" @acceptHeureDepart="onAcceptHeureDepart"></modal-route>
</template>

<script>

export default {
  name: 'event-horaires',
  emits: ['targetHeureDepart'],
  data() {
    return {
        editable: this.$route.name=="event-edit",
        refreshKey: 0
    }
  },  
  components: {
    'modal-route': Vue.defineAsyncComponent( ()=>loadModule('/components/block/ModalRoute.vue', Utils.loadModuleOptions()))
  },
  methods: {
    async computeHeureDepart() {        
        if (this.$main.item.heureArrivee && this.$main.item.formule && this.$main.item.dureeMinutes) {
            this.$refs['modal-route'].open();
        }
    },
    onAcceptHeureDepart(heureDepart) {
        this.$main.item.heureDepart = heureDepart;
        this.refreshKey++;
        setTimeout(()=>{document.getElementById('codePostal').dispatchEvent(new Event("input", { bubbles: true }));},100);
    }
  }

}
</script>
<style>
</style>