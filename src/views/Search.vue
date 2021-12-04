<template>
  <div class="container">
    <!-- 头部搜索框 -->
    <div class="header">
      <div class="searchIpt">
        <i class="iconfont">&#xeafe;</i>
        <input type="text" placeholder="请输入商品名称"
        v-model.trim="keyword" @input="onInput" @keyup.enter="onEnterUp">
        <i class="iconfont" @click="close">&#xe602;</i>
      </div>
      <span @click="cancel">取消</span>
    </div>
    <!-- 联想框 -->
    <ul class="suggest" v-show="isShowSuggest">
      <li v-for="(item,index) in suggestList" :key="index"
      @click="select(item)">{{item}}</li>
    </ul>
    <!-- 历史记录 -->
    <div class="search-history" v-show="!isShowResult && !isShowSuggest">
      <div class="history-title">
        <span>历史记录</span>
        <i class="iconfont" @click="delHistory">&#xe629;</i>
      </div>
      <ul class="history">
        <li class="history-item" v-for="(item,index) in history" :key="index"
        @click="select(item)">{{item}}</li>
      </ul>
    </div>
    <!-- 商品列表 -->
    <div class="result" v-show="isShowResult">
      <Product v-for="item in resultList" :key="item.id"
      :item="item"></Product>
    </div>
  </div>
</template>

<script>
import { API_SEARCH_COMPLETE, API_SEARCH } from '@/api.config.js'
import Product from '@/components/Product.vue'
export default {
  data () {
    return {
      keyword: '', // 搜索关键字
      suggestList: [], // 联想词
      resultList: [], // 搜索结果
      history: []
    }
  },
  computed: {
    isShowSuggest () {
      return this.suggestList.length
    },
    isShowResult () {
      return this.resultList.length
    }
  },
  components: {
    Product
  },
  methods: {
    onInput () {
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.timer = setTimeout(async () => {
        const suggestList = await this.$axios.post(API_SEARCH_COMPLETE, {
          keywordPrefix: this.keyword
        })
        this.suggestList = suggestList
      }, 200)
    },
    onEnterUp () {
      this.getSearchResult(this.keyword)
    },
    async getSearchResult (goodsName) {
      if (goodsName === '') {
        return
      }
      this.$showLoading(true)
      this.suggestList = []
      const { directlyList } = await this.$axios.get(API_SEARCH, {
        params: {
          keyword: goodsName
        }
      })
      this.$showLoading(false)
      this.resultList = directlyList || []
      this.saveHistory(goodsName)
    },
    // 点击搜索联想词
    select (goodsName) {
      this.keyword = goodsName
      this.getSearchResult(this.keyword)
    },
    // 点击叉号
    close () {
      this.keyword = ''
      this.suggestList = []
      this.resultList = []
    },
    // 取消按钮，返回首页
    cancel () {
      this.$router.back()
    },
    // 读取历史信息
    loadHistory () {
      this.history = JSON.parse(localStorage.getItem('searchHistory')) || []
    },
    // 保存搜索信息
    saveHistory (goodsName) {
      if (this.history.includes(goodsName)) {
        this.history.splice(this.history.indexOf(goodsName), 1)
      }
      this.history.unshift(goodsName)
      localStorage.setItem('searchHistory', JSON.stringify(this.history))
    },
    // 删除历史记录
    delHistory () {
      localStorage.removeItem('searchHistory')
      this.history = []
    }
  },
  mounted () {
    this.loadHistory()
  }
}
</script>

<style lang="scss" scoped>
.container{
  background-color: $colorA;
  padding: 0 0.2rem;
}
.header{
  width: 100%;
  padding: 0.2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  box-sizing: border-box;
  .searchIpt{
    flex: 1;
    background-color: $colorE;
    padding: 0 0.2rem;
    border-radius: 0.14rem;
    display: flex;
    .iconfont{
      color: $colorC;
      font-size: $fontB;
    }
    input{
      border: none;
      outline: none;
      background-color: $colorE;
      flex: 1;
      margin: 0 0.2rem;
      font-size: $fontB;
    }
  }
  span{
    margin-left: 0.3rem;
  }
}
.search-history {
  margin-top: 0.8rem;
  .history-title {
    font-size: $fontB;
    color: $colorD;
    .iconfont {
      color: $colorC;
      margin-left: 0.3rem;
    }
  }
  .history{
      overflow: hidden;
      &-item{
          border: 1px solid $colorD;
          border-radius: 0.08rem;
          float: left;
          padding: 0 0.15rem;
          margin: 0.12rem;
          color: $colorC;
      }
  }
}
.suggest {
  margin-top: 0.3rem;
  background-color: $colorA;
  position: fixed;
  width: 6.8rem;
  height: auto;
  top: 0.5rem;
  left: 0.3rem;
  li {
    padding: 0.2rem 0;
    border-bottom: 1px solid $colorF;
  }
}
.result {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: $colorA;
  margin-top: 0.8rem;
  padding: 0 0.2rem;
}
</style>
