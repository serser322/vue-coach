export default {
  async addRequest(context, payload) {
    // const dataId = new Date().toISOString();
    const newRequest = {
      // coachId: payload.coachId,
      email: payload.email,
      message: payload.msg
    };

    const response = await fetch(
      `https://vue-http-demo-e0ced-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest)
      }
    );

    const responseData = await response.json();

    newRequest.dataId = responseData.name; //firebase自動生成id，並自動存在responseData.name裡
    newRequest.coachId = payload.coachId;

    if (!response.ok) throw new Error('傳送request時發生錯誤⚠');

    context.commit('addRequest', newRequest);
  },

  async loadRequests(context) {
    const response = await fetch(
      `https://vue-http-demo-e0ced-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${context.rootGetters.userId}.json?auth=` +
        context.rootGetters.token
    );

    const responseData = await response.json();
    // console.log(responseData);
    if (!response.ok) {
      throw new Error(
        responseData.message + '🚚' || '取得Requests資料有誤(action)💥'
      );
    }

    const requests = [];

    // for (const key of Object.keys(responseData)) {  //需要先確認物件不為null
    for (const key in responseData) {
      const request = {
        dataId: key,
        coachId: context.rootGetters.userId,
        email: responseData[key].email,
        message: responseData[key].message
      };
      requests.unshift(request);
    }

    context.commit('setRequests', requests);
  }
};
