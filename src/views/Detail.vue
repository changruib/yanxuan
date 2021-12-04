<template>
  <div>
    <Header></Header>
    <div class="detail">
      <!-- 轮播图 -->
      <Swiper class="swiper" height="7.5rem" :list="swiperPicUrl"></Swiper>

      <!-- 商品基本信息 -->
      <div class="info">
        <div class="name">{{detail.name}}</div>
        <div class="desc">{{detail.simpleDesc}}</div>
        <div class="price">
          <span class="activity">￥{{detail.activityPrice || detail.retailPrice}}</span>
        </div>
      </div>

      <!-- 商品参数 -->
      <div class="attrlist" v-if="detail.attrList && detail.attrList.length > 0">
        <div class="title">商品参数</div>
        <div class="item" v-for="(item, index) in detail.attrList" :key="index">
          <span class="attr-name">{{item.attrName}}</span>
          <span class="attr-value">{{item.attrValue}}</span>
        </div>
      </div>

      <!-- 商品详情 -->
      <div v-html="detail.itemDetail && detail.itemDetail.detailHtml"></div>
    </div>
    <!-- 加入购物车 -->
    <div class="footer">
      <button class="btn-cart" @click="addCart">加入购物车</button>
    </div>
  </div>
</template>

<script>
import { API_PRODUCT_DETAIL, API_USER_VERIFY, API_CART_ADD } from '@/api.config.js'
import Swiper from '@/components/Swiper.vue'
import Header from '@/components/Header.vue'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      swiperPicUrl: [], // 轮播图图片
      detail: {} // 商品详情信息
    }
  },
  components: {
    Header,
    Swiper
  },
  methods: {
    ...mapMutations(['setCartNum']),
    async getDetails () {
      this.$showLoading(true)
      const goods = await this.$axios.get(API_PRODUCT_DETAIL, {
        params: {
          id: this.$route.params.id
        }
      })
      this.detail = goods
      for (const k in goods.itemDetail) {
        if (k.startsWith('picUrl')) {
          this.swiperPicUrl.push(goods.itemDetail[k])
        }
      }
      this.$showLoading(false)
    },
    // 加入购物车
    async addCart () {
      // 验证用户是否登录
      const user = await this.$axios.get(API_USER_VERIFY)
      if (!user) {
        this.$showToast({
          btnShow: true,
          msg: '请先登录',
          callback: () => {
            this.$router.push('/personal/login')
          }
        })
      } else {
        await this.$axios.post(API_CART_ADD, {
          id: this.detail.id,
          name: this.detail.name,
          price: this.detail.activityPrice || this.detail.retailPrice,
          pic: this.detail.itemDetail.picUrl1
        })
        this.setCartNum(1)
        this.$showToast({
          msg: '加入成功'
        })
      }
    }
  },
  created () {
    this.getDetails()
  }
}
</script>

<style lang="scss" scoped>
.swiper{
  margin-top: 1rem;
}
.detail {
  margin-bottom: 1.04rem;
}
.info {
  background-color: $colorA;
  padding: 0.1rem;
  .name {
    font-size: $fontD;
    color: $colorC;
    font-weight: 700;
  }
  .desc {
    color: $colorD;
  }
  .price {
    color: $colorB;
    font-size: $fontC;
  }
}
.attrlist {
  background-color: $colorA;
  margin: 0.2rem 0;
  .title {
    text-align: center;
  }
  .item {
    display: flex;
    border-top: 1px dotted #ccc;
    padding: 0.1rem;
    .attr-name {
      flex: 1;
      color: $colorD;
    }
    .attr-value {
      flex: 3;
      margin-left: 1.12rem;
    }
  }
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 1.04rem;
  width: 100%;
  z-index: 99;
  border-top: 1px solid $colorD;
  .btn-cart {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background-color: $colorB;
    color: $colorA;
  }
}
</style>
