<template>
  <div id="tasks">
    <div class="user-story"
         v-for="task in taskList"
         v-bind:key="task._id">
      <Task
        :task="task"
        @click.native="updateTask(task._id)">
      </Task>
    </div>

    <div class="add" v-if="$attrs.edit">
      <button class="button is-white m-4" @click="createTask">
        <b-icon pack="fas" size="fa-3x" icon="plus-circle"
                type="is-grey-dark"></b-icon>
      </button>
    </div>
  </div>
</template>

<script>
import Task from '@/components/Task';
import TaskForm from '@/components/TaskForm';
import TasksService from '@/services/TasksService';
import IssuesService from '@/services/IssuesService';

export default {
  name: 'Tasks',
  props: {},
  data() {
    return {
      taskList: [],
      issueList: [],
    };
  },
  components: {
    Task,
  },
  methods: {
    createTask() {
      if (this.$attrs.edit) {
        const task = {
          _id: -1,
          title: '',
          description: '',
          linkedIssues: [],
          participants: [],
          cost: 1,
          status: 0,
        };

        this.$buefy.modal.open({
          parent: this,
          component: TaskForm,
          props: {
            modalTitle: 'Création d\'une tâche',
            task: task,
            issueList: this.issueList,
          },
          hasModalCard: true,
          customClass: 'custom-class custom-class-2',
          trapFocus: true,
          events: {
            'updateTaskList': () => {
              this.updateTaskList();
            },
          },
        });
      }
    },
    updateTask(taskId) {
      if (this.$attrs.edit) {
        // execute initialization code here (use self as being this)
        TasksService.getTask({id: taskId}).then((resp) => {
          this.$buefy.modal.open({
            parent: this,
            component: TaskForm,
            props: {
              modalTitle: 'Modification d\'une tâche',
              task: resp.data.task,
              issueList: this.issueList,
            },
            hasModalCard: true,
            customClass: 'custom-class custom-class-2',
            trapFocus: true,
            events: {
              'updateTaskList': () => {
                this.updateTaskList();
              },
            },
          });
        });
      }
    },
    updateTaskList() {
      TasksService.getTasks().then((resp) => {
        this.taskList = resp.data.tasks;
      });
    },
    getIssueList() {
      IssuesService.getIssues().then((resp) => {
        this.issueList = resp.data.issues;
      });
    },
  },
  mounted: function() {
    const self = this;
    this.$nextTick(function() {
      self.updateTaskList();
      self.getIssueList();
    });
  },
};
</script>

<style>

</style>
