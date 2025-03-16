
<template>
    <footer class="footer">
        <div class="container-fluid" style="height:100%;">
          <div class="row" style="height:100%;">
            <div class="col">              
              <RouterLink to="/"><i class="fa-solid fa-house fa-big"></i></RouterLink>
            </div>
            <div class="col text-center align-middle">
                <button type="button" class="btn btn-success btn-lg" @click="$emit('updateEvent')">Enregistrer</button>
            </div>
            <div class="col text-end">
              <span v-if="$main.user.username" class="small text-secondary" style="position:relative;bottom:4px;">{{ $main.user.username }}</span> 
              <a href="#" @click="logout" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-offset="10,20" title="Déconnexion"><i class="fa-solid fa-right-from-bracket fa-big"></i></a>           
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