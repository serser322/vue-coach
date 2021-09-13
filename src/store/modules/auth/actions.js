let timer;

export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login'
    });
    //要加上return，因為auth會回傳一個Promise (fetch)，需要再傳回給呼叫的component，component才知道要等待response或是有error
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup'
    });
  },
  async auth(context, payload) {
    let endPointUrl = '';
    if (payload.mode === 'login') {
      endPointUrl =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAfu773kzu0FPx8EyBbl49b1IOEIC7CfoI';
    }

    if (payload.mode === 'signup') {
      endPointUrl =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAfu773kzu0FPx8EyBbl49b1IOEIC7CfoI';
    }

    const response = await fetch(endPointUrl, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    });
    const responseData = await response.json();
    if (!response.ok) {
      // console.log(responseData);
      throw new Error(responseData.message || '權限失敗⛔');
    }

    // const expiresIn = +responseData.expiresIn * 1000; //default值為3600秒
    const expiresIn = 5000; //5秒
    const expirationDate = new Date().getTime() + expiresIn;

    sessionStorage.setItem('token', responseData.idToken);
    sessionStorage.setItem('userId', responseData.localId);
    sessionStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(function() {
      context.dispatch('autoLogout');
    }, expiresIn);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId
    });
  },
  autoLogin(context) {
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');
    const tokenExpiration = sessionStorage.getItem('tokenExpiration');

    const expiresIn = tokenExpiration - new Date().getTime();

    if (expiresIn < 0) return; //超過時間就不自動登入，也就不commit給mutation

    timer = setTimeout(function() {
      context.dispatch('autoLogout');
    }, expiresIn);

    if (token && userId) {
      context.commit('setUser', {
        token,
        userId
      });
    }
  },
  logout(context) {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    context.commit('setUser', {
      token: null,
      userId: null
    });
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('didAutoLogout');
  }
};
