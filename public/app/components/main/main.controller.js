// #Main Controller
// This controller is kind of a conglomeration of functionality needed for the CMS. Anything that needs to be accessable by every part of the front end goes here. By front end I mean everything the user sees but not the CMS admin pages.

'use strict';
(function(){
  angular.module('meanbaseApp').controller('MainCtrl', MainCtrl);

  // @ngInject
  function MainCtrl($rootScope, $scope, $http, Auth, $location, endpoints, $modal, $sanitize, helpers, $timeout, toastr, api, $compile) {

    // It's becoming a standard in meanbase prepare the api endpoints the controller will hit at the top of the file.

    var server = {};
    if($rootScope.currentUser && $rootScope.currentUser.permissions && $rootScope.currentUser.permissions.indexOf('editContent') > -1) {
      server.menus = api.menus;
    } else {
      server.menus = api.publishedMenus;
    }

    // Get all the menus on the server.
    server.menus.find({}).then(function(response) {
      $rootScope.menus = response || {};
    });

    $rootScope.newComment = {};

    $rootScope.submitComment = function(newComment) {
      if(!newComment.recaptcha) { return false; }
      var valid = validateComment(newComment);
      if(valid) {
        // console.log("vcRecaptchaService.getResponse()", vcRecaptchaService.getResponse());
        // if(vcRecaptchaService.getResponse() === ""){ //if string is empty
        if(newComment.recaptcha === ""){ //if string is empty
          toastr.warning("Please resolve the captcha and submit!")
        } else {
          newComment['g-recaptcha-response'] = newComment.recaptcha;
          newComment.recaptcha = undefined;
          api.comments.create(newComment).then(function(response) {
            $rootScope.newComment = newComment = {};
            $rootScope.commentSent = true;
            $timeout(function() { $rootScope.commentSent = false; }, 2000);
          });
        }
      }
    };

    function validateComment(comment) {
      if(comment && $rootScope.page) {

        // If someone tries to set comment to already approved this will unset it
        // Validation is also done server side
        if(comment.approved) { comment.approved = false; }

        // Add forward slash if missing from page url
        if($rootScope.page.url) {
          if($rootScope.page.url.charAt(0) !== '/') {
            $rootScope.page.url = '/' + $rootScope.page.url;
          }
        }

        comment.url = $rootScope.page.url;
        return true;
      }
      return false;
    }

    // ###handleClick
    // If the user is in edit mode, we prevent menus that use this function in their ng-click from navigating away and instead open the edit menu modal. If the user is not in edit mode, navigation functions normally.
    $scope.handleClick = function($event, menuItem, href) {
      if($scope.editMode) {
        $event.preventDefault();
        var modalInstance = $modal.open({
          templateUrl: require('./editmenu.modal.jade'),
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
      } else {
        if(menuItem.target) {
          window.open(href, menuItem.target);
        } else {
          $location.path(href);
        }
      }
    };


    $scope.handleIconClick = function($event, item, property, href) {
      if($scope.editMode) {
        if(!item[property]) {
          item[property] = {};
        }
        $event.preventDefault();
        var modalInstance = $modal.open({
          templateUrl: require('./editicon.modal.jade'),
          controller: iconModalController,
          size: 'md',
          resolve: {
            icon: function() {
              return item[property];
            },
          }
        });
      } else {
        if(item[property].target) {
          window.open(href, item[property].target);
        } else {
          $location.path(href);
        }
      }
    };

    $scope.handleLinkClick = function($event, item, property, href) {
      if($scope.editMode) {
        if(!item[property]) {
          item[property] = {};
        }
        $event.preventDefault();
        var modalInstance = $modal.open({
          templateUrl: require('./editicon.modal.jade'),
          controller: iconModalController,
          size: 'md',
          resolve: {
            icon: function() {
              return item[property];
            },
          }
        });
      } else {
        if(item[property].target) {
          window.open(href, item[property].target);
        } else {
          $location.path(href);
        }
      }
    };

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

    $rootScope.sortableLists = {
      group: 'lists',
      ghostClass: "mb-draggable-ghost",
      draggable: ".mb-draggable",
      filter: ".ignore-draggable",
      handle: ".mb-drag-handle",
      animation: 250,
      scroll: true, // or HTMLElement
      scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
      scrollSpeed: 10 // px
    };

    if(!$rootScope.isLoggedIn) { return false; }

    // // Let's check if the user is logged in
    // $rootScope.isLoggedIn = Auth.isLoggedIn();

    // // Get the current logged in user
    // $scope.currentUser = Auth.getCurrentUser();

    // A method that logs the user out
    $scope.logout = function() {
      Auth.logout();
    };

    var ImageSelector = MediumEditor.Extension.extend({
      name: 'image-selector',
      init: function () {
        this.button = this.document.createElement('button');
        this.button.classList.add('medium-editor-action');
        this.button.innerHTML = '<i class="fa fa-image"></i>';
        this.button.title = 'Choose an image';

        this.on(this.button, 'click', this.handleClick.bind(this));
      },

      getButton: function () {
        return this.button;
      },

      handleClick: function (event) {
        var self = this;
        this.base.saveSelection();
        $scope.openImageModal({multiple: false}, function(image) {
          var imageToInsert = document.createElement("img");
          imageToInsert.src = image.small;
          imageToInsert.alt = image.alt;
          // imageToInsert.class = 'img-responsive';
          imageToInsert.className = 'img-responsive medium-editor-insert-images';
          self.base.restoreSelection();
          var tmp = document.createElement("div");
          tmp.appendChild(imageToInsert);
          self.base.pasteHTML(tmp.innerHTML);
        });
      }
    });

    var AddIcon = MediumEditor.Extension.extend({
      name: 'add-icon',
      init: function () {
        this.button = this.document.createElement('button');
        this.button.classList.add('medium-editor-action');
        this.button.innerHTML = '<i class="fa fa-plug"></i>';
        this.button.title = 'Insert an icon';

        this.on(this.button, 'click', this.handleClick.bind(this));
      },

      getButton: function () {
        return this.button;
      },

      handleClick: function (event) {
        var self = this;
        self.base.pasteHTML('<choose-icon belongs-to="{}" property="icon"></choose-icon>');
        $rootScope.$emit('recompile-editor');
      }
    });

    $scope.editorOptions = {
      buttonLabels: 'fontawesome',
      toolbar: {
        buttons: [
          'removeFormat',
          'bold',
          'italic',
          'anchor',
          'quote',
          'p',
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'justifyLeft',
          'justifyCenter',
          'justifyRight',
          'orderedlist',
          'unorderedlist',
          'image-selector'
        ],
        diffLeft: 25,
        diffTop: -70,
        forcePlainText: true,
        static: false,
        sticky: true,
        updateOnEmptySelection: true
      },
      extensions: {
        "image-selector": new ImageSelector(),
        // 'insert': new MediumEditorInsert()
      },
      // imageDragging: true,
      paste: {
        forcePlainText: true,
        cleanPastedHTML: true,
        cleanReplacements: [],
        cleanAttrs: ['style', 'dir'],
        cleanTags: ['meta']
      }
    };

    $scope.editorSingleLine = _.merge({}, $scope.editorOptions, {
      disableReturn: true,
      disableDoubleReturn: true,
      placeholder: {
        text: 'type here',
        hideOnClick: true
      },
    });

    var doit;
    $rootScope.windowWidth = $(window).width();
    window.onresize = function(){
      clearTimeout(doit);
      doit = setTimeout(function() {
        $rootScope.windowWidth = $(window).width();
      }, 200);
    };


    // ###Shared Content
    // What is shared content? Let's say you have an extension|plugin|widget|component|content, whatever you want to call it, on your page. By default it will only exist on that page. If you create another page, even when using the same template you won't see that extension. Shared data is a concept that let's you have the same extension on multiple pages just by naming the extension. The best part? All extensions with that name and type stay in sync, so when you make changes to an extension on one page all other instances of that extension are updated. It means you don't have to recreate the same information over and over again on every page you want that extension.

    // ####Deleting Shared Content
    // However, we need some way of knowing when to delete shared content, say when it's no longer being used? Upon every save, if an extension was removed from the page, we send it's shared content name to the server which will perform a check. If no other pages are using that shared content, it deletes it all together, however if some other page is still using that content, we do nothing. This variable keeps a record of extensions with names that were deleted for sending to the server.
    $scope.sharedContentToCheckDelete = [];


    function getSharedContentFromServer() {
      // Gets all existing shared content. Why not just content that's used by the page we are on? Because if the user is in edit mode and they want to add existing content they will need the full list of shared content to choose from.
      api.sharedContent.find({}).then(function(data) {

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

    // ###Client Side Validation
    // We want to validate client side data before sending it to the server so the user can know what to correct. The server also validates the data.

    // These regexes may we used throughout forms on the site
    $rootScope.validators = {
      isTitle: /^[A-Za-z0-9@:?&=.\/ _\-]*$/,
      isURI: /(((http|https|ftp):\/\/([\w-\d]+\.)+[\w-\d]+){0,1}((\/|#)[\w~,;\-\.\/?%&+#=]*))/,
      isFilePath: /^[0-9A-Za-z\/*_.\\\-]*$/,
      isCSSClass: /^[A-Za-z0-9_ \-*]*$/,
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
    $scope.$onRootScope('cms.takePageSnapshot', function(event, editMode) {
      // Rubaxa's library has the ability to be disabled.
      // We only want draggable elements while in edit mode
      $rootScope.sortableExtensions.disabled = !editMode;

      if(editMode) {
        snapshots.menus = angular.copy($rootScope.menus);
        snapshots.page = angular.copy($rootScope.page);
        snapshots.sharedContent = angular.copy($rootScope.sharedContent);

        // In the admin pages, extensions may be disabled so they cannot be added to the page.
        // Here we get only the active extensions so the admin can select extensions to add
        api.extensions.find({active: true}).then(function(res) {
          $rootScope.extensions = res;
          for (var i = 0; i < $rootScope.extensions.length; i++) {
            if(!$rootScope.extensions[i].screenshot) {
              $rootScope.extensions[i].screenshot = 'http://placehold.it/200x100';
            }
          }
        });
      }
    });

    $scope.$onRootScope('cms.takeMenusSnapshot', function(event, editMode) {
      // Rubaxa's library has the ability to be disabled.
      // We only want draggable elements while in edit mode
      $rootScope.menusConfig.disabled = !editMode;
      $rootScope.sortableExtensions.disabled = !editMode;

      if(editMode) {
        snapshots.menus = angular.copy($rootScope.menus);
      }
    });

    // Every time we load a new page, we need to get the shared content all over again so we can sync any content on that page with changes that were made on a different page
    $scope.$onRootScope('$stateChangeSuccess', function() {
      getSharedContentFromServer();
    });

    $scope.$onRootScope('cms.autoSave', function(event, content) {
      var url = $rootScope.page.url;
      api.staging.find({key: url}).then(function(response) {

        if(!content) {
          content = _.pick($rootScope.page, [
            'title',
            'content',
            'images',
            'extensions',
            'lists',
            'grid',
            'links'
          ]);
        }

        var promise;
        if(response.length > 0) {
          promise = api.staging.update({key: url}, {data: content});
        } else {
          promise = api.staging.create({key: url, data: content});
        }
      }, function(err) {
        console.log('promise rejected', err);
      });
    });

    $scope.$onRootScope('cms.menusAutoSave', function(event, content) {
      api.staging.find({key: 'menus'}).then(function(response) {
        var promise;
        if(!content) {
          content = angular.copy($rootScope.menus);
        }

        if(response.length > 0) {
          promise = api.staging.update({key: 'menus'}, {data: content});
        } else {
          promise = api.staging.create({key: 'menus', data: content});
        }
      }, function(err) {
        console.log('Autosave Menus failed', err);
      });
    });

    $scope.$onRootScope('cms.publishChanges', function() {
      api.staging.find({key: $rootScope.page.url}).then(function(response) {
        if(response[0] && response[0].data) {
          $rootScope.page = angular.merge($rootScope.page, response[0].data);

          api.staging.find({key: 'menus'}).then(function(response) {
            if(response[0] && response[0].data) {
              server.menus.delete({}).finally(function(deleteResponse) {
                if(!helpers.isEmpty(response[0].data)) {
                  server.menus.create(response[0].data).then(function(createResponse) {
                    server.menus.find({}).then(function(response) {
                      $rootScope.menus = response;
                      $rootScope.$emit('cms.saveEdits');
                      api.staging.delete({key: 'menus'}).then(function(response) {
                        console.log('Deleting autosaved menus', response);
                      }, function(err) {
                        console.log('Trouble deleting autosave menus', err);
                      });
                    });
                  });
                }
              });
            } else {
              $rootScope.$emit('cms.saveEdits');
              api.staging.delete({key: 'menus'}).then(function(response) {
                console.log('Deleting autosaved menus', response);
              }, function(err) {
                console.log('Trouble deleting autosave menus', err);
              });
            }
          }, function(err) {
            console.log('Could not find menu autosave data', err);
            $rootScope.$emit('cms.saveEdits');
          });

        } else {
          $rootScope.$emit('cms.saveEdits');
        }

        api.staging.delete({key: $rootScope.page.url}).then(function(response) {
          console.log('Deleting autosave data', response);
        }, function(err) {
          console.log('Trouble deleting autosave data', err);
        });
      });
    });

    // ###Save Edits!
    // This is the event that listens for when the user clicks the save button after being in edit mode.
    $scope.$onRootScope('cms.saveEdits', function() {

      // We play a pulse animation on the page. We are using [daneden/animate.css](https://github.com/daneden/animate.css) so we could pass any of those values here
      $scope.pageAnimation = 'pulse';

      // #### Update the menus

      // Update positions and locations of the menu items
      $rootScope.menus = helpers.updatePositionData($rootScope.menus);

      // Delete all the menus in the database,
      // recreate all of them based off the client data stored in $rootScope.menus,
      // Get the newly updated menus with their server-generated ids
      // helpers.removeEmptyProperties($rootScope.menus)

      // server.menus.delete({}).finally(function(deleteResponse) {
      //   if(!helpers.isEmpty($rootScope.menus)) {
      //     server.menus.create($rootScope.menus).then(function(createResponse) {
      //       server.menus.find({}).then(function(response) {
      //         $rootScope.menus = response;
      //       });
      //     });
      //   }
      // });

      // We use a timeout so that the meanbase-editable html changes have time to update their models before we save the page.
      $timeout(function(){
        if(!$rootScope.page._id) { return false; }

        api.pages.update({_id: $rootScope.page._id}, $rootScope.page).then(function(response) {

          // Since we have angular setting the browser tab title we want to update it in case it changed. Normally this is bad practice, but we have prerender in node pre-compiling these pages for search engine bots
          if($rootScope.page.tabTitle) {
            document.title = $rootScope.page.tabTitle;
          }

          if(response && response[0]) {
            if(snapshots.page.url !== response[0].url) {
              localStorage.setItem('previousEditUrl', response[0].url);
              $rootScope.previousEditUrl = response[0].url;
              api.menus.update({url: snapshots.page.url}, {url: response[0].url}).then(function(response) {}, function(err) {
                toastr.warning('Make sure to update any menus that point to the previous url for the page.')
              });
            }
          }



          // Same with description
          if($rootScope.page.description) {
            jQuery('meta[name=description]').attr('content', $rootScope.page.description);
          }

          // Here's where we try to delete shared content that was removed from this page.
          if($scope.sharedContentToCheckDelete.length > 0) {
            api.sharedContent.delete({ contentName:{ $in : $scope.sharedContentToCheckDelete } }).then(function() {

              // Get the latest content for the list next time the user want to add existing content
              getSharedContentFromServer();

              // Reset the array
              $scope.sharedContentToCheckDelete = [];
            });
          } else {
            getSharedContentFromServer();
          }

          // Let the user know their changes were saved
          toastr.success('Changes saved');

        }); //api.pages.update()

        // We want to update the extension position data as well
        $rootScope.page.extensions = helpers.updatePositionData($rootScope.page.extensions);

        // **In this first loop, we update the shared content with the data from the extensions**
        helpers.loopThroughPageExtensions(function(currentExtension) {
          var key = currentExtension.contentName;
          var ext = {
            contentName: key,
            type: currentExtension.name,
            data: currentExtension.data,
            config: currentExtension.config,
            screenshot: currentExtension.screenshot
          }
          if(key && key !== '') {
            if(!$rootScope.sharedContent[key]) {
              $rootScope.sharedContent[key] = _.merge({}, ext);
              upsertSharedContent(key, $rootScope.sharedContent[key]);
            } else {
              var mergedItem = _.mergeWith($rootScope.sharedContent[key], ext);
              upsertSharedContent(key, mergedItem);
            }

          }
        }); //helpers.loopThroughPageExtensions

        // **In this second loop, we update the extensions with the data from shared content**
        // This is so that extensions using the same data on the same page all stay in sync
        helpers.loopThroughPageExtensions(function(currentExtension) {
          var key = currentExtension.contentName;
          if(key && key !== '') {
            currentExtension.data = $rootScope.sharedContent[key].data;
            currentExtension.config = $rootScope.sharedContent[key].config;
          }
        });

      }); //$timeout
    }); //saveEdits()

    function upsertSharedContent(key, content) {
      api.sharedContent.find({contentName: key}).then(function(response) {
        if(response[0]) {
          api.sharedContent.update({contentName: key}, content);
        } else {
          api.sharedContent.create(content);
        }
      }, function(err) {
        console.log("Could not save shared content", err);
      });
    }

    // ### Discard Edits
    // When cms.headbar or any other script releases the event to discard edits, reset everything to the way it was when the user first clicked edit
    $scope.$onRootScope('cms.returnToSnapshot', function() {
      $scope.pageAnimation = 'shake';

      // We want to set the data to it's old initial snapshot
      $rootScope.menus = snapshots.menus;
      $rootScope.page = snapshots.page;
      $rootScope.sharedContent = snapshots.sharedContent;

      // We also want to reset the shared content to delete check
      $rootScope.sharedContentToCheckDelete = [];
    });

    $scope.$onRootScope('cms.revertToPublished', function(event, url) {
      api.staging.delete({key: url}).then(function(response) {
        console.log('Deleting autosave data for ' + url, response);
      }, function(err) {
        console.log('Trouble deleting autosave data for ' + url, err);
      });
    });

    // ### Image selector
    // This is not the best place for this modal controller, but it handles opening and getting the images for the inline-text editor.
    // This controls the image selector modal that opens with the inline text editor
    $rootScope.openImageModal = function(config, callback) {
      var modalInstance = $modal.open({
        templateUrl: require('./findImage.modal.jade'),
        controller: function($scope, $modalInstance, config) {
          $scope.config = config;

          config.allOperations = true;
          $scope.imageSelectorApi = {};
          var areChanges;

          if($scope.config.multiple) {
            $scope.instructions = 'Choose Images';
          } else {
            $scope.instructions = 'Choose Image';
          }


          $modalInstance.opened.then(function() {
            $timeout(function() {
              $scope.imageSelectorApi.getAlreadySelected($scope.config.alreadySelected);
            }, 0, true);

          });
          // $scope.allOperations = false;
          $scope.chooseImages = function() {
            areChanges = true;
            var selectedImages = $scope.imageSelectorApi.getSelectedImages();
            $modalInstance.close(selectedImages);
          };
        },
        size: 'lg',
        resolve: {
          config: function() {
            return config || {};
          }
        }
      });

      modalInstance.result.then(function (selectedImages) {
        if(callback) {
          callback(selectedImages)
        }
      });
    };

    // ### Publish Gallery Selection
    // In meanbase, a gallery is simply a group of images. When images a selected with the image-selector and chosen, we need a way of saving that selection when the user hits save. This takes the images that were selected and the name of the slug (collection) and saves that slug to those images on the server.
    $rootScope.publishGallerySelection = function(slug, gallerySelection) {
      var imageArray = [];

      // Get the visibile images' urls
      for (var i = 0; i < gallerySelection.length; i++) {
        gallerySelection[i].galleries.push(slug);
        imageArray.push(gallerySelection[i].url);
      };

      // Remove this gallery slug from all the images that use it and then add it back to the appropriate images
      // This strategy is quicker than checking which ones were added and removed
      api.media.update({galleries: slug}, { $pull: {galleries: slug} }).then(function() {
        if(imageArray.length < 1) return false;
        api.media.update({ url: {$in: imageArray } }, { $push: {galleries: slug} });
      });
    };


    $scope.openLinkModal = function(belongsTo, property) {
      if(!belongsTo || !property) { return false; }
      var modalInstance = $modal.open({
        templateUrl: require('./editLink.modal.jade'),
        controller: linkModalController,
        size: 'md',
        resolve: {
          link: function() {
            return belongsTo[property];
          },
        }
      });
    };

    function linkModalController($scope, $modalInstance, link) {
      api.pages.find({}).then(function(response) {
        $scope.pages = response;
      });

      $scope.link = angular.copy(link);

      $scope.updateTarget = function(url) {
        if(url.indexOf('http://') > -1 || url.indexOf('https://') > -1) {
          if(!$scope.link.target) {
            $scope.link.target = '_blank';
          }
        } else {
          $scope.link.target = "";
        }
      };

      $scope.saveLink = function(editLinkForm) {

        // We want to make sure the changes are valid before submitting it
        if(editLinkForm.$valid) {
          // link is the menu that was passed in (the actual menu we want to modify). $scope.link is the object that's being edited in the modal.
          link.title = $scope.link.title || link.title;
          link.url = $scope.link.url || link.url;
          link.classes = $scope.link.classes;
          link.target = $scope.link.target;
          $modalInstance.dismiss();
        }
      };
    }

    function iconModalController($scope, $modalInstance, icon) {
      api.pages.find({}).then(function(response) {
        $scope.pages = response;
      });

      $scope.icon = angular.copy(icon);

      $scope.updateTarget = function(url) {
        if(url && url.indexOf('http://') > -1 || url.indexOf('https://') > -1) {
          if(!$scope.icon.target) {
            $scope.icon.target = '_blank';
          }
        } else {
          $scope.icon.target = "";
        }
      };


      $scope.hasContent = true;
      $scope.checkHasContent = function() {
        $timeout(function() {
          $timeout(function() {
            var testIcon = $('#test-icon');
            $scope.hasContent = getComputedStyle(testIcon[0], ':before').content;
            if(!$scope.hasContent && $scope.icon.classes) {
              $scope.hasContentError = "Please choose a class name that will make the icon appear or erase all the class names.";
            } else {
              $scope.hasContentError = '';
            }
          });
        });
      };

      $scope.saveIcon = function(editIconForm) {

        // We want to make sure the changes are valid before submitting it
        if(editIconForm.$valid && ($scope.hasContent || !$scope.icon.classes)) {
          // icon is the menu that was passed in (the actual menu we want to modify). $scope.icon is the object that's being edited in the modal.
          icon.title = $scope.icon.title || icon.title;
          icon.url = $scope.icon.url || icon.url;
          icon.classes = $scope.icon.classes;
          icon.target = $scope.icon.target;
          $modalInstance.dismiss();
        }
      };
    }

    // ### Removing extensions
    // This may not be the best location for this function, but it handles removing extensions when the user clicks the delete **delete** button on an extension
    // Removes an extension from an extensible area
    $scope.removeThisExtension = function(extension) {

      // If `sharedContentToCheckDelete` does not already contain this extension `contentName` we want to add it to the array.
      if(extension.contentName && $scope.sharedContentToCheckDelete.indexOf(extension.contentName) === -1) {
        $scope.sharedContentToCheckDelete.push(extension.contentName);
      }

      // Since we are deleting an extension we want to make sure they are in the correct order in the array so we don't delete the wrong extension
      $rootScope.page.extensions = helpers.updatePositionData($rootScope.page.extensions);

      // Make sure we are deleting an existing extension and then remove it from $rootScope.page.extensions
      if(extension && extension.group && extension.position !== undefined) {
        $rootScope.page.extensions[extension.group].splice(extension.position, 1);
      }
    };

    // ### Create new menu item
    // This may not be the best location for this controller, but it handles opening the modal to create a new menu item
    $scope.createMenuItem = function(group) {
      if(!$rootScope.menus[group]) {
        $rootScope.menus[group] = [];
      }
      var modalInstance = $modal.open({
        templateUrl: require('./editmenu.modal.jade'),
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


    // ### The Menu Modal Controller
    // @ngInject
    function menuModal($scope, $modalInstance, menuItem, isNewMenu) {

      api.pages.find({$select: ['url']}).then(function(response) {
        $scope.pages = response;
      });

      // This is a little distinguishing check to see if this modal was opened from an existing menu item (to edit it) or was opened from the createMenuItem function to create a new menu from scratch
      $scope.isNewMenu = isNewMenu;

      // Since we don't want to be affecting our actual menu until we hit save we must make a copy of it.
      $scope.menuItem = angular.copy(menuItem);

      $scope.newMenuItem = function(editingMenuForm) {
        // We want to make sure the data is valid before submitting it
        if(editingMenuForm.$valid) {
          if($scope.menuItem._id) { delete $scope.menuItem._id; }

          // If this menu group doesn't exist create it
          if(!$rootScope.menus[$scope.menuItem.group]) {
            $rootScope.menus[$scope.menuItem.group] = [];
          }

          // Add the menu item to the end of it's group's list
          $scope.menuItem.position = $rootScope.menus[$scope.menuItem.group].length;
          $rootScope.menus[$scope.menuItem.group].push($scope.menuItem);
          $modalInstance.dismiss();
        }
      };

      $scope.updateTarget = function(url) {
        if(url.indexOf('http://') > -1 || url.indexOf('https://') > -1) {
          if(!$scope.menuItem.target) {
            $scope.menuItem.target = '_blank';
          }
        } else {
          $scope.menuItem.target = "";
        }
      };

      $scope.editMenuItem = function(editingMenuForm) {
        // We want to make sure the changes are valid before submitting it
        if(editingMenuForm.$valid) {
          // menuItem is the menu that was passed in (the actual menu we want to modify). $scope.menuItem is the object that's being edited in the modal.
          menuItem.title = $scope.menuItem.title || menuItem.title;
          menuItem.url = $scope.menuItem.url || menuItem.url;
          menuItem.classes = $scope.menuItem.classes;
          menuItem.target = $scope.menuItem.target;
          $modalInstance.dismiss();
        }
      };

      $scope.removeMenuItem = function() {
        // Update the position data so that we are sure we are deleting the correct menu item
        $rootScope.menus = helpers.updatePositionData($rootScope.menus);

        $rootScope.menus[menuItem.group].splice(menuItem.position, 1);
        $modalInstance.dismiss();
      };
    }

  }
})();
