/**
 * 公用触底事件
 */
export default {
  data() {
    return {
      _scrollingElement: null,
      reachBottomDistance: 80 // 距离底部多远触发
    }
  },
  mounted() {
    this._scrollingElement = document.scrollingElement
    window.addEventListener('scroll', this._windowScrollHandler)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('scroll', this._windowScrollHandler)
    })
  },
  methods: {
    _windowScrollHandler() {
      let scrollHeight = this._scrollingElement.scrollHeight
      let currentHeight = this._scrollingElement.scrollTop + this._scrollingElement.clientHeight + this.reachBottomDistance
      if (currentHeight >= scrollHeight) {
        typeof this.reachBottom === 'function' && this.reachBottom()
      }
    }
  }
}