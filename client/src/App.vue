<template>
  <div id="app">
    <Navbar
      @onEditChanged="onEditChanged"
      @onSprintNbChanged="onSprintNbChanged"
      :nbSprints="nbSprints"
      :projectName="projectName">
    </Navbar>

    <router-view :edit="edit"></router-view>
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
      projectName: 'Nom projet',
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
  },
};
</script>

<style>
html, body {
  overflow-y: auto;
  height: 100%;
  background: #4C566A;
}

.tooltip-content {
  background-color: #2E3440 !important;
  color: #ECEFF4 !important;
}

.tooltip-content::before {
  border-left-color: #2E3440 !important;
}

#app {
  min-height: 100%;
  margin-left: 260px;
}
</style>
