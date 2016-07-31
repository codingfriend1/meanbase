angular.module('meanbaseApp').controller('extensions.modal.controller', function($scope, endpoints, $modalInstance, $timeout) {
	$scope.chosenContent = [];

	$scope.searchExtensions = {};
	$scope.findShared = '';

	$scope.chooseExtensions = function() {
		if($scope.chosenContent.length < 1) { return false; }
		$modalInstance.close($scope.chosenContent);
	};

	// Declaring event listeners is generally bad practice in controllers, but in this case the listener needs to be created and deleted with the controller and must be applied to the document
	document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode === 13) { //13 === enter key
        $scope.chooseExtensions();
    }
	};

	$scope.toggleChecked = function(content, $event) {
		if(!content) { return false; }

		// Check if the object is already in chosenContent and if so grab it's index (because we are going to remove it)
		var alreadySelected = -1;
		for (var i = 0; i < $scope.chosenContent.length; i++) {
			if($scope.chosenContent[i]._id === content._id) {
				alreadySelected = i;
			}
		};
		if(alreadySelected > -1) {
			$scope.chosenContent.splice(alreadySelected, 1);
			angular.element($event.currentTarget).find('.checkbox').removeClass('fa-check').addClass('fa-square-o');
		} else {
			var content2;
			if(content.type) {
				for (i = 0; i < $scope.extensions.length; i++) {
					if($scope.extensions[i].name === content.type) {
						var extension = angular.copy($scope.extensions[i]);
						content = angular.copy(content);
						extension.contentName = content.contentName;
						extension.name = content.type;
						content2 = angular.extend(extension, content);
					}
				};
			} else {
				content2 = content;
			}
			if(content2) {
				content = content2;
				$scope.chosenContent.push(content);
				angular.element($event.currentTarget).find('.checkbox').addClass('fa-check').removeClass('fa-square-o');
			}
		}
	};

	// Cleans up document enter listener
	$scope.$on('$destroy', function() {
		document.onkeydown = null;
	});
});
