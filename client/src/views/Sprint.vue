<template>
  <div id="sprint">
    <h1 class="title">
      <b-button v-if="$attrs.edit" type="is-warning" @click="updateSprint"
        :loading="updatingSprint">
        Modifier
      </b-button>
      Sprint {{ $route.params.id }}
    </h1>

    <div class="sprint-description">
      Du {{
        sprint.startDate === undefined ||
        sprint.startDate.toLocaleDateString === undefined ?
        'non defini' : sprint.startDate.toLocaleDateString('fr-FR')
      }}
      au {{
        sprint.endDate === undefined ||
        sprint.endDate.toLocaleDateString === undefined ?
        'non defini' : sprint.endDate.toLocaleDateString('fr-FR')
      }}.
    </div>

    <!-- Kanban -->
    <div class="subtitle">
      Kanban
    </div>
    <div class="columns kanban">
      <div class="column"
        id="toDo" @dragover.prevent @drop.prevent="drop($event, 0)">
        <div class="column-title">To do</div>
        <div class="column-content">
          <!-- To do tasks go here -->
          <div v-for="(task, index) in toDoTasks" v-bind:key="index">
            <div class="drag" :id="'task-'+task._id"
                @dragstart="dragStart($event, 0)" draggable="true"
                @dragover.stop @dragend="dragEnd">
              <TaskKanban :task="task" @click.native="clickTask(task._id)">
              </TaskKanban>
            </div>
          </div>
        </div>
      </div>
      <div class="column"
        id="inProgress" @dragover.prevent @drop.prevent="drop($event, 1)">
        <div class="column-title">In progress</div>
        <div class="column-content">
          <!-- In progress tasks go here -->
          <div v-for="(task, index) in inProgressTasks" v-bind:key="index">
            <div class="drag" :id="'task-'+task._id"
                @dragstart="dragStart($event, 1)" draggable="true"
                @dragover.stop @dragend="dragEnd">
              <TaskKanban :task="task" @click.native="clickTask(task._id)">
              </TaskKanban>
            </div>
          </div>
        </div>
      </div>
      <div class="column"
        id="done" @dragover.prevent @drop.prevent="drop($event, 2)">
        <div class="column-title">Done</div>
         <div class="column-content">
          <!-- Done tasks go here -->
          <div v-for="(task, index) in doneTasks" v-bind:key="index">
            <div class="drag" :id="'task-'+task._id"
                @dragstart="dragStart($event, 2)" draggable="true"
                @dragover.stop @dragend="dragEnd">
              <TaskKanban :task="task" @click.native="clickTask(task._id)">
              </TaskKanban>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Issues list -->
    <div class="subtitle">
      Issues à implementer ({{issuesForThisSprint.length}})
    </div>

    <div v-if="$attrs.edit">
      <b-taginput
        :disabled="issuesWithoutSprint.length===0"
        v-model="issuesToAdd"
        :data="filteredIssues"
        autocomplete
        :allow-new="false"
        :open-on-focus="true"
        field="displayText"
        icon="tag"
        :placeholder="issuesWithoutSprint.length===0 ? 'Aucune issue disponible'
                      : 'Ajouter des issues au sprint'"
        @typing="getFilteredIssues">
      </b-taginput>
      <br>
      <b-button type="is-success" @click="addIssues"
        :disabled="issuesToAdd.length===0" :loading="addingIssues">
        Ajouter
      </b-button>
    </div>
    <br>

    <div class="issue-list">
      <div class="issue-list-content">
        <div v-for="(issue, index) in issuesForThisSprint" v-bind:key="index">
          <Issue :class="$attrs.edit ? 'pointer' : ''" :issue="issue"
                 @click.native="updateIssue(issue._id)"></Issue>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Components
