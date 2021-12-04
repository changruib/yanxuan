<template>
  <div class="mask">
    <div class="loading">
      <img src="@/assets/img/loading.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.mask{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(153, 153, 153, 0.5);
  .loading{
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%,-50%);
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
