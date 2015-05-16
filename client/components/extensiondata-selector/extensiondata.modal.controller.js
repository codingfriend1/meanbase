angular.module('meanbaseApp').controller('extensiondata.modal.controller', function($scope, endpoints, $modalInstance, extension, $rootScope) {
	$scope.chosenSource;
	var extensiondata = new endpoints('extensiondata');

	extensiondata.find({}).success(function(res) {
		$scope.dataSources = res;
		// If extension already is using a sharedSource check it if available
		for(var idx = 0; idx < $scope.dataSources.length; idx++) {
			if(extension.sharedSource === $scope.dataSources[idx].name) {
				$scope.chosenSource = $scope.dataSources[idx];
			}
		}
	});

	$scope.newSourceName = '';

	$scope.newSource = function() {
		var pattern = new RegExp("[a-z0-9_-]");
		if(!pattern.test($scope.newSourceName)) { return false; }
		for(var idx = 0; idx < $scope.dataSources.length; idx++) {
			if($scope.dataSources[idx].name === $scope.newSourceName) {
				return false;
			}
		}
		$scope.dataSources.push({
			name: angular.copy($scope.newSourceName),
			data: null
		});
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
			if(extension.sharedSource === source.name) {
				extension.sharedSource = null;
				extension.useShared = false;
			}
			if($scope.chosenSource === source) {
				$scope.chosenSource = undefined;
			}
			
			delete $rootScope.extensiondata[source.name];
			var sourcePosition = $scope.dataSources.indexOf(source);
			if(sourcePosition > -1) {
				$scope.dataSources.splice(sourcePosition, 1);
			}
		}
	};

});