import TaskKanban from '../components/TaskKanban';
import Issue from '../components/Issue';
import IssueForm from '../components/IssueForm';
import SprintForm from '../components/SprintForm';

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
      sprint: {},
      updatingSprint: false,
      addingIssues: false,
      issuesToAdd: [],
      filteredIssues: [],
      issuesWithoutSprint: [],
      issuesForThisSprint: [],
      toDoTasks: [],
      inProgressTasks: [],
      doneTasks: [],
      droppedCorrectly: false,
    };
  },
  methods: {
    updateSprint() {
      this.$buefy.modal.open({
        parent: this,
        component: SprintForm,
        props: {
          sprint: this.sprint,
          modalTitle: 'Modification d\'un sprint',
        },
        hasModalCard: true,
        trapFocus: true,
        events: {
          'update': () => {
            this.updateKanban();
          },
        },
      });
    },
    updateIssue(issueId) {
      IssuesService.getIssue({id: issueId}).then((resp) => {
        this.$buefy.modal.open({
          parent: this,
          component: IssueForm,
          props: {
            sprint: this.sprint,
            modalTitle: 'Modification d\'une issue',
            issue: resp.data.issue,
          },
          hasModalCard: true,
          customClass: 'custom-class custom-class-2',
          trapFocus: true,
          events: {
            'updateIssueList': () => {
              this.updateKanban();
            },
          },
        });
      });
    },
    getFilteredIssues(text) {
      this.filteredIssues = this.issuesWithoutSprint.filter((issue) => {
        return issue.displayText
            .toString()
            .toLowerCase()
            .indexOf(text.toLowerCase()) >= 0;
      });
    },
    addIssues() {
      this.addingIssues = true;
      const sprint = this.sprint;
      for (const issue of this.issuesToAdd) {
        sprint.issues.push(issue._id);
      }
      sprint.id = sprint._id;

      SprintsService.updateSprint(sprint).then((resp) => {
        this.addingIssues = false;

        if (resp.data.success) {
          this.$buefy.toast.open('Sprint mis à jour');
        } else {
          this.$buefy.toast.open('Erreur de modification de sprint');
        }
        this.updateKanban();
      }).catch((err) => {
        this.addingIssues = false;
        this.$buefy.toast.open('Erreur interne de modification de sprint');
        console.error(err);
      });
    },
    onTaskMoved(taskId, newStatus) {
      const loading = this.$buefy.loading.open({container: null});
      TasksService.getTask({id: taskId}).then((resp) => {
        const task = resp.data.task;
        task.status = newStatus;
        task.id = resp.data.task._id;
        TasksService.updateTask(task).then((resp) => {
          loading.close();
          let col;
          if (newStatus == 0) col = 'To do';
          else if (newStatus == 1) col = 'In progress';
          else if (newStatus == 2) col = 'Done';
          this.$buefy.toast.open(`Tâche ${taskId} déplacé dans ${col}`);
          this.updateKanban();
        }).catch((err) => {
          loading.close();
          console.error(err);
          this.$buefy.toast.open('Erreur de mise à jour de la tâche');
        });
      }).catch((err) => {
        loading.close();
        console.error(err);
        this.$buefy.toast.open('Erreur de récupération de la tâche');
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
    drop(e, destColumn) {
      this.droppedCorrectly = true;
      const taskId = e.dataTransfer.getData('taskId');
      const srcColumn = e.dataTransfer.getData('srcColumn');

      // we may be comparing '0' and 0 for instance
      // so the != is needed, and not !==
      if (destColumn != srcColumn) {
        this.onTaskMoved(taskId.split('-')[1], destColumn);
      } else {
        document.querySelector('#' + taskId).style.display = 'block';
      }
    },
    dragStart(e, srcColumn) {
      this.droppedCorrectly = false;
      const target = e.target;
      e.dataTransfer.setData('taskId', target.id);
      e.dataTransfer.setData('srcColumn', srcColumn);
      setTimeout(() => target.style.display = 'none', 0);
    },
    dragEnd(e) {
      if (!this.droppedCorrectly) {
        document.querySelector('#' + e.target.id).style.display = 'block';
      }
    },
    updateKanban() {
      SprintsService.getSprint({number: this.$route.params.id}).then((resp) => {
        resp.data.sprint.startDate = new Date(resp.data.sprint.startDate);
        resp.data.sprint.endDate = new Date(resp.data.sprint.endDate);
        this.sprint = resp.data.sprint;
        this.toDoTasks = [];
        this.inProgressTasks = [];
        this.doneTasks = [];
        this.issuesForThisSprint = [];
        const issuesIdsForThisSprint = resp.data.sprint.issues;
        for (const issueId of issuesIdsForThisSprint) {
          IssuesService.getTasksOfIssue({id: issueId}).then((resp) => {
            for (const task of resp.data.tasks) {
              switch (task.status) {
                case 0: this.toDoTasks.push(task); break;
                case 1: this.inProgressTasks.push(task); break;
                case 2: this.doneTasks.push(task); break;
              }
            }
          });
          IssuesService.getIssue({id: issueId}).then((resp) => {
            if (resp.data.success) {
              this.issuesForThisSprint.push(resp.data.issue);
            }
          });
        }
      });

      IssuesService.getIssues().then((resp) => {
        this.issuesWithoutSprint = [];
        for (const issue of resp.data.issues) {
          issue.displayText = `#${issue._id} • ${issue.title}`;
          this.issuesWithoutSprint.push(issue);
        }
        SprintsService.getSprints().then((resp) => {
          // We have all the issues. Now we need to remove the ones that are in
          // sprints
          for (const sprint of resp.data.sprints) {
            for (const issueId of sprint.issues) {
              // Remove this issue from the array
              const index = this.issuesWithoutSprint.findIndex(
                  (issue) => issue._id == issueId);
              // index can't be -1, because the issue must be in the array
              if (index === -1) {
                console.error(`Issue ${issueId} appear in multiple sprints, ` +
                  'or appears in a sprint, but does not actually exist');
              } else {
                this.issuesWithoutSprint.splice(index, 1);
              }
            }
          }
          this.filteredIssues = this.issuesWithoutSprint;
        }).catch((err) => console.error(err));
      }).catch((err) => console.error(err));
    },
  },
  mounted: function() {
    const self = this;
    this.$nextTick(async function() {
      self.updateKanban();
    });
  },
  watch: {
    $route(to, from) {
      if (from.path.indexOf('/sprint/') >= 0) {
        // update sprint with new id
        this.updateKanban();
      }
    },
  },
};
</script>

<style>

#sprint {
  margin: 20px;
}
/*
#sprint .title {
  color: #ECEFF4 !important;
}

#sprint .subtitle {
  color: #ECEFF4 !important;
}
*/

#sprint a {
  color: #8FBCBB !important;
}

#sprint a:hover {
  color: #88C0D0 !important;
}

.pointer {
  cursor: pointer;
}

.sprint-description {
  /* color: #ECEFF4; */
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
  max-height: 300px;
}

.issue-list .issue-list-content {
  border-left: 5px solid #2E3440;
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

.grag:active {
  cursor: grab;
}
</style>
