<template> 
    <panel-header @onChange="reloadList"/>    
    <div class="container-fluid">
      <table class="table table-hover table-bordered mt-4">
        <thead class="table-light">
          <tr class="text-center">            
            <th>Date</th>
            <th class="d-lg-table-cell d-none">Heure</th>
            <th>Groupe</th>
            <th>Formule</th>
            <th>Ville</th>
            <th class="d-lg-table-cell d-none">Equipe</th>
            <th class="d-lg-table-cell d-none">Trajet</th>
            <th>Transport</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.id" @click="e=>calNameFromId(item.id,e)" 
          :class="[statutClass(item.suiviDevisContrat), {'cursor-pointer': true}, {'border-harder':isNewMonth(item.date_start)}]">
            <td class="text-center" data-bs-toggle="tooltip" data-bs-placement="top" :title="statutText(item.suiviDevisContrat)" v-html="dayFullName(item.date_start)"></td>       
            <td class="d-lg-table-cell d-none">{{ item.heureDebutConcert }}</td>
            <td class="align-middle" v-bind:style="{color:item.color_front, backgroundColor:item.color_back}">{{ calAbrev(item.cal_summary) }}</td>
            <td class="align-middle"><span v-if="item.formule">{{ item.formule.substring(0,7) }}</span></td>
            <td class="align-middle">{{ item.ville }} <span v-if="item.codePostal">({{ item.codePostal.substring(0,2) }})</span> </td>       
            <td class="d-lg-table-cell d-none">
              <span v-for="musicien in item.equipe" :class="getTagClass(musicien.is_holder)">{{ musicien.name }}</span>
            </td>     
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
      lastMonth: -1,
      equipe: []
    }
  },

  methods: {
    getTagClass(is_holder) {
       if (is_holder == 1) {
        return "badge bg-success me-s";
       }
       else if (is_holder == -1) {
        return "badge bg-danger me-s";
       }
       else {
        return "badge bg-warning me-s";
       }
    },    
    isNewMonth(date) {
      const newMonth = date.getMonth();
      let isNew = this.lastMonth != -1 && newMonth != this.lastMonth;
      this.lastMonth = newMonth;
      return isNew;
    },
    async reloadList(e) {
      this.showSpinner();
      this.list = await this.$main.loadAllEvents();   
      this.list = this.list.filter(a=>a.sync_google!=0);
      this.list.forEach((a,i)=>{
        this.list[i]['equipe'] = [];
        if (a.equipeMusiciens) {          
           a.equipeMusiciens.split("||").forEach(a=>{
            a.split("|").forEach(b=> {
                const t = b.split(",");
                this.list[i]['equipe'].push({"name":t[2],"is_holder":t[3]});
            });   
          });
          console.log(this.list[i]['equipe']);
        }
      })
      this.$nextTick(() => {
        let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        });   
      });
     
      this.hideSpinner();
    },
    calNameFromId(id, e) {   
      if (e.ctrlKey || e.metaKey) {
        let routeData = "#";
        if (this.$main.user.write) {
          routeData = this.$router.resolve({name:"event-edit", params: {id}});
        }
        else {
          routeData = this.$router.resolve({name:"event-view", params: {id}});
        }
        window.open(routeData.href, '_blank');
      }
      else {
        if (this.$main.user.write) {
          this.$router.push({name:"event-edit", params: {id}});
        }
        else {
          this.$router.push({name:"event-view", params: {id}});
        }
      }              
    },
    calAbrev(cal) {
      const words = cal.split(' ');
      if (words.length > 2) {
          return words.map(word => word[0].toUpperCase()).join('');
      } else {
          return cal.slice(0, 3).toUpperCase();
      }
    },
    dayFullName(date) {
      let str = '<span class="lh-sm" style="font-size:85%">'+Const.DAY_LIST[(date.getDay()+6)%7].substring(0,3)+'</span>';
      str += '<span class="lh-sm" style="font-size:105%"> '+date.getDate()+'</span>';
      str += '<span class="lh-sm" style="font-size:85%"> '+Const.MONTH_LIST[date.getMonth()]+" "+((Const.LAST_YEAR-1)==date.getFullYear()?'':+date.getFullYear())+'</span>';
      return str;
    },
    dayCrafter(dateStr){
      let date = new Date(dateStr);
      let str = Const.DAY_LIST[(date.getDay()+6)%7]+" "+date.getDate()+" à "+date.getHours()+"h"+("0"+date.getMinutes()).slice(-2);
      return str;
    },    
    statutClass(key) {
      if (key != undefined && key>=1 && key<=4) {
        return "statut"+key;
      }
      return "";
    },
    statutText(key) {
      if (key != undefined && key>=1 && key<=4) {
        return Const.STATUTS[key];
      }
      return "";
    } 
  }
}
</script>
<style>
tr.border-harder {
  border-top-width:3px;
  }
.me-s {
  margin-right: 1px;
}
</style>