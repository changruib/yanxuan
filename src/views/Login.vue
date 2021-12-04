<template>
  <div>
    <Form formType="login" @submit="onLogin"></Form>
  </div>
</template>

<script>
import Form from '@/components/Form.vue'
import { API_USER_LOGIN } from '@/api.config.js'
export default {
  components: {
    Form
  },
  methods: {
    async onLogin ({ username, password }) {
      const { code, msg, user } = await this.$axios.post(API_USER_LOGIN, {
        username,
        password
      })
      if (code === 0) {
        this.$showToast({
          msg
        })
        return
      } else {
        this.$showToast({
          msg
        })
      }
      // 保存用户信息到Vuex
      this.$store.commit('setUserinfo', user)
      this.$router.push('/personal')
    }
  }
}
</script>

<style>

</style>
