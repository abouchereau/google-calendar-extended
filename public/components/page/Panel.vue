<template> 
    <panel-header @onChange="reloadList"/>    
    <div class="container-fluid content">
      <table class="table table-hover table-bordered mt-4">
        <thead class="table-light">
          <tr class="text-center">            
            <th>Date</th>
            <th v-if="$main.filter.cal==''">Groupe</th>
            <th>Transport</th>
            <th class="d-lg-table-cell d-none">RDV</th>
            <th v-if="!isMobile || $main.filter.cal!=''">Formule</th>
            <th>Ville</th>
            <th>Equipe</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.id" @click="e=>calNameFromId(item.id,e)" 
          :class="[statutClass(item.suiviDevisContrat, item.sync_google), {'cursor-pointer': true}, {'border-harder':isNewMonth(item.date_start)}]">
            <td class="text-center text-responsive"  v-html="dayFullName(item.date_start, item.date_end, item.suiviDevisContrat)"></td>    
            <td v-if="$main.filter.cal==''" class="align-middle text-responsive" v-bind:style="{color:item.color_front, backgroundColor:item.color_back}">
              <div>{{ calAbrev(item.cal_summary) }}</div>
              <div  v-if="item.formule && isMobile"><span class="badge bg-info">{{ item.formule.substring(0,7) }}</span></div>
            </td>
            <td class="p-0 align-middle text-responsive">
              <panel-transports :item="item" />             
            </td>
            <td class="d-lg-table-cell align-middle d-none">{{ item.heureDepart }}</td>   
            <td class="align-middle" v-if="!isMobile || $main.filter.cal!=''">
              <span class="badge bg-info" v-if="item.formule">{{ item.formule.substring(0,7) }}</span>
            </td>
            <td class="align-middle text-responsive">{{ item.ville }} <span v-if="item.codePostal">({{ item.codePostal.substring(0,2) }})</span> </td>       
            <td>
              <span v-for="musicien in item.equipe" :class="getTagClass(musicien.is_holder)">{{ musicien.name }}</span>
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
     'panel-footer': Vue.defineAsyncComponent( ()=>loadModule('./components/page/Panel/PanelFooter.vue', Utils.loadModuleOptions())),
     'panel-transports': Vue.defineAsyncComponent( ()=>loadModule('/components/page/Panel/PanelTransports.vue', Utils.loadModuleOptions())),
  },
  data() {
    return {
      appName: Const.APP_NAME,
      list: [],
      lastMonth: -1,
      equipe: [],      
      isMobile: true
    }
  },
  mounted() {    
    this.updateScreenSize();
    window.addEventListener('resize', this.updateScreenSize);
  },
  
  methods: {    
    updateScreenSize() {
        this.isMobile = window.innerWidth < 576;
    },
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
      if (!this.$main.filter.displayDeleted) {
        this.list = this.list.filter(a=>a.sync_google!=0 && a.suiviDevisContrat!=4);
      }      
      this.list.forEach((a,i)=>{
        this.list[i]['equipe'] = [];
        if (a.equipeMusiciens) {          
           a.equipeMusiciens.split("||").forEach(a=>{
            a.split("|").forEach(b=> {
                const t = b.split(",");
                this.list[i]['equipe'].push({"name":this.nameAbrev(t[2]),"is_holder":t[3]});
            });   
          });          
        }
      })
      
     
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
    nameAbrev(name) {
      if (!name) {
        return "";
      }
      const words = name.split(' ');
      return words[0]+(words.length>1?" "+words[words.length-1].substring(0,1)+".":"");
    },
    dayFullName(date_start, date_end, suiviContrat) {
      let str = '<div aria-label="'+this.statutText(suiviContrat)+'" class="hint--right hint--rounded" style="height:100%">';
      if (date_end && date_end.getDate() != date_start.getDate()) {
        if (date_end.getMonth() == date_start.getMonth()) {
          str += '<span class="lh-sm" style="font-size:105%">'+date_start.getDate()+' - '+date_end.getDate()+'</span>';          
          str += '<span class="lh-sm" style="font-size:85%"> '+Const.MONTH_LIST[date_start.getMonth()]+"</span>";
        }
        else {          
          str += '<span class="lh-sm" style="font-size:105%">'+date_start.getDate()+'</span>';          
          str += '<span class="lh-sm" style="font-size:85%"> '+Const.MONTH_LIST[date_start.getMonth()]+"</span>";
          str += ' - <span class="lh-sm" style="font-size:105%">'+date_end.getDate()+'</span>';          
          str += '<span class="lh-sm" style="font-size:85%"> '+Const.MONTH_LIST[date_end.getMonth()]+"</span>";
        }
      }
      else {
        str += '<span class="lh-sm" style="font-size:85%">'+Const.DAY_LIST[(date_start.getDay()+6)%7].substring(0,3)+'</span>';
        str += '<span class="lh-sm" style="font-size:105%"> '+date_start.getDate()+'</span>';        
        str += '<span class="lh-sm" style="font-size:85%"> '+Const.MONTH_LIST[date_start.getMonth()]+"</span>";
      }
      if ((Const.LAST_YEAR-1) != date_start.getFullYear()) {
        str += '<span class="lh-sm" style="font-size:85%"> '+date_start.getFullYear()+"</span>";
      }
      str += '</div>';
      return str;
    },

    statutClass(key, sync_google) {
      if (sync_google == 0) {
        key = 4;
      }
      if (key != undefined && key>=1 && key<=5) {
        return "statut"+key;
      }
      return "";
    },
    statutText(key) {
      if (key != undefined && key>=1 && key<=5) {
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
@media (max-width: 992px) {
  .text-responsive {
    font-size: 0.85rem;
  }
}
</style>