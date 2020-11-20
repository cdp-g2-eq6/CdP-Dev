<template>
  <div id="task">
    <div class="small-tile level">
        <div class="level-left">
            <div class="text level-item">
                <span v-if="task.title.length < 30">
                    {{task._id}} • {{task.title}}
                </span>
                <span v-else>
                  <b-tooltip position="is-bottom" :label="task.title">
                    {{task._id}} • {{task.title.substring(0, 30)}} ...
                  </b-tooltip>
                </span>
          </div>
        </div>
        <div class="level-right">
          <b-tooltip position="is-left">
            <div class="is-pulled-right level-item cost"
                v-bind:style="getDiffColor(task.cost)">
              <b-icon  :icon="'ellipsis-h'"></b-icon>
            </div>
          <template v-slot:content>
              <p><b>Coût: </b>{{ task.cost }}</p>
              <span>
                <b>Echelle: </b>
                <Gradient usage="Difficulty"></Gradient>
              </span>
          </template>
          </b-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import Gradient from './Gradient';

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
    Gradient,
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
  border: 1px solid #3B4252;
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

.small-tile:hover {
  cursor: pointer;
}

.small-tile:hover {
  cursor: pointer;
  border: 1px solid #4C566A;
}

</style>
