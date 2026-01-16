
<template>
    <div v-if="item.transports!=null && item.transports.includes('1')"
      :class="{'border border-danger': item.crafterOverlap, 'row': true}">
      <div class="col vehicule">

        <div class="text-start" style="font-size:70%;"> ▸ {{ dayCrafter(item.dateDepartCrafter)}} <br/> ◂ {{ dayCrafter(item.dateRetourCrafter)}}        
          <div v-if="item.crafterOverlap" class="text-danger">
              <i class="fa fa-triangle-exclamation"></i> chevauchement avec un autre déplacement !
          </div>
        </div>        
        <div class="h-100 d-flex align-items-end">
          <i class="fa-solid fa-van-shuttle fa-big text-primary mb-1" style="padding:0;"></i>
        </div>
          
      </div>
    </div>
    <div class="row" v-if="item.transports!=null && item.transports.includes('2')">
      <div class="col vehicule">
        <div style="font-size:70%;">{{ item.vehiculesPerso }}</div>
        <div><i class="fa-solid fa-car-side fa-big text-info mb-1" style="padding:0;"></i></div>
      </div>
    </div>
    <div class="row" v-if="item.transports!=null && item.transports.includes('3')">    
      <div class="col vehicule">
        <div style="font-size:70%;">{{ item.location }}</div>
        <div><i class="fa-solid fa-ambulance fa-big text-warning mb-1" style="padding:0;"></i></div>
      </div>
    </div>
    <div class="row" v-if="item.transports!=null && item.transports.includes('4')">      
      <div class="col vehicule">
        <div style="font-size:70%;">{{ item.train }}</div>
        <div><i class="fa-solid fa-train fa-big text-success mb-1" style="padding:0;"></i></div>
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
        if (!dateStr) {
          return "N.C";
        }
        const dateDepart = this.item.date_start;
        const date = new Date(dateStr);
        if (date.getDate() == dateDepart.getDate()) {
          return date.getHours()+"h"+("0"+date.getMinutes()).slice(-2)
        }
        else {
          return Const.DAY_LIST[(date.getDay()+6)%7].substr(0,3)+" "+date.getDate()+" à "+date.getHours()+"h"+("0"+date.getMinutes()).slice(-2);
        }
    }
  }
}
</script>
<style>

</style>