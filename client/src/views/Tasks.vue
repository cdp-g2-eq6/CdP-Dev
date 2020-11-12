<template>
  <div class="tile is-ancestor">
    <div class="tile is-10 is-vertical">
      <Task :id="4"
             title="Titre"
             description="Description"
             importance="#FF0000"
             difficulty="#FF0000"
             userstory="1"
             status="in progress"
             participants=""
             dependances="">
      </Task>
    </div>
  </div>
</template>

<script>
import Task from '../components/Task';
export default {
  name: 'Tasks',
  components: {
    Task,
  },
};
</script>

<style>

</style>
