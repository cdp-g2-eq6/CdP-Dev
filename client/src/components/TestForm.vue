<template>
  <div class="backlogForm">
    <form>
      <div class="modal-card" >
        <header class="modal-card-head">
          <p class="modal-card-title">{{modalTitle}}</p>
        </header>
        <section class="modal-card-body">

          <b-field label="Titre">
            <b-input
                :value="title"
                v-model="title"
                placeholder="Titre de votre Tâche"
                required>
            </b-input>
          </b-field>

          <b-field label="Description">
            <b-input
                :value="description"
                v-model="description"
                placeholder="Description de votre Tâche" required>
            </b-input>
          </b-field>

          <b-field label="Tâches Associées">
            <b-taginput
                v-model="linkedTasks"
                :data="taskTags"
                autocomplete
                :allow-new="false"
                :open-on-focus="true"
                field="title"
                icon="link"
                placeholder="Associer une tâche (ex: titre task1, titre task2)"
                @typing="getFilteredIssues">
              <template slot-scope="props">
                <strong>{{props.option._id}}</strong>:
                {{props.option.title}}
              </template>
              <template slot="empty">
                Aucune Issue
              </template>
            </b-taginput>
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
