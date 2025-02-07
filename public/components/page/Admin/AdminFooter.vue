<template>
    <footer class="footer">
      <div class="container-fluid">
        <div class="row align-items-center" style="width:100%/*why?*/">            
            <RouterLink v-if="this.$main.user.write" to="/admin/musiciens" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-offset="10,20" title="Musiciens"><i class="fa-solid fa-male fa-big"></i></RouterLink>
            <RouterLink v-if="this.$main.user.write" to="/admin/postes" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-offset="10,20" title="Musiciens"><i class="fa-solid fa-briefcase fa-big"></i></RouterLink>
        </div>
      </div> 
    </footer>  
</template>

<script>
export default {
  name: 'admin-footer',
  inject: ['showSpinner', 'hideSpinner']
}
</script>
