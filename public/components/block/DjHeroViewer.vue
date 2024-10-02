<template>
  <div>

    <div class="card border-info mb-3">
      <div class="card-header" :key="refreshKey">
        <i class="icon icon-off text-dark" v-if="!$main.djheroConnected"></i>
        <i class="icon icon-off text-success" v-if="$main.djheroConnected"></i>
        DJ Hero
      </div>
      <div class="card-body">
        <div class="card-text" >

          <div class="row">
            <div class="col-md-8">

              <div class="row">

                <div class="col text-center">
                  <div class="joy-container">
                    <button class="btn btn-outline-info" id="btn-up" ref="btn-up"><i class="icon-arrow-up"></i></button>
                    <button class="btn btn-outline-info" id="btn-down" ref="btn-down"><i class="icon-arrow-down"></i></button>
                    <button class="btn btn-outline-info" id="btn-left" ref="btn-left"><i class="icon-arrow-left"></i></button>
                    <button class="btn btn-outline-info" id="btn-right" ref="btn-right"><i class="icon-arrow-right"></i></button>
                  </div>
                </div>

                <div class="col text-center">
                  <div class="joy-container">
                    <button class="btn btn-outline-info btn-lg" id="btn-home" ref="btn-up"><i class="icon-home"></i></button>
                    <button class="btn btn-outline-info btn-sm" id="btn-select" ref="btn-down">SELECT</button>
                    <button class="btn btn-outline-info btn-sm" id="btn-start" ref="btn-left">START</button>
                  </div>
                </div>


                <div class="col text-center">
                  <div class="joy-container">
                    <button class="btn btn-outline-info btn-ps" id="btn-triangle" ref="btn-triangle"><img src="/icones/triangle.svg" style="bottom:3px"/></button>
                    <button class="btn btn-outline-info btn-ps" id="btn-cross" ref="btn-cross"><img src="/icones/cross.svg" /></button>
                    <button class="btn btn-outline-info btn-ps" id="btn-square" ref="btn-square"><img src="/icones/square.svg" /></button>
                    <button class="btn btn-outline-info btn-ps" id="btn-circle" ref="btn-circle"><img src="/icones/circle.svg" /></button>
                  </div>
                </div>
              </div>
              <div class="row mt-3">

                <div class="col-md-4 text-center">

                  <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" class="btn-check" name="knob" id="knob1" autocomplete="off">
                    <label class="btn btn-outline-primary" for="knob1">1</label>

                    <input type="radio" class="btn-check" name="knob" id="knob2" autocomplete="off">
                    <label class="btn btn-outline-primary" for="knob2">2</label>

                    <input type="radio" class="btn-check" name="knob" id="knob3" autocomplete="off">
                    <label class="btn btn-outline-primary" for="knob3">3</label>

                    <input type="radio" class="btn-check" name="knob" id="knob4" autocomplete="off">
                    <label class="btn btn-outline-primary" for="knob4">4</label>
                  </div>

                </div>

                <div class="col-4 text-center offset-sm-2">
                  <input type="range" class="form-range" id="fader" min="0" max="1023">
                </div>
              </div>
            </div>

            <div class="col-md-4 text-center p-1">

              <div >
                <img src="/icones/tony-b.svg" id="disc"/>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'dj-hero-viewer',
  data() {
    return {
      refreshKey: 0,
      degree: 0,
      disc: null,
      fader: null
    }
  },
  mounted() {
    this.disc = document.getElementById('disc');
    this.fader = document.getElementById('fader');
    window.emitter.on('socketLoaded',()=> {
      this.refreshKey++;
    });
    window.emitter.on('djheroChange',(a)=>{
      if (a[0]=="FADER") {
        this.fader.value = a[1];
      }
      else if (a[0]=="KNOB") {
        document.getElementById('knob'+a[1]).checked = true
      }
      else if (a[0]=="DISC") {
        this.degree = this.degree+(a[1]*0.75);
        this.disc.style.transform = 'rotate(' + this.degree  + 'deg)';
      }
      else {
        let id = "btn-"+a[0].toLowerCase();
        if (document.getElementById(id)) {
          if (a[1] == "PRESS") {
            document.getElementById(id).classList.remove('btn-outline-info');
            document.getElementById(id).classList.add('btn-info');
          }
          else if (a[1] == "RELEASE") {
            document.getElementById(id).classList.remove('btn-info');
            document.getElementById(id).classList.add('btn-outline-info');
          }
        }
      }
    });
  }
}
</script>
<style>
#disc {
  transition:  transform 0.1s;
}
.joy-container {
  position: relative;
  width:130px;
  height:130px;
  display: inline-block;
}
.joy-container .btn{
  position: absolute;
}

#btn-up, #btn-triangle {top:10px;left:45px;}
#btn-down, #btn-cross  {top:83px;left:45px;}
#btn-left, #btn-square {top:47px;left:6px;}
#btn-right, #btn-circle {top:47px;left:85px;}
#btn-home {top:10px;left:42px;border-radius:100px;}
#btn-select {top:80px;left:10px;font-size:65%;}
#btn-start {top:80px;left:75px;font-size:65%;}
.btn-ps {
  padding:7px !important;
  border-radius:100px !important;
}
.btn {
}
.btn-ps img {
  width:25px;
  position:relative;
}
input[type=range]::-webkit-slider-thumb, input[type=range]::-moz-range-thumb {
  width: 2em;
  height: 2em;              /* s'adapte à la hauteur de l'input */
}
#fader {
  max-width:400px;
}
#disc {
  display:inline-block;
  width:180px;
  height:180px;
  border-radius:100%;
  border:3px solid var(--bs-primary);
}
</style>