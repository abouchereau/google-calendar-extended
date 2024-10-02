<template>
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-4 offset-md-4 text-center">
              <select class="form-control" @change="e=>$emit('onChange')" v-model="$main.filter.cal">
                <option value="">Tous</option>
                <option v-for="(cal, index) in cals" :value="cal.id" :key="index">{{ cal.summary }}</option>
              </select>
            </div>
          </div>   
          <div class="row">
            <div class="col-md-4 offset-md-4 text-center">
              <select class="form-control" @change="e=>$emit('onChange')" v-model="$main.filter.year">
                <option value="-1">Tout</option>
                <option v-for="n in (yearMax - yearMin +1)" :value="yearMax - n + 1">{{ yearMax - n +1 }}</option>
              </select>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    name: 'panel',
    data() {
      return {
        cals: [],
        appName: Const.APP_NAME,
        yearMin: Const.FIRST_YEAR,
        yearMax: Const.LAST_YEAR
      }
    },
    async mounted() {
      this.cals = await this.$main.loadCals(); 
      this.$emit('onChange');
      this.refresh++;
    }
   
  }
  </script>
  