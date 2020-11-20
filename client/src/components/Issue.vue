<template>
  <div id="issue" class="tile is-parent">
    <article class="tile is-child notification is-dark">
      <p class="title mb-1">#{{issue._id}}. {{issue.title}}</p>
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
              <li class="linked-task">#{{ task._id }}: {{ task.title }}</li>
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

          <!--priority indicator and its scale-->
          <b-tooltip position="is-left" type="is-dark"  multilined>
            <div id="priority" v-bind:style="getPriorityColor(issue.priority)">
              !
            </div>
            <template v-slot:content class="linked-task">
              <p><b>Importance: </b>{{ issue.priority }}.</p>
              <span>
                <b>Echelle: </b>
                <Gradient usage="Priority"></Gradient>
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
      if (difficulty >= 1 && difficulty < 5) {
        return 'background-color: #A3BE8C';
      } else if (difficulty >= 5 && difficulty < 13) {
        return 'background-color: #EBCB8B';
      } else if (difficulty >= 13 && difficulty < 34) {
        return 'background-color: #D08770';
      } else if (difficulty >= 34) {
        return 'background-color: #BF616A';
      } else {
        return 'background-color: none';
      }
    },
    getPriorityColor(level) {
      if (level === 0) {
        return 'background-color: #A3BE8C';
      } else if (level === 1) {
        return 'background-color: #D08770';
      } else if (level === 2) {
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

#priority {
  margin-left: 2px;
  padding: 0px 8px 0px 8px;
}

</style>
