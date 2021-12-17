<template>
  <div>
    <div class="cate">
      <ul class="cate-nav">
        <li v-for="item in categoryList" :key="item.id"
        :class="{active:positionId===item.id}"
        @click="onChange(item.id)">{{item.name}}</li>
      </ul>
      <ul class="cate-list">
        <li class="cate-list-sub" v-for="item in categoryGroupList" :key="item.id">
          <h2>{{item.name}}</h2>
          <ul class="finalItem">
            <li v-for="subItem in item.categoryList" :key="subItem.id"
            @click="goGoodsDetail(subItem.id)">
              <img :src="subItem.prettyBannerUrl" alt="">
              <p>{{subItem.name}}</p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavFooter from '@/components/NavFooter.vue'
import { API_CATE, API_CATE_SUB } from '@/api.config.js'
export default {
  data () {
    return {
      categoryList: [],
      categoryGroupList: [],
      positionId: 0
    }
  },
  watch: {
    positionId () {
      this.getSubCategory(this.positionId)
    }
  },
  components: {
    NavFooter
  },
  methods: {
    onChange (index) {
      this.positionId = index
      console.log(this.positionId)
    },
    async getCategory () {
      this.$showLoading(true)
      const { categoryList } = await this.$axios.get(API_CATE)
      this.categoryList = categoryList
      this.positionId = this.categoryList[0].id
      this.$showLoading(false)
    },
    async getSubCategory (categoryId) {
      this.$showLoading(true)
      const { category: { categoryGroupList } } = await this.$axios.post(API_CATE_SUB, {
        categoryId
      })
      this.categoryGroupList = categoryGroupList
      this.$showLoading(false)
    },
    goGoodsDetail (subId) {
      this.$router.push(`/categorydetail/${this.positionId}/${subId}`)
    }
  },
  created () {
    this.getCategory()
  }
}
</script>

<style lang="scss" scoped>
.cate{
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 1.07rem;
  background-color: $colorA;
  display: flex;
  &-nav{
    width: 1.6rem;
    // background-color: $colorE;
    font-size: $fontC;
    padding-left: 0.2rem;
    li{
      margin: 0.2rem 0;
      position: relative;
      &.active::after{
        position: absolute;
        content: "";
        left: -0.2rem;
        top: 50%;
        transform: translateY(-50%);
        width: 0.08rem;
        height: 0.4rem;
        background-color: $colorB;
      }
    }
  }
  &-list{
    flex: 1;
    overflow-y: scroll;
    padding-top: 0.3rem;
    padding-left: 0.2rem;
    border-left: 1px solid $colorE;
    &-sub{
      margin-bottom: 0.3rem;
      h2{
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        max-width: 5.28rem;
        padding-bottom: 0.08rem;
        margin-bottom: 0.24rem;
        text-align: left;
        font-size: .28rem;
        font-weight: 700;
        color: #333;
        border-bottom: 1px solid #d9d9d9;
      }
      .finalItem{
        display: flex;
        flex-wrap: wrap;
        li{
          width: 1.4rem;
          margin: 0.4rem 0.4rem 0 0;
          text-align: center;
          img{
            width: 1.2rem;
            height: 1.2rem;
          }
          p{
            font-size: $fontA;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>
