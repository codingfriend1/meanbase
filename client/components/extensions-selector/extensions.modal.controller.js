angular.module('meanbaseApp').controller('extensions.modal.controller', function($scope, endpoints, $modalInstance) {
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
			content = angular.merge($scope.extensions[content.type], content);
		}
		if($scope.chosenContent.indexOf(content) > -1) {
			$scope.chosenContent.splice($scope.chosenContent.indexOf(content), 1);
		} else {
			$scope.chosenContent.push(content);
		}
	};


});
