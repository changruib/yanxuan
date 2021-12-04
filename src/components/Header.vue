<template>
  <div class="container">
    <div class="home">
      <i class="iconfont" @click="goHome">&#xe751;</i>
    </div>
    <img src="../assets/img/logo.png" alt="">
    <div class="combine">
      <i class="iconfont" @click="goSearch">&#xeafe;</i>
      <i class="iconfont" @click="goCart">&#xe600;</i>
      <span class="cartNum" v-if="cartNum>0">{{cartNum}}</span>
    </div>
  </div>
</template>

<script>
import { API_CART_NUM } from '@/api.config.js'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      // cartNum: 0
    }
  },
  computed: {
    ...mapState(['cartNum'])
  },
  methods: {
    ...mapMutations(['initCartNum', 'setUserinfo']),
    goHome () {
      this.$router.push('/')
    },
    goSearch () {
      this.$router.push('/search')
    },
    goCart () {
      this.$router.push('/cart')
    },
    async getCartNum () {
      const res = await this.$axios.get(API_CART_NUM)
      if (res) {
        this.setUserinfo(res.user)
        this.initCartNum(res.num)
      } else {
        this.initCartNum(0)
        this.setUserinfo(null)
      }
    }
  },
  created () {
    this.getCartNum()
  }
}
</script>

<style lang="scss" scoped>
.container{
  width: 100%;
  height: 1rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  position: fixed;
  top: 0;
  left: 0;
  background-color: $colorA;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img{
    width: 1.8rem;
    height: 0.4rem;
  }
  .iconfont{
    font-size: 0.45rem;
    color: $colorC;
    margin-right: 0.2rem;
  }
  .cartNum {
    width: 0.36rem;
    height: 0.36rem;
    background-color: $colorB;
    text-align: center;
    line-height: 0.36rem;
    border-radius: 50%;
    position: absolute;
    top: 0.04rem;
    right: 0.2rem;
    color: $colorA;
  }
}
</style>
