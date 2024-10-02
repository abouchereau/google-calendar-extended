<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <div class="row">
          <div v-for="band in bands" class="col">
            <div class="form-check form-switch">
              <label class="form-check-label" for="payant">{{ band.name }}</label>
              <input @change="e=>onBandChange(e.target.id, e.target.checked)" :id="band.slug" type="checkbox" class="form-check-input">    
            </div>      
          </div>
        </div>    
        <div class="row">
          <div class="col-md-4 offset-md-4 text-center">
            <select class="form-control" @change="e=>$emit('yearChange', e.target.value)">
              <option v-for="n in (yearMax - yearMin +1)" :value="yearMax - n + 1">{{ yearMax - n +1 }}</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'panel',
  components: {
  },
  mounted() {
     
  },
  data() {
    return {
      appName: Const.APP_NAME,
      bands: Const.BANDS,
      yearMin: Const.FIRST_YEAR,
      yearMax: Const.LAST_YEAR
    }
  },
  methods: {
      onBandChange(id, value) {
          console.log(id, value);
      }
  }
}
</script>
