angular.module('meanbaseApp').controller('list.modal.controller', function($scope, endpoints, $modalInstance, $timeout) {
	$scope.chosenList = [];

	$scope.searchList = {};
	$scope.findShared = '';

	$scope.chooseList = function() {
		if($scope.chosenList.length < 1) { return false; }
		$modalInstance.close($scope.chosenList);
	};

	// Declaring event listeners is generally bad practice in controllers, but in this case the listener needs to be created and deleted with the controller and must be applied to the document
	document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode === 13) { //13 === enter key
        $scope.chooseList();
    }
	};

	$scope.toggleChecked = function(item, $event) {
		if(!item) { return false; }

    $scope.chosenList.push(item);
    angular.element($event.currentTarget).find('.checkbox').addClass('fa-check').removeClass('fa-square-o');
	};

	// Cleans up document enter listener
	$scope.$on('$destroy', function() {
		document.onkeydown = null;
	});
});
