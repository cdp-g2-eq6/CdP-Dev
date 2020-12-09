<script>
import {Line} from 'vue-chartjs';
import IssuesService from '../services/IssuesService';

export default {
  extends: Line,
  props: {
    sprint: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    chartdata: null,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            unit: 'day',
          },
        }],
      },
      elements: {
        line: {
          tension: 0,
        },
      },
    },
  }),
  mounted() {
    IssuesService.getIssues().then((resp) => {
      const issues = resp.data.issues;

      // First, sort the issues by doneDate
      const sortedIssues = [];
      for (const issue of issues) {
        if (issue.dateDone &&
            this.sprint.issues.includes(issue._id)) {
          sortedIssues.push(issue);
        }
      }
      sortedIssues.sort((issue1, issue2) =>
        new Date(issue1.dateDone) - new Date(issue2.dateDone),
      );

      // Then add the points on the chart
      const sprintProgress = [
        {
          t: new Date(this.sprint.startDate),
          y: 0,
        },
      ];
      let sum = 0;
      for (const issue of sortedIssues) {
        sum += issue.difficulty;
        sprintProgress.push({
          t: issue.dateDone,
          y: sum,
        });
      }

      sprintProgress.push({
        t: new Date(this.sprint.endDate),
        y: sum,
      });

      // Plot the chart!
      this.chartdata = {
        labels: [
          this.sprint.startDate.toLocaleString(),
          this.sprint.endDate.toLocaleString(),
        ],
        datasets: [
          {
            label: 'Max',
            data: [
              {
                t: new Date(this.sprint.startDate),
                y: 40,
              },
              {
                t: new Date(this.sprint.endDate),
                y: 40,
              },
            ],
            borderColor: '#D08770',
            backgroundColor: 'rgba(255,0,0,0)',
          },
          {
            label: 'Optimal',
            data: [
              {
                t: new Date(this.sprint.startDate),
                y: 0,
              },
              {
                t: new Date(this.sprint.endDate),
                y: 40,
              },
            ],
            backgroundColor: 'rgba(255,0,0,0)',
            borderColor: '#A3BE8C',
          },
          {
            label: 'Actual',
            data: sprintProgress,
            borderColor: '#EBCB8B',
            backgroundColor: 'rgba(255,0,0,0)',
          },
        ],
      };
      this.renderChart(this.chartdata, this.options);
    }).catch((err) => console.error(err));
  },
};
</script>

<style>

</style>
