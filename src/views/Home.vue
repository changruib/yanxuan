<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <div class="logo"></div>
      <div class="search" @click="$router.push('/search')">
        <i class="iconfont">&#xeafe;</i>
        <span>搜索商品，共{{totalGoods}}款好物</span>
      </div>
      <div v-if="userinfo" @click="goCart" class="cart">
        <i class="iconfont">&#xe600;</i>
        <span v-if="cartNum>0">{{cartNum}}</span>
      </div>
      <div v-else class="login" @click="goLogin">登录</div>
      <div></div>
    </div>
    <!-- 滚动区 -->
    <div class="scroll-container" ref="scroll-container">
      <div class="scroll-inner" ref="scroll-inner">
        <!-- 轮播图 -->
        <swiper class="swiper" height="3.7rem" :list="bannerList" @slide-click="swiperClick"></swiper>
        <!-- 首页信息 -->
        <div class="server-policy" v-if="info">
          <img :src="info" alt="">
        </div>
        <!-- 分类 -->
        <ul class="kingkong" v-if="info && info.kingKongAreaV4">
          <li
            class="kingkong-item"
            v-for="(item, index) in info.kingKongAreaV4.slice(0, 10)"
            :key="index">
            <img :src="item.picUrls[0]" alt />
            <div class="title">{{item.title}}</div>
          </li>
        </ul>
        <!-- banner -->
        <div class="operation-cfg" v-if="info && info.operationCfg && info.operationCfg[0]">
          <img :src="info.operationCfg[0].picUrls[0]" alt />
        </div>
        <!-- 推荐商品 -->
        <div class="rcmdProduct" v-if="rcmdItemList.length > 0">
          <div class="rcmdProduct-title">推荐商品</div>
          <div class="rcmdProduct-list">
            <Product v-for="(item,index) in rcmdItemList" :key="index"
            :item="item.categoryItem"></Product>
          </div>
        </div>
      </div>
    </div>
    <!-- 回到顶部 -->
    <div class="backToTop" @click="backToTop"></div>
    <!-- 底部导航栏 -->
    <NavFooter></NavFooter>
  </div>
</template>

<script>
import NavFooter from '@/components/NavFooter.vue'
import Swiper from '@/components/Swiper.vue'
import Product from '@/components/Product.vue'
import { API_HOME, API_HOME_TOTAL_NUM, API_HOME_RCMD, API_CART_NUM } from '@/api.config.js'

