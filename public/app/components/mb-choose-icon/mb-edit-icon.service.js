(() => {

  @mbService()

  class iconModal {

    constructor($rootScope, $modal) {
      this.$rootScope = $rootScope
      this.$modal = $modal
    }

    @autobind
    open($event, item, property, href) {
      if(this.$rootScope.editMode) {
        if(!item[property]) {
          item[property] = {}
        }
        $event.preventDefault()
        var modalInstance = this.$modal.open({
          templateUrl: require('./mb-edit-icon.modal.jade'),
          controller: require('./mb-edit-icon.controller.js'),
          size: 'md',
          resolve: {
            icon: function() {
              return item[property]
            },
          }
        })
      } else {
        if(item[property].target) {
          window.open(href, item[property].target)
        } else {
          $location.path(href)
        }
      }
    }
  }

})()
