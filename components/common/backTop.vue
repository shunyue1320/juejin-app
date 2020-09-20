<template>
  <div class="back-top">
    <el-button v-show="isBlockTop" class="shadow mb-2" icon="el-icon-caret-top" circle @click="backTop"></el-button>
    <el-button class="shadow ml-0" icon="el-icon-chat-dot-round" circle></el-button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isBlockTop: false
    }
  },
  mounted() {
    //通过滚动条高度判断头部 隐藏/显示
    let scrollingElement = document.scrollingElement
    let scrollTop = 0
    window.addEventListener('scroll', () => {
      if (scrollingElement.scrollTop < 300) {
        this.isBlockTop = false
      } else {
        this.isBlockTop = true
      }
    })
  },
  methods: {
    backTop() {
      window.scrollTo({
        top: 0
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.back-top{
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  z-index: 1000;
}
</style>