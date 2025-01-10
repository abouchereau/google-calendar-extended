<template>     
    <div class="card my-1">
        <div class="card-header">
            Précisions
        </div>
        
        <div class="card-body">                        
            <div class="row">
                <div class="col-sm-12 py-1">
                    <textarea rows="3" :disabled="!editable" id="precisions" v-model="$main.item.precisions"  class="form-control" />  
                </div>
            </div>        
            </div>
        </div>
    </div>
</template>
<script>

export default {
  name: 'event-precision',
  data() {
    return {
        editable: this.$route.name=="event-edit"
    }
  } 
}
</script>