<template>
  <div id="sprint">
    <h1 class="title">Sprint {{ $route.params.id }}</h1>

    <div class="sprint-description">
      Du {{sprint.startDate.getDay()}}/{{sprint.startDate.getMonth()}}
      au {{sprint.endDate.getDay()}}/{{sprint.endDate.getMonth()}}.
      <a href="#" v-if="$attrs.edit" @click="updateDates">
        (changer)
      </a>
    </div>

    <!-- Kanban -->
    <div class="subtitle">
      Kanban
    </div>
    <div class="columns">
      <div class="column">
        <div class="column-title">To do</div>
        <div class="column-content">
          <!-- To do tasks go here -->
          <div v-for="task of toDoTasks" v-bind:key="task._id">
            <TaskKanban :task="task" @click.native="clickTask(task._id)">
            </TaskKanban>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="column-title">In progress</div>
        <div class="column-content">
          <!-- In progress tasks go here -->
          <div v-for="task of inProgressTasks" v-bind:key="task._id">
            <TaskKanban :task="task" @click.native="clickTask(task._id)">
            </TaskKanban>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="column-title">Done</div>
         <div class="column-content">
          <!-- Done tasks go here -->
          <div v-for="task of doneTasks" v-bind:key="task._id">
            <TaskKanban :task="task" @click.native="clickTask(task._id)">
            </TaskKanban>
          </div>
        </div>
      </div>
    </div>

    <!-- Issues list -->
    <div class="subtitle">
      Issues à implementer
      <a href="#" v-if="$attrs.edit" @click="addIssue">
        (en ajouter une)
      </a>
    </div>

    <div class="issue-list">
      <div class="issue-list-content">
        <div v-for="issue of issuesForThisSprint" v-bind:key="issue._id">
          <Issue :issue="issue" @click.native="updateIssue(issue._id)"></Issue>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Components
import TaskKanban from '../components/TaskKanban';
import Issue from '../components/Issue';

// Services
import IssuesService from '../services/IssuesService';
import SprintsService from '../services/SprintsService';
import TasksService from '../services/TasksService';

// Sprint nb: $route.params.id
export default {
  name: 'Sprint',
  props: {},
  components: {
    TaskKanban,
    Issue,
  },
  data() {
    return {
      sprint: {
        // prevents console error
        startDate: new Date(),
        endDate: new Date(),
      },
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
    addIssue() {
      this.$buefy.dialog.alert('todo');
    },
    updateDates() {
      this.$buefy.dialog.alert('todo');
    },
    clickTask(taskId) {
      if (this.$attrs.edit) {
        this.$buefy.dialog.alert('todo: update task form');
      } else {
        this.$buefy.dialog.alert('todo: show task details');
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
        resp.data.sprint.startDate = new Date(resp.data.sprint.startDate);
        resp.data.sprint.endDate = new Date(resp.data.sprint.endDate);
        self.sprint = resp.data.sprint;

        const issuesIdsForThisSprint = resp.data.sprint.issues;
        for (const issueId of issuesIdsForThisSprint) {
          IssuesService.getTasksOfIssue({id: issueId}).then((resp) => {
            for (const task of resp.data.tasks) {
              switch (task.status) {
                case 0: self.toDoTasks.push(task); break;
                case 1: self.inProgressTasks.push(task); break;
                case 2: self.doneTasks.push(task); break;
              }
            }
          });
          IssuesService.getIssue({id: issueId}).then((resp) => {
            if (resp.data.success) {
              self.issuesForThisSprint.push(resp.data.issue);
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

#sprint .title {
  color: #ECEFF4 !important;
}

#sprint .subtitle {
  color: #ECEFF4 !important;
}

#sprint a {
  color: #8FBCBB !important;
}

#sprint a:hover {
  color: #88C0D0 !important;
}

.sprint-description {
  color: #ECEFF4;
  margin-bottom: 20px;
}

.column {
  padding: 0 !important;
  background: #434C5E;
  border-radius: 5px;
  min-height: 500px;
  margin: 0.75rem;
}

.column-content {
  color: #ECEFF4;
  padding: 5px 0 5px 0;
  max-height: 700px;
  overflow-y: auto;
  overflow-x: hidden;
}

.column-title {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background: #2E3440;
  color: #ECEFF4;
  font-size: x-large;
  text-align: center;
  padding-bottom: 5px;
}

.issue-list {
  overflow-y: auto;
  padding-bottom: 20px;
}

.issue-list .issue-list-content {
  border-left: 5px solid #2E3440;
  max-height: 300px;
}

.issue-list .issue-list-content .tile .title {
  font-size: large;
}

.issue-list .issue-list-content .tile .content {
  font-size: small;
}

.issue-list .issue-list-content .tile {
  color: #ECEFF4 !important;
  background: #3B4252 !important;
}

.issue-list .tile.is-parent {
  font-size: large;
  padding: 0px !important;
  margin-bottom: 2px;
}
</style>
