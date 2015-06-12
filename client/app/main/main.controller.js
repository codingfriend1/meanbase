'use strict';
(function(){
  angular.module('meanbaseApp').controller('MainCtrl', MainCtrl);

  // MainCtrl.$inject = ['$rootScope', '$scope', '$http', 'Auth', '$location', 'endpoints'];
  // @ngInject
  function MainCtrl($rootScope, $scope, $http, Auth, $location, endpoints, $modal, $sanitize, helpers, $timeout, toastr) {
    $rootScope.isLoggedIn = Auth.isLoggedIn();
    
    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    var server = {
      menus: new endpoints('menus'),
      sharedContent: new endpoints("shared-content"),
      extensions: new endpoints('extension'),
      page: new endpoints('pages')
    };

    // Get the current logged in user
    $scope.currentUser = Auth.getCurrentUser();

    $scope.ableToNavigate = true;

    $rootScope.editMode = false;

    $rootScope.sharedContentToDelete = [];
    $scope.sharedContentToCheckDelete = [];

    // Get all the menus
    server.menus.find({}).then(function(response) {
      $rootScope.menus = response.data;
    });

    if($rootScope.page && $rootScope.page.url.charAt(0) === '/') { $rootScope.page.url = $rootScope.page.url.substr(1); }
    if($rootScope.page && !$rootScope.page.extensions) {
      $rootScope.page.extensions = {};
    }

    document.title = $rootScope.page.tabTitle;
    jQuery('meta[name=description]').attr('content', $rootScope.page.description);

    getSharedContent();

    function getSharedContent() {
      var sharedContent = [];
      var extensions = [];
      helpers.loopThroughPageExtensions(function(currentExtension) {
        if(!currentExtension.data) { currentExtension.data = {}; }
        if(currentExtension.contentName && currentExtension.contentName !== '') {
          sharedContent.push(currentExtension.contentName);
          extensions.push(currentExtension);
        }
      });

      server.sharedContent.find({}).success(function(data) {
        $rootScope.sharedContent = helpers.arrayToObjectWithObject(data, 'name');
        helpers.loopThroughPageExtensions(function(currentExtension) {
          if(currentExtension.contentName && currentExtension.contentName !== '') {
            currentExtension.data = $rootScope.sharedContent[currentExtension.contentName].data;
            currentExtension.config = $rootScope.sharedContent[currentExtension.contentName].config;
          }
        });
      });

      // server.sharedContent.find({query: {name: {'$in': sharedContent} }}).success(function(data, statusCode) {
      //   // If sharedData source is missing then create a new one from the extension that requested it
      //   // Otherwise set the data of that extension to the sharedExtension data
      //   for(var idx = 0; idx < extensions.length; idx++) {
      //     if(!$rootScope.sharedContent[extensions[idx].contentName]) {
      //       $rootScope.sharedContent[extensions[idx].contentName] = {
      //         name: extensions[idx].contentName,
      //         data: extensions[idx].data,
      //         config: extensions[idx].config,
      //         type: extensions[idx].name,
      //       };
      //     } else {
      //       extensions[idx].data = $rootScope.sharedContent[extensions[idx].contentName].data;
      //       extensions[idx].config = $rootScope.sharedContent[extensions[idx].contentName].config;
      //     }
      //   }
      // });
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

    $rootScope.validators = {
      isTitle: /^[A-Za-z0-9@:?&=. _\-]*$/,
      isURI: /(((http|https|ftp):\/\/([\w-\d]+\.)+[\w-\d]+){0,1}(\/[\w~,;\-\.\/?%&+#=]*))/,
      isFilePath: /^[0-9A-Za-z\/*_.\\\-]*$/,
      isCSSClass: /^[A-Za-z0-9_\-*]*$/,
      isAnchorTarget: /^[_blank|_self|_parent|_top]*$/,
      isEmail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      isText: /^$/,
      isHTML: /^$/
    };

    $rootScope.errorMessages = {
      isTitle: 'Many only contain letters, numbers, and these symbols ( @ : ? & = . _ - ).',
      isURI: "Must be a valid path, either a full address ('http://path.com') or a relative one '/path'",
      isFilePath: 'Must contain only letters, numbers, /, *, _, ., \\, and -',
      isCSSClass: 'May only contain letters, numbers, _, -, and *',
      isAnchorTarget: 'Must be either _blank, _self, _parent, or _top',
      isEmail: 'Must be a valid email format',
      isText: 'Must be safe text',
      isHTML: 'Must be safe html',
      isRequired: "This field is required."
    };

    // Store snapshot of menu for when discardEdits is called
    // If edit mode changes we want to enable or disable draggable menus
    var menusSnapshot, pageSnapshot, sharedContentSnapshot;
    $scope.$watch('editMode', function(nv, ov) {
      if(nv === ov) { return false; }
      menusSnapshot = angular.copy($rootScope.menus);
      pageSnapshot = angular.copy($rootScope.page);
      sharedContentSnapshot = angular.copy($rootScope.sharedContent);

      server.sharedContent.find({}).success(function(res) {
        $rootScope.dataSources = res;
      });

      server.extensions.find({active: true}).success(function(res) {
        $rootScope.extensions = res;
      });

      $rootScope.menusConfig.disabled = !$scope.editMode;
      $rootScope.sortableExtensions.disabled = !$scope.editMode;
      if(nv) {
        $scope.ableToNavigate = false;
      } else {
        $scope.ableToNavigate = true;
      } 
    });

    function updateSharedContent(extensionsWithShared) {
      for(var idx = 0; idx < extensionsWithShared.length; idx++) {
        server.sharedContent.update({name: extensionsWithShared[idx].contentName}, {data: extensionsWithShared[idx].data, config: extensionsWithShared[idx].config, type: extensionsWithShared[idx].name}); 
      }
    }

    $scope.$onRootScope('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      if (!$scope.ableToNavigate) {
      
        event.preventDefault();
        toastr.info('Please save or discard your changes before navigating');
      }
    });

    // Save menu ordering when saveEdits event is emitted
    $scope.$onRootScope('cms.saveEdits', function() {

      $scope.pageAnimation = 'pulse';

      // Update positions and locations of the menu items
      var unmappedMenus = updatePositionData();

      updateExtensionPositionData();

      // Delete all the menus in the database, 
      // recreate all of them based off the client copy,
      // Get the newly updated menus with their server-generated ids
      server.menus.delete({}).then(function(deleteResponse) {
        server.menus.create(unmappedMenus).then(function(createResponse) {
          server.menus.find({}).then(function(response) {
            $rootScope.menus = response.data;
          });
        });
      });

      //We need to wait for the "edit" directive to store changes in page.content
      $timeout(function(){
        if(!$rootScope.page._id) { return false; }
        if($rootScope.page.url.charAt(0) !== '/') { $rootScope.page.url = '/' + $rootScope.page.url; }
          // updateExtensionPositionData();
        server.page.update({_id: $rootScope.page._id}, $rootScope.page).finally(function() {
          document.title = $rootScope.page.tabTitle;
          jQuery('meta[name=description]').attr('content', $rootScope.page.description);
          if($scope.sharedContentToCheckDelete.length > 0) {
            server.sharedContent.delete({checkDelete: $scope.sharedContentToCheckDelete});
            $scope.sharedContentToCheckDelete = [];
          }
          toastr.success('Changes saved');
        });

        var extensionsWithShared = [];
        helpers.loopThroughPageExtensions(function(currentExtension) {
          if(currentExtension.contentName && currentExtension.contentName !== '') {
            extensionsWithShared.push(currentExtension);
          }

          if(currentExtension.contentName && currentExtension.contentName !== '') {
            if($rootScope.sharedContent[currentExtension.contentName]) {
              currentExtension.data = $rootScope.sharedContent[currentExtension.contentName].data;
              currentExtension.config = $rootScope.sharedContent[currentExtension.contentName].config;
            } else {
              $rootScope.sharedContent[currentExtension.contentName] = {
                data: currentExtension.data,
                config: currentExtension.config,
                type: currentExtension.name
              };
            }
          }
        });

        if($rootScope.sharedContentToDelete.length < 1) {
          updateSharedContent(extensionsWithShared);
        } else {
          server.sharedContent.delete({ name: {$in: $rootScope.sharedContentToDelete} }).finally(function() {
            updateSharedContent(extensionsWithShared);
          });
        }
        $rootScope.sharedContentToDelete = [];
      });
    }); //onRootScope()

    // When cms.headbar or any other script releases the event to discard edits, reset everything to the way it was when you first clicked edit
    $scope.$onRootScope('cms.discardEdits', function() {
      $scope.pageAnimation = 'shake';
      $rootScope.menus = menusSnapshot;
      $rootScope.page = pageSnapshot;
      $rootScope.sharedContent = sharedContentSnapshot;
      $rootScope.sharedContentToDelete = [];
    });

    $scope.openImageModal = function(callback) {
      var modalInstance = $modal.open({
        templateUrl: 'findImage.modal.html',
        controller: function($scope, $modalInstance) {
          $scope.imageSelectorApi = {};

          $scope.chooseImages = function() {
            var selectedImages = $scope.imageSelectorApi.getSelectedImages();
            $modalInstance.close(selectedImages);
          };
        },
        size: 'lg'
      });
      modalInstance.result.then(function (selectedImages) {
        if(callback) {
          callback(selectedImages)
        }
      });
    };

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
      if(extension.contentName && $scope.sharedContentToCheckDelete.indexOf(extension.contentName) === -1) {
        $scope.sharedContentToCheckDelete.push(extension.contentName);
      }
      updateExtensionPositionData();
      if(extension && extension.group && extension.position !== undefined) {
        $rootScope.page.extensions[extension.group].splice(extension.position, 1);
        if($rootScope.page.extensions[extension.group].length < 1) {
          delete $rootScope.page.extensions[extension.group];
        }
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

    function updateExtensionPositionData() {
      for(var extension in $rootScope.page.extensions) {
        if ($rootScope.page.extensions.hasOwnProperty(extension)) {
          for(var i = 0; i < $rootScope.page.extensions[extension].length; i++) {
            $rootScope.page.extensions[extension][i].group = extension;
            $rootScope.page.extensions[extension][i].position = i;
          }
        } 
      }
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
