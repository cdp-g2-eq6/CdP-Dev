<template>
  <div id="app">
    <Navbar
      @onEditChanged="onEditChanged"
      :edit="edit"
      @onSprintNbChanged="onSprintNbChanged"
      :nbSprints="nbSprints"
      :projects="projects"
      :selectedProject="project"
      :updateProjectList="updateProjectList">
    </Navbar>

    <router-view
      v-if="project!==null"
      :edit="edit"
      :projectId="project._id">
    </router-view>
  </div>
</template>

<script>
import ProjectsService from './services/ProjectsService';
import Navbar from './components/Navbar';

export default {
  name: 'App',
  data() {
    return {
      // The initial value is always false, changing it does not affect navbar
      // It will get updated automatically (@see onEditChanged)
      edit: false,
      // Number of sprints of the loaded project
      // It will get updated automatically (@see onSprintNbChanged)
      nbSprints: 0,
      // The navbar will read this value to show the project name
      project: null,
      projects: [],
      projectKeyName: 'project', // used for the cookie
    };
  },
  components: {
    Navbar,
  },
  methods: {
    onEditChanged: function(newValue) {
      this.edit = newValue;
    },
    onSprintNbChanged: function(newSprintNb) {
      this.nbSprints = newSprintNb;
    },
    onProjectChanged: function(newProject) {
      localStorage.setItem(this.projectKeyName, newProject._id);
      this.project = newProject;
    },
    updateProjectList: function() {
      ProjectsService.getProjects().then(
          (resp) => this.projects = resp.data.projects,
      ).catch(
          (err) => console.error(err),
      );
    },
  },
  mounted: function() {
    ProjectsService.getProjects().then(
        (resp) => {
          this.projects = resp.data.projects;

          // If the project already has selected a project in the past, we
          // retrive it
          if (localStorage.getItem(this.projectKeyName)) {
            const selectedProjectId = localStorage.getItem(this.projectKeyName);
            for (const project of this.projects) {
              if (project._id.toString() === selectedProjectId) {
                this.onProjectChanged(project);
                break;
              }
            }
          }

          // If the project was not found:
          // - it was deleted
          // - the user did not select any project yet
          if (this.project === null) {
            if (this.projects.length > 0) {
            // Select the first one by default
              this.onProjectChanged(this.projects[0]);
            } else {
            // There are no projects yet. It will be handled by the fact that
            // this.project is null. The navbar will only show the project
            // creation
            }
          }
        },
    ).catch(
        (err) => console.error(err),
    );
  },
};
</script>

<style lang="scss">
@import "./assets/dark.scss";

html, body {
  overflow-y: auto;
  height: 100%;
  /* background: #4C566A; */
}

#app {
  min-height: 100%;
  margin-left: 260px;
}
</style>
