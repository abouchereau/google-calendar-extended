<template>     
    <div class="card my-1">
        <div class="card-header">
            Général
        </div>
        
        <div class="card-body">                        
            <div class="row">
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Date</label>
                    <input disabled id="date" type="text" v-model="$main.item.date_start"  class="form-control" />
                </div>
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Code Postal</label>
                    <input :disabled="!editable" id="codePostal" type="text" v-model="$main.item.codePostal" class="form-control" />
                </div>
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Ville</label>
                    <input :disabled="!editable" id="ville" type="text" v-model="$main.item.ville" class="form-control" />
                </div>
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Nom de l'événement</label>
                    <input disabled id="nomEvenement" type="text" v-model="$main.item.summary" class="form-control" />
                </div>
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Payant ?</label>
                    <div class="form-check form-switch">
                        <input :disabled="!editable" id="payant" type="checkbox" v-model="$main.item.payant" true-value="O" false-value="N" class="form-check-input">                      
                    </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Suivi Devis / Contrat</label>
                    <select class="form-select"  id="suiviDevisContrat" :disabled="!editable" v-model="$main.item.suiviDevisContrat">
                        <option value="0"></option>
                        <option value="1">Devis envoyé</option>
                        <option value="2">Contrat envoyé</option>
                        <option value="3">Confirmé</option>
                        <option value="4">Annulé/Supprimé</option>
                    </select>    
                </div>
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Date d'envoi</label>
                    <input :disabled="!editable" id="dateEnvoi" type="date" v-model="$main.item.dateEnvoi" class="form-control" />
                </div>
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Montant H.T.</label>
                    <div class="input-group">                                
                        <input :disabled="!editable" id="montant" type="text" v-model="$main.item.montant" class="form-control" />
                        <div class="input-group-append">
                            <span class="input-group-text">€</span>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Feuille de route envoyée ?</label>
                    <div class="form-check form-switch">
                        <input :disabled="!editable" id="feuilleDeRoute" true-value="O" false-value="N" v-model="$main.item.feuilleDeRoute" type="checkbox"  class="form-check-input">                      
                    </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Heure(s) concert(s)</label>
                    <textarea :disabled="!editable" id="heureConcerts" v-model="$main.item.heureConcerts"  class="form-control" />                      
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'event-general',
  data() {
    return {
        editable: this.$route.name=="event-edit"
    }
  } 
}
</script>
<style>
select#suiviDevisContrat:has(option[value="1"]:checked), select#suiviDevisContrat option[value="1"] {
    background-color:#FFE5A0;
    color:#7D3821;
}
select#suiviDevisContrat:has(option[value="2"]:checked), select#suiviDevisContrat option[value="2"] {
    background-color:#D4EDBC;
    color:#11825C;
}
select#suiviDevisContrat:has(option[value="3"]:checked), select#suiviDevisContrat option[value="3"]{
    background-color:#11734B;
    color:#D4EDBC;
}
select#suiviDevisContrat:has(option[value="4"]:checked), select#suiviDevisContrat option[value="4"] {
    background-color:#B10202;
    color:#FFCFC9;
}

</style>