<template>
  <div id="task">
      <div class="small-tile level">
          <div class="level-left">
              <div class="text level-item">
                  <span v-if="task.title.length < 30">
                      {{task._id}} • {{task.title}}
                  </span>
                  <span v-else>
                      {{task._id}} • {{task.title.substring(0, 30)}} ...
                  </span>
            </div>
          </div>
          <div class="level-right">
              <div class="is-pulled-right level-item cost"
                  v-bind:style="getDiffColor(task.cost)">
              <b-icon  :icon="'ellipsis-h'"></b-icon>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
// import Gradient from './Gradient';

export default {
  name: 'Task',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      maxDescriptionLength: 50,
      collapseOpen: false,
    };
  },
  components: {
    // Gradient,
  },
  methods: {
    getDiffColor(cost) {
      if (cost === 1 || cost === 2) {
        return 'background-color: #A3BE8C';
      } else if (cost === 3) {
        return 'background-color: #EBCB8B';
      } else if (cost === 5) {
        return 'background-color: #D08770';
      } else if (cost > 5) {
        return 'background-color: #BF616A';
      } else {
        return 'background-color: none';
      }
    },
  },
};
</script>

<style scoped>

.small-tile {
    margin-top: 2px;
    background:#3B4252;
    width: 100%;
}

.text {
    font-size: large;
    padding: 10px;
    display: block;
}

.cost {
    padding: 10px;
}

</style>
