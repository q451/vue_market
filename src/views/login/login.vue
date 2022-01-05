<template>
<div class="login">
  <div class="box">
  <span>登录即注册</span>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="手机号" prop="user">
      <el-input type="text" v-model="ruleForm.user" autocomplete="off" placeholder="请输入手机号"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
  </div>
  </div>
</template>

<script>
import {setStore,getStore, removeStore} from "../../utils/storage";

export default {
  name: "index",
  data() {
    let validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    }
    return {
      ruleForm: {
        user: '',
        pass: '',

      },
      rules: {
        user: [{validator: validateUser, trigger: 'blur'}],
        pass: [{validator: validatePass, trigger: 'blur'}]
      },
      cart: []
    }
  },
  mounted() {
    //  缓存当前购物车数据
    this.login_addCart()
  },
  methods: {
    login_addCart() {
      let cartArr = [];
      let localCart = JSON.parse(getStore("buyCart"));
      console.log(localCart);

      if (localCart && localCart.length) {
        localCart.forEach(item => {
          cartArr.push({
            userId: getStore("id"),
            productId: item.productId,
            productNum: item.productNum
          });
        });
      }
      this.cart = cartArr;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await this.$http.post("/api/login", this.ruleForm);
          // console.log(res)
          if (res.data.code === 200) {
            let {username, token, id} = res.data;
            //持久化存储数据
            setStore('token', token)
            setStore('id', id)
            //把缓存中购物车数据重新添加到购物车中
            if (this.cart && this.cart.length) {
              this.cart.forEach(async item => {
                let res = await this.$http.post("/api/addCart", item);
                if (res.data.success === true) {
                  //.......
                }
                removeStore("buyCart");
                this.$router.push({ path: "/" });      
                this.$session.set("login","haslogin"); //存session
              });

          }else{
              this.$router.push({
                name: "home"
              });
            }
          }

        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
}
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  overflow: visible;
  background: #ededed;
  .box {
    width: 450px;
    border: 1px solid #dadada;
    border-radius: 10px;
    position: absolute;
    top: 200px;
    left: 50%;
    padding: 50px 50px 50px 10px;
    margin-left: -225px;
    box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
    text-align: center;
    form {
      margin-top: 30px;
    }
    span {
      color: #333;
      font-weight: 500;
      text-align: center;
    }
  }
}
.form-check{
  margin-right: 60px;
  text-align: center;
}

</style>