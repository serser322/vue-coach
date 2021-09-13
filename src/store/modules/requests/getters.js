export default {
  getRequests(state) {
    return state.requests;
  },
  requestOfTheCoach(_, getters, _2, rootGetters) {
    return getters.getRequests.filter(
      coach => coach.coachId === rootGetters.userId
    );
  },
  hasRequests(_, getters) {
    return getters.requestOfTheCoach && getters.requestOfTheCoach.length > 0;
  }
};
