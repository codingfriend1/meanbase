(function(){
	angular.module('meanbaseApp').controller('cms.headbar.controller', HeadbarController);

	// @ngInject
	function HeadbarController($scope, $rootScope, endpoints, $state, $location, $modal, $timeout, helpers, toastr, api) {

    if(!$rootScope.isLoggedIn) { return false; }

		$scope.themeTemplates = Object.getOwnPropertyNames(window.meanbaseGlobals.themeTemplates);
		var self = this;

		//  ###editMode
		// The big daddy power house **editMode**! This variable is used all throughout the app to enable edits to be made on the content. We don't want this to be true until we hit the edit button in the admin top menu.
		$rootScope.editMode = false;

		// Used to disable navigation while in edit mode
		$scope.ableToNavigate = true;

		// Prevent the user from navigating away while in edit mode until they save or discard their changes.
		$scope.$onRootScope('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
		  if (!$scope.ableToNavigate) {
		    event.preventDefault();
		    toastr.info('Please save or discard your changes before navigating.');
		  }
		});

		// Toggles the all powerful editMode, emits an event so the rest of the app can make changes
		this.toggleEdit = function(boole) {
			if(boole !== undefined) { $rootScope.editMode = boole; } else { $rootScope.editMode = !$rootScope.editMode; }
			$rootScope.$emit('cms.editMode', $rootScope.editMode);

      if($rootScope.editMode) {
        toastr.warning("While in edit mode you won't be able to visit links or navigate to other pages. Make sure to save your work before you leave the page.")
      }

			// We want to disable navigation while in edit mode, so the user doesn't accidently click away and loose their changes
			$scope.ableToNavigate = !$rootScope.editMode;
		};

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
              console.log("response", response);
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
		    	$scope.cancel = function () {
		    	  $modalInstance.dismiss('cancel');
		    	};
		    },
		    size: 'md'
		  });
		};

		this.saveChanges = function() {
			this.toggleEdit();
			// This event calls the edit directive to save it's values and the main.controller to erase and rewrite all the menus
			$rootScope.$emit('cms.saveEdits', $rootScope.page);
		};

		this.discardChanges = function() {
			this.toggleEdit();

			// Event event that alerts all editable parts to discard those changes including the edit directive
			$rootScope.$emit('cms.discardEdits');
		};

		this.deletePage = function() {
			this.toggleEdit();
			if(!$rootScope.page._id) { return false; }

			// Delete page
			api.pages.delete({_id: $rootScope.page._id}).then(function() {
				// Delete menu with the same url
				var url;
				if($rootScope.page.url.charAt(0) !== '/') { url = '/' + $rootScope.page.url; } else { url = $rootScope.page.url; }
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
          console.log("response", response);
					$scope.menus.main.push(newMenu);
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
