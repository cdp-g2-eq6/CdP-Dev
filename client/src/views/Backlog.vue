<template>
  <div id="backlog">
    <div class="user-story" v-for="us in us_list" v-bind:key="us.id">
      <Issue :jsonIssue="us"></Issue>
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
    update(newUsList) {
      this.us_list = newUsList;
    },
  },
};
</script>

<style>

</style>
