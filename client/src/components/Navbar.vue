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
            <b-menu-item pack="fas" icon="list" label="Backlog"></b-menu-item>
            <b-menu-item pack="fas" icon="tasks" label="Tâches"></b-menu-item>
            <b-menu-item pack="fas" icon="running">
              <template slot="label" slot-scope="props">
                Sprints
                <b-icon class="is-pulled-right"
                        :icon="props.expanded ? 'caret-down' : 'caret-up'">
                </b-icon>
              </template>

              <!-- Here go all the sprints -->
              <b-menu-item pack="fas" icon="plus" label="Ajouter un sprint">
              </b-menu-item>
            </b-menu-item>
          </b-menu-list>

        <!-- Actions -->
        <b-menu-list label="Actions">
          <b-menu-item pack="fas" icon="edit" label="Activer l'édition (todo)">
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
    };
  },
};
</script>

<style>
.p-1 {
  padding: 1em;
}
</style>
