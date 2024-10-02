<template>
  <div>    
    <panel-header @onChange="reloadList"/>    
    <div class="container-fluid">
      <table class="table hovered-table">
        <thead>
          <tr>
            <th>Groupe</th>
            <th>Date</th>
            <th>Evénement</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.id">
            <td>{{ item.calName }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.summary }}</td>
          </tr>
        </tbody>

      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'panel',
  components: {
     'panel-header': Vue.defineAsyncComponent( ()=>loadModule('./components/block/PanelHeader.vue', Utils.loadModuleOptions()))
  },
  data() {
    return {
      appName: Const.APP_NAME,
      list: [],

    }
  },
  methods: {
   async reloadList(e) {
      this.list = await this.$main.loadAllEvents();
    },
    calNameFromId(id) {      
    }
  }
}
</script>
