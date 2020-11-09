<template>
  <div id="app">
    <Navbar @onEditChanged="onEditChanged"></Navbar>
  </div>
</template>

<script>
import Navbar from './components/Navbar';

export default {
  name: 'App',
  data() {
    return {};
  },
  components: {
    Navbar,
  },
  methods: {
    onEditChanged: function(newValue) {
      this.edit = newValue;
    },
  },
};
</script>

<style>
#app {
  min-height: 100%;
}
</style>
