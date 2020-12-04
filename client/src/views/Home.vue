<template >
  <div id="homepage">
    <p class="title">{{project.name}}</p> <hr>
    <p class="description">{{project.description}}</p><hr>
    <p class="subtitle"><b>Participants</b></p>
    <div class="members">
      <ul v-for="participant in project.participants"
          v-bind:key="participant.id">
        <li>{{participant.name}}</li>
      </ul>
    </div> <hr>
    <p class="subtitle"><b>Progressions</b></p>
    <div class="sprints" v-for="sprint in sprintList"
         v-bind:key="sprint._id">
      <sprint-overview :sprint="sprint"></sprint-overview>
    </div>
  </div>
</template>

<script>
import SprintsService from '@/services/SprintsService';
import SprintOverview from '../components/SprintOverview';
import IssuesService from '@/services/IssuesService';

const project = {
  id: 0,
  name: 'Conduite De Projet',
  description:
      'Project Description is a formally written declaration of the project' +
      ' and its idea and context to explain the goals and objectives to ' +
      'be reached, the business need and problem to be addressed, ' +
      'potentials pitfalls and challenges, approaches and execution methodsr.',
  participants: [
    {id: 0, name: 'Personne a'},
    {id: 1, name: 'Personne b'},
    {id: 2, name: 'Personne c'},
    {id: 3, name: 'Personne d'},
  ],
};

export default {
  name: 'Homepage',
  props: {},
  data() {
    return {
      project,
      sprintList: [],
      issue: {
        '_id': -1,
        'title': '',
        'description': {
          '_id': -1,
          'role': '',
          'goal': '',
          'benefit': '',
        },
        'difficulty': -1,
        'priority': -1,
      },
    };
  },
  components: {
    SprintOverview,
  },
  methods: {
    async getIssue(id) {
      try {
        return await IssuesService.getIssue({id: id});
      } catch (err) {
        console.error(err);
      }
    },
    getIssuesOfSprint() {
      for (const sprint of this.sprintList) {
        sprint.issueList = [];
        for (const issueId of sprint.issues) {
          this.getIssue(issueId).then((resp) => {
            sprint.issueList.push(resp.data.issue);
          });
        }
      }
    },
    updateSprints() {
      SprintsService.getSprints().then((resp) => {
        this.sprintList = resp.data.sprints;
        this.getIssuesOfSprint();
      }).catch((err) => console.error(err));
    },
  },
  mounted: function() {
    const self = this;
    this.$nextTick(function() {
      self.updateSprints();
    });
  },
};
</script>

<style>
#homepage {
  margin-top: 2px;
  margin-left: 16px;
}

.description, .members, .sprints {
  margin-left: 16px;
}

</style>
