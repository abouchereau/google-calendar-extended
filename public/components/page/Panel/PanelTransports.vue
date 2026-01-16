
<template>
    <div v-if="item.transports!=null && item.transports.includes('1')" data-hint-touch
      :class="{'alert alert-danger': item.crafterOverlap, 'hint--top-left': true, 'hint--rounded': true}" 
      :data-hint="'Aller : '+dayCrafter(item.dateDepartCrafter)+'\nRetour : '+dayCrafter(item.dateRetourCrafter)+(item.crafterOverlap?'\nAttention : chevauchement avec un autre déplacement !':'')">
      <i class="fa-solid fa-van-shuttle fa-big text-primary"></i>
    </div>
    <div v-if="item.transports!=null && item.transports.includes('2')" class="hint--top-left hint--rounded" :aria-label="'Véhicule perso : '+item.vehiculesPerso" data-hint-touch>
        <i class="fa-solid fa-car-side fa-big text-info"></i>  
    </div>
    <div v-if="item.transports!=null && item.transports.includes('3')">      
        <i class="fa-solid fa-ambulance fa-big text-warning hint--top-left hint--rounded" :aria-label="'Location : '+item.location" data-hint-touch></i> 
    </div>
    <div v-if="item.transports!=null && item.transports.includes('4')">      
        <i class="fa-solid fa-train fa-big text-success hint--right hint--rounded" :aria-label="'Train : '+item.train" data-hint-touch></i> 
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
          return date.getHours()+"h"+(date.getMinutes()!=0?("0"+date.getMinutes()).slice(-2):"")
        }
        else {
          return Const.DAY_LIST[(date.getDay()+6)%7]+" "+date.getDate()+" à "+date.getHours()+"h"+(date.getMinutes()!=0?("0"+date.getMinutes()).slice(-2):"");
        }
    }
  }
}
</script>
<style>

</style>