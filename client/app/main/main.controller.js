// #Main Controller
// This controller is kind of a conglomeration of functionality needed for the CMS. Anything that needs to be accessable by every part of the front end goes here. By front end I mean everything the user sees but not the CMS admin pages.

'use strict';
(function(){
  angular.module('meanbaseApp').controller('MainCtrl', MainCtrl);

  // @ngInject
  function MainCtrl($rootScope, $scope, $http, Auth, $location, endpoints, $modal, $sanitize, helpers, $timeout, toastr) {

    // It's becoming a standard in meanbase prepare the api endpoints the controller will hit at the top of the file.

    // Endpoints will be called like 

    // `server.menus.find({mongo query}).then();`
    var server = {
      menus: new endpoints('menus'),
      sharedContent: new endpoints("shared-content"),
      extensions: new endpoints('extension'),
      page: new endpoints('pages')
    };

    // Let's check if the user is logged in
    $rootScope.isLoggedIn = Auth.isLoggedIn();

    // Get the current logged in user
    $scope.currentUser = Auth.getCurrentUser();

    // A method that logs the user out
    $scope.logout = function() {
      Auth.logout();
    };

    // Used to disable navigation while in edit mode
    $scope.ableToNavigate = true;

    //  ###editMode
    // The big daddy power house **editMode**! This variable is used all throughout the app to enable edits to be made on the content. We don't want this to be true until we hit the edit button in the admin top menu.
    $rootScope.editMode = false;

    // ###Shared Content
    // What is shared content? Let's say you have an extension|plugin|widget|component|content, whatever you want to call it, on your page. By default it will only exist on that page. If you create another page, even when using the same template you won't see that extension. Shared data is a concept that let's you have the same extension on multiple pages just by naming the extension. The best part? All extensions with that name and type stay in sync, so when you make changes to an extension on one page all other instances of that extension are updated. It means you don't have to recreate the same information over and over again on every page you want that extension. 

    // ####Deleting Shared Content
    // However, we need some way of knowing when to delete shared content, say when it's no longer being used? Upon every save, if an extension was removed from the page, we send it's shared content name to the server which will perform a check. If no other pages are using that shared content, it deletes it all together, however if some other page is still using that content, we do nothing. This variable keeps a record of extensions with names that were deleted for sending to the server.
    $scope.sharedContentToCheckDelete = [];

    // Get all the menus on the server.
    server.menus.find({}).success(function(response) {
      $rootScope.menus = response;
    });


    function getSharedContentFromServer() {
      // Gets all existing shared content. Why not just content that's used by the page we are on? Because if the user is in edit mode and they want to add existing content they will need the full list of shared content to choose from.
      server.sharedContent.find({}).success(function(data) {

        // We need to define this for use even if no data was returned so it doesn't break code when we add properties to this object
        $rootScope.sharedContent = {};

        // We avoid running this code unnecessarily if no data was returned
        if(helpers.isEmpty(data)) { return false; }

        // The data from the server comes in as an array. We want to convert it to an object for speed increases throughout the app so we can refer to a sharedContent object by it's contentName directly instead of having to do a loop anytime we need acceess to it
        $rootScope.sharedContent = helpers.arrayToObjectWithObject(data, 'contentName');

        // See helpers.service.js. This is basically a for loop that goes through the extensions only on the current page
        helpers.loopThroughPageExtensions(function(currentExtension) {

          // If the extension has a name (uses shared content), then we want to update it's data with the shared content data
          if(currentExtension.contentName && currentExtension.contentName !== '') {
            
            // If the sharedContent for this extension is blank, we want to at least define the correct structure so it doesn't break code
            if(!$rootScope.sharedContent[currentExtension.contentName]) {
              $rootScope.sharedContent[currentExtension.contentName] = {
                data: undefined,
                config: undefined
              };
            }
            currentExtension.data = $rootScope.sharedContent[currentExtension.contentName].data;
            currentExtension.config = $rootScope.sharedContent[currentExtension.contentName].config;
          }
        });
      });
    }

    getSharedContentFromServer();
    

    // Rubaxa's library "sortable" and "ng-sortable" (the drag and drop capabilities) need a configuration to be passed in. Here we define it. Inside the ng-repeat, any item with a class of `.mb-draggable` will be able to be dragged.
    //
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

    // Since extensions are draggable we need to define those here too.
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

    // ###Client Side Validation
    // We want to validate client side data before sending it to the server so the user can know what to correct. The server also validates the data.

    // These regexes may we used throughout forms on the site
    $rootScope.validators = {
      isTitle: /^[A-Za-z0-9@:?&=. _\-]*$/,
      isURI: /(((http|https|ftp):\/\/([\w-\d]+\.)+[\w-\d]+){0,1}((\/|#)[\w~,;\-\.\/?%&+#=]*))/,
      isFilePath: /^[0-9A-Za-z\/*_.\\\-]*$/,
      isCSSClass: /^[A-Za-z0-9_\-*]*$/,
      isAnchorTarget: /^[_blank|_self|_parent|_top]*$/,
      isEmail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      isText: /^$/,
      isHTML: /^$/
    };

    // These error messages may be used to explain to the user why their input was invalid and match their corresponding regexes above
    $rootScope.errorMessages = {
      isTitle: 'Many only contain letters, numbers, and these symbols ( @ : ? & = . _ - ).',
      isURI: "Must be a valid path, either a full address ('http://path.com') or a relative one '/path', '#hashPath'",
      isFilePath: 'Must contain only letters, numbers, /, *, _, ., \\, and -',
      isCSSClass: 'May only contain letters, numbers, _, -, and *',
      isAnchorTarget: 'Must be either _blank, _self, _parent, or _top',
      isEmail: 'Must be a valid email format',
      isText: 'Must be safe text',
      isHTML: 'Must be safe html',
      isRequired: "This field is required."
    };

    // ###Snapshots
    // What if the user hits edit, makes many changes and then decides they don't like those changes?

    // We need some way of reseting the content back to what it was before. That's what snapshots do. We do an angular.copy() on all major pieces of data when the user hits edit and if the user then hits discard, we set that data to the initial copied value.
    var snapshots = {};
    $scope.$watch('editMode', function(nv, ov) {
      if(nv === ov) { return false; }
      snapshots.menus = angular.copy($rootScope.menus);
      snapshots.page = angular.copy($rootScope.page);
      snapshots.sharedContent = angular.copy($rootScope.sharedContent);

      // Rubaxa's library has the ability to be disabled.
      // We only want draggable elements while in edit mode
      $rootScope.menusConfig.disabled = !$scope.editMode;
      $rootScope.sortableExtensions.disabled = !$scope.editMode;

      // We want to disable navigation while in edit mode, so the user doesn't accidently click away and loose their changes
      $scope.ableToNavigate = !$scope.editMode;


      if(nv) {
        // In the admin pages, extensions may be disabled so they cannot be added to the page.
        // Here we get only the active extensions so the admin can select extensions to add 
        server.extensions.find({active: true}).success(function(res) {
          $rootScope.extensions = res;
        });
      }
    });

    // Prevent the user from navigating away while in edit mode until they save or discard their changes.
    $scope.$onRootScope('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      if (!$scope.ableToNavigate) {
        event.preventDefault();
        toastr.info('Please save or discard your changes before navigating.');
      }
    });

    // Every time we load a new page, we need to get the shared content all over again so we can sync any content on that page with changes that were made on a different page
    $scope.$onRootScope('$stateChangeSuccess', function() {
      getSharedContentFromServer();
    });

    // ####Save Edits!
    // This is the event that listens for when the user clicks the save button after being in edit mode.
    $scope.$onRootScope('cms.saveEdits', function() {

      // We play a pulse animation on the page. We are using [daneden/animate.css](https://github.com/daneden/animate.css) so we could pass any of those values here
      $scope.pageAnimation = 'pulse';

      // ### Update the menus

      // Update positions and locations of the menu items
      $rootScope.menus = helpers.updatePositionData($rootScope.menus);

      // Delete all the menus in the database, 
      // recreate all of them based off the client data stored in $rootScope.menus,
      // Get the newly updated menus with their server-generated ids
      server.menus.delete({}).finally(function(deleteResponse) {
        server.menus.create($rootScope.menus).success(function(createResponse) {
          server.menus.find({}).success(function(response) {
            $rootScope.menus = response;
          });
        });
      });

      // We want to update the extension position data as well
      $rootScope.page.extensions = helpers.updatePositionData($rootScope.page.extensions);
      
      // We use a timeout so that the meanbase-editable html changes have time to update their models before we save the page.
      $timeout(function(){
        if(!$rootScope.page._id) { return false; }
        server.page.update({_id: $rootScope.page._id}, $rootScope.page).finally(function() {
          if($rootScope.page.tabTitle) {
            document.title = $rootScope.page.tabTitle;
          }
          if($rootScope.page.description) {
            jQuery('meta[name=description]').attr('content', $rootScope.page.description);
          }
          if($scope.sharedContentToCheckDelete.length > 0) {
            server.sharedContent.delete({ contentName:{ $in : $scope.sharedContentToCheckDelete } }).finally(function() {
              getSharedContentFromServer();
              $scope.sharedContentToCheckDelete = [];
            });
          } else {
            getSharedContentFromServer();
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
            if(!$rootScope.sharedContent[currentExtension.contentName]) {
              $rootScope.sharedContent[currentExtension.contentName] = {};
            }
            $rootScope.sharedContent[currentExtension.contentName].contentName = currentExtension.contentName;
            $rootScope.sharedContent[currentExtension.contentName].type = currentExtension.name;
            $rootScope.sharedContent[currentExtension.contentName].data = currentExtension.data;
            $rootScope.sharedContent[currentExtension.contentName].config = currentExtension.config;
          }
        }); //helpers.loopThroughPageExtensions       

        helpers.loopThroughPageExtensions(function(currentExtension) {
          if(currentExtension.contentName && currentExtension.contentName !== '') {
            currentExtension.data = $rootScope.sharedContent[currentExtension.contentName].data;
            currentExtension.config = $rootScope.sharedContent[currentExtension.contentName].config;
          }
        });

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
            },
            isNewMenu: function() {
              return false;
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
      
      $rootScope.page.extensions = helpers.updatePositionData($rootScope.page.extensions);
      if(extension && extension.group && extension.position !== undefined) {
        $rootScope.page.extensions[extension.group].splice(extension.position, 1);
        if($rootScope.page.extensions[extension.group].length < 1) {
          delete $rootScope.page.extensions[extension.group];
        }
      }
    };

    $scope.createMenuItem = function(group) {
      if(!$rootScope.menus[group]) {
        $rootScope.menus[group] = [];
      }
      var modalInstance = $modal.open({
        templateUrl: 'editmenu.modal.html',
        controller: menuModal,
        size: 'md',
        resolve: {
          menuItem: function() {
            return {
              position: $rootScope.menus[group].length,
              group: group,
              title: '',
              classes: '',
              target: '',
              url: ''
            };
          },
          isNewMenu: function() {
            return true;
          }
        }
      });
    };


    // The controller for the menu modal
    // @ngInject
    function menuModal($scope, $modalInstance, menuItem, isNewMenu) {
      $scope.isNewMenu = isNewMenu;

      $scope.menuItem = angular.copy(menuItem);

      $scope.newMenuItem = function() {
        if($scope.editingMenuForm.$valid) {
          if($scope.menuItem._id) { delete $scope.menuItem._id; }
          if(!$rootScope.menus[$scope.menuItem.group]) { 
            $rootScope.menus[$scope.menuItem.group] = []; 
          }
          $scope.menuItem.position = $rootScope.menus[$scope.menuItem.group].length;
          $rootScope.menus[$scope.menuItem.group].push($scope.menuItem);
          $modalInstance.dismiss();
        }
      };

      $scope.editMenuItem = function() {
        if($scope.editingMenuForm.$valid) {
          menuItem.title = $scope.menuItem.title || menuItem.title;
          menuItem.url = $scope.menuItem.url || menuItem.url;
          menuItem.classes = $scope.menuItem.classes || menuItem.classes;
          menuItem.target = $scope.menuItem.target || menuItem.target;
          $modalInstance.dismiss();
        }
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
