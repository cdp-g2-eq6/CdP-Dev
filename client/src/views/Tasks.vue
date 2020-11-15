<template>
  <div id="tasks">
    <div class="user-story"
         v-for="task in taskList"
         v-bind:key="task._id">
      <Task
        :task="task"
        @click.native="updateTask(task._id)"></Task>
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
import Task from '../components/Task';
import TasksService from '../services/TasksService';

export default {
  name: 'Tasks',
  props: {},
  data() {
    return {
      taskList: [],
    };
  },
  components: {
    Task,
  },
  methods: {
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
    this.$nextTick(function() {
      // execute initialization code here (use self as being this)
      TasksService.getTasks().then((resp) => {
        self.taskList = resp.data.tasks;
      });
    });
  },
};
</script>

<style>

</style>
