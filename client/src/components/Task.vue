<template>
  <div id="task" class="tile is-parent">
    <article class="tile is-child notification is-dark">
      <div>
        <span class="title mb-1">
        #{{task._id}}. {{task.title}} (US#{{task.linkedIssues}})
        </span>

        <div class="icons">
          <!--cost indicator and its scale-->
          <b-tooltip position="is-left" type="is-dark" multilined>
            <div id="cost" v-bind:style="getDiffColor(task.cost)" class="icon">
              ...
            </div>
            <template v-slot:content class="linked-task">
              <p><b>Coût: </b>{{ task.cost }}</p>
              <span>
                <b>Echelle: </b>
                <Gradient usage="Difficulty"></Gradient>
              </span>
            </template>
          </b-tooltip>
        </div>
      </div>
      <div class="content">

        <b-tooltip position="is-bottom" type="is-dark" size="is-small"
                   multilined>
          {{task.description}}
        <template v-slot:content>
            <div style="text-align:left">
              <b>Participants: </b>
              <div v-for="participant in task.participants"
                v-bind:key="participant">
                <span>- {{ participant }}</span>
              </div>
            </div>
          </template>
        </b-tooltip>
      </div>
    </article>
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

.linked-task {
  width: max-content;
}

.icons {
  position: absolute;
  display: inline-flex;
  font-size: 1.5em;
  right: 10px;
}

.icon {
  height: 100%;
  width: 1.5em;
  border-radius: 5px;
  display: flex;
  text-align: center;
}

#importance {
  background-color: #D08770;
  padding: 0px 8px 0px 8px;
}

</style>
