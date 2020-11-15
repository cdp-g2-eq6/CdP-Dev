<template>
  <div id="task" class="tile is-parent">
    <article class="tile is-child notification is-primary">
      <p class="title mb-1">
        #{{task.id}}. {{task.title}} (US#{{task.linkedIssues}})
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
          <!--difficulty indicator and its scale-->
          <b-tooltip position="is-left" type="is-dark" multilined>
            <div id="difficulty" v-bind:style="getDiffColor(task.difficulty)">
              ...
            </div>
            <template v-slot:content class="linked-task">
              <p><b>Difficulté: </b>{{ task.difficulty }}.</p>
              <span>
                <b>Echelle: </b>
                <Gradient usage="Difficulty"></Gradient>
              </span>
            </template>
          </b-tooltip>

          <!--importance indicator and its scale-->
          <b-tooltip position="is-left" type="is-dark"  multilined>
            <div id="importance" v-bind:style="getImpColor(task.priority)">
              !
            </div>
            <template v-slot:content class="linked-task">
              <p><b>Importance: </b>{{ task.priority }}.</p>
              <span>
                <b>Echelle: </b>
                <Gradient usage="Importance"></Gradient>
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
    getDiffColor(difficulty) {
      if (difficulty === 0) {
        return 'background-color: green';
      } else if (difficulty === 1) {
        return 'background-color: yellowgreen';
      } else if (difficulty === 2) {
        return 'background-color: orange';
      } else if (difficulty === 3) {
        return 'background-color: red';
      } else {
        return 'background-color: none';
      }
    },
    getImpColor(level) {
      if (level === 0) {
        return 'background-color: green';
      } else if (level === 1) {
        return 'background-color: orange';
      } else if (level === 2) {
        return 'background-color: red';
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
  background-color: orange;
  padding: 0px 8px 0px 8px;
}

</style>
