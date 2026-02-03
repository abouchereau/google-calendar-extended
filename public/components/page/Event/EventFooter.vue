
<template>
    <footer class="footer bg-primary">
        <div class="container-fluid">
          <div class="row">
            <div class="col text-center">              
              <RouterLink to="/" class="no-underline">
                <i class="fa-solid fa-house fa-big"></i>              
                <div class="small">Accueil</div>
              </RouterLink>
            </div>
            <div class="col text-center">
              <a v-if="$main.user.write" href="#" :class="{'no-underline':true, 'text-success': hasChanges, 'link-disabled': !hasChanges}" @click="$emit('updateEvent')">
                <i class="fa-solid fa-floppy-disk fa-big"></i>
                <div class="small">Enregistrer</div>
              </a>
            </div>
            <div class="col text-center">
              <a href="#" @click="logout" class="no-underline hint--top-left hint--rounded " :aria-label="'Déconnexion '+$main.user.username">
                <i class="fa-solid fa-right-from-bracket fa-big"></i>
                <div v-if="$main.user.username" class="small">Déconnexion</div> 
              </a>            
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