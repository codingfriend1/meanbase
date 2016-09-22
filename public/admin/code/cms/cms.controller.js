angular.module('meanbaseApp').controller('cmsCtrl', function($scope, Auth, $rootScope, endpoints, api, $state, $timeout) {

	var states = $state.get();
	$scope.cmsStates = [];
	$scope.pageTitle = 'Manage Site';
  $rootScope.searchText = '';

  $scope.goToTab = function(tab) {
    $timeout(function() {
      $scope.tabs.forEach(function(tab) {
        tab.active = false;
      });

      tab.active = true;
      $timeout(function() {
        $('.mdl-js-textfield').each(function(index, item) {
          item.MaterialTextfield.checkDirty()
        })
      });
    });
  };

  if(Auth.isLoggedIn()) {
    for (var i = 0; i < states.length; i++) {
   		if(states[i].name.indexOf('cms.') > -1) {
   			var state = angular.copy(states[i]);
  			if(!state.hasPermission) {
  				if(!state.authenticate || (state.authenticate && $rootScope.currentUser)) {
  					state.userHasPermission = true;
  				} else {
  					state.userHasPermission = false;
  				}
  			} else if(!$rootScope.currentUser.permissions || $rootScope.currentUser.permissions.length === 0) {
   				state.userHasPermission = false;
   			} else {
   				state.userHasPermission = $rootScope.currentUser.permissions.indexOf(state.hasPermission) > -1 || $rootScope.currentUser.permissions.indexOf('allPrivilages') > -1;
   			}
   			state.friendlyName = state.url.replace('/', '');
   			$scope.cmsStates.push(state);
   		}
   	}
  }


 $scope.goToApp = function() {
   window.location.href = '/';
 };


	$rootScope.currentUser = Auth.getCurrentUser();

	$scope.toggleMenu = function() {
		$scope.menuOpen = !$scope.menuOpen;
	};

	if($scope.$parent.pageTitle) {
	  document.title = $scope.$parent.pageTitle;
	}

	$scope.isBanned = function(identifier) {
		if(typeof identifier === 'object' || identifier) {
			api.bannedMembers.find(identifier).then(function(response) {
			}, function(err) {
			  console.log('promise rejected', err);
			});;
		}
	};


	$scope.ban = function(comment) {
		if(comment && comment.ip && comment.email) {
			api.bannedMembers.create({ip: comment.ip, email: comment.email}).then(function(response) {
				console.log("response", response);
			});
		}
	};
});
