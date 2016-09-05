<template>
    <div class="home">
      <h1>{{ msg }}</h1>
      <div v-for="book in books" class="book">
        <p>书名：{{book.name}}</p>
        <p>描述：{{book.description}}</p>
        <p>价格：{{book.price}}</p>
        <input type="button" value="加入购物车" @click="addToCart(book.name, book.price)">
      </div>
    </div>
</template>

<script>
import {cartApi, bookslistApi} from '../api'
export default {
  data () {
    return {
      msg: '首页',
      books: []
    }
  },
  ready () {
    var resource = this.$resource(bookslistApi)
    resource.get()
      .then((response) => {
        this.books = response.data
      }, (response) => {
        window.alert(response.data)
        this.$router.go({path: '/login'})
      })
  },
  methods: {
    addToCart (bookname, price) {
      var resource = this.$resource(cartApi)
      var postData = {bookname: bookname, price: price}
      resource.save(cartApi, postData).then((response) => {
        window.alert(response.data)
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
.book {
  border: solid 1px #ccc;
}
.book p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
