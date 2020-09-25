<template>
  <header class="main-header" :class="{'visible': !visible}">
    <div class="container">
      <nuxt-link to="/home" class="logo">
        <img src="https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg" alt="掘金">
      </nuxt-link>

      <nav role="navigation" class="main-nav">
        <ul class="nav-list">
          <li class="main-nav-list">
            <div class="phone-show-menu">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  首页<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="item in navs" :key="item.id">
                    <nuxt-link :to="item.link">{{ $t('topbar.'+item.name) }}</nuxt-link>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <ul class="phone-hide">
              <li v-for="item in navs" :key="item.id" class="nav-item">
                <nuxt-link :to="item.link">{{ $t('topbar.'+item.name) }}</nuxt-link>
              </li>
            </ul>
          </li>

          <li class="nav-item search">
            <el-input
              class="ml-auto"
              style="width: 10rem"
              maxlength="32"
              :placeholder="$t('topbar.search')"
              suffix-icon="el-icon-search"
              v-model="keyword"
              size="small"
              @keydown.enter="sreachHandler">
            </el-input>
          </li>

          <li class="nav-item add">
            <el-dropdown size="small" split-button type="primary" trigger="click">
              {{ $t('topbar.write') }}
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>发布沸点</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>

          <template v-if="userInfo">
            <li class="nav-item notification">
              <nuxt-link to="/notification"><i class="el-icon-message-solid"></i></nuxt-link>
            </li>
            <li class="nav-item menu">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <el-avatar size="medium" src="https://sf3-ttcdn-tos.pstatp.com/img/user-avatar/2d517cc4a38ecbf37ba4405284efbdf0~120x256.image"></el-avatar>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-edit">写文章</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-document">草稿</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-user">我的主页</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-thumb">我赞过的</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-collection">我的小册</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-star-off">我的收藏集</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-collection-tag">标签管理</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-s-tools">设置</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-info">关于</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-switch-button">登出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </template>
          <li v-else class="nav-item auth">
            <el-button class="login-btn" size="small" plain  @click="showLoginModal">{{ $t('menu.login') }}</el-button>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      keyword: '',
      scrollingElement: null,
      searchFormClass: '',
      noticeNum: 0,
      isShowNavMenu: false
    }
  },
  mounted() {
    //通过滚动条高度判断头部 隐藏/显示
    let scrollingElement = document.scrollingElement
    let scrollTop = 0
    window.addEventListener('scroll', () => {
      if (scrollingElement.scrollTop < 500) {
        this.visible === false && this.UPDATE_HEADER_VISIBLE(true)
        return
      }
      if (scrollingElement.scrollTop > scrollTop) {
        this.UPDATE_HEADER_VISIBLE(false)
      } else if (scrollingElement.scrollTop < scrollTop) {
        this.UPDATE_HEADER_VISIBLE(true)
      }
      scrollTop = scrollingElement.scrollTop
    })
  },
  computed: {
    ...mapState([ 'visible', 'pinsPath' ]),
    navs() {
      return [
        { name: 'home',  link: '/home' },
        { name: 'pin',   link: this.pinsPath },
        { name: 'topic', link: '/topics' },
        { name: 'book',  link: '/books' },
        { name: 'event',  link: '/events/all' }
      ]
    },
    ...mapState('auth', [
      'userInfo'
    ]),
    ...mapState('locale', [
      'locale'
    ]),
    noticeNumTip(){
      return this.noticeNum > 99 ? '99+' : this.noticeNum
    }
  },
  watch: {
    '$route.path': {
      handler(newVal, oldVal) {
        this.getUserNotificationNum()
        if (newVal != oldVal) {
          // 当前页面为消息页时 更新未读消息状态
          if (newVal.includes('/notice')) {
            this.$api.setUserNotificationNum()
            this.getUserNotificationNum()
          }
          this.UPDATE_HEADER_VISIBLE(true)
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations({
      'UPDATE_HEADER_VISIBLE': 'UPDATE_HEADER_VISIBLE',
      'SET_LANG': 'locale/SET_LANG'
    }),
    sreachHandler () {
      this.$router.push({
        name: 'search',
        query: {
          keyword: this.keyword
        }
      })
    },
    async getUserNotificationNum(){
      try {
        let res = await this.$api.getUserNotificationNum()
        if (res.s === 1) {
          this.noticeNum = res.d.notification_num
        }
      } catch(error) {
        this.noticeNum = 0
      }
      
    },
    showLoginModal() {
      this.$loginModal(this)
    },
    // 切换语言
    switchLocale() {
      let locale = this.locale === 'zh' ? 'en' : 'zh'
      this.$i18n.locale = locale
      this.SET_LANG(locale)
      this.$cookies.set('lang', locale)
    },
    // 登出
    logout() {
      this.isShowNavMenu = false
      this.$utils.removeAuthInfo(this)
    }
  }
}
</script>

<style lang='scss' scoped>
.main-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4rem;
  border-bottom: 1px solid #f1f1f1;
  background: #fff;
  color: #909090;
  z-index: 250;
  transition: all .2s;

  &.visible{
    transform: translateY(-100%);
  }

  .container {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .logo {
    min-width: 98px;
    margin-right: 1rem;
  }

  .main-nav {
    height: 100%;
    flex: 1 0 auto;

    .nav-list {
      display: flex;
      align-items: center;
      height: 100%;
      margin: 0;

      .main-nav-list {
        display: flex;
        height: 100%;

        @media (min-width: 980px) {
          .phone-show-menu {
            display: none;
          }
          .phone-hide {
            display: flex;

            .nav-item {
              display: flex;
              justify-content: center;
              position: relative;
              height: 100%;
              padding: 0 1rem;
              cursor: pointer;

              &:hover,
              .nuxt-link-active{
                color: $theme;
              }
              a:before {
                content: "";
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
              }
            }
          }
        }
        @media (max-width: 980px) {
          .phone-hide {
            display: none;
          }

          .phone-show-menu {
            .el-dropdown {
              display: flex;
              align-items: center;
              position: relative;
              height: 100%;
              color: $theme;
              cursor: pointer;
            }
            .el-dropdown-link:before {
              content: "";
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
            }
          }
        }  
      }
    }
  }

  .nav-item {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 0.8rem;

    @media (max-width: 980px) {
      &.add {
        display: none;
      }
    }

    &.search {
      flex: 1 1 auto;
      justify-content: flex-end;
    }
    &.notification {
      position: relative;
      font-size: 1.3rem;
      &:hover,
      .nuxt-link-active{
        color: $theme;
      }
      a:before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
    }
    &:last-child {
      padding-right: 0;
      cursor: pointer;
    }
  }
}
</style>