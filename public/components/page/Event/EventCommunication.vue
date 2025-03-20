<template>     
    <div class="card my-1">
        <div class="card-header text-white bg-primary text-center">
            Communication
        </div>
        
        <div class="card-body">                        
            <div class="row">
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Kit Com</label>
                    <select class="form-select" id="envoiKitCom" :disabled="!editable" v-model="$main.item.envoiKitCom">
                        <option value="0"></option>
                        <option value="1">à envoyer</option>
                        <option value="2">envoyé</option>                        
                    </select>  
                </div>                   
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Contact Com</label>
                    <input :disabled="!editable" id="contactCom" type="text" v-model="$main.item.contactCom" class="form-control" />
                </div> 
               <!-- <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Afficher sur le site ?</label>
                    <div class="form-check form-switch">
                        <input :disabled="!editable" id="afficherSite" type="checkbox" v-model="$main.item.afficherSite" true-value="O" false-value="N" class="form-check-input">                      
                    </div>
                </div>-->
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Lien</label>
                    <input :disabled="!editable" id="lien" type="url" v-model="$main.item.lien" class="form-control" />
                </div>
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Fréquentation</label>
                    <input :disabled="!editable" id="frequentation" type="number" v-model="$main.item.frequentation" step="10" min="0" class="form-control" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
  name: 'event-communication',
  data() {
    return {
        editable: this.$route.name=="event-edit"
    }
  } 
}
</script>
<style>
select#envoiKitCom:has(option[value="1"]:checked), select#envoiKitCom option[value="1"] {
    background-color:#F9CB9C;
    color:#AC4A00;
}
select#envoiKitCom:has(option[value="2"]:checked), select#envoiKitCom option[value="2"] {
    background-color:#B7E1CD;
    color:#27798E;
}
</style>