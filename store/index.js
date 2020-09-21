export default {
  state: () => ({
    visible: true, // 顶部栏是否显示
  }),
  mutations: {
    UPDATE_HEADER_VISIBLE(state, payload){
      state.visible = payload
    }
  }
}