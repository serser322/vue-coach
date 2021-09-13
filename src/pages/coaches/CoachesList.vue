<template>
  <div>
    <!--因為<transition>(動畫)只能一個子標籤，故加上div包裹全部-->
    <base-dialog :show="!!error" title="有錯誤發生惹⚡" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="updateFilter"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <base-button link to="/auth?redirect=register" v-if="!isLogin"
            >Login to register as a coach</base-button
          >
          <!-- <router-link to="register">Regist as a coach</router-link> -->
          <base-button
            link
            to="register"
            v-if="!isLoading && !userIsCoach && isLogin"
            >Regist as a coach</base-button
          >
        </div>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasCoach">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :areas="coach.areas"
            :rate="coach.hourlyRate"
          ></coach-item>
        </ul>
        <h3 v-else>No coach found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from './../../components/coaches/CoachItem.vue';
import CoachFilter from './../../components/coaches/CoachFilter.vue';

export default {
  components: {
    CoachItem,
    CoachFilter
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activedFilters: {
        frontend: true,
        backend: true,
        career: true
      }
    };
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];

      return coaches.filter(coach => {
        if (this.activedFilters.frontend && coach.areas.includes('frontend'))
          return true;
        if (this.activedFilters.backend && coach.areas.includes('backend'))
          return true;
        if (this.activedFilters.career && coach.areas.includes('career'))
          return true;
        return false;
      });
    },
    hasCoach() {
      return !this.isLoading && this.$store.getters['coaches/hasCoach'];
    },
    userIsCoach() {
      // console.log(this.$store.getters['userId']);
      return this.$store.getters['coaches/isCoach'];
    },
    isLogin() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    updateFilter(newFilters) {
      this.activedFilters = { ...newFilters };
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches', {
          forceRefresh: refresh
        }); //dispatch也會回傳一個promise物件
        //created時不要觸發loadCoaches，按按鈕時則觸發
      } catch (err) {
        this.error = err.message || '錯誤發生(coachlist)';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null; // error becomes falsy value
    }
  },
  created() {
    this.loadCoaches();
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
