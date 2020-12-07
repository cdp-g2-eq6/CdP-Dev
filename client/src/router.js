import Vue from 'vue';
import VueRouter from 'vue-router';
// Components
import Home from './views/Home.vue';
import Backlog from './views/Backlog.vue';
import Tasks from './views/Tasks.vue';
import Sprint from './views/Sprint.vue';
import Tests from './views/Tests.vue';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: '',
      component: Home,
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
