<template>
  <div class="backlogForm">
    <form>
      <div class="modal-card" >
        <header class="modal-card-head">
          <p class="modal-card-title">{{modalTitle}}</p>
        </header>
        <section class="modal-card-body"
                 v-for="status in statusHistory"
                 v-bind:key="status._id">
          <div class="date">
            <b-field label="Date du test ">
              <b-datepicker
                  :v-model="status.runDate"
                  locale="fr-FR"
                  placeholder="Date du test..."
                  icon="calendar-alt"
                  trap-focus>
              </b-datepicker>
            </b-field>
            <div class="field">
              <b-switch :v-model="status.status" type="is-success">
                Success
              </b-switch>
            </div>
          </div>

        </section>
        <footer class="modal-card-foot">
          <button class="button" @click="$emit('close')">Annuler</button>
          <button class="button" @click="save(statusHistory)">Valider</button>
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
    statusHistory: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      date: [],
    };
  },
  methods: {
    save(selectedDate) {
      console.log(selectedDate);
      this.$emit('close');
    },
  },
};


</script>

<style scoped>
.modal-card {
  min-height: 600px;
}
</style>
