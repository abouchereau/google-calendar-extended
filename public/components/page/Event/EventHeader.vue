<template>
     <nav class="fixed-top navbar bg-light">
        <div class="container-fluid">
          <div class="row align-items-center" style="width:100%">
            <div class="col-4 text-light">
            </div>
            <div class="col-4 text-center py-1" v-bind:style="{color:$main.item.color_front, backgroundColor:$main.item.color_back, borderRadius: '5px'}">
                {{ $main.item.cal_summary }}
            </div>
          </div>
        </div>
    </nav> 
</template>
<script>
export default {
  name: 'panel-header',
}
</script>