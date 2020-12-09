<template>
  <div id="Overview">
    <p class="title">Résumé</p> <hr>
    <div class="user-story"
      v-for="issue in issueList"
      v-bind:key="issue._id">
        <Overview class="issue" :issue="issue"></Overview>
    </div>
  </div>
</template>

<script>
import Overview from '../components/Overview';
import ProjectsService from '@/services/ProjectsService';

export default {
  name: 'Overviews',
  props: {
    project: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      issueList: [],
    };
  },
  components: {
    Overview,
  },
  methods: {
    updateOverview() {
      const projectsParam = {id: this.project._id};
      const listIssueWithArgs = [];
      ProjectsService.getBacklogOfProject(projectsParam).then((resp) => {
        const listIssue = resp.data.backlog;
        for (const issue of listIssue) {
          const tasksWithTests = [];
          ProjectsService.getTasksOfProject({id: this.project._id}).then(
              (resp1) => {
                const taskList = resp1.data.tasks;
                for (const task of taskList) {
                  if (task.linkedIssues == issue._id) {
                    const tests = [];
                    ProjectsService.getTestsOfProject({id: this.project._id})
                        .then((resp) => {
                          const testList = resp.data.tests;
                          for (const test of testList) {
                            if (test.linkedTask == task._id) {
                              tests.push(test);
                            }
                          }
                        },
                        ).catch((err) => console.error(err));
                    const taskWithTests = {
                      overviewTask: task,
                      overviewTest: tests,
                    };
                    tasksWithTests.push(taskWithTests);
                  }
                }
                const issueWithArgs = {
                  overviewIssue: issue,
                  overviewTasks: tasksWithTests,
                };
                listIssueWithArgs.push(issueWithArgs);
              },
          ).catch(
              (err1) => console.error(error),
          );
        }
        this.issueList = listIssueWithArgs;
        console.log(this.issueList);
      },
      ).catch((err) => console.error(err));
    },
  },
  mounted: function() {
    const self = this;
    this.$nextTick(function() {
      self.updateOverview();
    });
  },
  watch: {
    project: function(newVal, oldVal) { // watch it
      this.updateOverview();
    },
  },
};
</script>

<style>
#Overview {
  padding-left: 20px;
  padding-top: 10px;
}
</style>
