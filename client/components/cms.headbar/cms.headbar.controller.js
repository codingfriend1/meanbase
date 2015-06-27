(function(){
	angular.module('meanbaseApp').controller('cms.headbar.controller', HeadbarController);

	// @ngInject
	function HeadbarController($scope, $rootScope, endpoints, $state, $location, $modal, $timeout, helpers, toastr) {
		$scope.themeTemplates = Object.getOwnPropertyNames(window.meanbaseGlobals.themeTemplates);
		var self = this;
		var server = {
			menus: new endpoints('menus'),
			page: new endpoints('pages')
		};

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

			// We want to disable navigation while in edit mode, so the user doesn't accidently click away and loose their changes
			$scope.ableToNavigate = !$rootScope.editMode;
			console.log("toggleEdit $scope.ableToNavigate", $scope.ableToNavigate);
		};

		// Creates a new page and prompts the user for a url
		this.createPage = function(e) {
			// Prepare new page default text based on url
			var url = prompt('url');
			if(url === null) { return false; }
			this.toggleEdit(false);
			// Prepares some default values for the page
			prepareDefaultPage(url, e);
		};

		// This opens the modal for changing page properties such as tabTitle and page description.
		this.editPageModal = function() {
		  var modalInstance = $modal.open({
		    templateUrl: 'editmodal.modal.html',
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
			server.page.delete({_id: $rootScope.page._id}).then(function() {
				// Delete menu with the same url
				var url;
				if($rootScope.page.url.charAt(0) !== '/') { url = '/' + $rootScope.page.url; } else { url = $rootScope.page.url; }
				server.menus.delete({url: url}).finally(function() {
					// Replenish menus
					server.menus.find({}).success(function(response) {
						$rootScope.menus = response;
					});
				});

				$location.url('/');
			});
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
			document.body.removeChild(this.currentScreenshot);
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
        template: $(e.currentTarget).text(),
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
				target: ''
			};

			// Save new page to database and reroute to it's new url
			server.page.create(newPage).then(function(response) {
				// Save new menu to database
				server.menus.create(newMenu).then(function(response) {
					$scope.menus.main.push(newMenu);
				});
				$timeout(function() {
					$location.url(url);
				}, 0, false);
			});
		}
	}
})();