export default {
  state: () => ({
    visible: true, // 顶部栏是否显示
    pinsPath: '/pins/recommend'  //默认路径
  }),
  mutations: {
    UPDATE_HEADER_VISIBLE(state, boole){
      state.visible = boole
    },
    UPDATE_PINSPATH(state, path){
      state.pinsPath = path
    }
  }
}