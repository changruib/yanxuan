<template>
  <div>
    <Header></Header>
    <div v-if="userinfo">
      <!-- 个人信息 -->
      <div class="userinfo">
        <div class="avatar">
          <img src="../assets/img/avatar-default.png" alt />
        </div>
        <div class="username">{{userinfo.username}}</div>
      </div>
      <div class="menu">
        <div class="menu-item" @click="myOrder">我的订单</div>
        <div class="menu-item" @click="logout">退出登录</div>
      </div>
    </div>

    <div v-else>
      <div class="yanxuan">
        <img src="../assets/img/yanxuan.png" alt="">
        <div v-if="this.$route.path==='/personal'">
          <div class="none">当前用户未登录</div>
          <div class="go" @click="go">去登录/注册</div>
        </div>
      </div>
      <router-view></router-view>
    </div>

    <nav-footer></nav-footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import NavFooter from '@/components/NavFooter.vue'
import { API_USER_LOGOUT } from '@/api.config.js'

export default {
  computed: {
    userinfo () {
      return this.$store.state.userinfo
    }
  },
  components: {
    Header,
    NavFooter
  },
  methods: {
    logout () {
      this.$showToast({
        btnShow: true,
        msg: '确认退出吗',
        callback: async () => {
          const res = await this.$axios.get(API_USER_LOGOUT)
          if (res.code === 1) {
            this.$store.commit('setUserinfo', null)
            this.$showToast({
              msg: '退出登录'
            })
            this.$router.push(0)
          } else {
            this.$showToast({
              msg: '退出失败，请检查网络'
            })
          }
        }
      })
    },
    go () {
      this.$router.push('/personal/login')
    },
    myOrder () {
      this.$router.push('/myorder')
    }
  }
}
</script>

<style lang="scss" scoped>
.yanxuan{
  text-align: center;
    padding: 1.66rem 0;
    img {
      width: 2.88rem;
    }
    .none {
      width: 100%;
      margin-top: 1.2rem;
      font-size: 0.4rem;
      color: $colorC;
    }
    .go {
      width: 2.6rem;
      height: 0.8rem;
      margin: 0.2rem auto;
      border-radius: 0.4rem;
      font-size: 0.4rem;
      background-color: $colorB;
      color: white;
    }
}
.userinfo {
  height: 2.2rem;
  margin-top: 0.88rem;
  background-image: url('../assets/img/profile-bg.png');
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  .avatar {
    flex: 1;
    img {
      width: 1.6rem;
      height: 1.6rem;
      border-radius: 50%;
    }
  }
  .username {
    flex: 2;
    font-size: $fontC;
    color: $colorA;
  }
}
.menu {
  &-item {
    height: 1rem;
    line-height: 1rem;
    background-color: $colorA;
    text-align: center;
    margin-top: 0.2rem;
  }
}
</style>
