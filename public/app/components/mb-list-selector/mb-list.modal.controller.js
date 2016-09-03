angular.module('meanbaseApp').controller('list.modal.controller', function($scope, endpoints, $modalInstance, $timeout, toastr, api, group, $rootScope) {
	$scope.chosenList = [];

	$scope.searchList = {};
	$scope.findShared = '';

  $scope.syncGroups = []

	$scope.chooseAddon = function(groupKey, newSyncGroup, sync) {

    let chosenAddon

    for (var i = 0; i < $scope.extensionOptions.length; i++) {
      if($scope.extensionOptions[i].selected) {
        chosenAddon = $scope.extensionOptions[i]
        break
      }
    }

    if(!chosenAddon) {
      return false
    }

    chosenAddon.sync = sync

    if(chosenAddon.sync && !groupKey && !newSyncGroup) {
      toastr.warning('Please choose a group you want to sync data with')
      return false
    }

    if(newSyncGroup) {
      chosenAddon.syncGroup = newSyncGroup
      api.custom.create({belongsTo: chosenAddon.label, key: newSyncGroup, permission: 'editContent', value: {}, enabled: true})
    } else if(groupKey) {
      chosenAddon.syncGroup = groupKey.key
      chosenAddon.data = groupKey.value
    }

    toastr.success('Addon added')
		$modalInstance.close(chosenAddon);
	};

	// Declaring event listeners is generally bad practice in controllers, but in this case the listener needs to be created and deleted with the controller and must be applied to the document
	document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode === 13) { //13 === enter key
        $scope.chooseList();
    }
	};

  function createMain(item) {
    let mainItem = {belongsTo: item.label, key: 'main', permission: 'editContent', value: {}, enabled: true};
    api.custom.create(mainItem).then(createdMain => {
      $scope.syncGroups.unshift(createdMain)
      $scope.syncGroup = $scope.syncGroups[0]
    })
  }

  $scope.toggleSelected = function(item) {
    let extensionSelected = false
    for (var i = 0; i < $scope.extensionOptions.length; i++) {
      $scope.extensionOptions[i].selected = false
      extensionSelected = true
    }

    api.custom.find({belongsTo: item.label}).then(function(response) {
      if(response.length === 0) {
        createMain(item)
      } else {
        let foundMain = false
        for (var i = 0; i < response.length; i++) {
          if(response[i].key === 'main') {
            foundMain = true
            break
          }
        }

        if(!foundMain) {
          createMain(item)
        }
      }

      $scope.syncGroups = response
      $scope.syncGroup = $scope.syncGroups[0]
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
