<template>
  <div id="backlog">
    <div class="user-story"
         v-for="issue in issueList"
         v-bind:key="issue._id">
      <Issue
        :issue="issue"
        @click.native="updateIssue(issue._id)"></Issue>
    </div>

    <div class="add" v-if="$attrs.edit">
      <button class="button is-white m-4" @click="createIssue">
        <b-icon pack="fas" size="fa-3x" icon="plus-circle"
                type="is-grey-dark"></b-icon>
      </button>
    </div>
  </div>
</template>

<script>
import Issue from '../components/Issue';
import IssuesService from '../services/IssuesService';

export default {
  name: 'Backlog',
  props: {},
  data() {
    return {
      issueList: [],
    };
  },
  components: {
    Issue,
  },
  methods: {
    createIssue() {
      if (this.$attrs.edit) {
        this.$buefy.dialog.alert('Here form to add new Issue');
      }
    },
    updateIssue(issueId) {
      if (this.$attrs.edit) {
        this.$buefy.dialog.alert(
            'Here you can modify/delete the Issue ' + issueId,
        );
      }
    },
  },
  mounted: function() {
    const self = this;
    this.$nextTick(function() {
      // execute initialization code here (use self as being this)
      IssuesService.getIssues().then((resp) => {
        self.issueList = resp.data.issues;
      });
    });
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
