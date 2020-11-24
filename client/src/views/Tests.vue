<template>
  <div id="tests">
    <div class="testList">
      <Test _id='1'
            title='title'
            status='false'
            linkedTask='Task1'
            description='description'>
      </Test>
    </div>
    <div class="add" v-if="$attrs.edit">
      <button class="button is-white m-4" @click="createTest">
        <b-icon pack="fas" size="fa-3x" icon="plus-circle"
                type="is-grey-dark"></b-icon>
      </button>
    </div>
  </div>
</template>

<script>
import Test from '@/components/Test';
import TestForm from '@/components/TestForm';
export default {
  name: 'Tests',
  props: {},
  data() {
    return {
      testList: [],
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
          status: 0,
        };
        this.$buefy.modal.open({
          parent: this,
          component: TestForm,
          props: {
            modalTitle: 'Création d\'un test',
            test: test,
          },
          hasModalCard: true,
          customClass: 'custom-class custom-class-2',
          trapFocus: true,
        });
      }
    },
  },
  mounted: function() {
    // const self = this;
    this.$nextTick(function() {
      // self instead of this here
    });
  },
};
</script>

<style>

</style>
