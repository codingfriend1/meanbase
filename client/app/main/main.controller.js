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

    // Used to disable navigation while in edit mode
    $scope.ableToNavigate = true;

    $rootScope.editMode = false;

    // Keeps a record of shared content that was deleted so later it can check if that content is used anywhere else and if not delete it
    $scope.sharedContentToCheckDelete = [];

    // Get all the menus for the site
    server.menus.find({}).then(function(response) {
      $rootScope.menus = response.data;
    });

    // Gets all existing content (extensions) for when the user wants to add existing content
    server.sharedContent.find({}).success(function(data) {
      if(helpers.isEmpty(data)) { return false; }
      $rootScope.sharedContent = helpers.arrayToObjectWithObject(data, 'contentName');
      helpers.loopThroughPageExtensions(function(currentExtension) {
        if(currentExtension.contentName && currentExtension.contentName !== '') {
          // Any extensions using that content have their values updated here 
          currentExtension.data = $rootScope.sharedContent[currentExtension.contentName].data;
          currentExtension.config = $rootScope.sharedContent[currentExtension.contentName].config;
        }
      });
    });

    // Set up config for draggable menus
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

    // Set up config for draggable extensions
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

    // Sets up regex for validating user input site-wide
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

    // Error messages to explain regexes to users
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

    // Store snapshots of the current page's data in case we want to discard our edits
    var snapshots = {};
    $scope.$watch('editMode', function(nv, ov) {
      if(nv === ov) { return false; }
      snapshots.menus = angular.copy($rootScope.menus);
      snapshots.page = angular.copy($rootScope.page);
      snapshots.sharedContent = angular.copy($rootScope.sharedContent);

      // We only want draggable elements while in edit mode
      $rootScope.menusConfig.disabled = !$scope.editMode;
      $rootScope.sortableExtensions.disabled = !$scope.editMode;

      // We want to disable navigation while in edit mode, so the user doesn't accidently click away and loose their changes
      $scope.ableToNavigate = !$scope.editMode;
      if(nv) {
        // Get the active extensions so the admin can select extensions to add 
        server.extensions.find({active: true}).success(function(res) {
          $rootScope.extensions = res;
        });
      }
    });

    // Prevent the user from navigating while in edit mode.
    $scope.$onRootScope('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      if (!$scope.ableToNavigate) {
        event.preventDefault();
        toastr.info('Please save or discard your changes before navigating.');
      }
    });

    // Save menu ordering when saveEdits event is emitted
    $scope.$onRootScope('cms.saveEdits', function() {

      // Add a pulse animation to the page
      $scope.pageAnimation = 'pulse';

      // Update positions and locations of the menu items
      $rootScope.menus = helpers.updatePositionData($rootScope.menus);

      updateExtensionPositionData();

      // Delete all the menus in the database, 
      // recreate all of them based off the client copy,
      // Get the newly updated menus with their server-generated ids
      server.menus.delete({}).then(function(deleteResponse) {
        server.menus.create($rootScope.menus).then(function(createResponse) {
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
          if($rootScope.page.tabTitle) {
            document.title = $rootScope.page.tabTitle;
          }
          if($rootScope.page.description) {
            jQuery('meta[name=description]').attr('content', $rootScope.page.description);
          }
          if($scope.sharedContentToCheckDelete.length > 0) {
            server.sharedContent.delete({ contentName:{ $in : $scope.sharedContentToCheckDelete } });
            $scope.sharedContentToCheckDelete = [];
          }
          toastr.success('Changes saved');
        });

        helpers.loopThroughPageExtensions(function(currentExtension) {
          if(currentExtension.contentName && currentExtension.contentName !== '') {
            // Send the shared content back to the server
            server.sharedContent.update({contentName: currentExtension.contentName}, {data: currentExtension.data, config: currentExtension.config, type: currentExtension.name}); 
          }

          // Updated the shared content across all content instances
          if(currentExtension.contentName && currentExtension.contentName !== '') {
            $rootScope.sharedContent[currentExtension.contentName].type = currentExtension.name;
            $rootScope.sharedContent[currentExtension.contentName].data = currentExtension.data;
            $rootScope.sharedContent[currentExtension.contentName].config = currentExtension.config;
          }
        }); //helpers.loopThroughPageExtensions       
      }); //$timeout
    }); //saveEdits()

    // When cms.headbar or any other script releases the event to discard edits, reset everything to the way it was when the user first clicked edit
    $scope.$onRootScope('cms.discardEdits', function() {
      $scope.pageAnimation = 'shake';
      $rootScope.menus = snapshots.menus;
      $rootScope.page = snapshots.page;
      $rootScope.sharedContent = snapshots.sharedContent;
      $rootScope.sharedContentToCheckDelete = [];
    });

    // This controls the image selector modal that opens with the inline text editor
    $scope.openImageModal = function(callback) {
      var modalInstance = $modal.open({
        templateUrl: 'findImage.modal.html',
        controller: function($scope, $modalInstance) {
          $scope.imageSelectorApi = {};
          $scope.allOperations = false;
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
    // Instead opens the edit menu modal
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


    // The controller for the menu modal
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
        $rootScope.menus = helpers.updatePositionData($rootScope.menus);
        $rootScope.menus[menuItem.group].splice(menuItem.position, 1);
        $modalInstance.dismiss();
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }

  }
})();
