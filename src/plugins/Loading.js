import Loading from '@/components/Loading.vue'

export default {
  install (Vue) {
    const LoadingConstructor = Vue.extend(Loading)
    const t = new LoadingConstructor()
    t.$mount(document.createElement('div'))
    document.body.appendChild(t.$el)
    Vue.prototype.$showLoading = (isShow) => {
      t.isShow = isShow
    }
  }
}
