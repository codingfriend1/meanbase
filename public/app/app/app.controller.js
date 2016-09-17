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

window.radio = new Vue()
window.page = {}
window.menus = {}

function startApp() {
  const App = Vue.extend({
    template: require('./app.jade'),
    data: () => ({
      editMode: true,
      page,
      menus,
      currentUser: auth.currentUser
    })
  })
  
  router.start(App, '#app')
}

auth.isLoggedIn().then(startApp).catch(startApp)

// just for debugging
window.router = router
