<template>     
    <div class="card my-1">
        <div class="card-header">
            Transport
        </div>
        
        <div class="card-body">                        
            <div class="row">
                <div class="col-xl-6 col-lg-8 col-sm-12 py-1">
                    <label>Véhicule</label>
                    <select class="form-select" id="vehicule" :disabled="!editable" v-model="$main.item.vehicule">
                        <option value="0"></option>
                        <option value="1">Crafter</option>
                        <option value="2">Location</option>
                        <option value="3">Véhicule Perso</option>
                    </select>  
                </div>         
                <div class="col-xl-12 col-lg-12 col-sm-12 py-1">                    
                    <label>Véhicules perso</label>
                    <multiselect :disabled="!editable" v-model="selectedVehiculesPerso" :options="listMusiciens" 
                    :multiple="true" :close-on-select="false" select-label="Ajouter" deselect-label="Enlever" @select="onSelectVehiculesPerso"></multiselect>
                </div>
                <div class="col-xl-6 col-lg-8 col-sm-12 py-1">
                    <label>Départ Crafter</label>
                    <input type="datetime-local" id="dateDepartCrafter" v-model="$main.item.dateDepartCrafter" :disabled="!editable"   class="form-control" />  
                </div>     
                <div class="col-xl-6 col-lg-8 col-sm-12 py-1">
                    <label>Retour Crafter</label>
                    <input type="datetime-local" id="dateRetourCrafter" v-model="$main.item.dateRetourCrafter" :disabled="!editable"   class="form-control" />  
                </div>          
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'event-transport',
  data() {
    return {
        editable: this.$route.name=="event-edit",
        selectedVehiculesPerso: [],
        listMusiciens: ["Gilles C.", "Maeva", "Paul G.", "Max B.","Mathieu D.", "Guillaume T.","Séb L.", "Mathieu B.", "JB Réhaud"]
    }
  }
}
</script>
<style>
select#vehicule:has(option[value="1"]:checked), select#vehicule option[value="1"] {
    background-color:#F9CB9C;
    color:#AC4A00;
}
select#vehicule:has(option[value="2"]:checked), select#vehicule option[value="2"] {
    background-color:#B7E1CD;
    color:#27798E;
}
select#vehicule:has(option[value="3"]:checked), select#vehicule option[value="3"]{
    background-color:#0000FF;
    color:#FFFFFF;
}
</style>