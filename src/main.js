import Vue from 'vue'
import VueMasonry from 'vue-masonry-css'
import VueLazyload from 'vue-lazyload'
import VueLazyLoadVideo from 'vue-lazyload-video'
import router from './router'
import App from './App'

Vue.use(VueMasonry)
Vue.use(VueLazyload, {
  loading: 'loading.gif',
  error: 'error.png'
})
Vue.use(VueLazyLoadVideo)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
