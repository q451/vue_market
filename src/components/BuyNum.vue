<template>
  <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
</template>

<script>
export default {
  name: "BuyNum",
  data(){
    return{
      num: 1
    }
  },
  methods:{
    handleChange(value) {
      // console.log(value);
      this.$emit('handleValue',value)
    }
  }
}
</script>

<style scoped>

</style>