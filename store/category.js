export default {
  state: () => ({
    homeCategoryList: [],  // 首页分类列表
    recommendCategoryList: [], // 作者榜单分类列表
    bookCategoryList: [],      // 小册分类列表
    pinCategoryList: [         // 沸点分类列表
      {
        topic_id: 'recommend',
        title: '推荐',
        path: '/pins/recommend'
      },
      {
        topic_id: 'hot',
        title: '热门',
        path: '/pins/hot'
      }
    ]
  }),
  mutations: {
    UPDATE_PIN_CATEGORY_LIST(state, payload){
      state.pinCategoryList.push(...payload)
    },
    UPDATE_HOME_CATEGORY_LIST(state, payload){
      state.homeCategoryList = payload
    },
    UPDATE_RECOMMEND_CATEGORY_LIST(state, payload){
      state.recommendCategoryList = payload
    },
    UPDATE_BOOK_CATEGORY_LIST(state, payload){
      state.bookCategoryList = payload
    }
  }
}