import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BinaireView from '@/views/binaire/BinaireView.vue'
import QrcodeView from '@/views/qrcode/QrcodeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/binaire',
      name: 'binaire',
      component: BinaireView
    },
    {
      path: '/qrcode',
      name: 'qrcode',
      component: QrcodeView
    }
  ],
})

export default router