<template>
  <div id="task" class="tile is-parent">
    <article class="tile is-child notification is-primary">
      <p class="title mb-1">
        #{{task.id}}. {{task.title}} (US#{{task.linkedIssue}})
      </p>
      <div class="content">
        {{task.description}}

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

  <!--
  <div class="tile is-child box" v-on:click="onClickTask" id="box">
    <div class="columns">
      <div class="column is-half">
        <h1 class="title">#{{id}}: {{title}} - #US{{userstory}} </h1>
        <div id="details">
        </div>
      </div>
      <div class="column">
        <h1 class='subtitle'>{{status}}</h1>
      </div>
      <div class="column">
        <h1 class="title" v-bind:style="{'background-color': this.importance}">
        ... </h1>
      </div>
      <div class="column">
        <h1 class="title" v-bind:style="{'background-color': this.difficulty}">
        ! </h1>
      </div>
    </div>
  </div>
  -->
</template>

<script>
export default {
  name: 'Task',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onClickTask: function(event) {
      if (details.style.visibility == 'visible') {
        details.style.visibility = 'hidden';
        details.textContent='';
        console.log('visible');
      } else {
        details.style.visibility = 'visible';
        const textDescription = document.createElement('p');
        textDescription.textContent = 'Description: ';
        details.appendChild(textDescription);
        const allTextDescription = document.createElement('p');
        allTextDescription.textContent = this.description;
        details.appendChild(allTextDescription);
        const textParticipants = document.createElement('p');
        textParticipants.textContent = 'Participants: ';
        details.appendChild(textParticipants);
        const textDependances = document.createElement('p');
        textDependances.textContent = 'Dependances: ';
        details.appendChild(textDependances);
        console.log('hidden');
      }
    },
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
