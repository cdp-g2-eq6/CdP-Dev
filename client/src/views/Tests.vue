<template>
  <div id="tests">
    Page de tests, à faire
  </div>
</template>

<script>
export default {
  name: 'Tests',
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted: function() {
    // const self = this;
    this.$nextTick(function() {
      // self instead of this here
    });
  },
};
</script>

<style>

</style>
