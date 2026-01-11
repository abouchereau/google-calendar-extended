<template> 
    <panel-header @onChange="reloadList"/>    
    <div class="container content">
      <div v-for="item in list">
        <div v-if="isNewMonth(item.date_start)" class="row">
          <div class="col-12 text-center my-3">
            <h5>{{ monthList[item.date_start.getMonth()] }} {{ item.date_start.getFullYear() }}</h5>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-1 text-center align-self-center p-0" 
            v-html="dayFullName(item.date_start, item.date_end)">
          </div>
          <div class="col-10 date-block cursor-pointer" v-bind:style="{borderColor:item.color_back,}" @click="e=>calNameFromId(item.id,e)">
            <div class="row">
                 <div class="col-8">
                  <span class="fw-light text-muted fs-xs">{{ item.cal_summary }}</span>
                  <span v-if="item.formule" class="ms-2 badge bg-secondary">{{ item.formule.substring(0,7) }}</span>
                 </div>
                 <div class="col-4 text-end">
                  <span class="badge bg-secondary" :class="statutClass(item.suiviDevisContrat, item.sync_google)" >{{ statutText(item.suiviDevisContrat) }}</span>
                 </div>
            </div>
            <div class="row">
              <div class="col-8">{{ item.ville }}</div>
              <div class="col-4 text-end"><span v-if="item.heureDepart" class="text-info"><i class="fa fa-clock"></i> <span style="font-size: 70%;">RDV</span> <b>{{ item.heureDepart }}</b></span></div>
            </div>
            <div class="row">
              <div class="col-12 text-center">
                <div v-for="musicien in item.equipe" :class="getTagClass(musicien.is_holder)" :aria-label="musicien.name" >
                  <img v-if="musicien.icon" :src="'/images/instru/'+musicien.icon" :alt="musicien.icon" />
                </div>
              </div>                  
            </div>
          </div>
          <div class="col-1 text-center align-self-center p-0">
            <panel-transports :item="item" />         
          </div>
        </div>
      </div>
      <!--
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

      </table>-->
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
      jobs: [],
      isMobile: true,
      monthList: Const.MONTH_LIST
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
      const classes = {"instru-container":true, "hint--top-right": true, "hint--rounded": true};
       if (is_holder == 1) {
        classes["bg-success-transparent"] = true;
        classes["border-success"] = true;
       }
       else if (is_holder == -1) {        
        classes["bg-danger-transparent"] = true;
        classes["border-danger"] = true;
       }
       else {
        classes["bg-warning-transparent"] = true
        classes["border-warning"] = true
       }
       return classes;
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
      const allJobs = await this.$main.getAllJobs();
      for(let name in allJobs) {
        this.jobs.push(...allJobs[name]);
      }
      if (!this.$main.filter.displayDeleted) {
        this.list = this.list.filter(a=>a.sync_google!=0 && a.suiviDevisContrat!=4);
      }      
      this.list.forEach((a,i)=>{
        this.list[i]['equipe'] = [];
        if (a.equipeMusiciens) {          
           a.equipeMusiciens.split("||").forEach(a=>{
            a.split("|").forEach(b=> {
                const t = b.split(",");
                const icon = this.jobs.find(j=>j.id==t[0])?.icon || null;
                this.list[i]['equipe'].push({"name": this.nameAbrev(t[2]), "is_holder": t[3], "icon": icon});
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
    dayFullName(date_start, date_end) {      
      if (date_end && date_end.getDate() != date_start.getDate()) {
          return '<div class="lh-sm" style="font-size:85%"><b>'+date_start.getDate()+'</b>-<b>'+date_end.getDate()+'</b></div>';          
      }
      else {
        return '<div class="lh-sm" style="font-size:85%">'+Const.DAY_LIST[(date_start.getDay()+6)%7].substring(0,3)+'</div><div class="lh-sm"><b>'+date_start.getDate()+'</b></div>';        
     }
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
.radius-top {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.instru-container {
  display: inline-block;
  margin: 2px; 
  height: 35px;
  width: 35px;
  border: 2px solid transparent;
  border-radius: 20px;
  position: relative;
}
.instru-container.bg-success-transparent {
  background-color: rgba(var(--bs-success-rgb), 0.2) !important;
}
.instru-container.bg-danger-transparent {
  background-color: rgba(var(--bs-danger-rgb), 0.2) !important;
}
.instru-container.bg-warning-transparent {
  background-color: rgba(var(--bs-warning-rgb), 0.2) !important;
}
.instru-container img {
  position: relative;
  top:2px;
  height: 24px;
}
@media (max-width: 992px) {
  .text-responsive {
    font-size: 0.85rem;
  }
}
</style>