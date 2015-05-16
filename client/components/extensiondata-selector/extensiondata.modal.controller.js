angular.module('meanbaseApp').controller('extensiondata.modal.controller', function($scope, endpoints, $modalInstance, extension) {
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

});