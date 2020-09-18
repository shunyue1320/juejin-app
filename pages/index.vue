<template>
  <div>
    <Category :channels="timelineCategoryList" />
  </div>
</template>

<script>
// import Category from '~/components/common/Category'
import reachBottom from '~/mixins/reachBottom'

export default {
  components: {
    Category: require('~/components/common/Category').default
  },
  mixins: [reachBottom],
  async asyncData({app, params, store}) {
    // let initCategoryList = [{ category_id: 0, category_name: '推荐', category_url: 'recommended' }]
    let currentCategoryItem = store.state.category.timelineCategoryList
      .filter(item => item.category_url === params.title)[0]
      || { category_id: 0, category_name: '推荐', category_url: 'recommended' }
    const data = {}
    const result = await Promise.all([
      //文章列表
      app.$api.getIndexList({
        cate_id: currentCategoryItem.category_id || '', //从第几个开始取
        limit: 20, //一次取几个
        sort_type: 200,
        feed_type: currentCategoryItem.category_id ? 'cate' : 'all'
      }).then(res => res.err_no == 0 ? res : {}),
      // 推荐作者
      app.$api.getRecommendAuthor({
         limit: 5   //5个
      }).then(res => res.err_no == 0 ? res.data : []),
      // 推荐小册
      app.$api.getRecommendBook().then(res => res.s === 1 ? res.d.data : []),
    ])

    Object.assign(data, _.zipObject([ 'indexData', 'recommendAuthors', 'recommendBooks' ], result))
    
    data.list = data.indexData.data || []
    return data
  },
  async validate ({ app, params, store }) {
    // 分类列表
    let initCategoryList = [{ category_id: 0, category_name: '推荐', category_url: 'recommended' }]
    let categoryList = []
    // 获取分类列表缓存
    if (store.state.category.timelineCategoryList.length) {
      categoryList = store.state.category.timelineCategoryList
    } else {
      categoryList = await app.$api.getCategories({ show_type: 0 }).then(res => res.err_no === 0 ? initCategoryList.concat(res.data) : initCategoryList)
      store.commit('category/UPDATE_TIMELINE_CATEGORY_LIST', categoryList)
    }
    return params.title === undefined || categoryList.filter(item => item.category_url === params.title).length
  },
  mounted() {

  },
  head () {
    return {
      title: '掘金'
    }
  },
}
</script>

<style lang="scss" scoped>
.index-container{
  display: flex;

  .index-main{
    width: 700px;
    margin-right: 20px;
    background: #fff;
    border-radius: 2px;
  }

  .index-side{
    width: 240px;
  }
}
.list__header{
  padding: 15px 25px;
  border-bottom: 1px solid #eee;
}

.list__nav{
  height: 28px;
  display: flex;
  align-items: center;
  
  .list__nav-item{
    display: inline-block;
    font-size: 14px;
    color: #909090;
    cursor: pointer;

    &:hover,
    &.list__nav-item--active{
      color: $theme;
    }

    &:not(:last-child){
      &::after{
        content: '|';
        margin: 10px;
        color: #eee;
      }
    }
  }
}
</style>
