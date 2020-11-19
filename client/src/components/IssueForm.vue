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
         <button
             v-if="!isUpdate()"
             class="button is-primary"
             @click="save();">
           Valider
         </button>
         <div class="update" v-if="isUpdate()">
           <button
               class="button is-warning"
               @click="update();">
             Modifier
           </button>
           <button
               class="button is-danger"
               @click="erase();">
             {{isSprint() ? 'Retirer' : 'Supprimer'}}
           </button>
           <button class="button" @click="$emit('close')">
           Annuler
           </button>
         </div>
       </footer>
     </div>
   </form>
 </div>
</template>

<script>
import IssuesService from '@/services/IssuesService';
import SprintsService from '../services/SprintsService';

export default {
  name: 'IssueForm.vue',
  props: {
    sprint: {
      type: Object,
      required: false,
    },
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
    isUpdate() {
      return this.issue._id > -1;
    },
    isSprint() {
      return this.sprint !== undefined;
    },
    erase() {
      let title = 'Suppression de l\'issue';
      let message = 'Confirmez-vous la <b>Suppression</b> de cette issue?';
      let confirmText = 'Supprimer l\'issue';

      if (this.isSprint) {
        title = 'Retirer l\'issue du sprint';
        message = 'Confirmez-vous de <b>retirer</b> l\'issue du sprint (ainsi' +
                  ' que <b>toutes</b> ses tâches du kanban (leur status reste '+
                  'sauvegardé).';
        confirmText = 'Retirer l\'issue';
      }

      this.$buefy.dialog.confirm({
        title: title,
        message: message,
        confirmText: confirmText,
        cancelText: 'Annuler',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: async () => {
          this.$buefy.toast.open('Issue supprimée!');
          const loading = this.$buefy.loading.open({container: null});
          try {
            let resp;
            if (this.isSprint()) {
              const sprint = this.sprint;
              sprint.issues.splice(sprint.issues.indexOf(this.issue._id), 1);
              sprint.id = sprint._id;
              resp = await SprintsService.updateSprint(sprint);
            } else {
              resp = await IssuesService.deleteIssue({id: this.issue._id});
            }
            if (resp.data.success) {
              this.$buefy.toast.open(`Issue supprimée!`);
            } else {
              console.error(resp);
              this.$buefy.toast.open(`Erreur de suppression`);
            }
          } catch (err) {
            console.error(err);
            this.$buefy.toast.open(`Erreur de suppression`);
          }
          loading.close();
          this.$emit('updateIssueList');
          this.$emit('close');
        },
      });
    },
    async save() {
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

      const loading = this.$buefy.loading.open({container: null});
      try {
        const resp = await IssuesService.createIssue(dataForm);
        if (resp.data.success) {
          this.$buefy.toast.open(`Issue sauvegardée!`);
        } else {
          console.error(resp);
          this.$buefy.toast.open(`Erreur de sauvegarde`);
        }
      } catch (err) {
        console.error(err);
        this.$buefy.toast.open(`Erreur de sauvegarde`);
      }
      loading.close();
      this.$emit('updateIssueList');
      this.$emit('close');
    },
    async update() {
      const dataForm = {
        id: this.issue._id,
        title: this.title,
        description: {
          role: this.role,
          goal: this.goal,
          benefit: this.benefit,
        },
        difficulty: this.difficulty,
        priority: this.priority,
      };

      const loading = this.$buefy.loading.open({container: null});
      try {
        const resp = await IssuesService.updateIssue(dataForm);
        if (resp.data.success) {
          this.$buefy.toast.open(`Issue Modifiée!`);
        } else {
          console.error(resp);
          this.$buefy.toast.open(`Erreur de modification`);
        }
      } catch (err) {
        console.error(err);
        this.$buefy.toast.open(`Erreur de modification`);
      }
      loading.close();
      this.$emit('updateIssueList');
      this.$emit('close');
    },
  },
};

</script>

<style scoped>

</style>
