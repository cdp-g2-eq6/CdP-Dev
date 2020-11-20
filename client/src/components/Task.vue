<template>
  <div id="task" class="tile is-parent">
    <article class="tile is-child notification is-dark">
      <p class="title mb-1">
        #{{task._id}}. {{task.title}} (US#{{task.linkedIssues}})
      </p>
      <div class="content">

        <b-tooltip position="is-bottom" type="is-dark" size="is-small"
                   multilined>
          <span v-if="!collapseOpen">
            <span v-if="task.description.length > maxDescriptionLength">
              {{task.description.substring(0, maxDescriptionLength)}}...
            </span>
            <span v-else>
              {{task.description}}
            </span>
          </span>

          <b-collapse v-if="task.description.length > maxDescriptionLength"
            :open.sync="collapseOpen" position="is-bottom" aria-id="expandDesc">
              <a slot="trigger" slot-scope="collapse" aria-controls="expandDesc"
              >
                <b-icon :icon="!collapse.open ? 'caret-down' : 'caret-up'">
                </b-icon>
              </a>
              <p>
                  {{task.description}}
              </p>
          </b-collapse>
        <template v-slot:content>
            <b>Participants: </b>
            <ul v-for="participant in task.participants"
                v-bind:key="participant">
              <li class="linked-task">{{ participant }}</li>
            </ul>
          </template>
        </b-tooltip>

        <div class="icons">
          <!--cost indicator and its scale-->
          <b-tooltip position="is-left" type="is-dark" multilined>
            <div id="cost" v-bind:style="getDiffColor(task.cost)">
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
  display: inline-flex;
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 3em;

}

#importance {
  background-color: #D08770;
  padding: 0px 8px 0px 8px;
}

</style>
