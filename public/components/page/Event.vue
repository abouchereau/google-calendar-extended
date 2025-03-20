<template>     
    <event-header  :key="refreshKey"/>  
    <div class="container-fluid" :key="refreshKey">
        <div v-if="isMobile">
            <div class="row">
                <div class="col">
                    <event-general />  
                    <event-horaires />
                    <event-equipe />
                    <event-transport />
                    <event-trajet />
                    <event-hebergement />
                    <event-contacts />
                    <event-communication />
                    <event-precision />
                </div>
            </div> 
        </div>
        <div v-else>
            <div class="row">
                <div class="col">
                    <event-general />  
                    <event-equipe />  
                    <event-trajet />  
                    <event-communication /> 
                    <event-precision />  
                </div>
                <div class="col">
                    <event-horaires />  
                    <event-transport />  
                    <event-contacts />  
                    <event-hebergement /> 
                </div>        
            </div>
        </div>
    </div>    
    <event-footer @updateEvent="updateEvent" :style="{'visibility': editable?'visible':'hidden'}"></event-footer>
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
     'event-footer': Vue.defineAsyncComponent( ()=>loadModule('/components/page/Event/EventFooter.vue', Utils.loadModuleOptions())),
  },
  data() {
    return {
        editable: this.$route.name=="event-edit",
        refreshKey: 0,
        isMobile: true
    }
  },
  async mounted() {
    this.showSpinner();
    this.updateScreenSize();
    window.addEventListener('resize', this.updateScreenSize);
    this.$main.item = await this.$main.getEvent(this.$route.params.id);            
    this.refreshKey++;   
    this.hideSpinner();
  },
  umounted() {
    window.removeEventListener('resize', updateScreenSize);
  },
  methods: {
    updateScreenSize() {
        this.isMobile = window.innerWidth < 576;
    },
    async updateEvent() {
        this.showSpinner();
        await this.$main.updateEvent(this.$route.params.id, {...this.$main.item});               
        this.hideSpinner();
    }
  }
}
</script>
