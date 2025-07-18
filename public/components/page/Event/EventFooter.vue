
<template>
    <footer class="footer">
        <div class="container-fluid" style="height:100%;">
          <div class="row" style="height:100%;">
            <div class="col-4">              
              <RouterLink to="/"><i class="fa-solid fa-house fa-big"></i></RouterLink>
            </div>
            <div class="col-3 text-center align-middle">
                <button :disabled="!hasChanges" v-if="$main.user.write" type="button" class="btn btn-success btn-lg" @click="$emit('updateEvent')">Enregistrer</button>
            </div>
            <div class="col-5 text-end">
              <span v-if="$main.user.username" class="small text-secondary" style="position:relative;bottom:4px;">{{ $main.user.username }}</span> 
              <a href="#" @click="logout" class="hint--top-left hint--rounded" aria-label="Déconnexion"><i class="fa-solid fa-right-from-bracket fa-big"></i></a>           
            </div>
          </div>
        </div>
    </footer>
</template>


<script>
export default {
  name: 'event-footer',
  data() {
    return {
      hasChanges: false
    }
  },
  mounted() {
    document.addEventListener('input', (event) => {
      if (event.target.matches('input, textarea, select')) {
        this.hasChanges=true;
      }
    })

    document.addEventListener('change', (event) => {
      if (event.target.matches('input, textarea, select')) {
        this.hasChanges=true;
      }
    })
  }
}
</script>