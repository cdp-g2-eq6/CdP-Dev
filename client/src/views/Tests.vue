<template>
  <div id="tests">
    <div v-for="test in testList" v-bind:key="test._id">
      <Test :test="test" @click.native="updateTest(test._id)"
            @updateTests="updateTestList"></Test>
    </div>
    <div class="add" v-if="$attrs.edit">
      <button class="button is-white m-4" @click="createTest">
        <b-icon pack="fas" size="fa-3x" icon="plus-circle"
                type="is-grey-dark">
        </b-icon>
      </button>
    </div>
  </div>
</template>

<script>
import Test from '@/components/Test';
import TestForm from '@/components/TestForm';
import TestsService from '@/services/TestsService';
import TasksService from '@/services/TasksService';

export default {
  name: 'Tests',
  props: {},
  data() {
    return {
      testList: [],
      tasks: [],
    };
  },
  components: {
    Test,
  },
  methods: {
    createTest() {
      if (this.$attrs.edit) {
        const test = {
          _id: -1,
          title: '',
          description: '',
          linkedTask: null,
        };
        this.$buefy.modal.open({
          parent: this,
          component: TestForm,
          props: {
            modalTitle: 'Création d\'un test',
            test: test,
            tasks: this.tasks,
          },
          hasModalCard: true,
          customClass: 'custom-class custom-class-2',
          trapFocus: true,
          events: {
            'updateTestList': () => {
              this.updateTestList();
            },
          },
        });
      }
    },
    updateTest(testId) {
      if (this.$attrs.edit) {
        // execute initialization code here (use self as being this)
        TestsService.getTest({id: testId}).then((resp) => {
          this.$buefy.modal.open({
            parent: this,
            component: TestForm,
            props: {
              modalTitle: 'Modification d\'un test',
              test: resp.data.test,
              tasks: this.tasks,
            },
            hasModalCard: true,
            customClass: 'custom-class custom-class-2',
            trapFocus: true,
            events: {
              'updateTestList': () => {
                this.updateTestList();
              },
            },
          });
        });
      }
    },
    updateTestList() {
      TestsService.getTests().then((resp) => {
        this.testList = resp.data.tests;
      });
    },
  },
  mounted: function() {
    const self = this;
    this.$nextTick(function() {
      self.updateTestList();
      TasksService.getTasks().then((resp) => {
        self.tasks = resp.data.tasks;
      });
    });
  },
};
</script>

<style>

</style>