import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      totalGoods: 0,
      bannerList: [],
      info: {}, // 首页信息
      rcmdItemList: [] // 推荐商品
    }
  },
  computed: {
    ...mapState(['cartNum', 'userinfo'])
  },
  components: {
    NavFooter,
    Swiper,
    Product
  },
  methods: {
    ...mapMutations(['initCartNum', 'setUserinfo']),
    // 点击轮播图
    swiperClick (item) {
      console.log(item)
    },
    // 获取所有商品数量
    async getTotalNums () {
      // const goods = await this.$axios.get('http://yanxuan.xiecheng.live:7001/getTotalNums')
    // this.totalGoods = goods.data.data

      // const { data: { data } } = await this.$axios.get('http://yanxuan.xiecheng.live:7001/getTotalNums')
      const data = await this.$axios.get(API_HOME_TOTAL_NUM)
      this.totalGoods = data
    },
    // 获取首页商品信息
    async getHomeInfo () {
      const res = await this.$axios.get(API_HOME)
      this.info = res
      console.log(res)
      // 动态更新轮播图
      this.bannerList = res.focus.map(item => item.img)
    },
    // 获取推荐商品
    async getRcmdInfo (lastItemId = 0, size = 20) {
      this.$showLoading(true)
      const { rcmdItemList } = await this.$axios.post(API_HOME_RCMD, {
        lastItemId,
        size
      })
      this.rcmdItemList = this.rcmdItemList.concat(rcmdItemList)
      this.$showLoading(false)
    },
    initScroll () {
      const scrollTop = this.scrollContainer.scrollTop
      this.scrollInnerH = this.scrollInner.scrollHeight
      // console.log(scrollTop + this.scrollContainerH, this.scrollInnerH)
      if (scrollTop + this.scrollContainerH + 1 >= this.scrollInnerH) {
        // console.log('触底')
        // console.log(scrollTop + this.scrollContainerH + 1)
        // console.log(this.scrollInnerH)
        this.getRcmdInfo(this.rcmdItemList[this.rcmdItemList.length - 1].id)
      }
    },
    // 防抖
    debounce (fn, delay) {
      let timer = null
      return () => {
        if (timer !== null) {
          clearTimeout(timer)
        }
        timer = setTimeout(fn, delay)
      }
    },
    // 节流
    throttle (fn, delay) {
      let startTime = 0
      return () => {
        const nowTime = Date.now()
        if (nowTime - startTime >= delay) {
          startTime = nowTime
          fn()
        }
      }
    },
    // 返回顶部
    backToTop () {
      const timer = setInterval(() => {
        this.scrollContainer.scrollTop -= 100
        if (this.scrollContainer.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 17)
    },
    // 登录
    goLogin () {
      this.$router.push('/personal/login')
    },
    goCart () {
      this.$router.push('/cart')
    },
    async getCartNum () {
      const res = await this.$axios.get(API_CART_NUM)
      if (res) {
        this.setUserinfo(res.user)
        this.initCartNum(res.num)
      }
    }
  },
  created () {
    this.getTotalNums()
    this.getHomeInfo()
    this.getRcmdInfo()
    this.getCartNum()
  },
  mounted () {
    this.$nextTick(() => {
      this.scrollContainer = this.$refs['scroll-container']
      this.scrollInner = this.$refs['scroll-inner']
      this.scrollContainerH = this.scrollContainer.clientHeight
      this.scrollContainer.addEventListener('scroll', this.debounce(this.initScroll, 500))
    })
  },
  destroyed () {
    this.scrollContainer.removeEventListener('scroll', this.debounce(this.initScroll, 500))
  }
}
</script>

<style lang="scss" scoped>
.header{
  width: 100%;
  height: 0.88rem;
  padding: 0 0.2rem;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  background-color: $colorA;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  .logo{
    width: 1.8rem;
    height: 0.4rem;
    background-image: url('../assets/img/logo.png');
    background-size: 1.8rem 0.4rem;
  }
  .search{
    flex: 1;
    background-color: #ededed;
    margin: 0 0.2rem;
    border-radius: 0.08rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .iconfont{
      font-size: $fontB;
      color: $colorC;
      margin-right: 0.2rem;
    }
    span{
      font-size: $fontB;
      color: $colorF;
    }
  }
  .login{
    width: 0.72rem;
    height: 0.38rem;
    line-height: 0.38rem;
    text-align: center;
    color: $colorB;
    border: 1px solid $colorB;
    border-radius: 0.08rem;
    font-size: $fontB;
  }
}
.kingkong {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  &-item {
    width: 1.1rem;
    height: 1.56rem;
    margin: 0.1rem 0.2rem;
    text-align: center;
    img {
      width: 100%;
    }
    .title {
      color: $colorC;
      font-size: $fontA;
      white-space: nowrap;
    }
  }
}
.rcmdProduct{
  background-color: $colorA;
  &-title{
    text-align: center;
    padding: 0.2rem 0;
    font-size: 0.3rem;
    font-weight: 700;
  }
  &-list{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
.scroll-container{
  position: absolute;
  left: 0;
  right: 0;
  top: 0.88rem;
  bottom: 1.07rem;
  overflow-y: scroll;
}
.backToTop{
  width: 0.8rem;
  height: 0.8rem;
  background-image: url('../assets/img/to-top.png');
  background-size: 0.8rem 0.8rem;
  position: fixed;
  z-index: 99;
  right: 0.2rem;
  bottom: 1.3rem;
}
.cart{
  position: relative;
  .iconfont{
    font-size: 0.46rem;
  }
  span{
    width: 0.3rem;
    height: 0.3rem;
    background-color: $colorB;
    text-align: center;
    line-height: 0.36rem;
    border-radius: 50%;
    color: $colorA;
    position: absolute;
    top: 0.1rem;
    right: -0.1rem;
    font-size: $fontB;
  }
}
</style>
