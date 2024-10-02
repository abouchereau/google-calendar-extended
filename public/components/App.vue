<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'app',
  components: {
    // 'log-midi-out': Vue.defineAsyncComponent( ()=>loadModule('./components/block/LogMidiOut.vue', Utils.loadModuleOptions())),
  },
  data() {
    return {
      appName: Const.APP_NAME,
    }
  },
  mounted() {
  }
}
</script>
<style>

</style>
