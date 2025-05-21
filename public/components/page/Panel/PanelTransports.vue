
<template>
    <div v-if="item.transports!=null && item.transports.includes('1')" :class="{'alert alert-danger': item.crafterOverlap, 'p-0': true}">
        <div class="row">
            <div class="col-md-3 col-sm-12 align-self-center text-center">
            <i class="fa-solid fa-van-shuttle fa-big text-primary" title="Crafter"></i>
            </div>                  
            <div class="col-md-9 col-sm-12">
            <div><i class="fa fa-square-caret-right text-warning"></i> <span class="fs-sm" v-if="item.dateDepartCrafter">{{ dayCrafter(item.dateDepartCrafter)}}</span><span class="text-danger" v-else>N.C.</span></div>
            <div><i class="fa fa-square-caret-left text-success"></i> <span class="fs-sm" v-if="item.dateRetourCrafter">{{ dayCrafter(item.dateRetourCrafter)}}</span><span class="text-danger" v-else>N.C.</span></div>
            </div>
        </div>    
    </div>
    <div v-if="item.transports!=null && item.transports.includes('2')">
        <div class="row">
            <div class="col-md-3 col-sm-12 align-self-center text-center">
            <i class="fa-solid fa-car-side fa-big text-info" title="Véhicule(s) perso"></i>
            </div>                  
            <div class="col-md-9 col-sm-12">
              <span class="badge bg-info" v-if="item.vehiculesPerso">{{ item.vehiculesPerso.substring(0,25) }}</span>
            </div>     
        </div>    
    </div>
    <div v-if="item.transports!=null && item.transports.includes('3')">
        <div class="row">
            <div class="col-md-3 col-sm-12 align-self-center text-center">
            <i class="fa-solid fa-ambulance fa-big text-warning" title="Location"></i>
            </div>                  
            <div class="col-md-9 col-sm-12">
              <span class="badge bg-warning" v-if="item.location">{{ item.location.substring(0,25) }}</span>
            </div>     
        </div>    
    </div>
    <div v-if="item.transports!=null && item.transports.includes('4')">
        <div class="row">
            <div class="col-md-3 col-sm-12 align-self-center text-center">
            <i class="fa-solid fa-train fa-big text-success" title="Train"></i>
            </div>                  
            <div class="col-md-9 col-sm-12">
              <span class="badge bg-success" v-if="item.train">{{ item.train.substring(0,25) }}</span>
            </div>     
        </div>    
    </div>
</template>


<script>
export default {
  name: 'panel-transports',
  inject: ['showSpinner', 'hideSpinner'],
  props: {
    item: {}
  },
  methods: {
    dayCrafter(dateStr){
        let date = new Date(dateStr);
        let str = Const.DAY_LIST[(date.getDay()+6)%7].substring(0,3)+" "+date.getDate()+" à "+date.getHours()+"h"+("0"+date.getMinutes()).slice(-2);
        return str;
    }
  }
}
</script>
<style>

</style>