(() => {

  @mbService()

  class addMenuModal {

    constructor($rootScope, $modal) {
      this.$rootScope = $rootScope
      this.$modal = $modal
    }

    @autobind
    open(belongsTo, property) {
      if(!belongsTo || !property || !belongsTo[property]) { return false }

      var modalInstance = this.$modal.open({
        templateUrl: require('./mb-add-menu-item.modal.jade'),
        controller: require('./mb-add-menu-item.controller.js'),
        size: 'md',
        resolve: {
          property: function() {
            return property
          },
          menu: function() {
            return belongsTo
          }
        }
      })
    }
  }

})()
