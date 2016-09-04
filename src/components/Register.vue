<template>
    <div class="register">
      <h1>{{ msg }}</h1>
      <div>
      <input type="text" placeholder="用户名" v-model="user.username">
      </div>
      <div>
        <input type="password" placeholder="密码" v-model="user.password">
      </div>
      <div>
        <input type="password" placeholder="确认密码" v-model="user.passwordAgain">
      </div>
      <input type="button" @click="register" value="注册">
    </div>
</template>

<script>
import {registerApi} from '../api'
export default {
  data () {
    return {
      msg: '注册',
      user: {}
    }
  },
  methods: {
    register () {
      if (!this.user.username) {
        window.alert('请输入用户名！')
        return
      } else if (!this.user.password || !this.user.passwordAgain) {
        window.alert('请输入密码！')
        return
      } else if (this.user.password !== this.user.passwordAgain) {
        window.alert('两次密码输入不同！')
        return
      }
      var postData = {username: this.user.username, password: this.user.password}
      var resource = this.$resource(registerApi)
      resource.save(registerApi, postData).then((response) => {
        window.alert('注册成功')
        this.$router.go({path: '/login'})
      }, (response) => {
        window.alert(response.data)
      })
    }
  }
}
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
