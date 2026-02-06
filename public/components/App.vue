<template>    
    <spinner v-if="spinnerVisible"></spinner>
    <router-view></router-view>
</template>

<script>

export default {
  name: 'app',
  components: {
     'spinner': Vue.defineAsyncComponent( ()=>loadModule('/components/block/Spinner.vue', Utils.loadModuleOptions())),
  },
  data() {
    return {
      appName: Const.APP_NAME,
      spinnerVisible: false,

    }
  },
  mounted() {
    alert("app.vue");
  /*  this.$router.beforeEach((to, from, next) => {
        this.spinnerVisible = true;
        next();
    });*/
    this.$router.afterEach(() => {
       this.spinnerVisible = false;
    });

  },
  provide() {
    return {
      showSpinner: () => (this.spinnerVisible = true),
      hideSpinner: () => (this.spinnerVisible = false),
    };
  }
  
}
</script>
<style>

</style>
