<template>
  <div id="issue" class="tile is-parent" @click="modifyDelete">
    <article class="tile is-child notification is-primary">
      <p class="title mb-1">#{{us.id}}. {{us.title}}</p>
      <div class="content">
        <!--linked-tasks tooltip-->
        <b-tooltip position="is-bottom" type="is-dark" size="is-small"
                   multilined>
          {{us.description}}
          <template v-slot:content>
            <b>Tâches liées: </b>
            <ul v-for="task in us.linked_tasks" v-bind:key="task.id">
              <li class="linked-task">#{{ task.id }}: {{ task.status }}</li>
            </ul>
          </template>
        </b-tooltip>

        <div class="icons">
          <!--difficulty indicator and its scale-->
          <b-tooltip position="is-left" type="is-dark" multilined>
            <div id="difficulty" v-bind:style="getDiffColor(us.difficulty)">
              ...
            </div>
            <template v-slot:content class="linked-task">
              <p><b>Difficulté: </b>{{ us.difficulty }}.</p>
              <span>
                <b>Echelle: </b>
                <Gradient usage="Difficulty"></Gradient>
              </span>
            </template>
          </b-tooltip>

          <!--importance indicator and its scale-->
          <b-tooltip position="is-left" type="is-dark"  multilined>
            <div id="importance" v-bind:style="getImpColor(us.importance)">
              !
            </div>
            <template v-slot:content class="linked-task">
              <p><b>Importance: </b>{{ us.importance }}.</p>
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
    jsonIssue: {
      type: Object,
      required: true,
    },
    editMode: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      us: this.jsonIssue.us,
      isEditable: this.editMode,
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
    modifyDelete() {
      if (this.editMode) {
        this.$buefy.dialog.alert('Here you can modify/delete the Issue');
      }
    },
    update(newUs) {
      this.us = newUs;
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
