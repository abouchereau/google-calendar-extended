<template>
    <div class="modal fade" tabindex="-1" :id="uniqueId">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-light">                
                    <h5 class="modal-title">Modification de l'heure de rendez-vous</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" v-if="isLoaded">
                    <div v-if="item.heureDepart && item.heureDepart!='..:..' && item.heureDepart!=heureDepart" class="my-2 text-center text-decoration-line-through text-danger">{{ item.heureDepart }}</div>
                    <table class="table table-bordered" id="table-modale-route">
                        <tr> 
                            <th class="text-end"><i class="fa fa-people-group"></i></th>
                            <td><b>Heure RDV</b></td>
                            <td class="text-center bg-success"><span class="bg-success text-white fw-bold fs-5">{{ heureDepart }}</span> </td>
                            <td class="text-center"><small>arrondi de {{ heureDepartSansArrondi }}</small></td>
                        </tr>                        
                        <tr>
                            <th class="text-end"><i class="fa fa-shopping-cart"></i></th>
                            <td><b>Chargement</b></td>
                            <td class="text-center">{{ heureDepart }} <span class="fa fa-long-arrow-right"></span> {{ heureApresChargement }}</td>
                            <td class="text-center"><small>{{ formule.loading_time }} min.</small></td>
                        </tr>
                        <tr> 
                            <th class="text-end"><i class="fa fa-bell"></i></th>
                            <td><b>Heure Départ</b></td>
                            <td class="text-center fs-5 fw-bold"> {{ heureApresChargement }} </td>
                        </tr>   
                        <tr>
                            <th class="text-end"><i class="fa fa-van-shuttle"></i></th>
                            <td><b>Trajet</b></td>
                            <td class="text-center">{{ heureApresChargement }} <span class="fa fa-long-arrow-right"></span> {{ item.heureArrivee }}</td>
                            <td class="text-center"><small>{{ dureeTrajetMinutes }} min.<span v-if="formule.slow_pct"> + {{ formule.slow_pct }} %.</span></small></td>
                        </tr>      
                        <tr>
                            <th class="text-end"><i class="fa fa-map-marker"></i></th>
                            <td><b>Arrivée</b></td>
                            <td class="text-center fs-5 fw-bold">{{ item.heureArrivee }}</td>
                            <td class="text-center"><small>{{ item.ville }}</small></td>
                        </tr>      
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Refuser la modification</button>
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="accept()">Accepter la modification</button>
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
        isLoaded: false,
        heureApresChargement :"",
        dureeTrajetMinutes: 0,
        totalTrajetMinutes: 0,
        HeureDepartSansArrondi: ""
    }
  },
  methods: {
    async open() {
        const formules = await this.$main.getAllFormules();
        this.formule = formules.find(f=>f.formule == this.item.formule && f.cal_id == this.item.cal_id);
        if (this.formule) {
            const tmp = this.item.dureeMinutes.split("h");
            this.dureeTrajetMinutes = 60*tmp[0]+1*tmp[1];
            this.totalTrajetMinutes = Math.ceil(this.dureeTrajetMinutes * (1 + (Number(this.formule.slow_pct) / 100)));
            await this.computeHeureDepart();
            if (this.heureDepart != this.item.heureDepart) {
                this.heureApresChargement = this.heureDepartApresChargement();
                this.isLoaded = true;            
                this.modal.show();
            }
        }        
    },
    async computeHeureDepart() {        
        if (this.item.heureArrivee && this.item.formule && this.item.dureeMinutes) {

            const tmp = this.item.dureeMinutes.split("h");
            const dureeMinutesNum = 60*tmp[0]+1*tmp[1];            

            const [heures, minutes] = this.item.heureArrivee.split(":").map(Number);
            let totalMinutes = heures * 60 + minutes;
            const trajetTotal = Math.ceil(dureeMinutesNum * (1 + (this.formule.slow_pct/100)));

            totalMinutes = Math.round(totalMinutes - trajetTotal - this.formule.loading_time);
            // Gérer les débordements en arrière (négatif)
            if (totalMinutes < 0) {
                totalMinutes += 24 * 60; 
            }
            this.heureDepartSansArrondi = Utils.minutesToClock(totalMinutes);
            // Arrondir à la tranche de 10 minutes inférieure
            totalMinutes = Math.floor(totalMinutes / 10) * 10;
            this.heureDepart = Utils.minutesToClock(totalMinutes);
        }
    },
    heureDepartApresChargement() {
        const totalMinutes = Utils.clockToMinutes(this.heureDepart) + this.formule.loading_time;
        return Utils.minutesToClock(totalMinutes);
    },
    accept() {
        this.$emit("acceptHeureDepart", this.heureDepart);
    },

  },
  mounted() {
    this.modal = new bootstrap.Modal(document.getElementById(this.uniqueId));
  }
}
</script>
<style>
#table-modale-route td, #table-modale-route th {
    padding-top:5px;
    padding-bottom:5px;
}
</style>