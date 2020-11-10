<template>
  <div id="app">
    <Navbar
      @onEditChanged="onEditChanged"
      @onSprintNbChanged="onSprintNbChanged"
      :nbSprints="nbSprints">
    </Navbar>
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
      nbSprints: 4,
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
#app {
  min-height: 100%;
}
</style>
