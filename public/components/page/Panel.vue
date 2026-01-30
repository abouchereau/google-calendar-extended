<template> 
    <div class="container content">
      <section v-for="monthList, month in list">        
        <div class="row mb-4 text-bg-primary sticky-title">
          <div class="col-12 text-center my-2">
            <h5 style="font-variant:small-caps">{{ month }}</h5>
          </div>
        </div>

        <div class="row mb-4" v-for="item in monthList" :key="item.id">

          <div :class="'col-1 d-flex align-items-center text-center p-0 hint--top-right hint--rounded '+statutClass(item.suiviDevisContrat, item.sync_google)" :aria-label="statutText(item.suiviDevisContrat)">
            <div class="w-100 text-center" v-html="dayFullName(item.date_start, item.date_end)"></div>
          </div> 

          <div class="col-11 date-block" @click="e=>calNameFromId(item.id,e)">

            <div class="row">

              <div class="col-auto">

                <div class="row mb-1">
                    <div class="col-12">
                      <span class="fw-light fs-xs badge"  v-bind:style="{backgroundColor:item.color_back,color:item.color_front}">{{ item.cal_summary }}</span>
                      <span v-if="item.formule" class="ms-2 badge bg-secondary">{{ item.formule.substring(0,7) }}</span>
                    </div>
                </div>

                <div class="row mb-1">
                  <div class="col-12">            
                      <h6><b>{{ item.ville }}</b></h6>
                  </div>  
                </div>  

              </div>

              
              <div class="col text-end">
                <div class="row" v-if="item.heureDepart && !item.isPast">
                  <div class="col text-danger">
                    <i class="fa fa-clock"></i> <span style="font-size: 70%;">RDV</span> <b>{{ item.heureDepart }}</b>
                  </div>
                </div>
                <panel-transports :item="item" />     
              </div>
             
            </div>

            <div class="row mt-1" v-if="item.equipe">
              <div class="col-12 text-end">
                <div v-for="musicien in item.equipe" :class="getTagClass(musicien.is_holder)" :aria-label="musicien.name" >
                  <img v-if="musicien.icon" :src="'/images/instru/'+musicien.icon" :alt="musicien.icon" />
                </div>
              </div>                  
            </div>

          </div>

        </div>
      </section>
    
    </div>
    <panel-footer @onReload="reloadList" @onShowModalFiltres="openModalFiltres" />
    <modal-filtres ref="modal-filtres" @onChange="reloadList"></modal-filtres> 
</template>

<script>
export default {
  name: 'panel',
  inject: ['showSpinner', 'hideSpinner'],
  components: {
     'panel-header': Vue.defineAsyncComponent( ()=>loadModule('./components/page/Panel/PanelHeader.vue', Utils.loadModuleOptions())),
     'panel-footer': Vue.defineAsyncComponent( ()=>loadModule('./components/page/Panel/PanelFooter.vue', Utils.loadModuleOptions())),
     'panel-transports': Vue.defineAsyncComponent( ()=>loadModule('/components/page/Panel/PanelTransports.vue', Utils.loadModuleOptions())),
     'modal-filtres': Vue.defineAsyncComponent( ()=>loadModule('/components/block/ModalFiltres.vue', Utils.loadModuleOptions())),
  },
  data() {
    return {
      appName: Const.APP_NAME,
      list: {},
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
    this.reloadList();    
  },  
  methods: {    
    updateScreenSize() {
        this.isMobile = window.innerWidth < 576;
    },
    getTagClass(is_holder) {
      const classes = {"instru-container":true, "hint--top-left": true, "hint--rounded": true};
       if (is_holder == 1) {
     //   classes["bg-success-transparent"] = true;
        //classes["border-success"] = true;
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
      let allEvents = await this.$main.loadAllEvents();   
      console.log(allEvents);
      const allJobs = await this.$main.getAllJobs();
      for(let name in allJobs) {
        this.jobs.push(...allJobs[name]);
      }
      if (!this.$main.filter.displayDeleted) {
        allEvents = allEvents.filter(a=>a.sync_google!=0 && a.suiviDevisContrat!=4);
      }      
      allEvents.forEach((a,i)=>{
        allEvents[i]['equipe'] = [];
        if (a.equipeMusiciens) {          
           a.equipeMusiciens.split("||").forEach(a=>{
            a.split("|").forEach(b=> {
                const t = b.split(",");
                const icon = this.jobs.find(j=>j.id==t[0])?.icon || null;
                allEvents[i]['equipe'].push({"name": this.nameAbrev(t[2]), "is_holder": t[3], "icon": icon});
            });   
          });          
        }
      });

      this.list = {}; 
      allEvents.forEach((item,i)=>{
        const month = this.monthList[item.date_start.getMonth()]+' '+item.date_start.getFullYear();
        if (this.list[month] == null) {
          this.list[month] = [];
        }
        this.list[month].push(item);
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
      return "text-bg-light";
    },
    statutText(key) {
      if (key != undefined && key>=1 && key<=5) {
        return Const.STATUTS[key];
      }
      return "";
    },
    openModalFiltres() {
      if (this.$refs["modal-filtres"]) {
        console.log(this.$refs['modal-filtres']);
        this.$refs['modal-filtres'].open();
      }
    } 
  }
}
</script>
<style>
  body {
    overflow-x: hidden;
  }
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
  height: 26px;
  width: 20px;
  border-bottom: 3px solid transparent;
  position: relative;
}

.instru-container img {
  position: relative;
  top:-4px;
  height: 20px;
}

@media (max-width: 992px) {
  .text-responsive {
    font-size: 0.85rem;
  }
}
</style>