import Vue from 'vue';
import VueRouter from 'vue-router';
// Components
import App from './App';
import Backlog from './views/Backlog.vue';
import Tasks from './views/Tasks.vue';
import Sprint from './views/Sprint.vue';
import Tests from './views/Tests.vue';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: App,
    },
    {
      path: '/backlog',
      name: 'backlog',
      component: Backlog,
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks,
    },
    {
      path: '/sprint/:id',
      component: Sprint,
    },
    {
      path: '/tests',
      component: Tests,
    },
  ],
});
