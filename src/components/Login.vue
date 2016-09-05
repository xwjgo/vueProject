<template>
    <div class="login">
      <h1>{{ msg }}</h1>
      <div>
      <input type="text" placeholder="用户名" v-model="user.username">
      </div>
      <div>
        <input type="password" placeholder="密码" v-model="user.password">
      </div>
      <input type="button" @click="login" value="登陆">
    </div>
</template>

<script>
import {loginApi} from '../api'
export default {
  data () {
    return {
      msg: '登陆',
      user: {}
    }
  },
  methods: {
    login () {
      if (!this.user.username) {
        window.alert('请输入用户名！')
        return
      } else if (!this.user.password) {
        window.alert('请输入密码！')
        return
      }
      var resource = this.$resource(loginApi)
      resource.save(loginApi, this.user)
        .then((response) => {
          window.alert(response.data)
          this.$router.go({path: '/home'})
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
