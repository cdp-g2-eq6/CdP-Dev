<template>
  <div id="test" class="tile is-parent">
    <article class="tile is-child notification"
              v-bind:style="changeBackgroundColor(status)">
      <p class="title mb-1">
        #{{_id}}. {{title}} - {{linkedTask}}
        <button
            class="button is-primary" @click="createDate">
          add date
        </button>
      </p>
      <div class="content">

        <b-tooltip position="is-bottom" type="is-dark" size="is-small"
                   multilined>
          <span v-if="!collapseOpen">
            <span v-if="description.length > maxDescriptionLength">
              {{description.substring(0, maxDescriptionLength)}}...
            </span>
            <span v-else>
              {{description}}
            </span>
          </span>

          <b-collapse v-if="description.length > maxDescriptionLength"
            :open.sync="collapseOpen" position="is-bottom" aria-id="expandDesc">
              <a slot="trigger" slot-scope="collapse" aria-controls="expandDesc"
              >
                <b-icon :icon="!collapse.open ? 'caret-down' : 'caret-up'">
                </b-icon>
              </a>
              <p>
                  {{description}}
              </p>
          </b-collapse>
        </b-tooltip>
      </div>
    </article>
  </div>
</template>

<script>
import DateForm from '@/components/DateForm';
export default {
  name: 'Test',
  props: {
    _id: String,
    title: String,
    status: Boolean,
    linkedTask: String,
    description: String,
  },
  data() {
    return {
      maxDescriptionLength: 50,
      collapseOpen: false,
    };
  },
  components: {},
  methods: {
    changeBackgroundColor(status) {
      if (status) {
        return 'background-color: #00FF00';
      }
      return 'background-color: #FF0000';
    },
    createDate() {
      const test = {
        _id: -1,
        title: '',
        status: 0,
      };
      this.$buefy.modal.open({
        parent: this,
        component: DateForm,
        props: {
          modalTitle: 'Création d\'une date',
          test: test,
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
  #addDates {
    margin-top: 10px;
    margin-left: 300px;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  #test{
    width: max-content;
  }

</style>
