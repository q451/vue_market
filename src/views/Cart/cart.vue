<template>
  <div class="container">
    <div class="nav">
      <img class="logo" src="../../assets/market.png" alt="logo">
      <h3 class="texts">我的购物车</h3>
      <span class="tip">温馨提示:产品是否购买成功，以最终下单为准哦，请尽快结算</span>
    </div>
    <div style="height:10px"></div>
    <div v-if='!totalNum'>
      <div style="height:20px"></div>
      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-2">
          <img class="cart" src="../../assets/car.png" alt="">
        </div>
        <div class="col-md-4">
          <h4>您的购物车竟然是空的!</h4>
          <div style="height:20px"></div>
          <button type="button" style="width:200px;height:50px" class="btn btn-danger btn-lg" @click="$router.push('/')">马上去购物</button>
        </div>
      </div>
    </div>
    <div v-if='totalNum'>
      <table class="table">
        <tr>
          <th>商品图片</th>
          <th>商品名称</th>
          <th>商品价格</th>
          <th>购买数量</th>
          <th>操作</th>
        </tr>
        <tr v-for="(goods,index) in cartList" :key="index">
          <td><img :src="goods.productImageBig" alt=""></td>
          <td>{{goods.productName}}</td>
          <td>￥{{goods.salePrice}}</td>

          <td>
            <p>×{{goods.productNum}}</p>
          </td>
          <td><label @click.prevent="del(index)">删除</label></td>
        </tr>
      </table>
      <div style="height:10px"></div>

      <table class="table2">
        <tr>
          <td>
            <label @click="$router.push('/')"><h3>继续购物</h3></label>
          </td>
          <td><h3><strong>商品总数：{{totalNum}}</strong></h3></td>
          <td colspan="2"><h3><strong>商品总价:<span style="color:red">￥{{totalPrice}}</span></strong></h3></td>
          <td>
            <button type="button" style="width:200px;height:70px" class="butn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="gotoBuy">立即结算</button>
          </td>
        </tr>
      </table>
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">支付</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="stopvideo"></button>
            </div>
            <div class="modal-body">
              <h1>支付成功</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { removeStore, getStore, setStore } from "@/utils/storage";

export default {
  data() {
    return {
      productInfo: ""
    };
  },
  computed: {
    ...mapState(["login", "userInfo", "cartList", "showCart"]),
    totalNum() {
      return (
        this.cartList &&
        this.cartList.reduce((total, item) => {
          total += item.productNum;
          return total;
        }, 0)
      );
    },
    totalPrice(){
      return (
        this.cartList &&
        this.cartList.reduce((total, item) => {
          total += item.productNum * item.salePrice;
          return total;
        }, 0)
      );
    }
  },
  async mounted() {
    console.log(this.login)
    if (this.login) {
      const res = await this.$http.post("/api/cartList", { userId: getStore("id") });
      if (res.data.success === true) {
        setStore("buyCart", res.data.cartList.cartList);
        //保证buycart对应的值是个数组，才能保证在登录或者未登录状态下不出现问题
        this.INITBUYCART();
      }
    } else {
      this.INITBUYCART();
    }
  },
  methods: {
    ...mapMutations(["SHOWCART", "INITBUYCART"]),
    cartShowState(state) {
      this.SHOWCART({
        showCart: state
      });
    },
    logout() {
      removeStore("token");
      removeStore("buyCart");
      window.location.href = "/";
    },
    del (index) {
      this.cartList.splice(index,1);
    },
    gotoBuy(){
      // this.$router.push('/');
      del (index) ;
    }
  },
  created() {}
};
</script>
<style scoped>
.table {
  width:100%;
  border:2px solid #0e0000;
  border-collapse:collapse;
}
.table2{
  border:5px solid #0a0000;
  width:100%;
}
td,th {
  padding: 0.8%;
}
img{
  width: 80px;
}
.container{
  background-color: white;
}
.nav{
  height: 100px;
  background-color: black;
}
.logo{
  width: 100px;

}
.texts{
  color: white;
  margin-left: 50px;
  margin-top: 30px;
}
.tip{
  color: white;
  margin-left: 20px;
  margin-top: 40px;
}
.cart{
  width: 500px;
  /* margin-top: 100px;
  margin-left: 100px; */
}
.col-md-4{
  margin-left: 250px;
  margin-top: 190px;
}
.butn{
  float:right;
  background-color: rgb(223, 16, 16);
  border-radius: 10px;
}
</style>

