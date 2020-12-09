<template>
  <div id="backlog">
    <p class="title">Backlog</p> <hr>
    <div class="columns">
      <div class="column is-1" v-show="dragging">
        <div class="sprint" v-for="sprint in sprints" v-bind:key="sprint._id"
            @dragenter="drag($event, true)" @dragleave="drag($event, false)"
            @dragover.prevent @drop.prevent="drop($event, sprint.number)">
          Ajouter au sprint {{sprint.number}}
        </div>
      </div>
      <div class="column">
        <div class="user-story"
          v-for="issue in issueList"
          v-bind:key="issue._id">
          <div class="drag" :id="'issue-'+issue._id"
              @dragstart="dragStart" draggable="true"
              @dragover.stop @dragend="dragEnd">
          <Issue class="issue" :issue="issue"
              @click.native="updateIssue(issue._id)">
          </Issue>
          </div>
        </div>
      </div>
    </div>

    <div class="add" v-if="$attrs.edit">
      <button class="button is-white m-4" @click="createIssue">
        <b-icon pack="fas" size="fa-3x" icon="plus-circle"
                type="is-grey-dark">
        </b-icon>
      </button>
    </div>
  </div>
</template>

<script>
import Issue from '../components/Issue';
import IssueForm from '../components/IssueForm';
import IssuesService from '@/services/IssuesService';
import SprintsService from '@/services/SprintsService';
import ProjectsService from '@/services/ProjectsService';

