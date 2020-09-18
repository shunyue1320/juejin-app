
export default {
  state: () => ({
    cookieMaxExpires: new Date(Date.now() + 8.64e7 * 365 * 10),
    userInfo: null,
    userId: '',
    clientId: '',
    token: ''
  }),
  mutations: {
    UPDATE_USERINFO(state, payload){
      state.userInfo = payload
    },
    UPDATE_USERID(state, payload){
      state.userId = payload
    },
    UPDATE_CLIENTID(state, payload){
      state.clientId = payload
    },
    UPDATE_TOKEN(state, payload){
      state.token = payload
    }
  }
}