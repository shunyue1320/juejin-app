
export default {
  data() {
    return {
      _scrollingElement: null,
      _isReachBootom: false,
      _isReachBootomDistance: 80
    }
  },
  mounted() {
    //获取滚动的页面
    this._scrollingElement = document.scrollingElement
    window.addEventListener('scroll', this._windowScrollHandler)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this._windowScrollHandler)
    })
  },
  methods: {
    _windowScrollHandler() {
      let scrollHeight = this._scrollingElement.scrollHeight
      let currentHeight = this._scrollingElement.scrollTop + this._scrollingElement.clientHeight + this.reachBottomDistance
      if (currentHeight < scrollHeight && this._isReachBottom) {
        this._isReachBottom = false
      }
      if (this._isReachBottom) {
        return
      }
      if (currentHeight >= scrollHeight) {
        this._isReachBottom = true
        typeof this.reachBottom === 'function' && this.reachBottom()
      }
    }
  }
}