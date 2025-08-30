import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue'
import Blog from './components/Blog.vue'
import BlogPost from './components/BlogPost.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/blog', component: Blog },
  { path: '/blog/:slug', component: BlogPost }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')