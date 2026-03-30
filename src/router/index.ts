import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BinaireView from '@/views/binaire/BinaireView.vue'
import QrcodeView from '@/views/qrcode/QrcodeView.vue'
import PasswordView from '@/views/password/PasswordView.vue'

const defaultTitle = 'ToolBoxX | Outils rapides du quotidien'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'ToolBoxX | Accueil',
      },
    },
    {
      path: '/binaire',
      name: 'binaire',
      component: BinaireView,
      meta: {
        title: 'ToolBoxX | Convertisseur binaire',
      },
    },
    {
      path: '/qrcode',
      name: 'qrcode',
      component: QrcodeView,
      meta: {
        title: 'ToolBoxX | QR Code',
      },
    },
    {
      path: '/password',
      name: 'password',
      component: PasswordView,
      meta: {
        title: 'ToolBoxX | Generateur de mot de passe',
      },
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = typeof to.meta.title === 'string' ? to.meta.title : defaultTitle
})

export default router
