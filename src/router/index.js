import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HeadBar from '../views/HeadBar.vue'
import MenuBar from '../views/MenuBar.vue'
import ConTent from '../views/ConTent.vue'
import BlockingMem from '../views/main/BlockingMem.vue'
import BulletinMain from '../views/main/BulletinMain.vue'
import DormantMem from '../views/main/DormantMem.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/HeadBar',
    name: 'HeadBar',
    component: HeadBar
  },
  {
    path: '/MenuBar',
    name: 'MenuBar',
    component: MenuBar
  },
  {
    path: '/ConTent',
    name: 'ConTent',
    component: ConTent
  },
  {
    path: '/views/main/BlockingMem',
    name: 'BlockingMem',
    component: BlockingMem
  },
  {
    path: '/views/main/BulletinMain',
    name: 'BulletinMain',
    component: BulletinMain
  },
  {
    path: '/views/main/DormantMem',
    name: 'DormantMem',
    component: DormantMem
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
