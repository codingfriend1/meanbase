angular.module('meanbaseApp').controller('extensions.modal.controller', function($scope, endpoints, $modalInstance) {
	$scope.chosenExtensions = [];
	var extensions = new endpoints('extension');

	extensions.find({}).success(function(res) {
		$scope.extensions = res;
	});

	$scope.extensionsFilter = '';
	$scope.filterExtensions = function(extension) {
		return (extension.name + extension.html).toLowerCase().indexOf($scope.extensionsFilter.toLowerCase()) >= 0;
	};

	$scope.chooseExtensions = function() {
		if($scope.chosenExtensions.length < 1) { return false; }
		$modalInstance.close($scope.chosenExtensions);
	};

	$scope.toggleChecked = function(extension) {
		if(!extension) { return false; }
		if($scope.chosenExtensions.indexOf(extension) > -1) {
			$scope.chosenExtensions.splice($scope.chosenExtensions.indexOf(extension), 1);
		} else {
			$scope.chosenExtensions.push(extension);
		}
	};


});
