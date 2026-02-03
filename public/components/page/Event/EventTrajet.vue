<template>     
    <div class="card my-3">
        <div class="card-header text-white bg-primary text-center sticky-title ">
            Trajet
        </div>
        
        <div class="card-body">                        
            <div class="row">
                <div class="col-xl-6 col-lg-8 col-sm-12 py-1">
                    <label>Adresse Départ</label>  
                    <textarea rows="3" :disabled="!editable" id="adresseDepart" style="" v-model="$main.item.adresseDepart"  class="form-control" :key="refreshAdr" />  
                   
                </div>
                <div class="col-xl-6 col-lg-8 col-sm-12 py-1">
                    <label>Adresse Arrivée</label>
                    <textarea rows="3" :disabled="!editable" id="adresseArrivee" v-model="$main.item.adresseArrivee"  class="form-control" />  
                </div>
            </div>                   
            <div class="row">
                <div class="col-xl-4 offset-xl-4 col-lg-4 col-sm-12 py-1 text-center">                    
                    <button :disabled="!editable" class="btn btn-success" @click="computeTrajet"><i class="fa-solid fa-route"></i> Calculer Trajet</button>
                </div>
                <div class="col-xl-4 col-lg-4 col-sm-12 py-1 text-end">                    
                    <button class="btn btn-info" @click="goGoogleMaps" style="margin-left:5px;"><i class="fa-solid fa-map-location"></i> Google</button>
                </div>
            </div>                      
            <div class="row">
                <div class="col-xl-3 offset-xl-3 col-lg-4 col-sm-12 py-1">                      
                    <label>Distance Km (calculée)</label>
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
        travelMode: "",
        peage: true,
        refreshAdr: 0
    }
  },
  mounted() {
    if (!this.$main.item.adresseDepart) {
        this.$main.item.adresseDepart = "37e Parallèle\nAllée Roger Lecotte\n37100 Tours";
        this.refreshAdr++;
    }
    
  },
  methods: {
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
        this.$main.item.dureeMinutes = Math.floor(route["duree"]/60)+"h"+("00"+(route["duree"]%60)).slice(-2);
        this.refreshAdr++;
        this.$emit("targetHeureDepart");
        this.hideSpinner();
    },
    goGoogleMaps() {
        let url = "https://www.google.com/maps/search/?api=1&query="+this._adresseQuery();
        window.open(url);
    },
    goWaze() {
        let url = "https://waze.com/ul?q="+this._adresseQuery();
        window.open(url);
    },
    _adresseQuery() {
        return this.$main.item.adresseArrivee.replaceAll(" ","+").replaceAll("\n","+");
    }
    
  }
}
</script>