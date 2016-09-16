import configRouter from '../routing/config-router'

// create router
const router = new VueRouter({
  history: true,
  saveScrollPosition: true,
  hashbang: false
})

// configure router
configRouter(router)

const App = Vue.extend({
  template: require('./master.jade')
})

router.start(App, '#app')

// just for debugging
window.router = router
