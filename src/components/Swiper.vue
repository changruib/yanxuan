<template>
  <div class="swiper" :style="{height: height}"
  @touchstart="onTouchStart" @touchend="onTouchEnd" >
    <!-- 图片内容 -->
    <ul class="swiper-slide" :style="slideStyle">
      <li class="swiper-item" v-for="(item,index) in list"
      :key="index" :style="{width:itemWidth+'px'}"
      @click="slideClick(item)">
        <img :src="item" alt="">
      </li>
    </ul>
    <!-- 分页器 -->
    <ul class="swiper-dots" v-if="options.showDots">
      <li v-for="(item,index) in list" :key="index"
      :class="{active:position===index}">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      slideStyle: { width: '15rem' },
      itemWidth: 750,
      position: 0, // 位置
      timer: null, // 轮播定时器
      touchStart: {},
      touchEnd: {}
    }
  },
  props: {
    height: {
      type: String,
      default: '3rem'
    },
    list: {
      type: Array,
      default () {
        return []
      }
    },
    options: {
      type: Object,
      default () {
        return {
          // 是否显示分页器
          showDots: true,
          // 轮播时间
          interval: 3000,
          // 是否自动播放
          autoplay: true
        }
      }
    }
  },
  watch: {
    list () {
      this.calcWidth()
    }
  },
  methods: {
    // 计算swiper的宽度
    calcWidth () {
      this.$nextTick(() => {
        // 一张图片的宽度
        this.itemWidth = document.body.clientWidth
        this.slideStyle.width = this.list.length * this.itemWidth + 'px'
      })
    },
    // 移动
    move () {
      this.slideStyle.transform = `translateX(-${this.itemWidth * this.position}px)`
    },
    // 自动播放
    autoMove () {
      if (this.options.autoplay) {
        this.timer = setInterval(() => {
          this.position++
          if (this.position === this.list.length) {
            this.position = 0
          }
          this.move()
        }, this.options.interval)
      }
    },
    onTouchStart (e) {
      // 开始触摸点信息
      this.touchStart = e.changedTouches[0]
      if (this.options.autoplay) {
        clearInterval(this.timer)
      }
    },
    onTouchEnd (e) {
      // 结束触摸点信息
      this.touchEnd = e.changedTouches[0]
      if (this.touchEnd.clientX - this.touchStart.clientX > 30) {
        this.position--
        if (this.position < 0) {
          this.position = this.list.length - 1
        }
      } else if (this.touchEnd.clientX - this.touchStart.clientX < -30) {
        this.position++
        if (this.position === this.list.length) {
          this.position = 0
        }
      }
      this.move()
      this.autoMove()
    },
    // 点击图片
    slideClick (item) {
      this.$emit('slide-click', item)
    }
  },
  mounted () {
    this.calcWidth()
    this.autoMove()
    window.addEventListener('resize', this.calcWidth)
  },
  destroyed () {
    if (this.options.autoplay) {
      clearInterval(this.timer)
    }
    window.removeEventListener('resize', this.calcWidth)
  }
}
</script>

<style lang="scss" scoped>
.swiper{
  overflow: hidden;
  position: relative;
  &-slide {
    height: 100%;
    transition: transform 0.5s ease;
    .swiper-item {
      list-style: none;
      height: 100%;
      float: left;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  &-dots{
    position: absolute;
    left: 50%;
    bottom: 0.16rem;
    transform: translateX(-50%);
    li{
      width: 0.4rem;
      height: 0.04rem;
      background-color: $colorA;
      opacity: 0.4;
      float: left;
      margin: 0 0.04rem;
      &.active{
        opacity: 1;
      }
    }
  }
}
</style>
