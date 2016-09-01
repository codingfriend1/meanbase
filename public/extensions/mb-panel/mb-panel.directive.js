angular.module('meanbaseApp').directive('mbPanel', (api, $rootScope, $timeout) => ({
  templateUrl: require('./mb-panel.html'),
  replace: true,
  link: (scope, element, attrs) => {

    console.log("scope.listItem", scope.listItem);

    scope.data = {}
    let alreadyHasData = false
    let alreadyHasAutoSaveData = false;

    // if(!$rootScope.currentUser) {
    //   (async () => {
    //     try {
    //       let extensionData = await api.custom.find({belongsTo: scope.listItem.label, key: scope.listItem.key})
    //       extensionData = extensionData[0]
    //       if(extensionData) {
    //         alreadyHasData = true
    //         scope.data = extensionData.value
    //       }
    //     } catch(err) {
    //       console.log(`Error fetching ${scope.listItem.key} data`, err);
    //     }
    //   })()
    //
    // } else {
    //   console.log("scope.listItem.data", scope.listItem.data);
    //   scope.data = scope.listItem.data
    // }

    scope.data = scope.listItem.data



    if(!$rootScope.currentUser) { return false }

    // $timeout(async () => {
    //   api.staging.find({belongsTo: scope.listItem.label, key: scope.listItem.key}).then(function(stagingData) {
    //     stagingData = stagingData[0]
    //     if(stagingData) {
    //       if($rootScope.editMode) {
    //         scope.data = stagingData.data
    //       }
    //       alreadyHasAutoSaveData = true
    //     }
    //   });
    // });

    async function saveEdits(event) {
      try {
        let response
        if(alreadyHasData) {
          response = await api.custom.update({belongsTo: scope.listItem.label, key: scope.listItem.key}, {value: scope.data})
        } else {
          alreadyHasData = true
          response = await api.custom.create({belongsTo: scope.listItem.label, key: scope.listItem.key, value: scope.data, enabled: true, permission: 'editContent'})

        }
        scope.data = response.value

        scope.listItem.data = { items: [] }

      } catch(err) {
        console.log('Error saving extension data ', err);
      }

    }
    // async function saveEdits(event) {
    //   try {
    //     let response
    //     if(alreadyHasData) {
    //       response = await api.custom.update({belongsTo: scope.listItem.label, key: scope.listItem.key}, {value: scope.data})
    //     } else {
    //       alreadyHasData = true
    //       response = await api.custom.create({belongsTo: scope.listItem.label, key: scope.listItem.key, value: scope.data, enabled: true, permission: 'editContent'})
    //
    //     }
    //     scope.data = response.value
    //
    //     removeAutoSaveData()
    //
    //   } catch(err) {
    //     console.log('Error saving extension data ', err);
    //   }
    //
    // }
    //
    // async function removeAutoSaveData() {
    //   try {
    //     await api.staging.delete({belongsTo: scope.listItem.label, key: scope.listItem.key})
    //     alreadyHasAutoSaveData = false
    //   } catch(err) {
    //     console.log(`Error deleting ${scope.listItem.label} autosave data`, err);
    //   }
    // }
    //
    // async function fetchAutoSaveData() {
    //   try {
    //     let data = await api.staging.find({belongsTo: scope.listItem.label, key: scope.listItem.key})
    //     data = data[0]
    //     if(data) {
    //       scope.data = data.data
    //       alreadyHasAutoSaveData = true
    //     }
    //   } catch(err) {
    //     console.log(`Error deleting ${scope.listItem.label} autosave data`, err);
    //   }
    // }
    //
    //
    // scope.autoSaveEdits = async function(event) {
    //   try {
    //     let response
    //     if(alreadyHasAutoSaveData) {
    //       response = await api.staging.update({belongsTo: scope.listItem.label, key: scope.listItem.key}, {data: scope.data})
    //     } else {
    //       alreadyHasAutoSaveData = true
    //       response = await api.staging.create({belongsTo: scope.listItem.label, key: scope.listItem.key, data: scope.data, enabled: true, permission: 'editContent'})
    //     }
    //   } catch(err) {
    //     console.log('Error saving extension data ', err);
    //   }
    //
    // }

    // let directiveWatcher = scope.$watch(scope.data, _.debounce(function(newValue, oldValue) {
    //   if(typeof newValue !== oldValue) {
    //     console.log("newValue", newValue);
    //     $rootScope.$emit('cms.autoSave')
    //     scope.autoSavingInProgress = true
    //     $timeout(function() {
    //       scope.autoSavingInProgress = false
    //     }, 1000);
    //   }
    // }, 100), true)

    // let publishListener = scope.$onRootScope('cms.publish', saveEdits)
    // let publishChangesListener = scope.$onRootScope('cms.publishChanges', saveEdits)
    // scope.$onRootScope('cms.autoSave', _.debounce(autoSaveEdits, 100))
    // let resetDraftListener = scope.$onRootScope('cms.resetDraft', removeAutoSaveData)
    // let pullAutoSaveListener = scope.$onRootScope('cms.pullAutoSaveData', fetchAutoSaveData)

    // scope.$destroy(function() {
    //   publishListener()
    //   publishChangesListener()
    //   // resetDraftListener()
    //   // pullAutoSaveListener()
    // })

  }
}))
