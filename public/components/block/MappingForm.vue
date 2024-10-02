<template>
  <div class="p-0">
    <div class="row bg-light my-2">


      <div class="col py-1 px-1">
        <select class="form-control text-small" v-model="obj.channel">
          <option value="">Default</option>
          <option v-for="i in 16" :value="i">{{ i }}</option>
        </select>
      </div>


      <div class="col py-1 px-1">
          <select class="form-select text-small" v-model="obj.message">
            <option v-for="(val, index) in cmdList" :selected="index == obj.message" :value="index+8">{{ val }}</option>
          </select>
      </div>


      <div class="col py-1 px-1">
          <select v-if="(obj.message==8 || obj.message==9) && obj.channel!=10" class="form-select text-small" v-model="obj.param1">
            <option v-for="(val, index) in noteList" :selected="index == obj.param1" :value="index">{{ val }}</option>
          </select>
          <select v-else-if="(obj.message==8 || obj.message==9) && obj.channel==10" class="form-select text-small" v-model="obj.param1">
            <option v-for="(val, index) in drumList" :selected="index == obj.param1" :value="index" v-if="val!=''">{{ val }}</option>
          </select>
          <select v-else-if="obj.message==11" class="form-select text-small" v-model="obj.param1">
            <option v-for="(val, index) in ccList" :selected="index == obj.param1" :value="index">{{ val }}</option>
          </select>
          <select v-else-if="obj.message==12" class="form-select text-small" v-model="obj.param1">
            <option v-for="(val, index) in insList" :selected="index == obj.param1" :value="index">{{ val }}</option>
          </select>
          <select v-else class="form-select text-small" v-model="obj.param1">
            <option v-for="val in 128" :selected="val == obj.param1" :value="val">{{ val }}</option>
          </select>
      </div>


      <div class="col py-1 px-1" v-if="obj.param2min == null">
        <select v-else class="form-select text-small" v-model="obj.param2">
          <option v-for="val in 128" :selected="val == obj.param2" :value="val">{{ val }}</option>
        </select>
      </div>


      <div class="col py-1 px-1" v-if="obj.param2min != null">
        <select v-else class="form-select text-small" v-model="obj.param2min">
          <option v-for="val in 128" :selected="val == obj.param2min" :value="val">{{ val }}</option>
        </select>
      </div>


      <div class="col py-1 px-1" v-if="obj.param2max != null">
        <select v-else class="form-select text-small" v-model="obj.param2max">
          <option v-for="val in 128" :selected="val == obj.param2max" :value="val">{{ val }}</option>
        </select>
      </div>

      <div class="col py-1 px-1 text-end">
        <button @click="remove" class="mx-2 btn btn-sm btn-dark"><span class="icon-remove text-danger"></span></button>
      </div>


    </div>
  </div>
</template>

<script>
export default {
    name: 'mapping-form',
    props: {
      obj: Object,
      index: Number,
      item: String
    },
    data() {
      return {
        cmdList: [],
        ccList: [],
        insList: [],
        drumList: [],
        noteList: [],
      }
    },
   created() {
      this.midiMsg = new MidiMsg();
      this.cmdList = this.midiMsg.cmds.slice(8);
      for (let i = 0;i<128;i++) {
        this.noteList[i] = i+". "+this.midiMsg.midiNote(i);
      }
     for (let i = 0;i<128;i++) {
       this.ccList[i] = i+ (this.midiMsg.ccs[i] ==""?"":". " + this.midiMsg.ccs[i]);
     }
     for (let i = 0;i<128;i++) {
       this.insList[i] = i+ (this.midiMsg.ins[i] ==""?"":". " + this.midiMsg.ins[i]);
     }
     for (let i = 0;i<128;i++) {//-35
       this.drumList[i] = i+". "+ (i<35 || this.midiMsg.drums[i-35] == null?"----":this.midiMsg.drums[i-35]);
     }
     if (this.obj['channel'] == null) {
       this.obj.channel = "";
     }
   },
  watch: {
      obj(newObj, oldObj) {
        if (this.obj['channel'] == null) {
          this.obj.channel = "";
        }
      }
  },
  methods: {
      remove() {
        this.$main.removeItem(this.item, this.index);
      }
  }

}
</script>
<style scoped>
.text-small {
  font-size:75%;
}
</style>