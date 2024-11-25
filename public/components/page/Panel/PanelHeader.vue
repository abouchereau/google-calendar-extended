<template>
      <nav class="fixed-top navbar bg-light">
        <div class="container-fluid">
          <div class="row align-items-center" style="width:100%/*why?*/">
            <div class="text-end col">
              Calendrier
            </div>
            <div class="col">
              <select class="form-control" @change="e=>$emit('onChange')" v-model="$main.filter.cal">
                <option value="">Tous</option>
                <option v-for="(cal, index) in cals" :value="cal.id" :key="index" v-bind:style="{color:cal.color_front, backgroundColor:cal.color_back}">{{ cal.summary }}</option>
              </select>
            </div>
            <div class="text-end col">
              Mois
            </div>
            <div class="col">
              <select class="form-control" @change="e=>$emit('onChange')" v-model="$main.filter.month">
                <option value="-1">Tout</option>
                <option v-for="(mois, index) in monthList" :value="index">{{ mois }}</option>
              </select>
            </div>
            <div class="text-end col">
              Année
            </div>
            <div class="col">
              <select class="form-control" @change="e=>$emit('onChange')" v-model="$main.filter.year">
                <option value="-1">Tout</option>
                <option v-for="n in (yearMax - yearMin +1)" :value="yearMax - n + 1">{{ yearMax - n +1 }}</option>
              </select>
            </div>
          </div>
        </div>
      </nav>
      <div style="height:60px;"></div>    
  </template>
  
  <script>
  export default {
    name: 'panel',
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
  