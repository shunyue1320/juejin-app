<template>
  <header class="topbar-wrapper">
    <div class="topbar" :class="['topbar-'+(isTopbarBlock ? 'show' : 'hidden')]">
      <div class="topbar-main">
        <nuxt-link to="/" class="logo">
          <img src="https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg" alt="掘金">
        </nuxt-link>
        <ul class="navs">
          <nuxt-link v-for="item in navs" :key="item.id" :to="item.link" tag="li" class="nav-item">{{ $t('topbar.'+item.name) }}</nuxt-link>
        </ul>
        <div class="search-form pr-3" :class="[searchFormClass]">
          <a-input-search placeholder="搜索掘金" style="width: 150px" @search="onSearch" @keydown.enter="onSearch" />
        </div>
        <a-button-group class="pr-3">
          <a-button type="primary">写文章</a-button>
          <a-dropdown>
            <a-menu slot="overlay" @click="handleMenuClick">
              <a-menu-item key="news">
                发布沸点
              </a-menu-item>
            </a-menu>
            <a-button type="primary" icon="caret-down" />
          </a-dropdown>
        </a-button-group>

        <nuxt-link to="/" class="pr-3">
          <a-icon type="bell" theme="filled" style="fontSize: 1.4rem; margin-right: 0;"/>
        </nuxt-link>

        <a-avatar src="https://mirror-gold-cdn.xitu.io/16a4aabc6c81a96be8f?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1" />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      navs: [
        {
          name: 'home',
          link: '/timeline'
        },
        {
          name: 'pin',
          link: '/pins/recommend'
        },
        {
          name: 'topic',
          link: '/topic'
        },
        {
          name: 'book',
          link: '/book'
        }
      ],
      searchFormClass: '',
      isTopbarBlock: true
    }
  },
  methods: {
    onSearch() {},
    handleMenuClick() {}
  }
}
</script>

<style lang="scss" scoped>
.topbar-wrapper {
  z-index: 1000;
  position: relative;
  height: 60px;
}

.topbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #fff;
  box-shadow: 0 0 4px #eee;
  transition: all .2s;

  &.topbar-show {
    transform: translateY(0);
  }
  &.topbar-hidden {
    transform: translateY(-100%)
  }
}
.topbar-main {
  display: flex;
  align-items: center;
  max-width: 960px;
  height: 100%;
  margin: 0 auto;

  .logo {
    margin-right: 1rem;
  }
}
.navs {
  display: flex;
  line-height: 60px;
  font-size: 16px;
  color: #71777c;

  .nav-item {
    padding: 0 20px;
    cursor: pointer;

    &:hover, &.nuxt-link-active {
      color: $theme;
    }
  }
}

.search-form {
  margin-left: auto;
}
</style>