<template>
  <div>
    <Heading></Heading>
  </div>
</template>

<script>
import { API_CATE_DETAIL } from '@/api.config.js'
import Heading from '@/components/Header.vue'
export default {
  components: {
    Heading
  },
  methods: {
    async getCateDetail (cateId, subId) {
      const res = await this.$axios.post(API_CATE_DETAIL, {
        cateId,
        subId
      })
      console.log(res)
      // this.itemList = itemList
    }
  },
  created () {
    const { cateId, subId } = this.$route.params
    this.getCateDetail(cateId, subId)
  }
}
</script>

<style>

</style>
