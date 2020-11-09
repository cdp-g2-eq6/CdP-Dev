<template>
  <section>
    <!-- Here go the navbar settings -->
    <b-sidebar
      type="is-light"
      :fullheight="fullheight"
      :overlay="overlay"
      open
    >
      <div class="p-1">
        <!-- Logo -->
        <img :src="logo" alt="logo"/>

        <!-- Menu -->
        <b-menu>
          <b-menu-list label="Menu">
            <b-menu-item
              pack="fas" icon="list" label="Backlog"
              v-on:click="onBacklog">
            </b-menu-item>
            <b-menu-item
              pack="fas" icon="tasks" label="Tâches"
              v-on:click="onTasks">
            </b-menu-item>
            <b-menu-item pack="fas" icon="running">
              <template slot="label" slot-scope="props">
                Sprints
                <b-icon class="is-pulled-right"
                        :icon="props.expanded ? 'caret-down' : 'caret-up'">
                </b-icon>
              </template>

              <!-- Here go all the sprints -->
              <div >
                <b-menu-item v-for="n in sprintNb" v-bind:key="n"
                  :label="'Sprint ' + n"
                  v-on:click="onSprint($event, n)">
                </b-menu-item>
              </div>

              <b-menu-item
                pack="fas" icon="plus" label="Ajouter un sprint"
                v-on:click="onNewSprint">
              </b-menu-item>
            </b-menu-item>
          </b-menu-list>

        <!-- Actions -->
        <b-menu-list label="Actions">
          <b-menu-item
            pack="fas" icon="edit" :label="editMessage"
            v-on:click="onEditChanged">
          </b-menu-item>
        </b-menu-list>
        </b-menu>
      </div>

    </b-sidebar>
  </section>
</template>

<script>
export default {
  data() {
    return {
      logo: 'https://via.placeholder.com/250x150',
      fullheight: true,
      overlay: false,
      editMessage: 'unset',
      sprintNb: 0,
    };
  },
  props: {
    edit: Boolean,
  },
  methods: {
    // Called when "Ajouter un sprint" is clicked
    onNewSprint: function(event) {
      this.sprintNb ++;
    },
    // Called when "Backlog" is clicked
    onBacklog: function(event) {
      this.$router.push('backlog');
    },
    // Called when "Tâches" is clicked
    onTasks: function(event) {
      this.$router.push('tasks');
    },
    onSprint: function(event, sprintId) {
      // TODO: redirect to the right sprint page
      alert('Not implemented, sprint selected: ' + sprintId);
    },
    // Called when "Edit" is clicked
    onEditChanged: function() {
      // This sends an event to the parent container (App) saying that the edit
      // mode changed
      this.$emit('onEditChanged', this.edit);

      this.editMessage = (
        (this.edit ? 'Activer ' : 'Désactiver ') + 'l\'édition'
      );
    },
  },
  mounted: function() {
    const self = this;
    this.$nextTick(function() {
      self.onEditChanged(self);
    });
  },
};
</script>

<style>
.p-1 {
  padding: 1em;
}
</style>
