<template>
  <div id="Resume">
    <div class="Resumes"
         v-for="issue in issueList"
         v-bind:key="issue._id">
      <Resume issue=createIssueWithArgs(issue)>
      </Resume>
    </div>
  </div>
</template>

<script>
import Resume from '@/components/Resume';
import ProjectsService from '@/services/ProjectsService';

export default {
  name: 'Resume',
  props: {
    project: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {};
  },
  components: {
    Resume,
  },
  methods: {
    createIssueWithArgs: function(issue) {
      const listTask = [];
      for (const task of ProjectsService.getTasksOfProject(this.project)) {
        for (const issueInTask in task.linkedIssues) {
          if (issue._id == issueInTask) {
            const listTest = [];
            for (const test of ProjectsService.getTestsOfProject(
                this.project)) {
              if (test.linkedTask == task._id) {
                listTest.push(test);
              }
            }
            const taskAndTest = {
              task: task,
              tests: listTest,
            };
            listTask.push(taskAndTest);
          }
        }
      }
      const issueWithArgs = {
        issue: issue,
        tasks: listTask,
      };
      return issueWithArgs;
    },
  },
};
</script>

<style>

</style>
