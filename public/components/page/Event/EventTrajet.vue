<template>     
    <div class="card my-1">
        <div class="card-header">
            Trajet
        </div>
        
        <div class="card-body">                        
            <div class="row">
                <div class="col-xl-6 col-lg-8 col-sm-12 py-1">
                    <label>Adresse Départ</label>
                    <textarea rows="3" :disabled="!editable" id="adresseDepart" style="" v-model="$main.item.adresseDepart"  class="form-control" :key="refreshAdr" />  
                    <button :disabled="!editable" class="btn btn-outline-primary btn-sm" @click="set37e"><i class="fa-solid fa-arrow-up"></i> 37//</button>
                </div>
                <div class="col-xl-6 col-lg-8 col-sm-12 py-1">
                    <label>Adresse Arrivée</label>
                    <textarea rows="3" :disabled="!editable" id="adresseArrivee" v-model="$main.item.adresseArrivee"  class="form-control" />  
                </div>
            </div>                   
            <div class="row">
                <div class="col text-center">                    
                    <button class="btn btn-success" @click="computeTrajet"><i class="fa-solid fa-route"></i> Calculer Trajet</button>
                </div>
            </div>                      
            <div class="row">
                <div class="col-xl-3 offset-xl-3 col-lg-4 col-sm-12 py-1">                      
                    <label>Distance en km (calculée)</label>
                    <input disabled id="distanceKm" type="text" v-model="$main.item.distanceKm"  class="form-control" />              
                </div>
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">                      
                    <label>Durée Trajet (calculée)</label>
                    <input disabled id="dureeMinutes" type="text" v-model="$main.item.dureeMinutes"  class="form-control" />              
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
  name: 'event-trajet',
  inject: ['showSpinner', 'hideSpinner'],
  data() {
    return {
        editable: this.$route.name=="event-edit",
        refreshAdr: 0,
        travelMode: "",
        peage: true
    }
  } ,
  methods: {
    set37e() {
        this.$main.item.adresseDepart = "37e Parallèle\nAllée Roger Lecotte\n37100 Tours";
        this.refreshAdr++;
    },
    async computeTrajet() {
        if (this.$main.item.adresseDepart.trim() == "") {
            alert("Adresse de départ vide");
            return;
        }
        if (this.$main.item.adresseArrivee.trim() == "") {            
            alert("Adresse d'arrivée vide");
            return;
        }
        if (this.$main.item.vehicule.trim() == "" && this.$main.item.vehicule.trim() == "0") {            
            alert("Pas de véhicule sélectionné");
            return;
        }
        this.showSpinner();
        let route = await this.$main.calculateRoute();
        this.$main.item.distanceKm = route["distance"].toString();
        this.$main.item.dureeMinutes = Math.floor(route["duree"]/60)+"h"+("00"(route["duree"]%60)).slice(-2);
        this.refreshAdr++;
        this.hideSpinner();
    }
    
  }
}
</script>