(() => {

  @mbService()

  class linkModal {

    constructor($rootScope, $modal) {
      this.$rootScope = $rootScope
      this.$modal = $modal
    }

    @autobind
    open(belongsTo, property) {
      if(!belongsTo || !property) { return false }
      var modalInstance = this.$modal.open({
        templateUrl: require('./mb-edit-link.modal.jade'),
        controller: require('./mb-edit-link.controller.js'),
        size: 'md',
        resolve: {
          link: function() {
            return belongsTo[property]
          },
        }
      })
    }
  }

})()
