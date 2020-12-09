<template>
    <!-- Here go the navbar settings -->
    <b-sidebar
      :fullheight="fullheight"
      :overlay="overlay"
      open
      :can-cancel="false"
    >
      <div class="p-1">
        <!-- Logo -->
        <!-- <img :src="logo" alt="logo"/> -->
        <h1 class="title">
          {{selectedProject ? selectedProject.name : 'Selectionnez un projet'}}
        </h1>

        <!-- Menu -->
        <b-menu>
          <b-menu-list label="Menu" v-if="selectedProject">

            <b-menu-item id="home-link"
              pack="fas" icon="home" label="Accueil"
              v-on:click="onHomepage">
            </b-menu-item>

            <b-menu-item id="backlog-link"
              pack="fas" icon="list" label="Backlog"
              v-on:click="onBacklog">
            </b-menu-item>

            <b-menu-item id="tasks-link"
              pack="fas" icon="tasks" label="Tâches"
              v-on:click="onTasks">
            </b-menu-item>

            <b-menu-item pack="fas" icon="running" id="sprint-dropdown-link">
              <template slot="label" slot-scope="props">
                Sprints
                <b-icon class="is-pulled-right"
                        :icon="props.expanded ? 'caret-up' : 'caret-down'">
                </b-icon>
              </template>

              <!-- Here go all the sprints -->
              <b-menu-item v-for="sprint in sprints" v-bind:key="sprint.number"
                :label="'Sprint ' + sprint.number"
                :id="'sprint-'+sprint.number+'-link'"
                v-on:click="onSprint($event, sprint.number)">
              </b-menu-item>

              <b-menu-item
                pack="fas" icon="plus" label="Ajouter un sprint"
                v-on:click="onNewSprint">
              </b-menu-item>
            </b-menu-item>

            <b-menu-item
              pack="fas" icon="vials" label="Tests"
              v-on:click="onTests">
            </b-menu-item>

            <b-menu-item id="resumes-link"
              pack="fas" icon="database" label="Résumé (WIP)"
              v-on:click="onResumes">
            </b-menu-item>
          </b-menu-list>

        <!-- Actions -->
          <b-menu-list label="Actions">
            <b-menu-item pack="fas" icon="file-alt"
                          id="project-dropdown-link">
              <template slot="label" slot-scope="props">
                Projet
                <b-icon class="is-pulled-right"
                        :icon="props.expanded ? 'caret-up' : 'caret-down'">
                </b-icon>
              </template>
              <!-- Here go all the projects -->
              <b-menu-item v-for="project in projects"
                v-bind:key="project._id"
                :id="project._id"
                v-on:click="$emit('onProjectChanged', project);">
                <template slot="label">
                  <div class="columns">
                    <div class="column">
                      {{project.name}}
                    </div>
                    <div class="column is-one-fifth" v-if="edit">
                      <b-button size="is-small" class="is-pulled-right"
                          type="is-warning" icon-right="tools"
                          v-on:click="onUpdateProject(project)"/>
                    </div>
                  </div>
                </template>
              </b-menu-item>
              <b-menu-item
                id="new-project-link"
                pack="fas" icon="plus" label="Ajouter un projet"
                v-on:click="onNewProject">
              </b-menu-item>
            </b-menu-item>
            <br>
            <b-checkbox-button
                  id="edit-button"
                  true-value="false"
                  false-value="true"
                  :native-value="checkboxState"
                  v-model="editValueChanged"
                  size="is-small"
                  type="is-warning">
                  <b-icon icon="edit"></b-icon>
                  <span>Mode édition</span>
              </b-checkbox-button>
          </b-menu-list>
        </b-menu>
      </div>
    </b-sidebar>
</template>

<script>
import SprintsService from './../services/SprintsService';
import ProjectForm from './../components/ProjectForm';
import ProjectsService from '../services/ProjectsService';

export default {
  props: {
    selectedProject: Object,
    projects: Array,
    edit: Boolean,
  },
  data() {
    return {
      logo: 'https://via.placeholder.com/250x150',
      fullheight: true,
      overlay: false,
      sprints: [],
      checkboxState: true, // it will be
      editValueChanged: '', // hack for the watcher to work
    };
  },
  methods: {
    // Called when "Ajouter un sprint" is clicked
    onNewSprint: function(event) {
      this.$buefy.dialog.confirm({
        message: 'Êtes vous sûr d\'ajouter un nouveau sprint?',
        onConfirm: async () => {
          const loading = this.$buefy.loading.open({
            container: null, // will be over the whole page
          });
          console.log(this.sprints.length + 1);
          const resp = await SprintsService.createSprint({
            number: this.sprints.length + 1,
            issues: [],
            startDate: (new Date()).toJSON(),
            endDate: (new Date()).toJSON(),
          });
          if (resp.data.success) {
            const resp2 = await ProjectsService.addSprintToProject(
                this.selectedProject._id, resp.data.newSprint._id,
            );
            if (!resp2.data.success) {
              console.error(resp2);
            }
          } else {
            console.error(rep);
          }
          loading.close();

          this.updateSprintList();
          this.$buefy.toast.open({
            message: `Sprint ${this.sprintNb} ajouté!`,
            type: 'is-primary',
          });
        },
      });
    },
    // Called when "Accueil" is clicked
    onHomepage: function(event) {
      this.redirect('/');
    },
    // Called when "Backlog" is clicked
    onBacklog: function(event) {
      this.redirect('/backlog');
    },
    // Called when "Tâches" is clicked
    onTasks: function(event) {
      this.redirect('/tasks');
    },
    onSprint: function(event, sprintId) {
      this.redirect('/sprint/' + sprintId);
    },
    onTests: function(event) {
      this.redirect('/tests');
    },
    onResumes: function(event) {
      this.redirect('/Overviews');
    },
    onNewProject: function() {
      const project = {
        title: '',
        description: '',
        participants: [],
      };
      this.$buefy.modal.open({
        parent: this,
        component: ProjectForm,
        props: {
          modalTitle: 'Création d\'un projet',
          project: project,
        },
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
        events: {
          'updateProjectList': () => {
            this.$emit('updateProjectList');
          },
        },
      });
    },
    onUpdateProject: function(project) {
      this.$buefy.modal.open({
        parent: this,
        component: ProjectForm,
        props: {
          modalTitle: 'Modification d\'un projet',
          project: project,
        },
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
        events: {
          'updateProjectList': () => {
            this.$emit('updateProjectList');
          },
        },
      });
    },
    // Safe redirect call
    redirect: function(path) {
      if (this.$route.path !== path) {
        this.$router.push(path);
      }
    },
    updateSprintList: function() {
      ProjectsService.getSprintsOfProject({id: this.selectedProject._id})
          .then((resp) => this.sprints = resp.data.sprints)
          .catch((err) => console.error(err));
    },
  },
  watch: {
    // Called when the edit checkbox changed
    editValueChanged: function(newEdit) {
      this.$emit('onEditChanged', newEdit);
    },
    selectedProject: function(oldValue, newValue) {
      this.updateSprintList();
    },
  },
  mounted: function() {
    const self = this;
    this.$nextTick(function() {
      if (self.selectedProject !== null) {
        self.updateSprintList();
      }
    });
  },
};
</script>

<style>
.p-1 {
  padding: 1em;
}
</style>
