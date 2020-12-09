<template>
  <div id="issue" class="tile is-parent">
    <article class="tile is-child notification is-dark">
      <p class="title mb-1">
        <span
              :class="issue.overviewIssue.dateDone!=null ?
                'has-text-success':
                'has-text-danger'">
        #{{issue.overviewIssue._id}}. {{issue.overviewIssue.title}}
        </span>
      </p>
       <div class="content">
        <div class="tasks"
         v-for="task in issue.overviewTasks"
         v-bind:key="task._id">
          <p class="subtitle mb-1">
            <span
              :class="task.overviewTask.status===2 ?
                'has-text-success':
                (task.overviewTask.status===1?
                'has-text-warning':
                'has-text-danger')">
            #{{task.overviewTask._id}}. {{task.overviewTask.title}}
            {{task.overviewTask.status}}
            </span>
          </p>
          <div class="tests"
           v-for="test in task.overviewTest"
           v-bind:key="test._id">
            <p class="subsubtitle mb-1">
              <span
              :class="test.success?
                'has-text-success':
                'has-text-danger'">
                #{{test._id}}. {{test.title}}
              </span>
            </p>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>

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
  components: {},
  methods: {},
};
</script>

<style scoped>
/* #issue{
  width: max-content;
} */

.tasks{
  margin-left: 50px;
}

.tests{
  margin-left: 50px;
}


</style>
