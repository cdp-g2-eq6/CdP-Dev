import Vue from 'vue';
import VueRouter from 'vue-router';
// Components
import Home from './views/Home.vue';
import Backlog from './views/Backlog.vue';
import Tasks from './views/Tasks.vue';
import Sprint from './views/Sprint.vue';
import Tests from './views/Tests.vue';
import Overviews from './views/Overviews.vue';

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
      name: 'sprints',
      component: Sprint,
    },
    {
      path: '/tests',
      name: 'tests',
      component: Tests,
    },
    {
      path: '/Overviews',
      name: 'Overviews',
      component: Overviews,
    },
  ],
});
