<template>
  <div id="sprintOverview">
    <p>
      <b>Sprint {{sprint.number}}: </b>
      Du {{getDate(sprint.startDate)}} jusqu'au
      {{getDate(sprint.endDate)}}
    </p>

<!--    issues progression-->
    <div class="issues">
      <p>User stories: </p>
      <b-progress format="percent" size="is-large" :max="issuesStats.total">
        <b-progress-bar slot="bar" :value="issuesStats.done"
                        size="is-large" type="is-primary"
                        :show-value="issuesStats.done>0">
          <span v-if="issuesStats.done>0">
           {{getPercent(issuesStats.done, issuesStats.total)}}%
          ({{issuesStats.done}}/{{issuesStats.total}})
          </span>
        </b-progress-bar>
      </b-progress>
    </div>

<!--    tasks progression-->
    <div class="tasks">
      <p>Tâches:</p>
      <b-progress format="percent" size="is-large" :max="tasksStats.total">
        <b-progress-bar slot="bar" :value="tasksStats.todo"
                        type="is-danger" :show-value="tasksStats.inProgress>0">
          <span v-if="tasksStats.inProgress>0">
            {{getPercent(tasksStats.inProgress, tasksStats.total)}}% (To do)
          </span>
        </b-progress-bar>
        <b-progress-bar slot="bar" :value="tasksStats.inProgress"
                        type="is-warning" :show-value="tasksStats.inProgress>0">
          <span v-if="tasksStats.inProgress>0">
          {{getPercent(tasksStats.inProgress, tasksStats.total)}}% (In progress)
          </span>
        </b-progress-bar>
        <b-progress-bar slot="bar" :value="tasksStats.done"
                        type="is-success" :show-value="tasksStats.done>0">
          <span v-if="tasksStats.done>0">
            {{getPercent(tasksStats.done, tasksStats.total)}}% (Done)
          </span>
        </b-progress-bar>
      </b-progress>
    </div>
  </div>
</template>

<script>
import IssuesService from '@/services/IssuesService';

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
      tasksStats: {
        total: 0,
        done: 0,
      },
      issuesStats: {
        total: 0,
        done: 0,
        inProgress: 0,
        todo: 0,
      },
    };
  },
  methods: {
    getPercent(value, total) {
      return Math.round(value * 100 / total);
    },
    getDate(date) {
      date = new Date(date);
      let dateStr = date.getDate() + '/';
      dateStr += date.getMonth() + '/';
      dateStr += date.getFullYear();
      return dateStr;
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
    async updateSprintInfo() {
      const issues = [];
      const tasks = [];

      for (const issueId of this.sprint.issues) {
        try {
          const r = await IssuesService.getIssue({id: issueId});
          issues.push(r.data.issue);
        } catch (err) {
          console.error(err);
        }

        try {
          const r = await IssuesService.getTasksOfIssue({id: issueId});
          for (const task of r.data.tasks) {
            tasks.push(task);
          }
        } catch (err) {
          console.error(err);
        }
      }

      this.issuesStats = {
        total: 0,
        done: 0,
      };

      this.tasksStats = {
        total: 0,
        done: 0,
        inProgress: 0,
        todo: 0,
      };

      for (const issue of issues) {
        if (issue.dateDone != null) {
          this.issuesStats.done ++;
        }
        this.issuesStats.total ++;
      }

      for (const task of tasks) {
        if (task.status == 0) {
          this.tasksStats.todo ++;
        } else if (task.status == 1) {
          this.tasksStats.inProgress ++;
        } else if (task.status == 2) {
          this.tasksStats.done ++;
        }
        this.tasksStats.total ++;
      }
    },
  },
  mounted() {
    const self = this;
    this.$nextTick(function() {
      self.updateSprintInfo();
    });
  },
  watch: {
    sprint: function(newVal, oldVal) {
      this.updateSprintInfo();
    },
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
