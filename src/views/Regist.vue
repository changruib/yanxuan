<template>
  <div>
    <Form formType="regist" @submit="onRegist"></Form>
  </div>
</template>

<script>
import Form from '@/components/Form.vue'
import { API_USER_REGIST } from '@/api.config.js'
export default {
  components: {
    Form
  },
  methods: {
    async onRegist (info) {
      const { code, msg } = await this.$axios.post(API_USER_REGIST, {
        info
      })
      this.$showToast({
        msg
      })
      if (code === 1) {
        this.$router.push('/personal/login')
      }
    }
  }
}
</script>

<style>

</style>
