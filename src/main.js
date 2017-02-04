import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Index from './components/Index'
import App from './App'

Vue.use(VueResource)
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Index },
  { path: '/:path*', component: Index }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

Vue.http.options.root = '/api'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
