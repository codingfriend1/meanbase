module.exports = function ($scope, $modalInstance, menuItem, isNewMenu, api, $rootScope, helpers) {

  api.pages.find({$select: ['url']}).then(function(response) {
    $scope.pages = response
  })

  // This is a little distinguishing check to see if this modal was opened from an existing menu item (to edit it) or was opened from the createMenuItem function to create a new menu from scratch
  $scope.isNewMenu = isNewMenu

  // Since we don't want to be affecting our actual menu until we hit save we must make a copy of it.
  $scope.menuItem = angular.copy(menuItem)

  $scope.newMenuItem = function(editingMenuForm) {
    // We want to make sure the data is valid before submitting it
    if(editingMenuForm.$valid) {
      if($scope.menuItem._id) { delete $scope.menuItem._id }

      // If this menu group doesn't exist create it
      if(!$rootScope.menus[$scope.menuItem.group]) {
        $rootScope.menus[$scope.menuItem.group] = []
      }

      // Add the menu item to the end of it's group's list
      $scope.menuItem.position = $rootScope.menus[$scope.menuItem.group].length
      $rootScope.menus[$scope.menuItem.group].push($scope.menuItem)

      $rootScope.$emit('cms.elementsChanged')
      $modalInstance.dismiss()
    }
  }

  $scope.updateTarget = function(url) {
    if(url.indexOf('http://') > -1 || url.indexOf('https://') > -1) {
      if(!$scope.menuItem.target) {
        $scope.menuItem.target = '_blank'
      }
    } else {
      $scope.menuItem.target = ""
    }
  }

  $scope.editMenuItem = function(editingMenuForm) {
    // We want to make sure the changes are valid before submitting it
    if(editingMenuForm.$valid) {
      // menuItem is the menu that was passed in (the actual menu we want to modify). $scope.menuItem is the object that's being edited in the modal.
      menuItem.title = $scope.menuItem.title || menuItem.title
      menuItem.url = $scope.menuItem.url || menuItem.url
      menuItem.classes = $scope.menuItem.classes
      menuItem.target = $scope.menuItem.target

      $rootScope.$emit('cms.elementsChanged')
      $modalInstance.dismiss()
    }
  }

  $scope.removeMenuItem = function() {
    // Update the position data so that we are sure we are deleting the correct menu item
    $rootScope.menus = helpers.updatePositionData($rootScope.menus)

    $rootScope.menus[menuItem.group].splice(menuItem.position, 1)

    $rootScope.$emit('cms.elementsChanged')
    $modalInstance.dismiss()
  }
}
