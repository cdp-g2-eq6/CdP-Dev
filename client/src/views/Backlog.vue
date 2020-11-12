<template>
  <div id="backlog">
    <div class="user-story" v-for="us in us_list" v-bind:key="us.id">
      <Issue :jsonIssue="us"></Issue>
    </div>

    <div class="add">
      <button class="button is-white m-4" @click="addNew">
        <b-icon pack="fas" size="fa-3x" icon="plus-circle"
                type="is-grey-dark"></b-icon>
      </button>
    </div>
  </div>
</template>

<script>
import Issue from '../components/Issue';

export default {
  name: 'Backlog',
  props: {
    jsonBacklog: {
      type: Object,
      required: true,
    },
  }, data() {
    return {
      us_list: this.jsonBacklog.us_list,
    };
  },
  components: {
    Issue,
  },
  methods: {
    addNew() {
      this.$buefy.dialog.alert('Here form to add new Issue');
    },
    update(newUsList) {
      this.us_list = newUsList;
    },
  },
};
</script>

<style>
.add {
  position: fixed;
  bottom: 10px;
  left: 270px;
}
</style>
