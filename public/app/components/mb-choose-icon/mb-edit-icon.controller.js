module.exports = function iconModalController($scope, $modalInstance, icon, api, $rootScope, $timeout) {
  api.pages.find({}).then(function(response) {
    $scope.pages = response
  })

  $scope.icon = angular.copy(icon)

  $scope.updateTarget = function(url) {
    if(url && url.indexOf('http://') > -1 || url.indexOf('https://') > -1) {
      if(!$scope.icon.target) {
        $scope.icon.target = '_blank'
      }
    } else {
      $scope.icon.target = ""
    }
  }


  $scope.hasContent = true
  let usesFontAwesome = false
  let usesBootstrap = false
  $scope.checkHasContent = function() {
    $timeout(function() {
      $timeout(function() {
        var testIcon = $('#test-icon')[0]

        let character = getComputedStyle(testIcon, ':before').content.replace(/'|"/g, '')
        $scope.hasContent = character.charCodeAt(0)

        if(!$scope.hasContent && $scope.icon.classes) {
          $scope.hasContentError = "Please choose a class name that will make the icon appear or erase all the class names."
        } else {
          $scope.hasContentError = ''
        }
      })
    })
  }

  $scope.saveIcon = function(editIconForm) {

    // We want to make sure the changes are valid before submitting it
    if(editIconForm.$valid && ($scope.hasContent || !$scope.icon.classes)) {
      // icon is the menu that was passed in (the actual menu we want to modify). $scope.icon is the object that's being edited in the modal.
      icon.title = $scope.icon.title || icon.title
      icon.url = $scope.icon.url || icon.url

      icon.classes = $scope.icon.classes
      icon.target = $scope.icon.target
      $rootScope.$emit('cms.elementsChanged')
      $modalInstance.dismiss()
    }
  }
}
