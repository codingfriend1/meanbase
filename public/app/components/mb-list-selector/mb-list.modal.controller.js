angular.module('meanbaseApp').controller('list.modal.controller', function($scope, endpoints, $modalInstance, $timeout, toastr, api, group, $rootScope) {
	$scope.chosenList = [];

	$scope.searchList = {};
	$scope.findShared = '';

  $scope.extensionKeys = []

	$scope.chooseExtension = async function(extensionKey, existingExtensionKey) {

    let chosenExtension

    for (var i = 0; i < $scope.extensionOptions.length; i++) {
      if($scope.extensionOptions[i].selected) {
        chosenExtension = $scope.extensionOptions[i]
        break
      }
    }

    if(chosenExtension) {
      chosenExtension.key = extensionKey
      if(extensionKey) {
        let foundKey = await api.custom.find({belongsTo: chosenExtension.label, key: extensionKey})
        foundKey = foundKey[0]
        if(foundKey) {
          toastr.warning('That key for this extension is already taken. Please choose a different key name.')
          return false
        }
      }

      if(existingExtensionKey) {
        extensionKey = existingExtensionKey.key
        chosenExtension.data = existingExtensionKey.value
      }

      if(!extensionKey) {
        let num = !$rootScope.page.lists[group]? 1: $rootScope.page.lists[group].length + 1
        extensionKey = `${chosenExtension.label} ${group} ${num}`
      }

      chosenExtension.key = extensionKey


    }

    for (var i = 0; i < $scope.listOptions.length; i++) {
      if($scope.listOptions[i].selected) {
        chosenExtension = $scope.listOptions[i]
        break
      }
    }

    toastr.success('Extension added')
		$modalInstance.close(chosenExtension);
	};

	// Declaring event listeners is generally bad practice in controllers, but in this case the listener needs to be created and deleted with the controller and must be applied to the document
	document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode === 13) { //13 === enter key
        $scope.chooseList();
    }
	};

  $scope.toggleSelected = function(item) {
    let extensionSelected = false
    for (var i = 0; i < $scope.extensionOptions.length; i++) {
      $scope.extensionOptions[i].selected = false
      extensionSelected = true
    }

    api.custom.find({belongsTo: item.label}).then(function(response) {
      $scope.extensionKeys = response
    })

    for (var i = 0; i < $scope.listOptions.length; i++) {
      $scope.listOptions[i].selected = false
    }

    item.selected = !item.selected
  }

	// Cleans up document enter listener
	$scope.$on('$destroy', function() {
		document.onkeydown = null;
	});
});
