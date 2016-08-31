module.exports = function linkModalController($scope, $modalInstance, api, menu, property) {
  api.pages.find({$select: ['url', 'title', '_id']}).then(function(response) {
    $scope.pages = response
  })

  $scope.link = {
    target: '_blank'
  }

  $scope.searchTitle = ''

  $scope.toggleSelected = function(page) {
    page.selected = !page.selected
  }

  $scope.selectedLinks = {}

  $scope.addMenuItems = function(editLinkForm) {

    if(!editLinkForm.$valid) { return false }

    let selectedPages = []
    let position = -1
    $scope.pages.forEach(function(page) {
      if(page.selected) {
        selectedPages.push({
          title: page.title.replace(/<[^>]+>/gm, ''),
          url: page.url,
          position: menu[property].length + ++position,
          group: property,
          linkTo: page._id,
          classes: $scope.selectedLinks.classes,
          iconClasses: $scope.selectedLinks.iconClasses,
        })
      }
    });

    if(selectedPages.length > 0) {

      menu[property] = menu[property].concat(selectedPages)
      $modalInstance.dismiss()
    } else {
      menu[property].push($scope.link);
      $modalInstance.dismiss()
    }
  }
}
