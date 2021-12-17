<template>
  <div>
    <Heading></Heading>
    <div class="item-list">
      <Product v-for="(item,index) in itemList" :key="index" :item="item"></Product>
    </div>
  </div>
</template>

<script>
import { API_CATE_DETAIL } from '@/api.config.js'
import Heading from '@/components/Header.vue'
import Product from '@/components/Product.vue'
export default {
  data () {
    return {
      itemList: []
    }
  },
  components: {
    Heading,
    Product
  },
  methods: {
    async getCateDetail (cateId, subId) {
      const { itemList } = await this.$axios.post(API_CATE_DETAIL, {
        cateId,
        subId
      })
      console.log(itemList)
      this.itemList = itemList
    }
  },
  created () {
    const { cateId, subId } = this.$route.params
    this.getCateDetail(cateId, subId)
  }
}
</script>

<style lang="scss" scoped>
.item-list{
  margin-top: 1.1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
