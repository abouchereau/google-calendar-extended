<template> 
    <admin-header />    
    <div class="container-fluid">
      ADMIN
    </div> 
</template>

<script>
export default {
  name: 'admin',
  inject: ['showSpinner', 'hideSpinner'],
  components: {
     'admin-header': Vue.defineAsyncComponent( ()=>loadModule('./components/page/Admin/AdminHeader.vue', Utils.loadModuleOptions()))
  },
  data() {
    return {
    }
  }
}
</script>
