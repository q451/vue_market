<template>
  <div class="container">
    <div class="home">
      <!-- 轮播图 -->
      <div class="banner">
        <el-carousel :interval="5000" arrow="always" height="480px">
          <el-carousel-item v-for="item in banner" :key="item.id">
            <img v-if='item.picUrl' class="img1" :src="item.picUrl" alt="">
            <img v-if='item.picUrl2' class="img2" :src="item.picUrl2" alt="">
            <img v-if='item.picUrl3' class="img3" :src="item.picUrl3" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>

      <div style="height:20px"></div>
      <div>
        <img style="width:100%" src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/f334fbd05d5681bb838fefd1c815d88c.jpg?thumb=1&w=1533&h=150&f=webp&q=90">
      </div>
      <div style="height:20px"></div>
     
      <div v-for="item in homeList" :key="item.id">
        <div class="activity-panel" v-if="item.type===1">
          <el-row>
            <el-col class="content" :span="8" v-for="o in item.panelContents" :key="o.id" >
              <el-card :body-style="{ padding: '0px' }">
                <img :src="o.picUrl" class="i" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="playvideo">
              </el-card>
              
            </el-col>
          </el-row>
        </div>
        <div style="height:20px"></div>
        <section v-if="item.type===2">
        <m-shelf :title="item.name">
        <div slot="content" class="hot">
          <mall-goods v-for='(o,i) in item.panelContents' :key='i' :goods='o'>

          </mall-goods>
        </div>
        </m-shelf>
        </section>
        <section v-if="item.type===3">
          <m-shelf :title="item.name">
            <div slot="content" class="floors">
              <div class="imgbanner"
                  v-for="(o,j) in item.panelContents"
                  :key="j"
                  v-if="o.type===2||o.type===3">
                <img :src="o.picUrl" alt="">
              </div>
              <mall-goods :goods="o" v-for="(o,i) in item.panelContents" :key="i" v-if="o.type===0"></mall-goods>
            </div>
          </m-shelf>
        </section>
      </div>
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">小米11 Pro 宣传视频</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="stopvideo"></button>
            </div>
            <div class="modal-body">
              <video class="video-js" id="myVideo" style="width:100%">
                <source src="../../assets/test.mp4" type="video/mp4">   
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footers></Footers>
  </div>
</template>

<script>
import {ref } from 'vue';
import MShelf from "../../components/Shelf";
import MallGoods from "../../components/MallGoods";
import Footers from "../../components/Footer";
// 主要逻辑
export default {
  data() {
    return {
      banner: [],
      homeList:[]
    }
  },
  setup() {
    return {
      
    }
  },
  components:{
    MShelf,
    MallGoods,
    Footers
  },
  async created(){
   try{
     const res = await this.$http.get('/api/goods/home');
     //async必须要和await配合使用  async await一起用可以使异步执行的方法运行效果和同步一样
     //如果要在生命周期钩子函数上使用async函数，只要在函数前加async关键字即可
     // console.log(res)
     let data = res.data
     // console.log(data)
     if(data.code === 200){
       let result = data.result
       this.homeList = result
       // console.log(this.homeList)
       let item = result.find(item=>item.type === 0)
       // console.log(item)
       this.banner = item.panelContents
     }
   } catch (error){
     console.log(error.message);
   }
  // try{}catch{}  如果try中数据正确则不执行catch
  },
  methods:{
    playvideo(){
      let myPlayer = this.$video(myVideo, {
            controls: true,
            autoplay: "unmuted",
            preload: "auto",
            height: "600px",
            loop:true,

      });
    },
    stopvideo(){
      let myPlayer = this.$video(myVideo);
      myPlayer.pause();

    }
  }

};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.home {
  display: flex;
  flex-direction: column;
}

