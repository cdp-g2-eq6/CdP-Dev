<template>
    <!-- Here go the navbar settings -->
    <b-sidebar
      :fullheight="fullheight"
      :overlay="overlay"
      open
    >
      <div class="p-1">
        <!-- Logo -->
        <!-- <img :src="logo" alt="logo"/> -->
        <h1 class="title">
          {{selectedProject ? selectedProject.title : 'unset'}}
        </h1>

        <!-- Menu -->
        <b-menu>
          <b-menu-list label="Menu">

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
              <b-menu-item v-for="n in sprintNb" v-bind:key="n"
                :label="'Sprint ' + n"
                :id="'sprint-'+n+'-link'"
                v-on:click="onSprint($event, n)">
              </b-menu-item>

              <b-menu-item
                id="new-sprint-link"
                pack="fas" icon="plus" label="Ajouter un sprint"
                v-on:click="onNewSprint">
              </b-menu-item>
            </b-menu-item>

            <b-menu-item
              id="tests-link"
              pack="fas" icon="vials" label="Tests"
              v-on:click="onTests">
            </b-menu-item>
          </b-menu-list>

        <!-- Actions -->
          <b-menu-list label="Actions">
            <b-menu-item pack="fas" icon="file-alt"
                          id="sprint-dropdown-link">
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
                      {{project.title}}
                    </div>
                    <div class="column is-one-fifth">
                      <b-button size="is-small" class="is-pulled-right"
                          type="is-warning" icon-right="tools"
                          v-on:click="onUpdateProject(project)"/>
                    </div>
                  </div>
                </template>
              </b-menu-item>
              <b-menu-item
                id="new-sprint-link"
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

export default {
  props: {
    nbSprints: Number,
    selectedProject: Object,
    projects: Array,
  },
  data() {
    return {
      // navbar settings
      logo: 'https://via.placeholder.com/250x150',
      fullheight: true,
      overlay: false,
      // sprints
      sprintNb: 0,
      // edit
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
          this.sprintNb ++;

          const loading = this.$buefy.loading.open({
            container: null, // will be over the whole page
          });
          await SprintsService.createSprint({
            number: this.sprintNb,
            issues: [],
            startDate: (new Date()).toJSON(),
            endDate: (new Date()).toJSON(),
          });
          loading.close();

          this.$emit('onSprintNbChanged', this.sprintNb);
          this.$buefy.toast.open({
            message: `Sprint ${this.sprintNb} ajouté!`,
            type: 'is-primary',
          });
        },
      });
    },
    // Called when "Accueil" is clicked
    onHomepage: function(event) {
      this.redirect('/homepage');
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
    onNewProject: function() {
      const project = {
        _id: -1,
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
  },
  watch: {
    // Called when the edit checkbox changed
    editValueChanged: function(newEdit) {
      this.$emit('onEditChanged', newEdit);
    },
  },
  mounted: function() {
    const self = this;
    this.$nextTick(function() {
      // execute initialization code here (use self as being this)
      SprintsService.getSprints().then((resp) => {
        self.sprintNb = resp.data.sprints.length;
      });
    });
  },
};
</script>

<style>
.p-1 {
  padding: 1em;
}
</style>
