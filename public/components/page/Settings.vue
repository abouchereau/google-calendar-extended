<template>
  <div>
    <div class="row">
      <div class="col-lg-8 offset-lg-2 col-sm-12">
        <midi-out-devices></midi-out-devices>
      </div>
      <div class="col-lg-12 mt-3">
        <mapping></mapping>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'settings',
  components: {
    'mapping': Vue.defineAsyncComponent(() => loadModule('./components/block/Mapping.vue', Utils.loadModuleOptions()))
  }
}
</script>