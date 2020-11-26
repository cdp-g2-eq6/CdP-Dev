<template>
  <div class="backlogForm">
    <form>
      <div class="modal-card" >
        <header class="modal-card-head">
          <p class="modal-card-title">{{modalTitle}}</p>
        </header>
        <section class="modal-card-body" v-if="newRuns.length != 0">
          <div v-for="(run, idx) in newRuns" v-bind:key="idx">
            <div class="date">
              <b-field :label="'test #' + idx">
                <b-datepicker
                    v-model="run.runDate"
                    locale="fr-FR"
                    placeholder="Date du test..."
                    icon="calendar-alt"
                    trap-focus>
                </b-datepicker>
              </b-field>
              <div class="field">
                <b-switch v-model="run.passed" type="is-success">
                  Success
                </b-switch>
              </div>
            </div>
          </div>
        </section>
        <section class="modal-card-body" v-else>
          <i>Il n'existe aucun passage pour ce test</i>
        </section>

        <section class="modal-card-body">
          <hr>
          <div class="date">
            <b-field label="Créer un nouveau passage">
              <b-datepicker
                  v-model="newRunDate"
                  locale="fr-FR"
                  placeholder="date ..."
                  icon="calendar-alt"
                  trap-focus>
              </b-datepicker>
            </b-field>
            <div class="field">
              <b-switch v-model="newRunPassed" type="is-success">
                Success
              </b-switch>
            </div>
          </div>
          <br>
          <button class="button" @click="addNewRun()">Ajouter</button>
        </section>

        <footer class="modal-card-foot">
          <button class="button" @click="$emit('close')">Annuler</button>
          <button class="button" @click="save()">Valider</button>
        </footer>

      </div>
    </form>
  </div>
</template>

<script>

import TestsService from '@/services/TestsService';

export default {
  name: 'DateForm',
  props: {
    modalTitle: {
      type: String,
      required: true,
    },
    test: {
      type: Object,
      required: true,
    },
    runs: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      newRuns: [],
      newRunDate: new Date(),
      newRunPassed: false,
    };
  },
  methods: {
    async save() {
      const dataForm = {
        id: this.test._id,
        title: this.test.title,
        description: this.test.description,
        linkedTask: this.test.linkedTask,
        runs: this.newRuns, // les nouveaux runs
      };

      const loading = this.$buefy.loading.open({container: null});
      try {
        const resp = await TestsService.updateTest(dataForm);
        if (resp.data.success) {
          this.$buefy.toast.open(`Test Modifiée!`);
        } else {
          console.error(resp);
          this.$buefy.toast.open(`Erreur de modification`);
        }
      } catch (err) {
        console.error(err);
        this.$buefy.toast.open(`Erreur de modification`);
      }
      loading.close();
      this.$emit('updateRuns');
      this.$emit('close');
    },
    addNewRun() {
      this.newRuns.push({
        runDate: this.newRunDate,
        passed: this.newRunPassed,
      });
    },
  },
  mounted: function() {
    const self = this;
    this.$nextTick(function() {
      for (const run of self.runs) {
        run.runDate = new Date(run.runDate);
        self.newRuns.push(run);
      }
    });
  },
};
</script>

<style scoped>
.modal-card {
  min-height: 600px;
}
</style>
