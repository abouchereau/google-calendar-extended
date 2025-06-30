<template>
    <admin-formulas v-if="$route.name=='admin-formulas'"></admin-formulas>
    <admin-job v-if="$route.name=='admin-job'"></admin-job>
    <admin-person-edit v-if="$route.name=='admin-person-edit'"></admin-person-edit>
    <admin-person-list v-if="$route.name=='admin-person-list'"></admin-person-list>
    <admin-footer></admin-footer>
</template>

<script>

export default {
  name: 'admin',
  components: {
    'admin-footer': Vue.defineAsyncComponent( ()=>loadModule('/components/page/Admin/AdminFooter.vue', Utils.loadModuleOptions())),
    'admin-formulas': Vue.defineAsyncComponent( ()=>loadModule('/components/page/Admin/AdminFormulas.vue', Utils.loadModuleOptions())),
    'admin-job': Vue.defineAsyncComponent( ()=>loadModule('/components/page/Admin/AdminJob.vue', Utils.loadModuleOptions())),
    'admin-person-edit': Vue.defineAsyncComponent( ()=>loadModule('/components/page/Admin/AdminPersonEdit.vue', Utils.loadModuleOptions())),
    'admin-person-list': Vue.defineAsyncComponent( ()=>loadModule('/components/page/Admin/AdminPersonList.vue', Utils.loadModuleOptions())),
  },
}
</script>