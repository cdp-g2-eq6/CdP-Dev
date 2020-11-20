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
                placeholder="Titre de votre Tâche" required>
            </b-input>
          </b-field>

          <b-field label="Issues Associées">
            <b-taginput
                v-model="linkedIssues"
                :data="issueTags"
                autocomplete
                field="title"
                icon="link"
                placeholder="Associer une issue (ex: titre US1, titre US2)"
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

          <b-field label="Participants">
            <b-taginput
                v-model="participants"
                ellipsis
                icon="user-tag"
                placeholder="Ajouter des Participants (ex: Alex, John, Paul)"
                aria-close-label="Retirer un Participant">
            </b-taginput>
          </b-field>

          <b-field label="Coût">
            <b-select
                :value="cost"
                v-model="cost"
                placeholder="Sélectionner une échelle">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="8">8</option>
              <option value="13">13</option>
              <option value="21">21</option>
              <option value="34">34</option>
              <option value="55">55</option>
            </b-select>
          </b-field>

          <b-field label="Status">
            <b-select
                :value="status"
                v-model="status"
                placeholder="Sélectionner une priorité">
              <option value="0">A faire</option>
              <option value="1">En Cours</option>
              <option value="2">Terminée</option>
            </b-select>
          </b-field>

        </section>
        <footer class="modal-card-foot">
          <button class="button" @click="$emit('close')">
            Annuler
          </button>
          <button
              v-if="!isUpdate()"
              class="button is-primary"
              @click="save();">
            Valider
          </button>
          <div class="update" v-if="isUpdate()">
            <button
                class="button is-danger"
                @click="erase();">
              Supprimer
            </button>
            <button
                class="button is-warning"
                @click="update();">
              Modifier
            </button>
          </div>
        </footer>
      </div>
    </form>
  </div>
</template>

<script>
import TasksService from '@/services/TasksService';

export default {
  name: 'TaskForm.vue',
  props: {
    modalTitle: {
      type: String,
      required: true,
    },
    task: {
      type: Object,
      required: true,
    },
    issueList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      title: this.task.title,
      description: this.task.description,
      linkedIssues: this.task.linkedIssues,
      participants: this.task.participants,
      cost: this.task.cost,
      status: this.task.status,
      issueTags: [],
    };
  },
  methods: {
    isUpdate() {
      if (this.task._id > -1) {
        return true;
      }
      return false;
    },
    erase() {
      this.$buefy.dialog.confirm({
        title: 'Suppression de la tâche',
        message: 'Confirmez-vous la <b>Suppression</b> de cette tâche?',
        confirmText: 'Supprimer la tâche',
        cancelText: 'Annuler',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: async () => {
          this.$buefy.toast.open('Tâche Supprimée!');
          const loading = this.$buefy.loading.open({container: null});
          try {
            const resp = await TasksService.deleteTask({id: this.task._id});
            if (resp.data.success) {
              this.$buefy.toast.open(`Tâche supprimée!`);
            } else {
              console.error(resp);
              this.$buefy.toast.open(`Erreur de suppression`);
            }
          } catch (err) {
            console.error(err);
            this.$buefy.toast.open(`Erreur de suppression`);
          }
          loading.close();
          this.$emit('updateTaskList');
          this.$emit('close');
        },
      });
    },
    async save() {
      const dataForm = {
        title: this.title,
        description: this.description,
        linkedIssues: this.linkedIssues,
        participants: this.participants,
        cost: this.cost,
        status: this.status,
      };

      const loading = this.$buefy.loading.open({container: null});
      try {
        dataForm.linkedIssues = this.getIdFromIssues(this.linkedIssues);
        const resp = await TasksService.createTask(dataForm);
        if (resp.data.success) {
          this.$buefy.toast.open(`Tâche sauvegardée!`);
        } else {
          console.error(resp);
          this.$buefy.toast.open(`Erreur de sauvegarde`);
        }
      } catch (err) {
        console.error(err);
        this.$buefy.toast.open(`Erreur de sauvegarde`);
      }
      loading.close();
      this.$emit('updateTaskList');
      this.$emit('close');
    },
    async update() {
      const dataForm = {
        id: this.task._id,
        title: this.title,
        description: this.description,
        linkedIssues: this.linkedIssues,
        participants: this.participants,
        cost: this.cost,
        status: this.status,
      };

      const loading = this.$buefy.loading.open({container: null});
      try {
        dataForm.linkedIssues = this.getIdFromIssues(this.linkedIssues);
        const resp = await TasksService.updateTask(dataForm);
        if (resp.data.success) {
          this.$buefy.toast.open(`Tâche Modifiée!`);
        } else {
          console.error(resp);
          this.$buefy.toast.open(`Erreur de modification`);
        }
      } catch (err) {
        console.error(err);
        this.$buefy.toast.open(`Erreur de modification`);
      }
      loading.close();
      this.$emit('updateTaskList');
      this.$emit('close');
    },
    getIdFromIssues(issues) {
      const issuesId = [];
      issues.map((issue) => issue._id ?
          issuesId.push(issue._id.toString()): // extract id
          issuesId.push(issue)); // keep the id
      return issuesId;
    },
    getFilteredIssues(title) {
      this.issueTags = this.issueList.filter((issue) => {
        return issue.title
            .toString()
            .toLowerCase()
            .indexOf(title.toLowerCase()) >= 0;
      });
    },
  },
};

</script>

<style scoped>

</style>