.no-info {
  padding: 100px 0;
  text-align: center;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  .no-data {
    align-self: center;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.page {
  position: absolute;
  width: 100%;
  top: 470px;
  z-index: 30;
  .dots {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .dot-active {
      display: inline-block;
      width: 15px;
      height: 15px;
      background-color: whitesmoke;
      border-radius: 8px;
      margin-right: 10px;
      cursor: pointer;
    }
    .dot {
      opacity: 0.2;
    }
  }
}

.activity-panel {
  width: 100%;
  margin: 0 auto;
  img:hover{
    transform: scale(1.1);
  }
  
  .box {
    overflow: hidden;
    position: relative;
    z-index: 0;
    margin-top: 25px;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.14);
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
  }
  .content {
    float: left;
    position: relative;
    box-sizing: border-box;
    width: 25%;
    height: 100%;
    text-align: center;
    
  }
  .content ::before {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    box-sizing: border-box;
    border-left: 1px solid #f2f2f2;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
    content: "";
    pointer-events: none;
  }
  .i {
    width: 305px;
    height: 200px;
  }
  .cover-link {
    cursor: pointer;
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 4;
    background: url(data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEHAAEALAAAAAABAAEAAAICTAEAOw==)
    repeat;
  }
  a {
    color: #5079d9;
    cursor: pointer;
    transition: all 0.15s ease-out;
    text-decoration: none;
  }
  a:hover {
    box-shadow: inset 0 0 38px rgba(0, 0, 0, 0.08);
    transition: all 0.15s ease;
  }
}

.banner,
.banner span,
.banner div {
  font-family: "Microsoft YaHei";
  transition: 1s;
  transition-timing-function: linear;
}

.banner {
  cursor: pointer;
  perspective: 3000px;
  position: relative;
  z-index: 19;
  margin: 0 auto;
  width: 100%;
  img:hover,img:active{
    transform: rotate(5deg);
    transform: scale(1.1);
  }
}

.bg {
  position: relative;
  width: 80%;
  height: 500px;
  margin: 20px auto;
  background-size: 100% 100%;
  border-radius: 10px;
  transform-style: preserve-3d;
  transform-origin: 50% 50%;
  transform: rotateY(0deg) rotateX(0deg);
  & div {
    position: relative;
    height: 100%;
    width: 100%;
  }
}

.img1 {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  border-radius: 10px;
}

.img2 {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 5px;
  left: 0;
  background-size: 95% 100%;
  border-radius: 10px;
}

.img3 {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  border-radius: 10px;
}

.a {
  z-index: 20;
  transform: translateZ(40px);
}

.b {
  z-index: 20;
  transform: translateZ(30px);
}

.c {
  transform: translateZ(0px);
}

.sk_item {
  width: 170px;
  height: 225px;
  padding: 0 14px 0 15px;
  > div {
    width: 100%;
  }
  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
    &:hover {
      transform: translateY(-5px);
    }
  }
  img {
    width: 130px;
    height: 130px;
    margin: 17px 0;
  }
  .sk_item_name {
    color: #999;
    display: block;
    max-width: 100%;
    _width: 100%;
    overflow: hidden;
    font-size: 12px;
    text-align: left;
    height: 32px;
    line-height: 16px;
    word-wrap: break-word;
    word-break: break-all;
  }
  .sk_item_price {
    padding: 3px 0;
    height: 25px;
  }
  .price_new {
    font-size: 18px;
    font-weight: 700;
    margin-right: 8px;
    color: #f10214;
  }
  .price_origin {
    color: #999;
    font-size: 12px;
  }
}

.box {
  overflow: hidden;
  position: relative;
  z-index: 0;
  margin-top: 29px;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.14);
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
}

ul.box {
  display: flex;
  li {
    flex: 1;
    img {
      display: block;
      width: 305px;
      height: 200px;
    }
  }
}

.mt30 {
  margin-top: 30px;
}

.hot {
  display: flex;
  > div {
    flex: 1;
    //width: 50%;
  }
}

.floors {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .imgbanner {
    width: 50%;
    height: 430px;
    .cover-link {
      cursor: pointer;
      display: block;
      position: absolute;
      top: 60px;
      left: 0;
      width: 50%;
      height: 430px;
      z-index: 4;
      background: url(data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEHAAEALAAAAAABAAEAAAICTAEAOw==)
      repeat;
    }
    .cover-link:hover {
      box-shadow: inset 0 0 38px rgba(0, 0, 0, 0.08);
      transition: all 0.15s ease;
    }
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
