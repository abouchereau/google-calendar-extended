<template>     
    <div class="card my-1">
        <div class="card-header">
            Précisions
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
  name: 'event-precision',
  data() {
    return {
        editable: this.$route.name=="event-edit"
    }
  } 
}
</script>