<template>     
    <div class="card my-1">
        <div class="card-header">
            Horaires
        </div>
        
        <div class="card-body">                        
            <div class="row">
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Lieu RDV</label>
                    <input :disabled="!editable" id="lieuRdv" type="text" v-model="$main.item.lieuRdv"  class="form-control" />
                </div>
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Heure Début Concert</label>
                    <input :disabled="!editable" id="heureDebutConcert" type="time" step="300" v-model="$main.item.heureDebutConcert"  class="form-control" />
                </div>
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Heure Balances</label>
                    <input :disabled="!editable" id="heureBalance" type="time" step="300" v-model="$main.item.heureBalance"  class="form-control" />
                </div>
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Heure RDV Repas</label>
                    <input :disabled="!editable" id="heureRdvRepas" type="time" step="300" v-model="$main.item.heureRdvRepas"  class="form-control" />
                </div>
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Heure Arrivée</label>
                    <input :disabled="!editable" id="heureArrivee" type="time" step="300" v-model="$main.item.heureArrivee"  class="form-control" />
                </div>
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Heure Départ (calculée)</label>
                    <input disabled id="heureDepart" type="time" step="300" v-model="$main.item.heureDepart"  class="form-control" />
                </div>
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Heure Retour</label>
                    <input :disabled="!editable" id="heureRetour" type="time" step="300" v-model="$main.item.heureRetour"  class="form-control" />
                </div>

                <div class="col-xl-6 col-lg-8 col-sm-12 py-1">
                    <label>Infos Set</label>
                    <textarea :disabled="!editable" id="heureConcerts" v-model="$main.item.infoSets"  class="form-control" />  
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'event-horaires',
  data() {
    return {
        editable: this.$route.name=="event-edit"
    }
  } 
}
</script>
<style>
</style>