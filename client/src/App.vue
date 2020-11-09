<template>
  <div id="app">
    <Navbar></Navbar>
  </div>
</template>

<script>
import Navbar from './components/Navbar';

export default {
  name: 'App',
  components: {
    Navbar,
  },
};
</script>

<style>
#app {
  min-height: 100%;
}
</style>
