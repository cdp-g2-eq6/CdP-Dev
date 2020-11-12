<template>
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
</template>

<script>
export default {
  name: 'Task',
  props: {
    id: Number,
    title: String,
    description: String,
    importance: String,
    difficulty: String,
    userstory: Number,
    status: String,
    participants: Array,
    dependances: Array,
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
  },
};
</script>

<style>
</style>
