<template>     
    <div class="card my-1">
        <div class="card-header">
            Equipe
        </div>
        
        <div class="card-body">                        
            <div class="row">
                <div class="col-xl-12 col-lg-12 col-sm-12 py-1">                    
                    <label>Musiciens</label>
                    <multiselect :disabled="!editable" v-model="selectedMusiciens" :options="listMusiciens" 
                    :multiple="true" :close-on-select="false" select-label="Ajouter" deselect-label="Enlever" @select="onSelectMusicien"></multiselect>
                </div>
                <div class="col-xl-12 col-lg-12 col-sm-12 py-1">                    
                    <label>Technique</label>
                    <multiselect :disabled="!editable" v-model="selectedTechnique" :options="listMusiciens" 
                    :multiple="true" :close-on-select="false" select-label="Ajouter" deselect-label="Enlever" @select="onSelectTechnique"></multiselect>
                </div>

            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'event-equipe',
  data() {
    return {
        editable: this.$route.name=="event-edit",
        selectedMusiciens: [],
        selectedTechnique: [],
        listMusiciens: ["Gilles C.", "Maeva", "Paul G.", "Max B.","Mathieu D.", "Guillaume T.","Séb L.", "Mathieu B.", "JB Réhaud"]
    }
  },
  mounted() {
    if (this.$main.item.equipeMusiciens != null) {
        this.selectedMusiciens = this.$main.item.equipeMusiciens.split(",").filter(a=>a!="");
    }
    if (this.$main.item.equipeTechnique != null) {
        this.selectedTechnique = this.$main.item.equipeTechnique.split(",").filter(a=>a!="");
    }
  },
  methods: {
    onSelectMusicien() {
        this.$main.item.equipeMusiciens = this.selectedMusiciens.join(",");
    },    
    onSelectTechnique() {
        this.$main.item.equipeTechnique = this.selectedTechnique.join(",");
    }
  }
}
</script>
<style>


</style>