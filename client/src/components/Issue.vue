<template>
  <div id="issue">

    <div class="tile is-parent">
      <article class="tile is-child notification is-primary">
        <p class="title mb-1">#{{us.id}}. {{us.title}}</p>
        <div class="content">
          <!--difficulty indicator and its tooltip-->
          <b-tooltip position="is-bottom" type="is-dark" multilined>
            {{us.description}}
            <template v-slot:content>
              <b>Tâches liées: </b>
              <ul v-for="task in us.linked_tasks" v-bind:key="task">
                <li>#{{ task.id }}: {{ task.status }}</li>
              </ul>
            </template>
          </b-tooltip>

          <div class="icons">
            <!--difficulty indicator and its tooltip-->
            <b-tooltip position="is-left" type="is-dark" multilined>
              <div id="difficulty" v-bind:style="getDiffColor(us.difficulty)">
                ...
              </div>
              <template v-slot:content>
                <p><b>Difficulté: </b>{{ us.difficulty }}.</p>
                <Gradient usage="Difficulty"></Gradient>
              </template>
            </b-tooltip>

            <!--importance indicator and its tooltip-->
            <b-tooltip position="is-left" type="is-dark" multilined>
              <div id="importance" v-bind:style="getImpColor(us.importance)">
                !
              </div>
              <template v-slot:content>
                <p><b>Importance: </b>{{ us.importance }}.</p>
                <Gradient usage="Importance"></Gradient>
              </template>
            </b-tooltip>
          </div>
        </div>
      </article>
    </div>

  </div>
</template>

<script>
import Gradient from './Gradient';

export default {
  name: 'Issue',
  props: {
    jsonIssue: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      us: this.jsonIssue.us,
    };
  },
  components: {
    Gradient,
  },
  methods: {
    getDiffColor(level) {
      if (level === 'facile') {
        return 'background-color: green';
      } else if (level === 'moyenne') {
        return 'background-color: yellowgreen';
      } else if (level === 'difficile') {
        return 'background-color: orange';
      } else if (level === 'très difficile') {
        return 'background-color: red';
      } else {
        return 'background-color: none';
      }
    },
    getImpColor(level) {
      if (level === 'minimale') {
        return 'background-color: green';
      } else if (level === 'moyenne') {
        return 'background-color: orange';
      } else if (level === 'maximale') {
        return 'background-color: red';
      } else {
        return 'background-color: none';
      }
    },
    update(newUs) {
      this.us = newUs;
    },
  },
};
</script>

<style scoped>
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
