import templateRouter from './template-router'

export default function configRouter (router) {

  // normal routes
  router.map({
    '/': {
      component: templateRouter
    },
    '/:page': {
      component: templateRouter
    }
  })

  // global before
  // 3 options:
  // 1. return a boolean
  // 2. return a Promise that resolves to a boolean
  // 3. call transition.next() or transition.abort()
  // router.beforeEach((transition) => {
  //   if (transition.to.path === '/forbidden') {
  //     router.app.authenticating = true
  //     setTimeout(() => {
  //       router.app.authenticating = false
  //       alert('this route is forbidden by a global before hook')
  //       transition.abort()
  //     }, 3000)
  //   } else {
  //     transition.next()
  //   }
  // })
}
