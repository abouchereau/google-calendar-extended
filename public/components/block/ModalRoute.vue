<template>
    <div class="modal fade" tabindex="-1" :id="uniqueId">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-light">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" v-if="isLoaded">
                    <table class="table table-bordered">
                        <tr> 
                            <th class="text-end"><i class="fa fa-group"></i></th>
                            <td><b>Heure RDV</b> <span v-if="heureDepart">calculée</span></td>
                            <td class="bg-success text-center">{{ heureDepart }} <span v-if="item.heureDepart" class="">{{ item.heureDepart }}</span></td>
                        </tr>                        
                        <tr>
                            <th class="text-end"><i class="fa fa-shopping-cart"></i></th>
                            <td><b>Chargement</b></td>
                            <td class="text-center">{{ formule.loading_time }} minutes</td>
                        </tr>
                        <tr> 
                            <th class="text-end"><i class="fa fa-bell"></i></th>
                            <td><b>Heure Départ</b> <span v-if="heureDepart">calculée</span></td>
                            <td class="bg-success text-center" v-if="heureDepart">{{ heureDepart }}</td>
                            <td class="bg-success text-center" v-else>{{ item.heureDepart }}</td>
                        </tr>   
                        <tr>
                            <th class="text-end"><i class="fa fa-van-shuttle"></i></th>
                            <td><b>Trajet</b></td>
                            <td class="text-center">{{ item.dureeMinutes }}<span v-if="formule.slow_pc"> + {{ formule.slow_pct }} % = {{ totalTrajet }}</span></td>
                        </tr>      
                        <tr>
                            <th class="text-end"><i class="fa fa-map-marker"></i></th>
                            <td><b>Arrivée</b> {{ item.ville }}</td>
                            <td class="text-center">{{ item.heureArrivee }}</td>
                        </tr>      
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal">Ok</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
let modalRouteUid = 0;
export default {
  name: 'modal-route',
  props: {
    item: {},
  },
  data() {
    return {
        totalTrajet: "",
        heureDepart : "",
        formule: {},
        uniqueId: `modal-route-${modalRouteUid++}`,
        isLoaded: false
    }
  },
  methods: {
    async open() {
        this.modal.show();
        const tmp = this.item.dureeMinutes.split(":");
        const dureeTrajetMinutes = 60*tmp[0]+tmp[1];
        const totalTrajetMinutes = Math.ceil(dureeTrajetMinutes * (1 + (formule.slowPct / 100)));
        this.totalTrajet = Math.floor(totalTrajetMinutes / 60) + "h" + totalTrajetMinutes%60;
        await this.computeHeureDepart();
        this.isLoaded = true;
    },
    async computeHeureDepart() {        
        if (this.item.heureArrivee && this.item.formule && this.item.dureeMinutes) {

            const formules = await this.$main.getAllFormules();
            const tmp = this.item.dureeMinutes.split("h");
            const dureeMinutesNum = 60*tmp[0]+1*tmp[1];            

            this.formule = formules.find(f=>f.formule == this.item.formule && f.cal_id == this.item.cal_id);
            const [heures, minutes] = this.item.heureArrivee.split(":").map(Number);
            let totalMinutes = heures * 60 + minutes;


            const trajetTotal = Math.ceil(dureeMinutesNum * (1 + (this.formule.slow_pct/100)));
            totalMinutes = Math.round(totalMinutes - trajetTotal - this.formule.loading_time);
            // Gérer les débordements en arrière (négatif)
            if (totalMinutes < 0) {
                totalMinutes += 24 * 60; 
            }
            // Arrondir à la tranche de 5 minutes inférieure
            totalMinutes = Math.floor(totalMinutes / 5) * 5;

            // Reconvertir en heures et minutes
            const heuresFinales = Math.floor(totalMinutes / 60) % 24;
            const minutesFinales = totalMinutes % 60;

            // Formater avec deux chiffres
            const hStr = heuresFinales.toString().padStart(2, "0");
            const mStr = minutesFinales.toString().padStart(2, "0");
            this.heureDepart = `${hStr}:${mStr}`;            
        }
    }
  },
  mounted() {
    this.modal = new bootstrap.Modal(document.getElementById(this.uniqueId));
  }
}
</script>
