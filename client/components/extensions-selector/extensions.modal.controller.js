angular.module('meanbaseApp').controller('extensions.modal.controller', function($scope, endpoints, $modalInstance, $timeout) {
	$scope.chosenContent = [];

	$scope.extensionsFilter = '';
	$scope.filterExtensions = function(extension) {
		return (extension.name + extension.html).toLowerCase().indexOf($scope.extensionsFilter.toLowerCase()) >= 0;
	};

	$scope.chooseExtensions = function() {
		if($scope.chosenContent.length < 1) { return false; }
		$modalInstance.close($scope.chosenContent);
	};

	$scope.toggleChecked = function(content) {
		if(!content) { return false; }
		if(content.type) {
			for (var i = 0; i < $scope.extensions.length; i++) {
				if($scope.extensions[i].name === content.type) {
					var extension = $scope.extensions[i];
					content = angular.extend(extension, content);
				}
			};
		}
		if($scope.chosenContent.indexOf(content) > -1) {
			$scope.chosenContent.splice($scope.chosenContent.indexOf(content), 1);
		} else {
			$scope.chosenContent.push(content);
		}
	};


});
