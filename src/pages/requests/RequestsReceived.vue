<template>
  <section>
    <base-dialog :show="!!error" title="取資料有錯誤☢" @close="handleError">
      <h4>{{ error }}</h4></base-dialog
    >

    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="!isLoading && hasRequests">
        <request-item
          v-for="req in receivedRequests"
          :key="req.dataId"
          :email="req.email"
          :message="req.message"
        ></request-item>
      </ul>
      <h3 v-else>You haven't received any requests yet !</h3>
    </base-card>
  </section>
</template>

<script>
import RequestItem from './../../components/requests/RequestItem.vue';
export default {
  components: {
    RequestItem
  },
  data() {
    return {
      isLoading: false,
      error: ''
    };
  },
  computed: {
    receivedRequests() {
      return this.$store.getters['requests/requestOfTheCoach'];
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests'];
    }
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/loadRequests');
      } catch (err) {
        this.error = err.message + '🚛' || '取得資料無法QQ';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    }
  },
  created() {
    this.loadRequests();
  }
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
