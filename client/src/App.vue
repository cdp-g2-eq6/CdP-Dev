<template>
  <div id="app">
    <Navbar
      @onEditChanged="onEditChanged"
      @onSprintNbChanged="onSprintNbChanged"
      :nbSprints="nbSprints"
      :projects="project"
      :selectedProject="project"
      :updateProjectList="updateProjectList">
    </Navbar>

    <router-view :edit="edit" :project="project"></router-view>
  </div>
</template>

<script>
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
      this.project = this.newProject;
    },
    updateProjectList: function() {
      // TODO: update projects variable by using ProjectsService
      console.warn('todo: implement updateProject list');
    },
  },
  mounted: function() {
    // TODO: select a default project here, or use the cookies
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
