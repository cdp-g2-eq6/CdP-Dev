<template>
  <div id="backlog">
    <div class="user-story"
         v-for="issue in issueList"
         v-bind:key="issue._id">
      <Issue
        :issue="issue"
        @click.native="updateIssue(issue._id)">
      </Issue>
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
import IssueForm from '../components/IssueForm';
import IssuesService from '@/services/IssuesService';

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
        const issue = {
          _id: -1,
          title: '',
          description: {
            role: '',
            goal: '',
            benefit: '',
          },
          difficulty: 1,
          priority: 0,
        };

        this.$buefy.modal.open({
          parent: this,
          component: IssueForm,
          props: {modalTitle: 'Création d\'une issue', issue: issue},
          hasModalCard: true,
          customClass: 'custom-class custom-class-2',
          trapFocus: true,
        });
      }
    },
    updateIssue(issueId) {
      if (this.$attrs.edit) {
        const self = this;
        this.$nextTick(async function() {
          // execute initialization code here (use self as being this)
          IssuesService.getIssue({id: issueId}).then((resp) => {
            self.$buefy.modal.open({
              parent: self,
              component: IssueForm,
              props: {
                modalTitle: 'Modification d\'une issue',
                issue: resp.data.issue,
              },
              hasModalCard: true,
              customClass: 'custom-class custom-class-2',
              trapFocus: true,
            });
          });
        });
      }
    },
  },
  mounted: function() {
    const self = this;
    this.$nextTick(async function() {
      // execute initialization code here (use self as being this)
      IssuesService.getIssues().then((resp) => {
        self.issueList = resp.data.issues;
        for (const issue of self.issueList) {
          IssuesService.getTasksOfIssue({id: issue._id}).then((resp) => {
            issue.linkedTasks = resp.data.tasks;
          });
        }
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
