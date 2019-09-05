import Vue from 'vue'
import Router from 'vue-router'
import GalleryDetail from './components/GalleryDetail'
import ImageGallery from './components/ImageGallery'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '',
      name: 'index',
      component: ImageGallery
    },
    {
      path: '/gallery/:id',
      name: 'gallery_detail',
      component: GalleryDetail
    }
  ],
  mode: 'history'
})

export default router
