<template >
  <div id="homepage">
    <p class="title">{{project.name}}</p> <hr>
    <p class="description">{{project.description}}</p><hr>
    <p class="subtitle"><b>Participants</b></p>
    <div class="members">
      <ul v-for="participant in project.participants"
          v-bind:key="participant.id">
        <li>{{participant}}</li>
      </ul>
      <ul v-if="project.participants.length===0">
        Pas de participants
      </ul>
    </div> <hr>
    <p class="subtitle"><b>Progressions</b></p>
    <div class="sprints" v-for="sprint in sprintList" v-bind:key="sprint._id">
      <sprint-overview :sprint="sprint"></sprint-overview>
      <BurnupChart :sprint="sprint"></BurnupChart>
    </div>
  </div>
</template>

<script>
import SprintOverview from '../components/SprintOverview';
import IssuesService from '@/services/IssuesService';

import BurnupChart from '../components/BurnupChart.vue';
import ProjectsService from '../services/ProjectsService';

export default {
  name: 'Homepage',
  props: {
    project: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      sprintList: [],
    };
  },
  components: {
    SprintOverview,
    BurnupChart,
  },
  methods: {
    async getIssue(id) {
      try {
        return await IssuesService.getIssue({id: id});
      } catch (err) {
        console.error(err);
      }
    },
    updateSprints() {
      ProjectsService.getSprintsOfProject({id: this.project._id})
          .then((resp) => this.sprintList = resp.data.sprints)
          .catch((err) => console.error(err));
    },
  },
  mounted: function() {
    const self = this;
    this.$nextTick(function() {
      self.updateSprints();
    });
  },
  watch: {
    project: function(newVal, oldVal) {
      this.updateSprints();
    },
  },
};
</script>

<style>
#homepage {
  padding-top: 10px;
  padding-left: 20px;
}

.description, .members, .sprints {
  margin-left: 16px;
}

</style>
