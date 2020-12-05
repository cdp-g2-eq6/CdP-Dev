<script>
import {Line} from 'vue-chartjs';

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
    },
  }),
  mounted() {
    // todo: build sprint progress
    const sprintProgress = [
      {
        t: new Date('12/10/2020'),
        y: 0,
      },
      {
        t: new Date('12/11/2020'),
        y: 0,
      },
      {
        t: new Date('12/12/2020'),
        y: 5,
      },
      {
        t: new Date('12/13/2020'),
        y: 5,
      },
      {
        t: new Date('12/14/2020'),
        y: 7,
      },
      {
        t: new Date('12/15/2020'),
        y: 15,
      },
      {
        t: new Date('12/16/2020'),
        y: 20,
      },
      {
        t: new Date('12/17/2020'),
        y: 20,
      },
      {
        t: new Date('12/18/2020'),
        y: 20,
      },
      {
        t: new Date('12/19/2020'),
        y: 35,
      },
      {
        t: new Date('12/20/2020'),
        y: 35,
      },
    ];

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
  },
};
</script>

<style>

</style>
