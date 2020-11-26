<template>
  <div id="test" class="tile is-parent">
    <article class="tile is-child notification"
              v-bind:style="changeBackgroundColor(test.runs)">
      <p class="title mb-1"> #{{id}}. {{title}} - Lié à #{{linkedTask}}</p>
      <div class="content">

        <b-tooltip position="is-bottom" size="is-large" multilined>
          <p> {{description}}  </p>
          <template v-slot:content>
            <b>Historique des tests: </b>
            <ul v-for="run in runs" v-bind:key="run.id">
              <li class="run">{{displayStatus(run)}}</li>
            </ul>
          </template>
        </b-tooltip>

        <button class="addBtn button is-dark" v-on:click="createDate()">
          <b-icon pack="fas" icon="calendar-alt" size="is-medium"></b-icon>
          <span>Ajouter</span>
        </button>
      </div>
    </article>
  </div>
</template>

<script>
import DateForm from '@/components/DateForm';
export default {
  name: 'Test',
  props: {
    test: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      id: this.test._id,
      title: this.test.title,
      description: this.test.description,
      linkedTask: this.test.linkedTask,
      runs: this.test.runs,
    };
  },
  methods: {
    changeBackgroundColor(runs) {
      if (runs.length > 0) {
        if (runs[0].passed) {
          return 'background-color: #A3BE8C';
        } else {
          return 'background-color: #BF616A';
        }
      }
      return 'background-color: #D08770';
    },
    displayStatus(run) {
      let result = 'echec';
      if (run.passed) {
        result = 'success';
      }
      return 'Date: ' + (new Date(run.runDate)).toLocaleDateString('fr-FR') +
             ' résultat : ' + result;
    },
    createDate() {
      this.$buefy.modal.open({
        parent: this,
        component: DateForm,
        props: {
          modalTitle: 'Ajout d\'une date',
          test: this.test,
          runs: this.runs,
        },
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
      });
    },
  },
};
</script>

<style scoped>
  #test{
    width: 100%;
  }

  .addBtn {
    position: absolute;
    top: 10px;
    right: 10px;
  }
</style>
