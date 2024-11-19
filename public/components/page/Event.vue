<template>     
    <event-header />  
    <div class="container-fluid" :key="refreshKey">
        <div class="row">
            <div class="col col-sm-6 col-xs-12">
                <event-general />  
            </div>
            <div class="col-sm-6 col-xs-12">
                <event-horaires />
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
  name: 'event',
  inject: ['showSpinner', 'hideSpinner'],
  components: {
     'event-header': Vue.defineAsyncComponent( ()=>loadModule('/components/block/EventHeader.vue', Utils.loadModuleOptions())),
     'event-general': Vue.defineAsyncComponent( ()=>loadModule('/components/block/EventGeneral.vue', Utils.loadModuleOptions())),
     'event-horaires': Vue.defineAsyncComponent( ()=>loadModule('/components/block/EventHoraires.vue', Utils.loadModuleOptions()))
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