export default {
  name: 'Backlog',
  props: {
    project: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      sprints: [],
      dragging: false,
      issueList: [],
      mappedIssues: {},
      mappedSprints: {},
    };
  },
  components: {
    Issue,
  },
  methods: {
    createIssue() {
      if (this.$attrs.edit) {
        const issue = {
          _id: -1,
          title: '',
          description: {
            role: '',
            goal: '',
            benefit: '',
          },
          difficulty: 1,
          priority: 0,
        };

        this.$buefy.modal.open({
          parent: this,
          component: IssueForm,
          props: {
            modalTitle: 'Création d\'une issue',
            issue: issue,
            projectId: this.project._id,
          },
          hasModalCard: true,
          customClass: 'custom-class custom-class-2',
          trapFocus: true,
          events: {
            'updateIssueList': () => {
              this.updateBacklog();
            },
          },
        });
      }
    },
    updateIssue(issueId) {
      if (this.$attrs.edit) {
        // execute initialization code here (use self as being this)
        this.$buefy.modal.open({
          parent: this,
          component: IssueForm,
          props: {
            modalTitle: 'Modification d\'une issue',
            issue: this.mappedIssues[issueId],
            projectId: this.project._id,
          },
          hasModalCard: true,
          customClass: 'custom-class custom-class-2',
          trapFocus: true,
          events: {
            'updateIssueList': () => {
              this.updateBacklog();
            },
          },
        });
      }
    },
    updateBacklog() {
      const projectsParam = {id: this.project._id};
      ProjectsService.getSprintsOfProject(projectsParam).then(
          (resp) => {
            this.sprints = resp.data.sprints;
            for (const sprint of this.sprints) {
              this.mappedSprints[sprint.number] = sprint;
            }

            ProjectsService.getBacklogOfProject(projectsParam).then((resp) => {
              this.issueList = resp.data.backlog;

              for (const issue of this.issueList) {
                // We will add some data to issues: their linked tasks and their
                // sprint number if they have one
                IssuesService.getTasksOfIssue({id: issue._id}).then((resp) => {
                  issue.linkedTasks = resp.data.tasks;
                }).catch((err) => console.error(err));

                for (const sprint of this.sprints) {
                  if (sprint.issues.indexOf(issue._id.toString()) >= 0) {
                    issue.sprint = sprint.number;
                    break;
                  } else {
                    issue.sprint = 0;
                  }
                }

                this.mappedIssues[issue._id] = issue;
              }
            },
            ).catch((err) => console.error(err));
          }).catch((err) => console.error(err));
    },
    onIssueMoved(issueId, sprintNumber) {
      const issue = this.mappedIssues[issueId];

      if (issue.sprint != 0) { // this issue was in a sprint already
        this.$buefy.dialog.confirm({
          title: 'Déplacement d\'une issue',
          message: `Etes vous sûrs de déplacer l'issue ${issueId} vers le
                    sprint ${sprintNumber}? Elle était déjà dans le sprint
                    ${issue.sprint} (cela ne changera pas le status des
                    tâches de cette issue).`,
          confirmText: `Déplacer du sprint ${issue.sprint} vers le sprint
                      ${sprintNumber}`,
          type: 'is-warning',
          hasIcon: true,
          onConfirm: () => {
            // remove this issue from the original sprint
            const sprintSrc = this.mappedSprints[issue.sprint];
            sprintSrc.id = sprintSrc._id;
            sprintSrc.issues.splice(sprintSrc.issues.indexOf(issue._id), 1);
            SprintsService.updateSprint(sprintSrc).then((resp) => {
              if (resp.data.success) {
                this.$buefy.toast.open(`Issue supprimée du sprint`);
              } else {
                console.error(resp.err);
                this.$buefy.toast.open(`Erreur de suppression`);
              }
            }).catch((err) => {
              console.error(err);
              this.$buefy.toast.open(`Erreur de suppression`);
            });
          },
        });
      }

      // add issue to new sprint
      const sprintDest = this.mappedSprints[sprintNumber];
      sprintDest.id = sprintDest._id;
      sprintDest.issues.push(issueId);
      SprintsService.updateSprint(sprintDest).then((resp) => {
        if (resp.data.success) {
          this.$buefy.toast.open(`Déplacé dans sprint ${sprintNumber}`);
          this.updateBacklog();
        } else {
          console.error(resp.data.err);
          this.$buefy.toast.open(`Erreur de modif du sprint`);
        }
      }).catch((err) => {
        console.error(err);
        this.$buefy.toast.open(`Erreur de modif du sprint ${sprintNumber}`);
      });
    },
    drop(e, sprintNumber) {
      this.dragging = false;
      const issueId = e.dataTransfer.getData('issueId');
      this.onIssueMoved(issueId.split('-')[1], sprintNumber);
      document.querySelector(`#${issueId}`).style.display = 'block';
    },
    dragStart(e) {
      this.dragging = true;
      const target = e.target;
      e.dataTransfer.setData('issueId', target.id);
      setTimeout(() => target.style.display = 'none', 0);
    },
    dragEnd(e) {
      this.dragging = false;
      document.querySelector('#' + e.target.id).style.display = 'block';
    },
    drag(e, over) {
      if (over) {
        e.target.style.background = '#8FBCBB';
      } else {
        e.target.style.background = '#4C566A';
      }
    },
  },
  mounted: function() {
    const self = this;
    this.$nextTick(function() {
      self.updateBacklog();
    });
  },
  watch: {
    project: function(newVal, oldVal) { // watch it
      this.updateBacklog();
    },
  },
};
</script>

<style>
#backlog {
  padding-left: 20px;
  padding-top: 10px;
}

.add {
  position: fixed;
  bottom: 10px;
  left: 270px;
}

.drag:hover {
  cursor: grab;
}

.drag:active {
  cursor: grab;
}

.issue {
  transition: all .3s ease;
}

.sprint {
  transition: all .3s ease;
  margin-left: 10px;
  margin-top: 15px;
  width: 100%;
  min-height:100px;
  background: #4C566A;
  color: #ECEFF4;
  text-align: center;
  font-style: normal;
  font-size: large;
  padding: 10px 10px 10px 10px;
  border-radius: 10px;
}

.sprint:hover {
  background: #8FBCBB;
  font-style: italic;
}
</style>
