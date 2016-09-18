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

window.page = {}
window.menus = {}

async function getMenus() {
  try {
    window.menus = await api.menus.find({})
  } catch(err) {
    console.log('Error getting menus', err);
    toastr.warning('Error getting menus.')
  }
}

getMenus()

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
