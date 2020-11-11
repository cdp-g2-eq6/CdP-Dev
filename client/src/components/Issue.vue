<template>
  <div id="issue">

    <div class="tile is-parent">
      <article class="tile is-child notification is-primary">
        <p class="title mb-1">#{{us.id}}. {{us.title}}</p>
        <div class="content">
          {{us.description}}
          <div class="icons">
            <div class="difficulty" v-bind:style="getDiffColor(us.difficulty)">
              ...
            </div>
            <div class="importance" v-bind:style="getImpColor(us.importance)">
              !
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
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
  methods: {
    getDiffColor(level) {
      if (level === 'facile') {
        return 'background-color: green';
      } else if (level === 'moyenne') {
        return 'background-color: yellow';
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

.importance {
  background-color: orange;
  padding: 0px 8px 0px 8px;
}

</style>
