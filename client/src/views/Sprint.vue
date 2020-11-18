<template>
  <div id="sprint">
    <h1 class="title">Sprint {{ $route.params.id }}</h1>

    <div class="columns">
      <div class="column">
        <div class="column-title">To do</div>
        <div class="column-content">
          <!-- To do tasks go here -->
          <div v-for="task of toDoTasks" v-bind:key="task._id">
            <TaskKanban :task="task" @click.native="updateTask(task._id)">
            </TaskKanban>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="column-title">In progress</div>
        <div class="column-content">
          <!-- In progress tasks go here -->
          <div v-for="task of inProgressTasks" v-bind:key="task._id">
            <TaskKanban :task="task" @click.native="updateTask(task._id)">
            </TaskKanban>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="column-title">Done</div>
         <div class="column-content">
          <!-- Done tasks go here -->
          <div v-for="task of doneTasks" v-bind:key="task._id">
            <TaskKanban :task="task" @click.native="updateTask(task._id)">
            </TaskKanban>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskKanban from '../components/TaskKanban';
import IssuesService from '../services/IssuesService';
import SprintsService from '../services/SprintsService';
import TasksService from '../services/TasksService';

// Sprint nb: $route.params.id
export default {
  name: 'Sprint',
  props: {},
  components: {
    TaskKanban,
  },
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
    createTask() {
      if (this.$attrs.edit) {
        this.$buefy.dialog.alert('Here form to add new Task');
      }
    },
    updateTask(taskId) {
      if (this.$attrs.edit) {
        this.$buefy.dialog.alert(
            'Here you can modify/delete the Task ' + taskId,
        );
      }
    },
  },
  mounted: function() {
    const self = this;
    const sprintNumber = this.$route.params.id;
    this.$nextTick(async function() {
      // Finds the issues for this sprint
      // And finds their tasks and put them in the right columns
      // NOT TESTED YET!
      SprintsService.getSprint({number: sprintNumber}).then((resp) => {
        self.issuesForThisSprint = resp.data.sprint.issues;
        for (const issueId of self.issuesForThisSprint) {
          IssuesService.getTasksOfIssue({id: issueId}).then((resp) => {
            for (const task of resp.data.tasks) {
              switch (task.status) {
                case 0: self.toDoTasks.push(task); break;
                case 1: self.inProgressTasks.push(task); break;
                case 2: self.doneTasks.push(task); break;
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
  margin: 20px;
}

.column {
  padding: 0 !important;
  background: #4C566A;
  border-radius: 5px;
  min-height: 500px;
  margin: 0.75rem;
}

.column-content {
  color: #ECEFF4;
  padding: 5px 0 5px 0;
  max-height: 700px;
  overflow-y: auto;
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
