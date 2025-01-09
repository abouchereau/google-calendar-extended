<template>     
    <div class="card my-1">
        <div class="card-header">
            Contacts
        </div>
        
        <div class="card-body">                        
            <div class="row">
                <div class="col-xl-6 col-lg-8 col-sm-12 py-1">
                    <label>Contact Accueil</label>
                    <textarea rows="3" :disabled="!editable" id="contactAccueil" v-model="$main.item.contactAccueil"  class="form-control" />  
                </div>
                <div class="col-xl-6 col-lg-8 col-sm-12 py-1">
                    <label>Contact Technique</label>
                    <textarea rows="3" :disabled="!editable" id="contactTechnique" v-model="$main.item.contactTechnique"  class="form-control" />  
                </div>
                <div class="col-xl-6 col-lg-8 col-sm-12 py-1">
                    <label>Contact Organisation</label>
                    <textarea rows="3" :disabled="!editable" id="contactOrga" v-model="$main.item.contactOrga"  class="form-control" />  
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
  name: 'event-contacts',
  data() {
    return {
        editable: this.$route.name=="event-edit"
    }
  } 
}
</script>