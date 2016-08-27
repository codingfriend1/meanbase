(function(){
	angular.module('meanbaseApp').controller('cms.headbar.controller', HeadbarController);

	// @ngInject
	function HeadbarController($scope, $rootScope, endpoints, $state, $location, $modal, $timeout, helpers, toastr, api) {

    var msTillAutoSaveMenus = 200;
    var msTillAutoSavePage = 200;

    if(!$rootScope.isLoggedIn) { return false; }

		$scope.themeTemplates = Object.getOwnPropertyNames(window.meanbaseGlobals.themeTemplates);
		var self = this;

		//  ###editMode
		// The big daddy power house **editMode**! This variable is used all throughout the app to enable edits to be made on the content. We don't want this to be true until we hit the edit button in the admin top menu.
		$rootScope.editMode = false;

    $rootScope.previousEditUrl = localStorage.getItem('previousEditUrl');

		// Used to disable navigation while in edit mode
		$scope.ableToNavigate = true;

		// Prevent the user from navigating away while in edit mode until they save or discard their changes.
		$scope.$onRootScope('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
		  // if (!$scope.ableToNavigate) {
		  //   event.preventDefault();
        self.finishEdits();
		    // toastr.info('Please save or discard your changes before navigating.');
		  // }
		});

    var pageWatcher, menusWatcher, autoSaveSessionSnapshot = {};
		// Toggles the all powerful editMode, emits an event so the rest of the app can make changes
		this.toggleEdit = function(boole) {
			if(boole !== undefined) { $rootScope.editMode = boole; } else { $rootScope.editMode = !$rootScope.editMode; }

      if($rootScope.editMode) {

        api.staging.find({key: $rootScope.page.url}).then(function(response) {
          if(response[0] && response[0].data) {
            autoSaveSessionSnapshot.page = angular.copy(response[0].data);
          } else {
            autoSaveSessionSnapshot.page = angular.copy(_.pick($rootScope.page, [
              'title',
              'content',
              'images',
              'extensions',
              'lists',
              'grid',
              'links'
            ]));
          }
          $rootScope.$emit('cms.takePageSnapshot', $rootScope.editMode);
          if(response[0] && response[0].data) {
            $rootScope.page.title = angular.copy(response[0].data.title);
            $rootScope.page.content = angular.copy(response[0].data.content);
            $rootScope.page.images = angular.copy(response[0].data.images);
            $rootScope.page.extensions = angular.copy(response[0].data.extensions);
            $rootScope.page.lists = angular.copy(response[0].data.lists);
            $rootScope.page.grid = angular.copy(response[0].data.grid);
            $rootScope.page.links = angular.copy(response[0].data.links);
          }
          pageWatcher = $scope.$watch('page', _.debounce(function(newValue, oldValue) {
            if(typeof newValue !== oldValue) {
              $rootScope.$emit('cms.autoSave');
            }

          }, msTillAutoSavePage), true);
        }, function(err) {
          toastr.error('Sorry but we could not fetch the latest auto saved data');
          $rootScope.$emit('cms.editMode', $rootScope.editMode);
        });

        api.staging.find({key: 'menus'}).then(function(response) {
          if(response[0] && response[0].data) {
            autoSaveSessionSnapshot.menus = response[0].data;
            $rootScope.$emit('cms.takeMenusSnapshot', $rootScope.editMode);
            $rootScope.menus = response[0].data;
          } else {
            autoSaveSessionSnapshot.menus = angular.copy($rootScope.menus);
          }
          menusWatcher = $scope.$watch('menus', _.debounce(function(newValue) {
            if(typeof newValue !== undefined) {
              $rootScope.$emit('cms.menusAutoSave');
            }
          }, msTillAutoSaveMenus), true);

          $rootScope.$emit('cms.editMode', $rootScope.editMode);
        }, function(err) {
          toastr.error('Sorry but we could not fetch the menus autosave data.');
        });

        // toastr.warning("While in edit mode you won't be able to visit links or navigate to other pages. Make sure to save your work before you leave the page.")
      }

			// We want to disable navigation while in edit mode, so the user doesn't accidently click away and loose their changes
			$scope.ableToNavigate = !$rootScope.editMode;
		};

    $scope.$onRootScope('cms.stopPageListener', function() {
      if(pageWatcher) {
        pageWatcher();
      }
      if(menusWatcher) {
        menusWatcher();
      }
    });

		// Creates a new page and prompts the user for a url
		this.createPage = function(e) {
			// Prepare new page default text based on url
			// var url = prompt('url');
      var self = this;
      var modalInstance = $modal.open({
		    templateUrl: require('./choose-link.modal.jade'),
		    controller: function($scope, $modalInstance) {

          $scope.url = '';

          $scope.choose = function(url) {
            if(!url) { return false; }
            api.pages.find({url: url}).then(function(response) {
              if(response.length > 0) {
                toastr.warning('Sorry but a page with that link name already exists.')
              } else {
                $modalInstance.close(url);
              }
            }, function(err) {
              $modalInstance.dismiss('cancel');
              toastr.warning("Sorry but there was an error and that page could not be created.");
            });

          };

		    	$scope.cancel = function () {
		    	  $modalInstance.dismiss('cancel');
		    	};
		    },
		    size: 'sm'
		  });

      modalInstance.result.then(function (url) {
        if(url === null || url === undefined) { return false; }

  			self.toggleEdit(false);
  			// Prepares some default values for the page
  			prepareDefaultPage(url, e);
      });
		};

		// This opens the modal for changing page properties such as tabTitle and page description.
		this.editPageModal = function() {
		  var modalInstance = $modal.open({
		    templateUrl: require('./editmodal.modal.jade'),
		    controller: function($scope, $modalInstance) {
          $scope.templateOptions = [];

          api.themes.find({active: true, $select: ['templates']}).then(function(response) {
            $scope.templateOptions = Object.keys(response[0].templates);
          }, function(err) {
            toastr.error("Sorry but something is wrong with the server and you can't choose templates for your pages.")
          });

		    	$scope.cancel = function () {
		    	  $modalInstance.dismiss('cancel');
		    	};
		    },
		    size: 'md'
		  });
		};

		this.publishChanges = function() {
			this.toggleEdit();

			// This event calls the edit directive to save it's values and the main.controller to erase and rewrite all the menus
      localStorage.setItem('previousEditUrl', $rootScope.page.url);
      $rootScope.previousEditUrl = $rootScope.page.url;
      $rootScope.$emit('cms.stopPageListener');
			$rootScope.$emit('cms.publishChanges', $rootScope.page);
		};

    this.finishEdits = function() {
      this.toggleEdit();
      $rootScope.$emit('cms.stopPageListener');
      $rootScope.$emit('cms.returnToSnapshot');
      $rootScope.$emit('cms.editMode', $rootScope.editMode);
    };

		this.discardChanges = function() {
      $rootScope.$emit('cms.stopPageListener');
      $rootScope.$emit('cms.menusAutoSave', autoSaveSessionSnapshot.menus);

      $rootScope.$emit('cms.autoSave', autoSaveSessionSnapshot.page);
			this.toggleEdit();
      autoSaveSessionSnapshot = {};
      $timeout(function() {
        $rootScope.$emit('cms.returnToSnapshot');

        $rootScope.$emit('cms.editMode', $rootScope.editMode);
  			// Event event that alerts all editable parts to discard those changes including the edit directive
  			toastr.warning('Changes have been discarded');
      });
		};

		this.deletePage = function() {
			this.toggleEdit();
			if(!$rootScope.page._id) { return false; }

			// Delete page
			api.pages.delete({_id: $rootScope.page._id}).then(function() {
				// Delete menu with the same url
				var url;
				if($rootScope.page.url.charAt(0) !== '/') { url = '/' + $rootScope.page.url; } else { url = $rootScope.page.url; }

        api.staging.delete({key: url}).then(function(response) {
          console.log('Deleting autosave data for that page', response);
        }, function(err) {
          console.log('Could not delete auto save data for that page', err);
        });
				api.menus.delete({url: url}).finally(function() {
					// Replenish menus
					api.menus.find({}).then(function(response) {
						$rootScope.menus = response;
					});
				});

				$location.url('/');
			});
		};

		this.togglePublishPage = function() {
			if(!$rootScope.page._id) { return false; }
			$rootScope.page.published = !$rootScope.page.published;
			var pageUrl = $rootScope.page.url;
			if($rootScope.page.url.charAt(0) !== '/') { pageUrl = '/' + pageUrl; }
			helpers.loopThroughMenus(function(item) {
				if(item.url === pageUrl) {
					item.published = $rootScope.page.published;
				}
			});
			if($rootScope.page.published) {
				toastr.clear();
				toastr.success('Visitors can now see this page.')
			} else {
				toastr.warning('Only users with permission to edit pages can see this page.');
			}

      if($rootScope.page.published) {
        $rootScope.page.publishedOn = Date.now();
      }

			this.toggleEdit();
			$rootScope.$emit('cms.saveEdits', $rootScope.page);
		};

		this.currentScreenshot = null;

		this.showScreenshot = function(template) {
			if(!window.meanbaseGlobals.themeTemplatePaths[template]) { return false; }
			var screenshot = window.meanbaseGlobals.themeTemplatePaths[template].screenshot;
			if(screenshot) {
				this.currentScreenshot = document.createElement("div");
				this.currentScreenshot.classList.add('template-screenshot-backdrop');
				var image = new Image();
				image.src = screenshot;
				image.onerror = function() {
					self.hideScreenshot(template);
				};
				image.alt = template + ' screenshot';
				image.classList.add('template-screenshot');
				this.currentScreenshot.appendChild(image);
				document.body.appendChild(this.currentScreenshot);
			}
		};

		this.hideScreenshot = function(template) {
			if(this.currentScreenshot) {
				document.body.removeChild(this.currentScreenshot);
			}
		};

		function prepareDefaultPage(url, e) {
			// Prepare page default text based on url
			url = url.replace(/[ ]/g, "-");
			var menuTitle = url.replace(/[_-]/g, " ");
			var placeholderTitle = menuTitle.replace(/(^| )(\w)/g, function(x) {
				return x.toUpperCase();
			});
			if((url.charAt(0) == '/')) {
				placeholderTitle = url.substr(1);
			} else {
				url = '/' + url;
			}

			// Prepare the template
			var newPage = {
        author: $scope.currentUser.name,
        editability: $scope.currentUser.role,
        visibility: $scope.currentUser.role,
        url: url,
        tabTitle: placeholderTitle,
        template: $(e.currentTarget).text().replace(' template', ''),
        title: placeholderTitle,
        summary: "Summary of " + placeholderTitle + ".",
        description: "The description that will show up on facebook feeds and google searches.",
        updated: Date.now()
			};

      if(!$scope.menus.main) {
        $scope.menus.main = [];
      }

			var newMenu = {
				title: menuTitle,
				url: url,
				location: 'main',
				position: $scope.menus.main.length,
				classes: '',
				target: '',
				published: false
			};

			// Save new page to database and reroute to it's new url
			api.pages.create(newPage).then(function(response) {
				// Save new menu to database
				api.menus.create(newMenu).then(function(response) {
					$scope.menus.main.push(newMenu);
          localStorage.setItem('previousEditUrl', response.url);
          $rootScope.previousEditUrl = response.url;
				}).catch(function(err) {
				  console.log("err", err);
				});
				$timeout(function() {
					$location.url(url);
				}, 0, false);
			});
		}
	}
})();
