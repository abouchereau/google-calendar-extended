<template> 
    <panel-header @onChange="reloadList"/>    
    <div class="container-fluid">
      <table class="table table-hover table-bordered mt-4">
        <thead class="table-light">
          <tr class="text-center">            
            <th>Date</th>
            <th class="d-lg-table-cell d-none">Heure</th>
            <th>Calendrier</th>
            <th>Evénement</th>
            <th class="d-lg-table-cell d-none">Trajet</th>
            <th class="d-lg-table-cell d-none">Crafter</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.id" @click="calNameFromId(item.event_id)" class="cursor-pointer">
            <td class="text-center" v-html="dayFullName(item.date_start)"></td>       
            <td class="d-lg-table-cell d-none">{{ item.heureDebutConcert }}</td>
            <td class="align-middle" v-bind:style="{color:item.color_front, backgroundColor:item.color_back}">{{ item.cal_summary }}</td>     
            <td class="align-middle">{{ item.summary }}</td>            
            <td class="d-lg-table-cell align-middle d-none">{{ item.dureeMinutes }}</td>   
            <td class="d-lg-table-cell align-middle d-none">
              <div v-if="item.vehicule!=null && item.vehicule==1">
                <div><i class="fa fa-square-caret-right text-warning"></i> <span v-if="item.dateDepartCrafter">{{ dayCrafter(item.dateDepartCrafter)}}</span><span class="text-danger" v-else>N.C.</span></div>
                <div><i class="fa fa-square-caret-left text-success"></i> <span  v-if="item.dateRetourCrafter">{{ dayCrafter(item.dateRetourCrafter)}}</span><span class="text-danger" v-else>N.C.</span></div>
              </div>
              <span v-else>Non</span>
              </td>
          </tr>
        </tbody>

      </table>
    </div>
    <panel-footer @onReload="reloadList"/>  
</template>

<script>
export default {
  name: 'panel',
  inject: ['showSpinner', 'hideSpinner'],
  components: {
     'panel-header': Vue.defineAsyncComponent( ()=>loadModule('./components/page/Panel/PanelHeader.vue', Utils.loadModuleOptions())),
     'panel-footer': Vue.defineAsyncComponent( ()=>loadModule('./components/page/Panel/PanelFooter.vue', Utils.loadModuleOptions()))
  },
  data() {
    return {
      appName: Const.APP_NAME,
      list: [],

    }
  },
  methods: {
    async reloadList(e) {
      this.showSpinner();
      this.list = await this.$main.loadAllEvents();
      this.hideSpinner();
    },
    calNameFromId(id) {      
      if (this.$main.user.write) {
        this.$router.push({name:"event-edit", params: {id : id}});
      }
      else {
        this.$router.push({name:"event-view", params: {id : id}});
      }
        
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
    },
    dayCrafter(dateStr){
      let date = new Date(dateStr);
      let str = Const.DAY_LIST[(date.getDay()+6)%7]+" "+date.getDate()+" à "+date.getUTCHours()+"h"+("0"+date.getUTCMinutes()).slice(-2);
      return str;
    }
  }
}
</script>
