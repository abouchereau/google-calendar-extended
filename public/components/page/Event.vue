<template>     
    <event-header />  
    <div class="container-fluid">
        <div class="row">
            <div class="col col-sm-6 col-xs-12">
                <div class="card">
                    <div class="card-header">
                        Général
                    </div>
                    
                    <div class="card-body">                        
                        <div class="row">
                            <div class="col-xl-3 col-lg-4 col-sm-12">
                                <input disabled id="date" placeholder="Date" type="text" v-model="item.date_start"  class="form-control" />
                            </div>
                            <div class="col-xl-3 col-lg-4 col-sm-12">
                                <input id="codePostal" placeholder="Code Postal" type="text" v-model="item.codePostal" class="form-control" />
                            </div>
                            <div class="col-xl-3 col-lg-4 col-sm-12">
                                <input id="ville" placeholder="Ville" type="text" v-model="item.ville" class="form-control" />
                            </div>
                            <div class="col-xl-3 col-lg-4 col-sm-12">
                                <input disabled id="nomEvenement" placeholder="Nom de l'événement" type="text" v-model="item.summary" class="form-control" />
                            </div>
                            <div class="col-xl-3 col-lg-4 col-sm-12">
                                <div class="form-check form-switch">
                                    <label class="form-check-label" for="payant">Payant ?</label>
                                    <input id="payant" placeholder="Payant" type="checkbox"  class="form-check-input">                      
                                </div>
                            </div>
                            <div class="col-xl-3 col-lg-4 col-sm-12">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-xs-12">
                <div class="card">
                    <div class="card-header">
                        Horaires
                    </div>
                    
                    <div class="card-body">                        
                        <div class="row">
                           
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        <div class="row mt-3">
            <div class="col">
                <button type="button" class="btn btn-success btn-lg" @click="updateEvent">Enregistrer</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'panel',
  components: {
     'event-header': Vue.defineAsyncComponent( ()=>loadModule('../components/block/EventHeader.vue', Utils.loadModuleOptions()))
  },
  data() {
    return {
        item: {}
    }
  },
  async mounted() {
    this.item = await this.$main.getEvent(this.$route.params.id);
    //console.log(this.item);
  },
  methods: {
    async updateEvent() {
        await this.$main.updateEvent(this.$route.params.id, {...this.item});
    }
  }
}
</script>
