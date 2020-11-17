<template>
 <div class="backlogForm">
   <form>
     <div class="modal-card" >
       <header class="modal-card-head">
         <p class="modal-card-title">{{modalTitle}}</p>
       </header>
       <section class="modal-card-body">
         <b-field label="Titre">
           <b-input
               :value="title"
               v-model="title"
               placeholder="Titre de votre Issue"
               required>
           </b-input>
         </b-field>

         <b-field label="Description">
           <b-input
               :value="role"
               v-model="role"
               placeholder="En tant que" required>
           </b-input>
         </b-field>
         <b-field>
           <b-input
               :value="goal"
               v-model="goal"
               placeholder="je souhaite" required>
           </b-input>
         </b-field>
         <b-field>
           <b-input
                :value="benefit"
                v-model="benefit"
                placeholder="Afin de" required>
           </b-input>
         </b-field>

         <b-field label="Difficulté">
           <b-select
               :value="difficulty"
               v-model="difficulty"
               placeholder="Sélectionner une échelle">
             <option value="1">1</option>
             <option value="2">2</option>
             <option value="3">3</option>
             <option value="5">5</option>
             <option value="8">8</option>
             <option value="13">13</option>
             <option value="21">21</option>
             <option value="34">34</option>
             <option value="55">55</option>
           </b-select>
         </b-field>

         <b-field label="Importance">
           <b-select
               :value="priority"
               v-model="priority"
               placeholder="Sélectionner une priorité">
             <option value="0">Minimale</option>
             <option value="1">Moyenne</option>
             <option value="2">Maximale</option>
           </b-select>
         </b-field>

       </section>
       <footer class="modal-card-foot">
         <button class="button" @click="$emit('close')">
           Annuler
         </button>
         <button class="button is-primary" @click="save(); $emit('close')">
           Valider
         </button>
       </footer>
     </div>
   </form>
 </div>
</template>

<script>
import IssuesService from '@/services/IssuesService';

export default {
  name: 'IssueForm.vue',
  props: {
    modalTitle: {
      type: String,
      required: true,
    },
    issue: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      title: this.issue.title,
      role: this.issue.description.role,
      goal: this.issue.description.goal,
      benefit: this.issue.description.benefit,
      difficulty: this.issue.difficulty,
      priority: this.issue.priority,
    };
  },
  methods: {
    save() {
      const dataForm = {
        title: this.title,
        description: {
          role: this.role,
          goal: this.goal,
          benefit: this.benefit,
        },
        difficulty: this.difficulty,
        priority: this.priority,
      };
      IssuesService.createIssue(dataForm);
    },
  },
};

</script>

<style scoped>

</style>
