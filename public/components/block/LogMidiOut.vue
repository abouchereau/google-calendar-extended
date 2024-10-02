<template>
  <div class="card border-info mb-3">
    <div class="card-header">
      MIDI Out Messages
    </div>
    <div class="card-body">
      <div class="card-text" >
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>Time</th>
              <th>Channel</th>
              <th>Command</th>
              <th>Param 1</th>
              <th>Param 2</th>
            </tr>
          </thead>
          <tbody class="small">
            <tr v-for="log in logs">
              <td>{{ log.time }}</td>
              <td>{{ log.channel }}</td>
              <td>{{ log.command }}</td>
              <td>{{ log.param1 }}</td>
              <td>{{ log.param2 }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'log-midi-out',
  mounted() {
    this.midiMsg = new MidiMsg();
    window.emitter.on("midiOut", (data)=> {
      this.logs.unshift(this.midiMsg2log(data));
      this.logs = this.logs.slice(0,this.nbLog);
    });
  },
  data() {
    return {
      logs: [],
      midiMsg: null,
      nbLog: 10
    }
  },
  methods: {
    midiMsg2log(data) {
      let log = {"time": "", "channel": "", "command": "", "param1": "", "param2": ""};
      log.time = new Date().toJSON().substr(11, 12);
      let cmd = data[0] >> 4;
      log.channel = (data[0] & 0xf) + 1;
      log.command = this.midiMsg.cmds[cmd];
      if (cmd == 11) {//CC
        log.param1 = data[1] + (this.midiMsg.ccs[data[1]] ==""?"":" (" + this.midiMsg.ccs[data[1]] + ")");
      } else if (cmd == 8 || cmd == 9) {
        log.param1 = data[1] + " ("+this.midiMsg.midiNote(data[1])+ ")";
      } else {
        log.param1 = data[1];
      }
      log.param2 = (cmd == 8 || cmd == 9?"Velocity=":"")+data[2];
      return log;
    }
  }


}
</script>
<style scoped>
  .small {
    font-size:0.85rem;
  }
  td, th {
    width: 20%;
  }
</style>