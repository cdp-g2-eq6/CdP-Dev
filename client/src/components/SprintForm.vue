<template>
 <div class="backlogForm">
   <form>
     <div class="modal-card" >
       <header class="modal-card-head">
         <p class="modal-card-title">{{modalTitle}}</p>
       </header>
       <section class="modal-card-body">
        <b-field label="Date de début">
          <b-datepicker
              v-model="startDate"
              show-week-number
              locale="fr-FR"
              placeholder="Date de début..."
              icon="calendar-alt"
              trap-focus>
          </b-datepicker>
        </b-field>
        <b-field label="Date de fin">
          <b-datepicker
              v-model="endDate"
              show-week-number
              locale="fr-FR"
              placeholder="Date de fin..."
              icon="calendar-alt"
              trap-focus>
          </b-datepicker>
        </b-field>

       </section>
       <footer class="modal-card-foot">
          <button class="button is-warning"
            @click="update();" :loading="saving">
            Modifier
          </button>
          <button class="button" @click="$emit('close')">
            Annuler
          </button>
       </footer>
     </div>
   </form>
 </div>
</template>

<script>
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
  },
  data() {
    return {
      saving: false,
      startDate: this.sprint.startDate,
      endDate: this.sprint.endDate,
    };
  },
  methods: {
    async update() {
      const sprint = this.sprint;
      sprint.startDate = this.startDate.toJSON();
      sprint.endDate = this.endDate.toJSON();
      sprint.id = sprint._id;

      this.saving = true;
      try {
        const resp = await SprintsService.updateSprint(sprint);
        if (resp.data.success) {
          this.$buefy.toast.open('Sprint sauvegardée!');
        } else {
          console.error(resp);
          this.$buefy.toast.open('Erreur de sauvegarde');
        }
      } catch (err) {
        console.error(err);
        this.$buefy.toast.open('Erreur de sauvegarde');
      }
      this.saving = false;
      this.$emit('update');
      this.$emit('close');
    },
  },
};

</script>

<style scoped>

.modal-card {
  min-height: 600px;
}
</style>
