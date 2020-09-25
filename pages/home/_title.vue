<template>
  <div>
    <HomeCategory :channels="homeCategoryList" />
    <div class="index-container">
      <div class="index-main">
        <div class="list__header">
          <ul class="list__nav">
            <li class="list__nav-item" :class="{'list__nav-item--active': item.id == navId}" v-for="item in navs" :key="item.title" @click="changeNavType(item)">{{ item.title }}</li>
            <el-select v-if="navTypes.length" size="mini" style="width:100px" v-model="sort_type" placeholder="请选择" @change="changeNavType">
              <el-option v-for="item in navTypes" :key="item.title" :label="item.title" :value="item.type">
              </el-option>
            </el-select>
          </ul>
        </div>
        <ArticList :list="list" />
      </div>
      <div class="index-side">
        <AuthorRank :list="recommendAuthors" />
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import reachBottom from '~/mixins/reachBottom'

export default {
  mixins: [ reachBottom ],
  components: {
    'AuthorRank': require('~/components/business/home/AuthorRank').default,
    'HomeCategory': require('~/components/business/home/HomeCategory').default
  },
  async asyncData({ app, params, store }) {
    let homeCategoryList = [ { category_id: 0, category_name: '推荐', category_url: 'recommended' } ]
    if (store.state.category.homeCategoryList.length !== 0) {
      homeCategoryList = store.state.category.homeCategoryList
    } else {
      homeCategoryList = await app.$api.getCategories({ show_type: 0 }).then(res => res.err_no === 0 ? homeCategoryList.concat(res.data) : homeCategoryList)
      store.commit('category/UPDATE_HOME_CATEGORY_LIST', homeCategoryList)
    }

    let currentCategoryItem = _.find(homeCategoryList, [ 'category_url', 'recommended' ]) || homeCategoryList[0]
    let [ recommendFeedList, recommendAuthors ] = await Promise.all([
      // 文章列表
      app.$api.getRecommendFeedList({
        cate_id: currentCategoryItem.category_id || '',
        limit: 20,
        sort_type: 200,
        feed_type: currentCategoryItem.category_id ? 'cate' : 'all',
      }).then(res => res.err_no == 0 ? res : {}),
      // 推荐作者
      app.$api.getRecommendAuthor({
        limit: 5
      }).then(res => res.err_no == 0 ? res.data : [])
    ])

    return {
      recommendAuthors,
      homeCategoryList,
      currentCategoryItem,
      list: recommendFeedList.data || [],
      pageInfo: {                     //列表下一页信息
        cursor: recommendFeedList.cursor,
        has_more: recommendFeedList.has_more
      }
    }
  },
  data() {
    return {
      navs: [
        { id: 1, title: '热门', type: 200 },
        { id: 2, title: '最新', type: 300 },
        { id: 3, title: '热榜', type: 3,
          types: [
            { title: '3天内', type: 3  },
            { title: '7天内', type: 7  },
            { title: '30天内',type: 30 },
            { title: '全部',  type: 0  }
          ]
        }
      ],
      tags: [],
      navId: 1,
      navTypes: [],
      sort_type: 200,
      currentCategoryItem: {},
      isReachBottomFetching: false,  // 防止触底多次请求
    };
  },
  methods: {
    reachBottom() {
      if (this.pageInfo.has_more) {
        this.getArticList({
          isLoadMore: true
        })
      } else {
        this.$message.info('没有更多文章了')
      }
    },
    // 热门 最新 热榜
    changeNavType (item) {
      if (item.id && this.navId !== item.id) {
        this.navId = item.id
        this.sort_type = item.type
        this.navTypes = item.types || []
      }
      this.getArticList()
    },
    async getArticList({ isLoadMore = false } = {}){
      if (this.isReachBottomFetching) {
        return
      }
      this.isReachBottomFetching = true
      let params = {
        feed_type: this.currentCategoryItem.cate_id ? 'cate' : 'all',
        limit: 20,
        cursor: '',
        sort_type: this.sort_type,
        cate_id: this.currentCategoryItem.cate_id || ''
      }
      if (isLoadMore) {
        params.cursor = this.pageInfo.cursor || ''
      }
      let res = await this.$api.getRecommendFeedList(params);
      if (res.err_no == 0) {
        this.list = isLoadMore ? this.list.concat(res.data) : res.data
        this.pageInfo = {
          cursor: res.cursor,
          has_more: res.has_more
        }
        this.isReachBottomFetching = false
      }
    }
  },
  head() {
    return {
      title: `${this.currentCategoryItem.category_name ? this.currentCategoryItem.category_name + ' - ' : ''}掘金`
    }
  }
};
</script>

<style lang="scss" scoped>
.index-container {
  display: flex;
  margin-top: 8rem;

  .index-main {
    width: 700px;
    margin-right: 20px;
    background: #fff;
    border-radius: 2px;
  }

  .index-side {
    width: 240px;
  }

  @media (max-width: 980px) {
    .index-main {
      width: 90%;
      margin: 0 auto;
    }
    .index-side {
      display: none;
    }
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
