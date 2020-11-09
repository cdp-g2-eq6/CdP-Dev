import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import {library} from '@fortawesome/fontawesome-svg-core';
// internal icons
import {fas} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

library.add(fas);
Vue.component('vue-fontawesome', FontAwesomeIcon);
Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas',
  customIconPacks: {
    fas: {
      sizes: {
        'default': 'lg',
        'is-small': '1x',
        'is-medium': '2x',
        'is-large': '3x',
      },
      iconPrefix: '',
    },
  },
});

Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {
      path: '/backlog',
      name: 'backlog',
      // component: Backlog,
    },
    {
      path: '/tasks',
      name: 'tasks',
      // component: Tasks,
    },
  ],
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
