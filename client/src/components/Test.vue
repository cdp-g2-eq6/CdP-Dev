<template>
  <div id="test" class="tile is-parent">
    <article class="tile is-child notification"
              v-bind:style="changeBackgroundColor(test.runs)">
      <p class="title mb-1">
        #{{test._id}}. {{test.title}} - Lié à #{{test.linkedTask}}
      </p>
      <div class="content">

        <b-tooltip position="is-bottom" size="is-large" multilined>
          <p> {{test.description}}  </p>
          <template v-slot:content>
            <b>Historique des tests: </b>
            <ul v-for="run in test.runs" v-bind:key="run.id">
              <li class="run">{{displayStatus(run)}}</li>
            </ul>
          </template>
        </b-tooltip>

        <button :disabled="edit" class="addBtn button is-dark"
              v-on:click="createDate()">
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
    edit: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    changeBackgroundColor(runs) {
      // TODO: find latest run and change color according to it instead of the
      // last one in the run list
      if (runs.length > 0) {
        if (runs[runs.length-1].passed) {
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
          runs: this.test.runs,
        },
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
        events: {
          'updateRuns': () => {
            this.$emit('updateTests');
          },
        },
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
