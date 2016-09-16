module.exports = function linkModalController($scope, $modalInstance, link, api, $rootScope) {
  api.pages.find({$select: ['url']}).then(function(response) {
    $scope.pages = response
  })

  $scope.link = angular.copy(link)

  $scope.updateTarget = function(url) {
    if(url.indexOf('http://') > -1 || url.indexOf('https://') > -1) {
      if(!$scope.link.target) {
        $scope.link.target = '_blank'
      }
    } else {
      $scope.link.target = ""
    }
  }

  $scope.saveLink = function(editLinkForm) {

    // We want to make sure the changes are valid before submitting it
    if(editLinkForm.$valid) {
      // link is the menu that was passed in (the actual menu we want to modify). $scope.link is the object that's being edited in the modal.
      link.title = $scope.link.title || link.title
      link.url = $scope.link.url || link.url
      link.classes = $scope.link.classes
      link.target = $scope.link.target
      $rootScope.$emit('cms.elementsChanged')
      $modalInstance.dismiss()
    }
  }
}
