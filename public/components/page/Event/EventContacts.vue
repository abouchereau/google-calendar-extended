<template>     
    <div class="card my-3">
        <div class="card-header text-white bg-primary text-center sticky-title">
            Contacts
        </div>
        
        <div class="card-body">                        
            <div class="row">
                <div class="col-xl-6 col-lg-8 col-sm-12 py-1">
                    <label>Contact Accueil</label>
                    <textarea rows="3" v-if="editable" id="contactAccueil" v-model="$main.item.contactAccueil"  class="form-control" />  
                    <div v-html="linkifyPhoneNumbers($main.item.contactAccueil)"></div>
                </div>
                <div class="col-xl-6 col-lg-8 col-sm-12 py-1">
                    <label>Contact Technique</label>
                    <textarea rows="3" v-if="editable" id="contactTechnique" v-model="$main.item.contactTechnique"  class="form-control" />   
                    <div v-html="linkifyPhoneNumbers($main.item.contactTechnique)"></div>
                </div>
                <div class="col-xl-6 col-lg-8 col-sm-12 py-1">
                    <label>Contact Organisation</label>
                    <textarea rows="3" v-if="editable" id="contactOrga" v-model="$main.item.contactOrga"  class="form-control" />   
                    <div v-html="linkifyPhoneNumbers($main.item.contactOrga)"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
  name: 'event-contacts',
  data() {
    return {
        editable: this.$route.name=="event-edit"
    }
  },
  methods: {
    linkifyPhoneNumbers(text) {
        if (text == null || text == "") {
            return "";
        }
        const regex = /\b(?:0\d(?:[ .-]?\d{2}){4})\b/g;

        return this.nl2br(text.replace(regex, (match) => {
            // Version sans séparateurs pour le "tel:"
            const cleaned = match.replace(/[ .-]/g, "");
            return `<a class="btn btn-info" href="tel:${cleaned}"><i class="fa-solid fa-phone"></i> ${match}</a>`;
        }));
    },
    nl2br (str, is_xhtml) {
        var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>'; 
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    }
  }
}
</script>