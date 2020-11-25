<template>
  <div id="date">
      <div class="container" v-bind:style="getColor(passed)">
        <p>{{runDate}}</p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Date',
  props: {
    passed: Number,
    runDate: String,
  },
  component: {},
  methods: {
    getColor(passed) {
      if (passed) {
        return 'background-color: #00FF00';
      }
      return 'background-color: #FF0000';
    },
  },
};
</script>

<style>

</style>
