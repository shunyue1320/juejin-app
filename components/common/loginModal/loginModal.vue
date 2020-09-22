<template>
  <div class="auth-modal-box">
    <div class="login-form">
      <div class="panfish">
        <img v-show="currentFocus===''" class="normal" src="https://b-gold-cdn.xitu.io/v3/static/img/normal.0447fe9.png">
        <img v-show="currentFocus==='phoneNumber'" class="greeting" src="https://b-gold-cdn.xitu.io/v3/static/img/greeting.1415c1c.png">
        <img v-show="currentFocus==='password'" class="blindfold" src="https://b-gold-cdn.xitu.io/v3/static/img/blindfold.58ce423.png">
      </div>
      <div class="pancel">
        <h1 class="title">账密登录</h1>
        <i title="关闭" class="close-btn el-icon-close" @click="cancel"></i>
        <el-input class="input-phoneNumber" v-model="phoneNumber" placeholder="请输入手机号或邮箱" maxlength="64" @focus="currentFocus='phoneNumber'" @blur="currentFocus=''"></el-input>
        <el-input class="input-password" v-model="password" type="password" placeholder="请输入密码" maxlength="64" @focus="currentFocus='password'" @blur="currentFocus=''" @keydown.enter.native="login"></el-input>
        <el-button :loading="loginLoading" type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentFocus: '',
      phoneNumber: '',
      password: '',
      loginLoading: false
    }
  },
  methods: {
    show(ctx, cb) {
      this.ctx = ctx
      this.cb = cb
      return new Promise((resolve, reject) => {
        document.body.style.overflow = 'hidden'
        this.resolve = resolve
        this.reject = reject
      })
    },
    async login() {
      if (this.phoneNumber.trim() === '') {
        this.$message.warning('请输入账号')
        return
      }
      if(this.password.trim() === '') {
        this.$message.warning('请输入密码')
        return
      }
      this.loginLoading = true
      //登录
      let res = await this.ctx.$api.loginAuth({
        phoneNumber: this.phoneNumber,
        password: this.password
      })
      this.loginLoading = false
      //登入成功后 用vuex存储
      if (res.token) {
        this.ctx.$utils.setAuthInfo(this.ctx, res)
        this.resolve()
        this.hideModal()
      } else {
        this.$message.error('登录失败，请重试')
      }
    },
    //销毁弹窗
    hideModal() {
      typeof this.cb === 'function' && this.cb()
      document.body.removeChild(this.$el)
      document.body.style.overflow = ''
      this.$destroy()
    },
    //关闭弹窗
    cancel() {
      this.reject()
      this.hideModal()
    }
  }
}
</script>

<style lang='scss' scoped>
.auth-modal-box{
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,.2);
  z-index: 500;

  .login-form{
    position: relative;
    width: 20rem;
    background-color: #fff;
    border-radius: 2px;
  }

  .panfish{
    .normal{
      position: absolute;
      top: 0;
      left: 50%;
      width: 8rem;
      transform: translate(-50%,-83%);
      z-index: 1;
    }

    .greeting{
      position: absolute;
      top: 0;
      left: 50%;
      width: 8rem;
      transform: translate(-50%,-75.8%);
      z-index: 1;
    }

    .blindfold{
      position: absolute;
      top: 0;
      left: 50%;
      width: 7rem;
      transform: translate(-50%,-75%);
      z-index: 1;
    }
  }

  .pancel{
    position: relative;
    padding: 1.3rem;

    .title{
      margin-bottom: 1.3rem;
      font-size: 1.2rem;
      font-weight: 600;
      color: #333;
    }

    .close-btn{
      position: absolute;
      top: 1.3rem;
      right: 1.3rem;
      color: #bbb;
      font-weight: 600;
      cursor: pointer;
    }

    .input-phoneNumber,
    .input-password{
      margin-bottom: 0.5rem;

      /deep/ input::placeholder{
        color: #999;
      }
    }

    button {
      width: 100%;
      margin-top: 0.6rem;
    }
  }
}
</style>
