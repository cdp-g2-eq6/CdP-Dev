<template>
  <div id="app">
    <Navbar></Navbar>

    <h1> Homepage </h1>
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
}
</style>
