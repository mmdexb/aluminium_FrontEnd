<script >
export default {
  data() {
    return {
      htmlSrc:'static/map.html', // 注意: 直接写 static ,前面不需要加任何路径和字符。
    };
  },
};
</script>

<template>
  <div class="wrap">
    <iframe
        ref="iframe"
        :src="htmlSrc"
        width="100%"
        height="100%">
    </iframe>
  </div>

</template>

<style scoped lang="scss">
.wrap{
  width: 100%;
  height: 100%;
}
</style>