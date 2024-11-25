<template>     
    <div class="card my-1">
        <div class="card-header">
            Communication
        </div>
        
        <div class="card-body">                        
            <div class="row">
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Afficher sur le site ?</label>
                    <div class="form-check form-switch">
                        <input :disabled="!editable" id="payant" type="checkbox" v-model="$main.item.afficherSite" true-value="O" false-value="N" class="form-check-input">                      
                    </div>
                </div>
                [TODO]
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