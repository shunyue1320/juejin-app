<template>
  <div class="global-component-box">
    <div class="back-top">
      <el-button v-show="visible" title="回到顶部" class="shadow" icon="el-icon-caret-top" circle @click="backTop"></el-button>
      <el-button title="建议反馈" class="shadow ml-0" icon="el-icon-chat-dot-round" circle></el-button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      visible: false
    }
  },
  mounted() {
    //通过滚动条高度判断头部 隐藏/显示
    let scrollingElement = document.scrollingElement
    let scrollTop = 0
    window.addEventListener('scroll', () => {
      if (scrollingElement.scrollTop < 500) {
        this.visible = false
      } else {
        this.visible = true
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
  right: 1.5rem;
  bottom: 1.5rem;
  z-index: 1000;

  & button {
    margin-top: 0.5rem;
    margin-left: 0;
  }
}
</style>