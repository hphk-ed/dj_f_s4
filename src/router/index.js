import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '@/views/MainPage'
import TagDetailPage from '@/views/TagDetailPage'
import TagListPage from '@/views/TagListPage'
import MusicDetailPage from '@/views/MusicDetailPage'
import PageNotFound from '@/views/PageNotFound'
import ArtistDetailPage from '@/views/ArtistDetailPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
  },
  {
    path: '/tags/',
    name: 'TagListPage',
    component: TagListPage,  
  },
  {
    path: '/tags/:id',
    name: 'TagDetailPage',
    component: TagDetailPage,  
  },
  {
    path: '/music/:id',
    name: 'MusicDetailPage',
    component: MusicDetailPage,  
  },
  {
    path: '/artist/:id',
    name: 'ArtistDetailPage.vue',
    component: ArtistDetailPage,
  },
  { 
    path: "*",
    name: 'PageNotFound',
    component: PageNotFound 
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
