<template>
  <div id="sprintOverview">
    <p>
      <b>Sprint {{sprint._id}}: </b>
      Du {{getDate(sprint.startDate)}} jusqu'au
      {{getDate(sprint.endDate)}}
    </p>

<!--    issues progression-->
    <div class="issues">
      <p>User stories: </p>
      <b-progress format="percent" size="is-large" :max="issues.total">
        <b-progress-bar slot="bar" :value="issues.done"
                        size="is-large" type="is-danger" show-value>
           {{getPercent(issues.done, issues.total)}}%
          ({{issues.done}}/{{issues.total}})
        </b-progress-bar>
      </b-progress>
    </div>

<!--    tasks progression-->
    <div class="tasks">
      <p>Tâches:</p>
      <b-progress format="percent" size="is-large" :max="tasks.total">
        <b-progress-bar slot="bar" :value="tasks.done"
                        type="is-info" show-value>
          {{getPercent(tasks.done, tasks.total)}}% (Done)
        </b-progress-bar>
        <b-progress-bar slot="bar" :value="tasks.testing"
                        type="is-primary" show-value>
          {{getPercent(tasks.testing, tasks.total)}}% (Testing)
        </b-progress-bar>
        <b-progress-bar slot="bar" :value="tasks.inProgress"
                        type="is-warning" show-value>
          {{getPercent(tasks.inProgress, tasks.total)}}% (inProgress)
        </b-progress-bar>
      </b-progress>
    </div>
  </div>
</template>

<script>
import IssuesService from '@/services/IssuesService';
import TasksService from '@/services/TasksService';

const tasksEx = {
  total: 10,
  done: 3,
  inProgress: 2,
  testing: 4,
};

const issuesEx = {
  total: 10,
  done: 2,
};

export default {
  name: 'SprintOverview.vue',
  props: {
    sprint: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      issueList: [],
      tasks: tasksEx,
      issues: issuesEx,
    };
  },
  methods: {
    getPercent(value, total) {
      return value * 100 / total;
    },
    getDate(date) {
      date = new Date(date);
      let dateStr = date.getDate() + '/';
      dateStr += date.getMonth() + '/';
      dateStr += date.getFullYear();
      return dateStr;
    },
    async getTask(id) {
      try {
        return await TasksService.getTask({id: id});
      } catch (err) {
        console.error(err);
      }
    },
    async getTasksOfIssue(id) {
      try {
        return await IssuesService.getTasksOfIssue({id: id});
      } catch (err) {
        console.error(err);
      }
    },
    getIssuesProgress() { // get number of done issues
      let doneIssues = 0;
      for (const issue of this.issueList) {
        let isDone = true;
        for (const taskId of issue.linkedTasks) {
          console.log(false);
          this.getTask(taskId).then((resp) => {
            const task = resp.data.task;
            console.log(task.status);
            if (task.status !== 2) {
              isDone = false;
              // break;
            }
          });
        }
        if (isDone) { // All tasks linked to that issue must be done
          doneIssues++;
        }
      }
      return doneIssues;
    },
    getTasksProgress() {
      // let done = 0;
      // let inProgress = 0;
      // let toDo = 0;
      // for (const issue of this.issueList) {
      //   for (const taskId of issue.linkedTasks) {
      //     TasksService.getTask({id: taskId}).then((resp) => {
      //       for (const task of resp.data.tasks) {
      //         switch (task.status) {
      //           case 0:
      //             toDo++;
      //             break;
      //           case 1:
      //             inProgress++;
      //             break;
      //           case 2:
      //             done++;
      //             break;
      //         }
      //       }
      //     });
      //   }
      //   return {done: done, toDo: toDo, inProgress: inProgress};
      // }
    },
    updateSprint() {
      this.issueList.forEach((issue) => {
        issue.linkedTasks = [];
        this.getTasksOfIssue(issue._id).then((resp) => {
          issue.linkedTasks.push(resp.data.tasks);
        }).catch((err) => console.error(err));
      });
    },
  },
  mounted() {
    const self = this;
    this.$nextTick(function() {
      self.issueList = self.sprint.issueList;
      console.log('Après cette ligne ça ne va plus...');
      self.issueList.forEach((issue) => {
        issue.linkedTasks = [];
      });
      self.updateSprint();
    });
  },
};
</script>

<style scoped>
#sprintOverview {
  margin-bottom: 16px;
}
.tasks, .issues {
  width: 70%;
  margin: 8px 16px;
}
</style>
