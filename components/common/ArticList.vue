<template>
  <div class="artic-list">
    <template v-for="(item, index) in list" >
      <div v-if="item.item_type == 2" class="artic-item--border" :key="index">
        <ArticItem :item.sync="list[index].item_info" />
      </div>
      <div v-else-if="item.item_type == undefined" class="artic-item--border" :key="index">
        <ArticItem :item.sync="list[index]" />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    hasDesc: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang='scss' scoped>
.artic-list {
  background-color: #fff;

  .artic-item--border:not(:last-child){
    border-bottom: 1px solid #eee;
  }
}
</style>