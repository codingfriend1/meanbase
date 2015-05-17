angular.module('meanbaseApp').controller('extensiondata.modal.controller', function($scope, endpoints, $modalInstance, extension, $rootScope, helpers) {
	$scope.chosenSource;
	var extensiondata = new endpoints('extensiondata');

	

	// If extension already is using a sharedSource check it if available
	for(var idx = 0; idx < $rootScope.dataSources.length; idx++) {
		if(extension.sharedSource === $rootScope.dataSources[idx].name) {
			$scope.chosenSource = $rootScope.dataSources[idx];
		}
	}

	$scope.newSourceName = '';

	$scope.newSource = function() {
		var pattern = new RegExp("[a-z0-9_-]");
		if(!pattern.test($scope.newSourceName)) { return false; }
		for(var idx = 0; idx < $rootScope.dataSources.length; idx++) {
			if($rootScope.dataSources[idx].name === $scope.newSourceName) {
				return false;
			}
		}
		var newSource = {
			name: angular.copy($scope.newSourceName),
			data: null
		};

		$rootScope.dataSources.push(newSource);
		$rootScope.extensiondata[$scope.newSourceName] = newSource;
		$scope.chosenSource = newSource;
	};

	$scope.sourceFilter = '';
	$scope.filterSource = function(dataSource) {
		return (dataSource.name).toLowerCase().indexOf($scope.sourceFilter.toLowerCase()) >= 0;
	};

	$scope.chooseSource = function() {
		$modalInstance.close($scope.chosenSource);
	};

	$scope.toggleChecked = function(source) {
		if(!source) { return false; }
		if($scope.chosenSource === source) {
			$scope.chosenSource = null;
		} else {
			$scope.chosenSource = source;
		}
	};

	$scope.deleteSource = function(source) {
		var confirm = window.confirm('Are you sure you want to delete ' + source.name + '?');

		if(confirm) {

			helpers.loopThroughPageExtensions(function(currentExtension) {
				if(currentExtension.sharedSource === source.name) {
				  currentExtension.sharedSource = null;
				  currentExtension.useShared = false;
				}
			});

			if($scope.chosenSource === source) {
				$scope.chosenSource = undefined;
			}

			delete $rootScope.extensiondata[source.name];

			$rootScope.extensiondataToDelete.push(source.name);
			var sourcePosition = $rootScope.dataSources.indexOf(source);
			if(sourcePosition > -1) {
				$rootScope.dataSources.splice(sourcePosition, 1);
			}
		}
	};

});