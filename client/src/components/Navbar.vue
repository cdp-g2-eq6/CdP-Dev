<template>
  <div class="sidebar-page">
    <section class="sidebar-layout">
      <b-sidebar
        position="static"
        :mobile="mobile"
        :expand-on-hover="expandOnHover"
        :reduce="reduce"
        :fullheight="fullheight"
        :overlay="overlay"
        type="is-light"
        open
      >
        <div class="p-1">
          <div class="block">
            <img
              :src="logo"
              alt="Lightweight UI components for Vue.js based on Bulma"
            />
          </div>
          <b-menu class="is-custom-mobile">
            <b-menu-list label="Menu">
              <b-menu-item
                pack="fas"
                icon="list"
                size="is-small"
                label="Backlog"
              ></b-menu-item>
              <b-menu-item
                pack="fas"
                icon="tasks"
                size="is-small"
                label="Tâches"
              ></b-menu-item>
              <b-menu-item
                active
                expanded
                pack="fas"
                icon="running"
                label="Sprints"
              >
                <b-menu-item
                  pack="fas"
                  icon="plus"
                  label="Ajouter un sprint"
                ></b-menu-item>
              </b-menu-item>
            </b-menu-list>
            <b-menu-list label="Actions">
              <b-menu-item
                pack="fas"
                icon="edit"
                label="Activer l'édition (todo)">
              </b-menu-item>
            </b-menu-list>
          </b-menu>
        </div>
      </b-sidebar>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logo: 'https://via.placeholder.com/250x150',
      expandOnHover: false,
      mobile: 'reduce', // reduce, hide or fullwidth
      reduce: false,
      fullheight: true,
      overlay: true,
    };
  },
};
</script>

<style lang="scss">

.p-1 {
  padding: 1em;
}

.sidebar-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  // min-height: 100vh;
  .sidebar-layout {
    display: flex;
    flex-direction: row;
    min-height: 100%;
    // min-height: 100vh;
  }
}

@media screen and (max-width: 1023px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini-mobile {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1024px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>
