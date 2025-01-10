<template>     
    <div class="card my-1">
        <div class="card-header">
            Repas
        </div>
        
        <div class="card-body">                        
            <div class="row">
             <!--  <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Nombre Végétariens</label>
                    <input :disabled="!editable" id="nbVegetariens" type="number" v-model="$main.item.nbVegetariens" class="form-control" />
                </div>
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Nombre Sans Gluten</label>
                    <input :disabled="!editable" id="nbSansGlut" type="number" v-model="$main.item.nbSansGlut" class="form-control" />
                </div>
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Nombre Sans Lact.</label>
                    <input :disabled="!editable" id="nbLact" type="number" v-model="$main.item.nbLact" class="form-control" />
                </div>
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Allergies</label>
                    <input :disabled="!editable" id="allergies" type="text" v-model="$main.item.allergies" class="form-control" />
                </div>-->
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Repas 1</label>
                    <input :disabled="!editable" id="repas1" type="text" v-model="$main.item.repas1" class="form-control" />
                </div>
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Horaire Repas 1</label>
                    <input :disabled="!editable" id="horaireRepas1" type="time" v-model="$main.item.horaireRepas1" class="form-control" />
                </div>
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Repas 2</label>
                    <input :disabled="!editable" id="repas1" type="text" v-model="$main.item.repas2" class="form-control" />
                </div>
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Horaire Repas 1</label>
                    <input :disabled="!editable" id="horaireRepas2" type="time" v-model="$main.item.horaireRepas2" class="form-control" />
                </div>
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Repas 3</label>
                    <input :disabled="!editable" id="repas1" type="text" v-model="$main.item.repas3" class="form-control" />
                </div>
                <div class="col-xl-3 col-lg-4 col-sm-12 py-1">
                    <label>Horaire Repas 3</label>
                    <input :disabled="!editable" id="horaireRepas3" type="time" v-model="$main.item.horaireRepas3" class="form-control" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
  name: 'event-repas',
  data() {
    return {
        editable: this.$route.name=="event-edit"
    }
  } 
}
</script>