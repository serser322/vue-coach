export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoach(state) {
    return state.coaches && state.coaches.length > 0;
  },
  // isCoach(state, getters, rootState, rootGetters) {
  isCoach(_, getters, _2, rootGetters) {
    const userId = rootGetters.userId;
    const coaches = getters.coaches;
    return coaches.some(coach => coach.id === userId);
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) return true; //沒有timestamp，則要update

    const currentTimeStamp = new Date().getTime();
    return (currentTimeStamp - lastFetch) / 1000 > 60; //超過60秒則更新
  }
};
