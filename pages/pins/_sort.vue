<template>
  <div>
    <nuxt-link to="/pins/topic/1111">gototopic</nuxt-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import reachBottom from '~/mixins/reachBottom'

export default {
  async asyncData({ app, store }) {
    let [ recommendPins, recommendTopics ] = await Promise.all([
      app.$api.getPinList({
        type: 'hot',
        limit: 20,
        sort_type: 400
      }),
      app.$api.getRecommendTopics({
        limit: 7
      })
    ])

    return {
      recommendPins,
      recommendTopics
    }
  },
  created() {

  }
}
</script>

<style lang='scss' scoped>
.pin-item-wrap{
  margin-bottom: 10px;
}
</style>