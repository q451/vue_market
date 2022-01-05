<template>
<div>
  <h2 @click="playvideo">欢迎页面</h2>
  <video class="video-js" id="myVideo" style="width:100%">
    <source src="../../assets/test.mp4" type="video/mp4">   
  </video>
</div>
</template>

<script>
export default {
  name: "welcome",
  mounted(){ 
    
  },
   methods:{
    playvideo(){
      let myPlayer = this.$video(myVideo, {
        controls: true,
        autoplay: "unmuted",
        preload: "auto",
        height: "100%",
        width:"100%",
        loop:true,

      });
    },
    stopvideo(){
      let myPlayer = this.$video(myVideo);
      myPlayer.pause();

    }
  }
}
</script>

<style scoped>

</style>