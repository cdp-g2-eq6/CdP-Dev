<template>
  <div class="backlogForm">
    <form>
      <div class="modal-card" >
        <header class="modal-card-head">
          <p class="modal-card-title">{{modalTitle}}</p>
        </header>
        <section class="modal-card-body">

          <b-field label="Date : ">
            <b-input
                :value="day"
                v-model="day"
                placeholder="JJ"
                required
                class="inputDate">
            </b-input>
            <p> / </p>
            <b-input
                :value="day"
                v-model="day"
                placeholder="MM"
                required>
            </b-input>
            <p> / </p>
            <b-input
                :value="day"
                v-model="day"
                placeholder="AAAA"
                required>
            </b-input>

          </b-field>
        </section>
        <footer class="modal-card-foot">
            <button class="button" @click="$emit('close')">
            Annuler
          </button>
          <button
              class="button is-primary">
            Valider
          </button>
        </footer>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: 'TestForm',
  props: {
    modalTitle: {
      type: String,
      required: true,
    },
    test: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      title: this.test.title,
      description: this.test.description,
      linkedTasks: this.test.linkedTasks,
      taskTags: [],
    };
  },
  methods: {
  },
};


</script>

<style scoped>

</style>
