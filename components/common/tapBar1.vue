<template>
  <div>
    <a-row type="flex" justify="center" style="border-bottom: 1px solid #e8e8e8;">
      <a-col :xs="{ span: 24 }" :sm="{ span: 22 }" :lg="{ span: 20 }" :xl="{ span: 18 }">
        <a-row type="flex" justify="space-between">
          <a-col :span="12">
            <a-menu v-model="current" mode="horizontal" style="border: none;">
              <a-menu-item key="logo">
                <nuxt-link to="/timeline" class="logo">
                  <img src="https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg" alt="掘金">
                </nuxt-link>
              </a-menu-item>
              <a-menu-item v-for="item in navs" :key="item.name">
                <nuxt-link :to="item.link">{{ $t('topbar.'+item.name) }}</nuxt-link>
              </a-menu-item>
            </a-menu>
          </a-col>

          <a-col :sm="{ span: 10 }" :md="{ span: 12 }">
            <a-row :gutter="[{ xs: 8, sm: 16 }, 0]" type="flex" justify="end" align="middle" style="height: 100%;">
              <a-col>
                <a-input-search placeholder="搜索掘金" style="width: 150px" @search="onSearch" />
              </a-col>
              <a-col :xs="{ span: 0 }" :xl="{ span: 6 }">
                <a-button-group>
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
              </a-col>
              <a-col>
                <nuxt-link to="/">
                  <a-icon type="bell" theme="filled" style="fontSize: 1.4rem; margin-right: 0;"/>
                </nuxt-link>
              </a-col>
              <a-col>
                <nuxt-link to="/">
                  <a-avatar src="https://mirror-gold-cdn.xitu.io/16a4aabc6c81a96be8f?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1" />
                </nuxt-link>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </a-col>  
    </a-row> 
  </div>
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
      current: ['home'],
      selectedKeys: ['2'],
    }
  },
  methods: {
    onSearch() {},
    handleMenuClick() {}
  }
}
</script>
