<template>     
    <div class="card my-1">
        <div class="card-header text-white bg-primary text-center">
            Transport
        </div>
        
        <div class="card-body">                        
            <div class="row">
                <div class="col-xl-4 col-lg-4 col-sm-12 py-1  my-auto">
                    <div class="form-check">
                        <input class="form-check-input" :disabled="!editable" type="checkbox" v-model="isCrafter" id="isCrafter" @change="majObj" />
                        <label class="form-check-label"for="isCrafter"> Crafter</label> 
                    </div>
                </div>
                <div class="col-xl-4 col-lg-4 col-sm-12 py-1" v-if="isCrafter">
                    <label>Départ Crafter</label>
                    <input type="datetime-local" id="dateDepartCrafter" v-model="$main.item.dateDepartCrafter" :disabled="!editable" class="form-control" />  
                </div>     
                <div class="col-xl-4 col-lg-4 col-sm-12 py-1" v-if="isCrafter">
                    <label>Retour Crafter</label>
                    <input type="datetime-local" id="dateRetourCrafter" v-model="$main.item.dateRetourCrafter" :disabled="!editable" class="form-control" />  
                </div>       
            </div>
            <div class="row">
                <div class="col-xl-4 col-lg-4 col-sm-12 py-1  my-auto">
                    <div class="form-check">
                        <input class="form-check-input" :disabled="!editable" type="checkbox" v-model="isVehPerso" id="isVehPerso" @change="majObj" />
                        <label class="form-check-label"for="isVehPerso"> Véhicule(s) Perso(s)</label> 
                    </div>
                </div>
                <div class="col-xl-8 col-lg-8 col-sm-12 py-1" v-if="isVehPerso">
                    <label>Véhicule(s) Perso(s)</label>
                    <input type="text" id="vehPerso" v-model="$main.item.vehiculesPerso" :disabled="!editable" class="form-control" />  
                </div>    
            </div>
            <div class="row">
                <div class="col-xl-4 col-lg-4 col-sm-12 py-1  my-auto">
                    <div class="form-check">
                        <input class="form-check-input" :disabled="!editable" type="checkbox" v-model="isLocation" id="isLocation" @change="majObj" />
                        <label class="form-check-label"for="isLocation"> Location</label> 
                    </div>
                </div>
                <div class="col-xl-8 col-lg-8 col-sm-12 py-1" v-if="isLocation">
                    <label>Location</label>
                    <input type="text" id="vehPerso" v-model="$main.item.location" :disabled="!editable" class="form-control" />  
                </div>    
            </div>
            <div class="row">
                <div class="col-xl-4 col-lg-4 col-sm-12 py-1  my-auto">
                    <div class="form-check">
                        <input class="form-check-input" :disabled="!editable" type="checkbox" v-model="isTrain" id="isTrain" @change="majObj" />
                        <label class="form-check-label"for="isTrain"> Train</label> 
                    </div>
                </div>
                <div class="col-xl-8 col-lg-8 col-sm-12 py-1" v-if="isTrain">
                    <label>Billets de train</label>
                    <input type="text" id="vehPerso" v-model="$main.item.train" :disabled="!editable" class="form-control" />  
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
        isCrafter: false,
        isVehPerso: false,
        isLocation: false,
        isTrain: false
    }
  },
  mounted() {
    if (this.$main.item.transports) {
        const transports = JSON.parse(this.$main.item.transports);
        this.isCrafter = transports.includes(1);
        this.isVehPerso = transports.includes(2);
        this.isLocation = transports.includes(3);
        this.isTrain = transports.includes(4);
    }
  },
  methods: {    
    majObj() {
        console.log("majObj")
        const transports = [];
        if (this.isCrafter) {
            transports.push(1);
        }       
        if (this.isVehPerso) {
            transports.push(2);
        }   
        if (this.isLocation) {
            transports.push(3);
        }    
        if (this.isTrain) {
            transports.push(4);
        }
        this.$main.item.transports = JSON.stringify(transports);
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