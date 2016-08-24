'use strict';

angular.module('meanbaseApp')
  .controller('PagesCtrl', function ($scope, endpoints, helpers, toastr, api, crud, Auth, $timeout, $rootScope) {

    $scope.$parent.pageTitle = 'Pages';
    $scope.pagesFilter = '';
    $scope.filterByThisPage = '';
    $scope.menus = [];

    var p = $scope.p = new crud($scope, 'pages', api.pages);

    p.find({}, null, 'Could not get the pages');

    $scope.publishedStates = [
      {label: 'both', value: ''},
      {label: 'published', value: 'true'},
      {label: 'unpublished', value: 'false'}
    ];


    $scope.templateOptions = [];

    api.themes.find({active: true, $select: ['templates']}).then(function(response) {
      $scope.templateOptions = Object.keys(response[0].templates);
    }, function(err) {
      toastr.error("Sorry but something is wrong with the server and you can't choose templates for your pages.")
    });

    $scope.published = '';

    $scope.updateUrl = function(title) {
      if(!$scope.settings) { return false; }
      if(title) {
        $scope.settings.url = title;
        $scope.settings.url = title.replace(/[ ]/g, "-").toLowerCase();
  			if(($scope.settings.url.charAt(0) !== '/')) {
  				$scope.settings.url =  '/' + $scope.settings.url;
  			}
      } else {
        $scope.settings.url = '/';
      }
    };

    $scope.saveSettings = function(page, settings) {
      var previousUrl = page.url;
      if(page && page._id) {
        p.update(page, settings, page.title + ' updated', 'Could not update ' + page.title);
      } else if(page && !page._id) {
        api.pages.find({url: page.url}).then(function(response) {
          if(response.length < 1) {
            p.create(page, page.title + ' created', 'Could not create ' + page.title).then(function(response) {
              $timeout(function() {
                componentHandler.upgradeAllRegistered()
              });
            });
          } else {
            toastr.warning('A page with the url of ' + page.url + ' already exists');
          }
        }, function(err) {
          toastr.warning("Sorry, but something is wrong and you can't add pages right now.");
        });

      }

      p.toggleModal('isSettingsOpen', 'settings');
  	};

  	$scope.togglePublished = function(page) {
      page.published = !page.published;
      var message = page.published? page.title + ' published.': page.title + ' unpublished.';
      var failure = page.published? 'Could not publish ' + page.title: 'Could not unpublish ' + page.title;

      page.publishedOn = Date.now();

      $scope.p.update(page, {published: page.published}, message, failure).then(function() {
        api.menus.update({url: page.url}, {published: page.published});
      });
  	};

  	$scope.deletePage = function(page) {
      var message = page.title + " deleted";
      var failure = 'Could not delete ' + page.title;
      p.delete(page, page.title + ' unpublished.', message, failure).then(function(response) {
        api.menus.delete({url: page.url}, {published: page.published});
      });
      p.toggleModal('isDeleteOpen', 'pageToDelete');
  	};

    $scope.openSettingsModal = function() {
      var settings = {
        "author": Auth.getCurrentUser().name,
        "url": "",
        "title": "",
        "tabTitle": "",
        "template": "page",
        "description": "",
        "published": true
      };

      p.toggleModal('isSettingsOpen', 'settings', settings)
    };

	  $scope.pageFilter = function(page) {
      if(page) {
        return (page.title + page.url).toLowerCase().indexOf($rootScope.searchText.toLowerCase()) >= 0;
      } else {
        return false;
      }
	  };
  });

angular.module('meanbaseApp').
  filter('htmlToPlainText', function() {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  }
);
