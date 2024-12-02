<template>     
    <event-header  :key="refreshKey"/>  
    <div class="container-fluid" :key="refreshKey">
        <div class="row">
            <div class="col col-sm-6 col-xs-12">
                <event-general />  
            </div>
            <div class="col-sm-6 col-xs-12">
                <event-horaires />
            </div>
            <div class="col-sm-6 col-xs-12">
            </div>            
            <div class="col-sm-6 col-xs-12">
                <event-transport />
            </div>
            <div class="col-sm-6 col-xs-12">
                <event-trajet />
            </div>
            <div class="col-sm-6 col-xs-12">
                <event-repas />
            </div>
            <div class="col-sm-6 col-xs-12">
                <event-hebergement />
            </div>
            <div class="col-sm-6 col-xs-12">
                <event-contacts />
            </div>
            <div class="col-sm-6 col-xs-12">
                <event-communication />
            </div>
            <div class="col-sm-6 col-xs-12">
                <event-precision />
            </div>
        </div> 
        <div class="row mt-3" style="width:100%">
            <div class="col d-grid gap-2">
                <button type="button" class="btn btn-success btn-lg btn-lg btn-block" @click="updateEvent">Enregistrer</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'event',
  inject: ['showSpinner', 'hideSpinner'],
  components: {
     'event-header': Vue.defineAsyncComponent( ()=>loadModule('/components/page/Event/EventHeader.vue', Utils.loadModuleOptions())),
     'event-general': Vue.defineAsyncComponent( ()=>loadModule('/components/page/Event/EventGeneral.vue', Utils.loadModuleOptions())),
     'event-horaires': Vue.defineAsyncComponent( ()=>loadModule('/components/page/Event/EventHoraires.vue', Utils.loadModuleOptions())),
     'event-equipe': Vue.defineAsyncComponent( ()=>loadModule('/components/page/Event/EventEquipe.vue', Utils.loadModuleOptions())),
     'event-transport': Vue.defineAsyncComponent( ()=>loadModule('/components/page/Event/EventTransport.vue', Utils.loadModuleOptions())),
     'event-trajet': Vue.defineAsyncComponent( ()=>loadModule('/components/page/Event/EventTrajet.vue', Utils.loadModuleOptions())),
     'event-repas': Vue.defineAsyncComponent( ()=>loadModule('/components/page/Event/EventRepas.vue', Utils.loadModuleOptions())),
     'event-hebergement': Vue.defineAsyncComponent( ()=>loadModule('/components/page/Event/EventHebergement.vue', Utils.loadModuleOptions())),
     'event-contacts': Vue.defineAsyncComponent( ()=>loadModule('/components/page/Event/EventContacts.vue', Utils.loadModuleOptions())),
     'event-communication': Vue.defineAsyncComponent( ()=>loadModule('/components/page/Event/EventCommunication.vue', Utils.loadModuleOptions())),
     'event-precision': Vue.defineAsyncComponent( ()=>loadModule('/components/page/Event/EventPrecision.vue', Utils.loadModuleOptions())),
  },
  data() {
    return {
        editable: this.$route.name=="event-edit",
        refreshKey: 0
    }
  },
  async mounted() {
    this.showSpinner();
    this.$main.item = await this.$main.getEvent(this.$route.params.id);            
    this.refreshKey++;   
    this.hideSpinner();
  },
  methods: {
    async updateEvent() {
        this.showSpinner();
        await this.$main.updateEvent(this.$route.params.id, {...this.$main.item});               
        this.hideSpinner();
    }
  }
}
</script>