<template>
    <div class="addBook">
      <h1>{{ msg }}</h1>
      <div>
        <input type="text" placeholder="书籍名称" v-model="book.name">
      </div>
      <div>
      <textarea cols="30" rows="3" placeholder="简单描述" v-model="book.description"></textarea>
      </div>
      <div>
        <input type="text" placeholder="价格：元" v-model="book.price">
      </div>
      <input type="button" @click="addBook" value="添加">
    </div>
</template>

<script>
import {bookslistApi} from '../api'
export default {
  data () {
    return {
      msg: '添加书籍',
      book: {}
    }
  },
  methods: {
    addBook () {
      if (!this.book.name || !this.book.description || !this.book.price) {
        window.alert('请输入正确的书籍信息！')
        return
      }
      var resource = this.$resource(bookslistApi)
      resource.save(bookslistApi, this.book)
        .then((response) => {
          window.alert('添加书籍成功')
          this.book = null
        }, (response) => {
          window.alert(response.data)
          this.$router.go({path: '/login'})
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
