<template>
  <div id="issue" class="tile is-parent">
    <article class="tile is-child notification is-primary">
      <p class="title mb-1">#{{issue.id}}. {{issue.title}}</p>
      <div class="content">
        <!--linked-tasks tooltip-->
        <b-tooltip position="is-bottom" type="is-dark" size="is-small"
                   multilined>
          <b>En tant que</b> {{issue.description.role}},
          <b>je souhaite</b> {{issue.description.goal}},
          <b>afin de</b> {{issue.description.benefit}}.
          <template v-slot:content>
            <b>Tâches liées: </b>
            <ul v-for="task in issue.linkedTasks" v-bind:key="task.id">
              <li class="linked-task">#{{ task.id }}: {{ task.title }}</li>
            </ul>
          </template>
        </b-tooltip>

        <div class="icons">
          <!--difficulty indicator and its scale-->
          <b-tooltip position="is-left" type="is-dark" multilined>
            <div id="difficulty" v-bind:style="getDiffColor(issue.difficulty)">
              ...
            </div>
            <template v-slot:content class="linked-task">
              <p><b>Difficulté: </b>{{ issue.difficulty }}.</p>
              <span>
                <b>Echelle: </b>
                <Gradient usage="Difficulty"></Gradient>
              </span>
            </template>
          </b-tooltip>

          <!--importance indicator and its scale-->
          <b-tooltip position="is-left" type="is-dark"  multilined>
            <div id="importance" v-bind:style="getImpColor(issue.priority)">
              !
            </div>
            <template v-slot:content class="linked-task">
              <p><b>Importance: </b>{{ issue.priority }}.</p>
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
  name: 'Issue',
  props: {
    issue: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
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
