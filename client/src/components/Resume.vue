<template>
  <div id="allArticle" class="tile is-parent" >
    <article class="tile is-child notification is-dark">
      <p class="title mb-1">
        #{{issueWithArgs.issue._id}}. {{issueWithArgs.issue.title}}
      </p>
      <div class="content">
        <div class="tasks"
         v-for="task in issueWithArgs.tasks"
         v-bind:key="task.task._id">
          <p class="subtitle mb-1">
            #{{tasks.task._id}}. {{tasks.task.title}}
          </p>
          <div class="tests"
            v-for="test in task.tests"
            v-bind:key="test._id">
            <p class="subsubtitle mb-1">
              #{{test._id}}. {{test.title}}
            </p>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>

export default {
  name: 'Resume',
  props: {
    issueWithArgs: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.tasks{
  margin-left: 50px;
}
.tests{
  margin-left: 50px;
}

#allArticle{
  width: max-content;
}

</style>
