export default {
  async registerCoach(context, payload) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: payload.first,
      lastName: payload.last,
      areas: payload.areas,
      description: payload.desc,
      hourlyRate: payload.rate
    };

    const response = await fetch(
      `https://vue-http-demo-e0ced-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${userId}.json?auth=` +
        context.rootGetters.token,
      {
        method: 'PUT',
        body: JSON.stringify(coachData)
      }
    );

    if (!response.ok) {
      //error ...
    }

    context.commit('registerCoach', {
      ...coachData,
      id: userId
    });
  },
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) return;
    //created(未超過60秒的切回頁面)時不要觸發loadCoaches，按按鈕時則觸發

    const response = await fetch(
      'https://vue-http-demo-e0ced-default-rtdb.asia-southeast1.firebasedatabase.app/coaches.json'
    );

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || '取得資料錯誤(action)'); //錯誤會丟回給呼叫此action的method
    }

    const coaches = [];

    for (const key of Object.keys(responseData)) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas
      };
      coaches.push(coach);
    }
    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  }
};
