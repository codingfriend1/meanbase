import lookupTemplate from './routing/lookup-template'
import master from './components/master/master.js'

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
  '/*page': {
    component: lookupTemplate
  }
})

async function startApp() {

  try {
    window.page = await services.page.get()

    if(page.tabTitle) {
      document.title = page.tabTitle;
    }

    if(page.description) {
      jQuery('meta[name=description]').attr('content', page.description);
    }
  } catch(err) {
    console.log('err', err)
  }

  window.editMode = auth.hasPermissionSync('editContent')? true: false

  router.start(master, '#app')
}

// We first check if the user is logged in before we start the app so we can load only the needed code
auth.isLoggedIn().then(startApp).catch(startApp)


// just for debugging
window.router = router
