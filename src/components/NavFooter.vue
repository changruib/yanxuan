<template>
  <div class="nav">
    <router-link to="/" class="nav-items">
    <i class="iconfont">&#xe601;</i>
      <div>首页</div>
    </router-link>
    <router-link to="/category" class="nav-items">
    <i class="iconfont">&#xe630;</i>
      <div>分类</div>
    </router-link>
    <router-link to="/cart" class="nav-items">
    <i class="iconfont">&#xe600;</i>
      <div>购物车</div>
    </router-link>
    <router-link to="/personal" class="nav-items">
    <i class="iconfont">&#xe62f;</i>
      <div>个人</div>
    </router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.nav{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1.07rem;
  background-color: $colorA;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #d9d9d9;
  &-items{
    text-align:center;
    outline: none;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    div{
      color: $colorF;
    }
    .iconfont{
      color: $colorF;
      font-size: $fontD;
    }
  }
  .router-link-exact-active{
    div{
      color: $colorB;
    }
    .iconfont{
      color: $colorB;
    }
  }
}
</style>
