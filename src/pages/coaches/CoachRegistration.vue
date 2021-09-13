<template>
  <base-card>
    <h2>Coach Registration</h2>
    <coach-form @save-data="setData"></coach-form>
  </base-card>
</template>

<script>
import CoachForm from './../../components/coaches/CoachForm.vue';
export default {
  components: {
    CoachForm
  },
  methods: {
    setData(formData) {
      this.$store.dispatch('coaches/registerCoach', formData);
      this.$router.replace('/coaches'); //提交後導到coaches頁(且無法返回上頁)
    }
  }
};
</script>
