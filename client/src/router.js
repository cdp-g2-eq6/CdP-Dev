import Vue from 'vue';
import VueRouter from 'vue-router';
// Components
import App from './App';
import Backlog from './views/Backlog.vue';
import Tasks from './views/Tasks.vue';
import Sprint from './views/Sprint.vue';

Vue.use(VueRouter);

const task1 = {id: 5, status: 'todo'};
const task2 = {id: 6, status: 'in progress'};
const task3 = {id: 7, status: 'testing'};
const task4 = {id: 8, status: 'done'};

const userStory1 = {
  us: {
    id: 1,
    title: 'titre de l\'US',
    description: 'en tant que ... je souhaite .. afin de ...',
    difficulty: 'difficile',
    importance: 'maximale',
    linked_tasks: {
      task1,
      task2,
      task3,
      task4,
    },
  },
};
const userStory2 = userStory1;

const jsonBacklog = {
  us_list: {
    userStory1,
    userStory2,
  },
};

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
      props: {jsonBacklog: jsonBacklog, editMode: true},
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
  ],
});
