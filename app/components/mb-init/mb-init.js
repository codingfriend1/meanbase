const syncDelay = 600

Vue.directive('mb-init', {
  acceptStatement: true,
  priority: 2000,
  update: function(fn) {
    fn()
  }
})
