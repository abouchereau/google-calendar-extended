<template>
  <div>

    <div class="row">
      <div class="col-md-7">

        <div class="card border-primary">
          <div class="card-header">MIDI Output</div>
          <div class="card-body">
            <div class="card-text" :key="refreshKey">
              <div class="bs-component" v-if="$main.midiOutDevices!=null">
                <ul class="list-group">
                  <li v-for="(item, index) in $main.midiOutDevices" @click="$main.setMidiOutIndex(index)" :class="{ 'active': index==$main.midiOutIndex, 'list-group-item' : true, 'list-group-item-action':true}" >
                    {{ item }}
                  </li>
                </ul>
              </div>
              <div class="alert alert-dismissible alert-warning" v-if="$main.midiOutDevices!=null && $main.midiOutDevices.length==0">
                <p class="mb-0">No Midi Devices Connected</p>
              </div>
              <div class="alert" v-if="$main.midiOutDevices==null">
                <p class="text-center"><i class="icon-spinner icon-2x icon-spin"></i><br />Scanning MIDI outputs</p>
              </div>
            </div>
          </div>
        </div>


      </div>

      <div class="col-md-5">

        <div class="card border-primary">
          <div class="card-header">MIDI Default Channel</div>
          <div class="card-body">
            <div class="card-text" :key="refreshKey2">
              <select class="form-select" v-model="currentMIDIChannel">
                <option v-for="i in 16" :value="i">{{ i }}</option>
              </select>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'midi-out-devices',
  data() {
    return {
      refreshKey: 0,
      refreshKey2: 0,
      currentMIDIChannel: 1
    }
  },
  mounted() {
    window.emitter.on('socketLoaded',()=> {
      this.refreshKey++;
    });
    window.emitter.on('currentMIDIChannel',()=> {
      this.currentMIDIChannel = this.$main.currentMIDIChannel;
      this.refreshKey2++;
    })
  },
  watch: {//TODO remettre la logique main.js
    currentMIDIChannel(newChannel) {
      this.$main.setCurrentMIDIChannel(newChannel);
    }
  }


  /*watch: {//TODO remettre la logique main.js
    list(newList, oldList) {
      if(newList.length-1 < this.app.midiOutIndex) {
          this.app.midiOutIndex = 0;
      }
    }
  }*/

}
</script>
<style>
  .list-group-item {
    cursor:pointer;
  }
</style>