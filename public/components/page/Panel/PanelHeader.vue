<template>
      <nav class="fixed-top navbar bg-light">
        <div class="container-fluid">
          <div class="row align-items-center" style="width:100%/*why?*/">
            <div class="col-sm-2 d-lg-block d-none"></div>
         <!--   <div class="text-end col d-lg-block d-none">
              Calendrier
            </div>-->
            <div class="col-sm-4">
              <select class="form-control" @change="e=>$emit('onChange')" v-model="$main.filter.cal">
                <option value="">Tous</option>
                <option v-for="(cal, index) in cals" :value="cal.id" :key="index" v-bind:style="{color:cal.color_front, backgroundColor:cal.color_back}">{{ cal.summary }}</option>
              </select>
            </div>
           <!-- <div class="text-end col d-lg-block d-none">
              Mois
            </div>
           <div class="col">
              <select class="form-control" @change="e=>$emit('onChange')" v-model="$main.filter.month">
                <option value="-1">Tout</option>
                <option v-for="(mois, index) in monthList" :value="index">{{ mois }}</option>
              </select>
            </div>-->

            <div class="col-sm-2">
              <select class="form-control" @change="e=>$emit('onChange')" v-model="$main.filter.year">
                <option value="-2">A venir</option>
                <option v-for="n in (yearMax - yearMin +1)" :value="yearMax - n + 1">{{ yearMax - n +1 }}</option>                
                <option value="-1">Tout</option>
              </select>
            </div>
            <div class="col-sm-2">
              <div class="d-grid gap-2">
                <input type="checkbox" class="btn-check" id="btn-check-outlined" autocomplete="off"  v-model="$main.filter.displayDeleted" @change="e=>$emit('onChange')" />
                <label class="btn btn-outline-danger" for="btn-check-outlined">Dates supprimées</label>     
                </div>           
              </div>
            <div class="col-sm-2 d-lg-block d-none"></div>
          </div>
        </div>
      </nav>
  </template>
  
  <script>
  export default {
    name: 'panel-header',
    inject: ['showSpinner', 'hideSpinner'],
    data() {
      return {
        cals: [],
        appName: Const.APP_NAME,
        yearMin: Const.FIRST_YEAR,
        yearMax: Const.LAST_YEAR,
        monthList: Const.MONTH_LIST,
        
      }
    },
    async mounted() {
      this.showSpinner();
      this.cals = await this.$main.loadCals(); 
      this.hideSpinner();
      this.$emit('onChange');
      this.refresh++;
    }
   
  }
  </script>
  