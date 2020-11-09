<template>
  <div id="app">
    <Navbar @onEditChanged="onEditChanged" :edit="edit"></Navbar>
  </div>
</template>

<script>
import Navbar from './components/Navbar';

export default {
  name: 'App',
  data() {
    return {
      edit: false,
    };
  },
  components: {
    Navbar,
  },
  methods: {
    onEditChanged: function() {
      this.edit = !this.edit;
    },
  },
};
</script>

<style>
#app {
  min-height: 100%;
}
</style>
