import lookupTemplate from '../routing/lookup-template'

// create router
const router = new VueRouter({
  history: true,
  saveScrollPosition: true,
  hashbang: false
})

router.map({
  '/': {
    component: lookupTemplate
  },
  '/:page': {
    component: lookupTemplate
  }
})

router.beforeEach((transition) => {
  auth.isLoggedIn().then(transition.next).catch(transition.next)
})

const App = Vue.extend({
  template: require('./app.jade')
})

router.start(App, '#app')

// just for debugging
window.router = router
