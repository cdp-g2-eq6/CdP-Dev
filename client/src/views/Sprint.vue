<template>
  <div id="sprint">
    <h1 class="title">Sprint {{ $route.params.id }}</h1>

    <div class="columns">
      <div class="column">
        <div class="column-title">To do</div>
        <!-- To do tasks go here, example: -->
        <!-- <div v-for="task of toDoTasks">  <KanbanTask task="task"/></div>-->
      </div>
      <div class="column">
        <div class="column-title">In progress</div>
        <!-- In progress tasks go here -->
      </div>
      <div class="column">
        <div class="column-title">Done</div>
        <!-- Done tasks go here -->

      </div>
    </div>
  </div>
</template>

<script>
import IssuesService from '../services/IssuesService';
import TasksService from '../services/TasksService';

// Sprint nb: $route.params.id
export default {
  name: 'Sprint',
  props: {},
  data() {
    return {
      issuesForThisSprint: [],
      toDoTasks: [],
      inProgressTasks: [],
      doneTasks: [],
    };
  },
  methods: {
    onTaskMoved(taskId, newStatus) {
      // Todo: update that task
      // NOT TESTED YET!
      TasksService.getTask({id: taskId}).then((resp) => {
        const task = resp.data.task;
        task.status = newStatus;
        TasksService.updateTask(task);
      });
    },
  },
  mounted: function() {
    const self = this;
    this.$nextTick(async function() {
      // Finds the issues for this sprint
      // And finds their tasks and put them in the right columns
      // NOT TESTED YET!
      IssuesService.getIssuesForSprint({id: $route.params.id}).then((resp) => {
        self.issueList = resp.data.issues;
        for (const issue of self.issueList) {
          IssuesService.getTasksOfIssue({id: issue._id}).then((resp) => {
            for (const task of resp.data.tasks) {
              switch (task.status) {
                case 0: toDoTasks.append(task); break;
                case 1: inProgressTasks.append(task); break;
                case 2: doneTasks.append(task); break;
              }
            }
          });
        }
      });
    });
  },
};
</script>

<style>

#sprint {
  margin-left: 20px;
}

.column {
  padding: 0;
  background: #4C566A;
  border-radius: 5px;
  min-height: 500px;
  margin: 0.75rem;
}

.column-title {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background: #3B4252;
  color: #ECEFF4;
  font-size: x-large;
  text-align: center;
  padding-bottom: 5px;
}
</style>
