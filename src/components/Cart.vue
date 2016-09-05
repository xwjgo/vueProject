<template>
    <div class="cart">
      <h1>{{ msg }}</h1>
      <table>
        <tr>
        <th><input type="checkbox" id="selectAll" v-model="selectAll"><label for="selectAll"> 全选</label></th>
        <th>单价</th>
        <th>数量</th>
        <th>操作</th>
        </tr>
        <tr v-for="cart in carts">
          <td>
          <input type="checkbox" id="selectOne" value="{{$index}}" v-model="selectItems">
            <label for="selectOne">{{cart.bookname}}</label>
          </td>
          <td>{{cart.price}}</td>
          <td>
            <input type="button" class="addNum" value="+" @click="addNum($index)">
            <input type="text" v-model="cart.number" class="booknum" readOnly>
            <input type="button" class="reduceNum" value="-" @click="reduceNum($index)">
          </td>
          <td>删除</td>
        </tr>
      </table>
      <p class="totalPrice">您需要支付: {{totalPrice}}</p>
      <input type="button" value="去结算" @click="payMoney">
    </div>
</template>

<script>
import {cartApi} from '../api'
export default {
  data () {
    return {
      msg: '购物车',
      carts: [],
      totalPrice: 0,
      selectItems: [],
      selectAll: false
    }
  },
  ready () {
    var resource = this.$resource(cartApi)
    resource.get().then((response) => {
      // data是对象，body就不是对象
      this.carts = response.data
    }, (response) => {
      window.alert(response.data)
      this.$router.go('/login')
    })
    // 监听selectItems的变化，算出总价格
    this.$watch('selectItems', function (val) {
      this.totalPrice = 0
      var self = this
      val.forEach(function (value) {
        var selectIndex = parseInt(value)
        self.totalPrice += self.carts[selectIndex].price * self.carts[selectIndex].number
      })
      // 如果selectItems小于carts的长度，则全选按钮也改为false
      if (this.selectItems.length < this.carts.length) {
        this.selectAll = false
      } else if (this.selectItems.length === this.carts.length) {
        this.selectAll = true
      }
    })
    // 监听selectAll的变化，算出总价格
    this.$watch('selectAll', function (val) {
      if (val === true) {
        this.totalPrice = 0
        this.selectItems = []
        var self = this
        this.carts.forEach(function (value, index) {
          self.selectItems.push(index.toString())
        })
      } else {
        if (this.selectItems.length === this.carts.length) {
          this.selectItems = []
        } else {
          this.selectItems = this.selectItems.concat()
        }
      }
    })
  },
  methods: {
    payMoney () {
      var resource = this.$resource(cartApi)
      var items = []
      for (let item of this.selectItems) {
        let bookIndex = parseInt(item)
        items.push({bookname: this.carts[bookIndex].bookname, number: this.carts[bookIndex].number})
      }
      resource.save(cartApi, {postData: items}).then((response) => {
        window.alert('结算成功：' + this.totalPrice)
        this.$router.go({path: '/home'})
      })
    },
    addNum (currentIndex) {
      this.carts[currentIndex].number = parseInt(this.carts[currentIndex].number) + 1
      this.selectItems = this.selectItems.concat()
    },
    reduceNum (currentIndex) {
      var currentValue = parseInt(this.carts[currentIndex].number)
      if (currentValue === 0) {
        return
      }
      this.carts[currentIndex].number = currentValue - 1
      this.selectItems = this.selectItems.concat()
    }
  }
}
</script>

<style scoped>
h1 {
  color: #42b983;
}
.cart {
  border: solid 1px #ccc;
}
.totalPrice {
  color: red;
}
table {
  border-collapse: collapse;
  width: 100%;
  height: 50px;
  text-align: left;
}
table, th, td{
  border: solid 1px #ddd;
}
table .booknum {
  width: 20px;
  margin: 0px 5px;
}
table .addNum, table .reduceNum {
 width: 20px;
}

</style>
