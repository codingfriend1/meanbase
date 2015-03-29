(function(){
	angular.module('meanbaseApp').controller('cms.headbar.controller', HeadbarController);

	// @ngInject
	function HeadbarController($scope, $rootScope, endpoints, $state, $location, $modal, $timeout) {
		$scope.themeTemplates = Object.getOwnPropertyNames(window.meanbaseGlobals.themeTemplates);

		var endpoints = {
			menus: new endpoints('menus'),
			page: new endpoints('pages')
		};

		this.toggleEdit = function() {
			$rootScope.editMode = !$rootScope.editMode;
		};

		this.createPage = function(e) {
			// Prepare new page default text based on url
			var url = prompt('url (no spaces)');
			if(url === null) { return false; }
			$rootScope.editMode = false;
			prepareDefaultPage(url, e);
		};

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
			if(!$scope.page._id) { return false; }
			$rootScope.$emit('cms.saveEdits');

			//We need to wait for the "edit" directive to store changes in page.content
			$timeout(function(){
				endpoints.page.update({_id: $scope.page._id}, $scope.page);
			});
		};

		this.discardChanges = function() {
			this.toggleEdit();

			// Event event that alerts all editable parts to discard those changes including the edit directive
			$rootScope.$emit('cms.discardEdits');
		};

		this.deletePage = function() {
			this.toggleEdit();
			if(!$scope.page._id) { return false; }

			// Delete page
			endpoints.page.delete({_id: $scope.page._id}).then(function() {

				// Delete menu with same url
				endpoints.menus.delete({url: $scope.page.url}).then(function() {
					$location.url('/');

					// Replenish menus
					endpoints.menus.find({}).then(function(response) {
						$rootScope.menus = response.data;
					});
				});
			});
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

			// Save new menu to database
			endpoints.menus.create(newMenu).then(function(response) {
				$scope.menus.main.push(newMenu);
			});

			// Save new page to database and reroute to it's new url
			endpoints.page.create(newPage).then(function(response) {
				$location.url(url);
			});
		}
	}
})();