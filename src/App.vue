<template>
  <div>
    <a v-link="{path: '/register'}">注册</a>
    <a v-link="{path: '/login'}">登陆</a>
    <a v-link="{path: '/home'}">首页</a>
    <a v-link="{path: '/addbook'}">添加书籍</a>
    <a v-link="{path: '/cart'}">购物车</a>
    <a @click="logout">退出</a>
    <router-view></router-view>
    <message>
      <p slot="msg">这里是信息提示！</p>
    </message>
  </div>
</template>

<script>
import {logoutApi} from './api.js'
import Message from './components/Message'
export default {
  methods: {
    logout () {
      var resource = this.$resource(logoutApi)
      resource.get()
        .then((response) => {
          window.alert(response.data)
          this.$router.go('/login')
        })
    }
  },
  components: {
    Message
  }
}
</script>

<style>
body,div,h1,h2,h3,ul,li,input,textarea{
  margin: 0px;
  padding: 0px;
}
html {
  font-size: 62.5%;
}
body{
  font-family: 'microsoft yahei', 'microsoft sans serif';
  font-size: 1.4rem;
  backgroud-color: #fff;
  padding: 10px;
}
#app a {
  color: #42b983;
  text-decoration: none;
}
</style>
