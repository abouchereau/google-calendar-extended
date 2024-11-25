<template>     
    <div class="card my-1">
        <div class="card-header">
            Repas
        </div>
        
        <div class="card-body">                        
            <div class="row">
                [TODO]
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