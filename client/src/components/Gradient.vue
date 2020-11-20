<template>
  <div id="gradient">
    <div class="container">
      <div class="row is-flex" v-if="this.usage === 'Difficulty'">
        <div class="col easy px-2">f</div>
        <div class="col medium px-2">m</div>
        <div class="col hard px-2">d</div>
        <div class="col very-hard px-1">td</div>
      </div>
      <div class="row is-flex" v-if="this.usage === 'Priority'">
        <div class="col minimum px-1">mn</div>
        <div class="col middle px-1">md</div>
        <div class="col maximum px-1">mx</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Gradient',
  props: {
    usage: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
#gradient {
  font-size: 1em;
  font-weight: bold;
  font-family: monospace;
  display: inline-flex;
}

.easy, .minimum {
  background-color: #A3BE8C;
}

.medium {
  background-color:yellowgreen;
}

.hard, .middle {
  background-color: #D08770;
}

.very-hard, .maximum {
  background-color: #BF616A;
}

</style>
