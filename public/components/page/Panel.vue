<template> 
    <panel-header @onChange="reloadList"/>    
    <div class="container-fluid">
      <table class="table table-hover table-bordered mt-4">
        <thead class="table-light">
          <tr class="text-center">            
            <th>Date</th>
            <th>Heure</th>
            <th>Calendrier</th>
            <th>Evénement</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.id" @click="calNameFromId(item.event_id)" class="cursor-pointer">
            <td class="text-center" v-html="dayFullName(item.date_start)"></td>       
            <td>{{ item.hour }}</td>
            <td class="align-middle" v-bind:style="{color:item.color_front, backgroundColor:item.color_back}">{{ item.cal_summary }}</td>     
            <td class="align-middle">{{ item.summary }}</td>
          </tr>
        </tbody>

      </table>
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
      this.$router.push({name:"event", params: {id : id}});
    },
    dayFullName(date) {
      let str = '<div class="lh-sm" style="font-size:75%">'+Const.DAY_LIST[(date.getDay()+6)%7]+'</div>';
      str += '<div class="lh-sm" style="font-size:105%">'+date.getDate()+'</div>';
      if (this.$main.filter.month==-1 || this.$main.filter.year==-1) {
        str += '<div class="lh-sm" style="font-size:75%">'+Const.MONTH_LIST[date.getMonth()]+'</div>';
      }
      if (this.$main.filter.year==-1) {
        str += '<div class="lh-sm" style="font-size:75%">'+date.getFullYear()+'</div>';
      }
      return str;
    }
  }
}
</script>
