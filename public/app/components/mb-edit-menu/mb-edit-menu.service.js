(() => {

  @mbService()
  class editMenuModal {

    constructor($rootScope, $modal) {
      this.$rootScope = $rootScope
      this.$modal = $modal
    }

    @autobind
    open($event, menuItem, href) {

      if(this.$rootScope.editMode) {

        $event.preventDefault()
        var modalInstance = this.$modal.open({
          templateUrl: require('./mb-edit-menu.modal.jade'),
          controller: require('./mb-edit-menu.controller.js'),
          size: 'md',
          resolve: {
            menuItem: function() {
              return menuItem
            },
            isNewMenu: function() {
              return false
            }
          }
        })

      } else {

        if($event.target.classList.contains('mb-edit-menu-btn')) { console.log("false", false); return false }
        if(menuItem.target) {
          window.open(href, menuItem.target)
        } else {
          $location.path(href)
        }

      }

    }
  }

})()
