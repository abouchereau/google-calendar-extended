<template>     
    <div class="card my-3">
        <div class="card-header text-white bg-primary text-center sticky-title">
            Infos set
        </div>
        
        <div class="card-body">                        
            <div class="row">
                <div class="col-sm-12 py-1">                    
                    <div class="alert alert-light border border-info" role="alert" v-html="nl2br($main.item.description)"></div>
                </div>
            </div>        
            </div>
        </div>
    </div>
</template>
<script>

export default {
  name: 'event-precision',
  data() {
    return {
        editable: this.$route.name=="event-edit"
    }
  } ,
  methods: {
    nl2br (str, is_xhtml) {
        var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>'; 
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    }
  } 
}
</script>