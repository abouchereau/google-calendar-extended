<template>     
    <div class="card my-1">
        <div class="card-header">
            Hébergement
        </div>
        
        <div class="card-body">                        
            <div class="row">
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Date Arrivée Hébergement</label>
                    <input :disabled="!editable" id="dateArriveeHebergement" type="datetime-local" v-model="$main.item.dateArriveeHebergement"  class="form-control" />
                </div>     
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Contact Hébergement</label>
                    <input :disabled="!editable" id="contactHebergement" type="text" v-model="$main.item.contactHebergement"  class="form-control" />
                </div>     
                <div class="col-xl-6 col-lg-8 col-sm-12 py-1">
                    <label>Adresse Hébergement</label>
                    <textarea rows="3" :disabled="!editable" id="adresseHebergement" v-model="$main.item.adresseHebergement"  class="form-control" />  
                </div>     
            </div>
        </div>
    </div>
</template>
<script>

export default {
  name: 'event-repas',
  data() {
    return {
        editable: this.$route.name=="event-edit"
    }
  } 
}
</script>