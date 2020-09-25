<template>
  <nav class="view-nav" role="navigation" :class="{'visible': !visible}">
    <ul class="nav-list">
      <li class="nav-item" :class="{'nav-item--active': item.category_url === paramsTitle}" v-for="item in channels" :key="item.category_id" @click="navItemClick(item)">{{ item.category_name }}</li>
      <li class="nav-item"><nuxt-link v-if="!token" to="/subscribe" class="nav-item">标签管理</nuxt-link></li>
    </ul>
  </nav>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  props: {
    channels: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapState([ 'visible' ]),
    ...mapState('auth', [ 'token' ]),
    paramsTitle() {
      return this.$route.params.title || 'recommended'
    }
  },
  methods: {
    ...mapMutations([
      'UPDATE_HEADER_VISIBLE'
    ]),
    async getTagByCategories(categoryId) {
      await this.$api.getTagByCategories({
        categoryId,
        limit: 15
      })
    },
    navItemClick(item) {
      if (this.paramsTitle != item.category_url) {
        this.visible === false && this.UPDATE_HEADER_VISIBLE(true)
        window.scrollTo({ top: 0 })
        this.$router.push({
          name: 'timeline-title',
          params: {
            title: item.category_url
          }
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.view-nav {
  position: fixed;
  top: 4rem;
  left: 0;
  width: 100%;
  height: 3rem;
  background: #fff;
  z-index: 100;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
  transition: all .2s;

  &.visible{
    top: 0;
  }

  .nav-list {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    max-width: 960px;
    height: 100%;
    margin: auto;
    color: #71777c;
    font-size: 0.85rem;

    .nav-item{
      display: flex;
      align-items: center;
      height: 100%;
      flex-shrink: 0;
      padding: 0 0.8rem;
      cursor: pointer;

      &:hover,
      &.nav-item--active {
        color: $theme;
      }
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        padding-right: 0;
        margin-left: auto;
      }
    }
  }
}
</style>