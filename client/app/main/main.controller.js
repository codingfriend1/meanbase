'use strict';
(function(){
  angular.module('meanbaseApp').controller('MainCtrl', MainCtrl);

  // MainCtrl.$inject = ['$rootScope', '$scope', '$http', 'Auth', '$location', 'endpoints'];
  // @ngInject
  function MainCtrl($rootScope, $scope, $http, Auth, $location, endpoints, $modal, $sanitize, helpers) {
    $rootScope.isLoggedIn = Auth.isLoggedIn();
    
    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    var endpoints = {
      menus: new endpoints('menus'),
      extensiondata: new endpoints("extensiondata")
    };

    // Get the current logged in user
    $scope.currentUser = Auth.getCurrentUser();

    $rootScope.editMode = false;

    // Get all the menus
    endpoints.menus.find({}).then(function(response) {
      $rootScope.menus = response.data;
    });

    // $rootScope.page = {};
    // Get the current page by watching for changes on meanbaseGlobals.page
    $scope.$watch(function() {
      return window.meanbaseGlobals.page;
    }, function(page) {
      $rootScope.page = page;
      if($rootScope.page && $rootScope.page.url.charAt(0) === '/') { $rootScope.page.url = $rootScope.page.url.substr(1); }
      if($rootScope.page && !$rootScope.page.extensions) {
        $rootScope.page.extensions = {};
      }

      getSharedExtensionSources();
      
    });

    function getSharedExtensionSources() {
      var sharedSources = [];
      var extensions = [];
      helpers.loopThroughPageExtensions(function(currentExtension) {
        if(!currentExtension.data) { currentExtension.data = {}; }
        if(currentExtension.useShared && currentExtension.sharedSource) {
          sharedSources.push(currentExtension.sharedSource);
          extensions.push(currentExtension);
        }
      });

      endpoints.extensiondata.find({query: {name: {'$in': sharedSources} }}).success(function(data, statusCode) {
        $rootScope.extensiondata = helpers.arrayToObjectWithObject(data, 'name');

        // If sharedData source is missing then create a new one from the extension that requested it
        // Otherwise set the data of that extension to the sharedExtension data
        for(var idx = 0; idx < extensions.length; idx++) {
          if(!$rootScope.extensiondata[extensions[idx].sharedSource]) {
            $rootScope.extensiondata[extensions[idx].sharedSource] = {
              name: extensions[idx].sharedSource,
              data: extensions[idx].data
            };
          } else {
            extensions[idx].data = $rootScope.extensiondata[extensions[idx].sharedSource].data;
          }
        }
      });
    }

    // Set up config for sortable menus
    $rootScope.menusConfig = { 
      group: 'menus',
      ghostClass: "mb-draggable-ghost",
      draggable: ".mb-draggable",
      filter: ".ignore-draggable",
      animation: 250,
      scroll: true, // or HTMLElement
      scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
      scrollSpeed: 10 // px
    };

    $rootScope.sortableExtensions = { 
      group: 'extensions',
      ghostClass: "mb-draggable-ghost",
      draggable: ".mb-draggable",
      filter: ".ignore-draggable",
      animation: 250,
      scroll: true, // or HTMLElement
      scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
      scrollSpeed: 10 // px
    };

    // Store snapshot of menu for when discardEdits is called
    // If edit mode changes we want to enable or disable draggable menus
    var menusSnapshot, pageSnapshot, extensiondataSnapshot;
    $scope.$watch('editMode', function() {
      menusSnapshot = angular.copy($rootScope.menus);
      pageSnapshot = angular.copy($rootScope.page);
      extensiondataSnapshot = angular.copy($rootScope.extensiondata);
      $rootScope.extensiondataToDelete = [];

      endpoints.extensiondata.find({}).success(function(res) {
        $rootScope.dataSources = res;
      });

      $rootScope.menusConfig.disabled = !$scope.editMode;
    });

    // Save menu ordering when saveEdits event is emitted
    $scope.$onRootScope('cms.saveEdits', function() {

      // Update positions and locations of the menu items
      var unmappedMenus = updatePositionData();

      $rootScope.extensiondata = helpers.objectToArray($rootScope.extensiondata);

      // Delete all the menus in the database, 
      // recreate all of them based off the client copy,
      // Get the newly updated menus with their server-generated ids
      endpoints.menus.delete({}).then(function(deleteResponse) {
        endpoints.menus.create(unmappedMenus).then(function(createResponse) {
          endpoints.menus.find({}).then(function(response) {
            $rootScope.menus = response.data;
          });
        });
      });

    }); //onRootScope()

    // When cms.headbar or any other script releases the event to discard edits, reset everything to the way it was when you first clicked edit
    $scope.$onRootScope('cms.discardEdits', function() {
      $rootScope.menus = menusSnapshot;
      $rootScope.page = pageSnapshot;
      $rootScope.extensiondata = extensiondataSnapshot;
      $rootScope.extensiondataToDelete = [];
    });

    // Prevent menu links from working while in edit mode
    $scope.handleClick = function($event, menuItem) {
      if($scope.editMode) {
        $event.preventDefault();
        var modalInstance = $modal.open({
          templateUrl: 'editmenu.modal.html',
          controller: menuModal,
          size: 'md',
          resolve: {
            menuItem: function() {
              return menuItem;
            }
          }
        });
      }
    };

    // Removes an extension from an extensible area
    $scope.removeThisExtension = function(extension) {
      if(extension && extension.group && extension.position !== undefined) {
        $rootScope.page.extensions[extension.group].splice(extension.position, 1);
      }
    };

    // Unmap the client menu structure so that mongoose database can understand
    function updatePositionData() {
      var unmappedMenus = [];
      for(var menu in $rootScope.menus) {
        if ($rootScope.menus.hasOwnProperty(menu)) {
          for(var i = 0; i < $rootScope.menus[menu].length; i++) {
            $rootScope.menus[menu][i].group = menu;
            $rootScope.menus[menu][i].position = i;
            unmappedMenus.push($rootScope.menus[menu][i]);
          }
        } 
      }
      return unmappedMenus;
    }

    // @ngInject
    function menuModal($scope, $modalInstance, menuItem) {

      $scope.menuItem = angular.copy(menuItem);

      $scope.newMenuItem = function() {
        if($scope.menuItem._id) { delete $scope.menuItem._id; }
        $scope.menuItem.position = $rootScope.menus[$scope.menuItem.group].length;
        $rootScope.menus[$scope.menuItem.group].push($scope.menuItem);
        $modalInstance.dismiss();
      };

      $scope.editMenuItem = function() {
        menuItem.title = $scope.menuItem.title || menuItem.title;
        menuItem.url = $scope.menuItem.url || menuItem.url;
        menuItem.classes = $scope.menuItem.classes || menuItem.classes;
        menuItem.target = $scope.menuItem.target || menuItem.target;
        $modalInstance.dismiss();
      };

      $scope.removeMenuItem = function() {
        updatePositionData();
        $rootScope.menus[menuItem.group].splice(menuItem.position, 1);
        $modalInstance.dismiss();
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }

  }
})();
