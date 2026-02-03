<template>     
    <div class="card my-3">
        <div class="card-header text-white bg-primary text-center sticky-title ">
            Equipe
        </div>
        
        <div class="card-body">                        
            <div class="row">           
                
                <div class="col-xl-12 col-lg-12 col-sm-12 py-1" v-for="job in jobs">                    
                    <label>{{ job.label }}</label>
                    <multiselect @select="o=>onSelect(o,job)" :disabled="!editable" v-model="selectedMusiciens[job.id]" :options="listMusiciens[job.id]" 
                        @click.native="onChange"
                        placeholder="Choisis un musicien dans la liste ou ajoute un nom"
                        tagPlaceholder="Appuie sur Entrée pour valider le nom" @tag="t=>addTag(t,job)"
                        :multiple="true" :taggable="true" :close-on-select="false" select-label="+" deselect-label="-" selectedLabel="✓">                
                        <template #tag="{ option, remove }">
                            <span :class="getTagClass(option)">
                                {{ option.name }}
                                <span class="close-x" @click="customRemove(option.name, job.id)">x</span>
                            </span>
                        </template>
                        <template #option="{ option }">
                            <div @click="e=>optionClick(job, option, e)">                        
                                {{ option.name }} <span v-html="displayNotHolder(option, job.label)"></span>
                            </div>
                        </template>
                    </multiselect>
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
        listMusiciens: [],
        persons: [],
        jobs: [],
        indexNew: 1000
    }
  },
  async mounted() {
    this.persons = await this.$main.getAllPersons(this.$main.item.cal_id);  
    this.jobs = await this.$main.getAllJobs(true, this.$main.item.cal_id);
    this.jobs.forEach(j=>{
        this.selectedMusiciens[j.id] = [];
        this.listMusiciens[j.id] = [];
        const persons = this.persons.filter(p=>p['jobs'].some(pj=>pj.job==j.label));        
        for(let person of persons) {     
            const name = person.firstname+" "+person.lastname;
            const job_person = person.jobs.find(j2=>j2.job==j.label);
            const optionLight = {"id":person.person_id,"name":name, "is_holder":job_person.is_holder};
            this.listMusiciens[j.id].push(optionLight);
        }   
        this.listMusiciens[j.id].sort((a,b)=>{
            if (b.is_holder !== a.is_holder) {
                return b.is_holder - a.is_holder;
            }
            return a.name.localeCompare(b.name);});   
    });
    this.fromBDD();
  },
  methods: {
    getTagClass(option) {
       option = Vue.toRaw(option);
       if (option.is_holder == 1) {
        return "custom-tag bg-success";
       }
       else if (option.is_holder == -1) {
        return "custom-tag bg-danger";
       }
       else {
        return "custom-tag bg-warning";
       }
    },    
    displayNotHolder(option, job_label) {
       const jobs = Vue.toRaw(option.jobs);
       if (typeof jobs == "undefined") {
        return;
       }
       const job_person = jobs.find(j=>j.job==job_label);
       if (job_person.is_holder == 0) {
        return "<small>(Remplaçant)</small>";
       }
       return "";
    },  
    addTag(tag, job) {       
        if (tag.trim() != "") {
            this.selectedMusiciens[job.id].push({"id":this.indexNew++,"name":tag, "is_holder":-1});
        }        
        this.toBDD();
        return;
    },
    customRemove(name, job_id) {
        this.selectedMusiciens[job_id] = this.selectedMusiciens[job_id].filter(p=>p.name!=name);
        this.toBDD();
    },
    onChange(e) {        
        setTimeout(()=>{document.getElementById('codePostal').dispatchEvent(new Event("input", { bubbles: true }));},100);
    },
    onSelect(option, job) {
        if (!this.selectedMusiciens[job.id].some(a=>a.name==option.name)) {
            this.selectedMusiciens[job.id].push(option);
        }           
        this.toBDD();
        return;
    },
    optionClick(job, option, evt) {
        evt.preventDefault();
        evt.stopPropagation();
        if (this.selectedMusiciens[job.id].some(m=>m.name==option.name)) {
            this.customRemove(option.name, job.id);
        }
        else {           
            this.selectedMusiciens[job.id].push(option);            
            this.toBDD();
        }
    },    
    toBDD() {
        const selectedMusiciens = Vue.toRaw(this.selectedMusiciens);
        this.$main.item.equipeMusiciens = selectedMusiciens
        .map((musiciens, job_id)=> {
                if (musiciens.length>0) {
                    return musiciens.map(m=>job_id+","+m.id+","+m.name+","+m.is_holder).join("|");
                }
                return "";
            })
        .filter(a=>a.length>0)
        .join("||");
    },
    fromBDD() {
        this.selectedMusiciens.forEach((m,index)=>this.selectedMusiciens[index].length=0);//.length=0;
        this.$main.item.equipeMusiciens.split("||").forEach(a=>{
            a.split("|").forEach(b=> {
                const t = b.split(",");
                if (this.selectedMusiciens[t[0]] == null) {
                    this.selectedMusiciens[t[0]] = [];
                }
                this.selectedMusiciens[t[0]].push({"id":t[1],"name":t[2],"is_holder":t[3]});
            });      
        });
    }

  }
}
</script>
<style>

.custom-tag {
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 5px;
  margin: 2px;
  color: white;
  font-size: 14px;
  cursor: pointer;
}
.close-x {
    display: inline-block;
    margin-left: 5px;
    color: #DDD;
}
.close-x:hover {
    
    color: #000;
}
</style>