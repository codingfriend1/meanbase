'use strict';

angular.module('meanbaseApp')
  .controller('PagesCtrl', function ($scope, endpoints, helpers, toastr, api, crud) {

    $scope.$parent.pageTitle = 'Pages';
    $scope.pagesFilter = '';
    $scope.filterByThisPage = '';

    var crud = $scope.crud = new crud($scope, 'pages', api.pages);

    console.log("$scope.crud", $scope.crud);

    crud.find({}, null, 'Could not get the pages');

    $scope.publishedStates = [
      {label: 'both', value: ''},
      {label: 'published', value: 'true'},
      {label: 'unpublished', value: 'false'}
    ];

    $scope.published = '';

    $scope.saveSettings = function(page, settings) {
      crud.update(page, settings, page.title + ' updated', 'Could not update ' + page.title);
      crud.toggleModal('isSettingsOpen', 'settings');
  	};

  	$scope.publishPage = function(page) {
      crud.update(page, {published: true}, page.title + ' published.', 'Could not publish ' + page.title);
  	};

  	$scope.unpublishPage = function(page) {
  		crud.update(page, {published: false}, page.title + ' unpublished.', 'Could not unpublish ' + page.title);
  	};

  	$scope.deletePage = function(page) {
      crud.delete(page, 'Comment unpublished.', page.title + " deleted", 'Could not delete ' + page.title);
      crud.toggleModal('isDeleteOpen', 'pageToDelete');
  	};
  });
