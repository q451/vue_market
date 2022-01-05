<template>
<div>


  <m-header></m-header>
<!--  子路由出口-->
  <router-view></router-view>
</div>
</template>

<script>
import MHeader from "../common/MHeader";
export default {
  name: "index",
  components:{
    MHeader
  }
}
</script>

<style scoped>

</style>