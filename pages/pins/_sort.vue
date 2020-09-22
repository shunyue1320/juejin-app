<template>
  <div>
    <div class="pin-item-wrap shadow" v-for="(item, index) in pinList" :key="item.msg_id">
      <!-- <pin-item :item.sync="pinList[index]"></pin-item> -->
      {{ index }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import reachBottom from '~/mixins/reachBottom'

export default {
  async asyncData({ app, params }) {
    return {
      pinList: [],
      pageInfo: {}
    }
  }
}
</script>

<style lang='scss' scoped>
.pin-item-wrap{
  margin-bottom: 10px;
}
</style>