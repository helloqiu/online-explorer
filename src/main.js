import Vue from 'vue'
import VueResource from 'vue-resource'
import Index from './components/Index'

Vue.use(VueResource)

Vue.http.options.root = '/api'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: (h) => h(Index)
})
