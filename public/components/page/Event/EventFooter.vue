
<template>
    <footer class="footer">
        <div class="container" style="height:100%;">
          <div class="row" style="height:100%;">
            <div class="col"></div>
            <div class="col text-center align-middle">
                <button type="button" class="btn btn-success btn-lg" @click="$emit('updateEvent')">Enregistrer</button>
            </div>
            <div class="col text-end">
            
            </div>
          </div>
        </div>
    </footer>
</template>


<script>
export default {
  name: 'event-footer'  
}
</script>