<template>
  <el-row class="good-item">
    <el-col>
      <el-card :body-style="{padding: 0}">
        <div class="good-img">
          <a>
           <img v-lazy="goods.productImageBig" alt>
<!--           <img :src="goods?goods.productImageBig:goods" alt>-->
          </a>
        </div>
        <h6 class="good-title">{{goods.productName}}</h6>
        <h3 class="sub-title ellipsis">{{goods.subTitle}}</h3>
        <div class="good-price pr">
          <div class="ds pa">
            <a href='javascript:;'>
              <el-button type="default" size="medium" @click="productDetail(goods.productId)" >查看详情</el-button>
            </a>
            <a href="javascript:;">
              <el-button
                type="primary"
                size="medium"
                @click="addCart(goods.productId,goods.salePrice,goods.productName,goods.productImageBig)"
              >加入购物车</el-button>
            </a>
          </div>
          <p>
            <span style="font-size:14px">¥</span>
            {{Number(goods.salePrice).toFixed(2)}}
          </p>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import { mapState,mapMutations } from "vuex";
import { getStore } from "../utils/storage";

export default {
  props: ["goods"],
  computed: {
    ...mapState(["login"])
  },
  methods: {
    ...mapMutations(['ADDCART']),
    productDetail(id) {
      //编程式导航
      this.$router.push({
        path: `goodsDetail?productId=${id}`
        // name:'goodsDetail',
        // query:{
        //   productId:id
        // }
      })
    },
    addCart(id, price, name, img) {
      if (this.login) {
        //  用户已登录
        this.$http.post('/api/addCart', {
          userId: getStore('id'),
          productId: id,
          productNum: 1
        });
        //  已经存储在后端中，将当前商品存储到store的cartlist中
        this.ADDCART({
          productId: id,
          salePrice: price,
          productName: name,
          productImageBig: img
        })
      } else {
        //  如果用户未登录，也要将商品存储到cartlist中
        this.ADDCART({
          productId: id,
          salePrice: price,
          productName: name,
          productImageBig: img
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.good-img {
  display: flex;
  justify-content: center;
  a {
    display: block;
    img {
      margin: 50px auto 10px;
      width: 206px;
      height: 206px;
      display: block;
    }
  }
}
.good-price {
  margin: 15px 0;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: #d44d44;
  font-family: Arial;
  font-size: 18px;
  font-weight: 700;
  display: flex;
  justify-content: space-around;
  padding-bottom: 60px;
  a {
    margin-right: 5px;
  }
  .ds {
    display: none;
  }
}
.good-price:hover .ds {
  display: block;
}
.good-title {
  line-height: 1.2;
  font-size: 16px;
  color: #424242;
  margin: 0 auto;
  padding: 0 14px;
  text-align: center;
  overflow: hidden;
}
h3 {
  text-align: center;
  line-height: 1.2;
  font-size: 12px;
  color: #d0d0d0;
  padding: 10px;
}
.good-item {
  background: #fff;
  width: 25%;
  transition: all 0.5s;
  height: 410px;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 1px 1px 20px #999;
    .good-price p {
      display: none;
    }
    .ds {
      display: flex;
    }
  }
}
.el-card {
  border: none;
}
</style>