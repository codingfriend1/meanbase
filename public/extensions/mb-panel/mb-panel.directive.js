angular.module('meanbaseApp').directive('mbPanel', api => ({
  templateUrl: require('./mb-panel.html'),
  replace: true,
  link: async (scope, element, attrs) => {

    scope.data = {}
    let alreadyHasData = false
    let alreadyHasAutoSaveData = false
    try {
      let extensionData = await api.custom.find({belongsTo: scope.listItem.label, key: scope.listItem.key})
      extensionData = extensionData[0]
      if(extensionData) {
        alreadyHasData = true
        scope.data = extensionData.value
      }
    } catch(err) {
      console.log(`Error fetching ${scope.listItem.key} data`, err);
    }

    if(!$rootScope.currentUser) { return false }

    async function saveEdits(event) {
      try {
        let response
        if(alreadyHasData) {
          response = await api.custom.update({belongsTo: scope.listItem.label, key: scope.listItem.key}, {value: scope.data})
        } else {
          response = await api.custom.create({belongsTo: scope.listItem.label, key: scope.listItem.key, value: scope.data, enabled: true, permission: 'editContent'})
          alreadyHasData = true
        }
        scope.data = response.value

        removeAutoSaveData()

      } catch(err) {
        console.log('Error saving extension data ', err);
      }

    }

    async function removeAutoSaveData() {
      try {
        await api.staging.delete({belongsTo: scope.listItem.label, key: scope.listItem.key})
        alreadyHasAutoSaveData = false
      } catch(err) {
        console.log(`Error deleting ${scope.listItem.label} autosave data`, err);
      }
    }

    async function fetchAutoSaveData() {
      try {
        let data = await api.staging.find({belongsTo: scope.listItem.label, key: scope.listItem.key})
        data = data[0]
        if(data) {
          scope.data = extensionData.data
          alreadyHasAutoSaveData = true
        }
      } catch(err) {
        console.log(`Error deleting ${scope.listItem.label} autosave data`, err);
      }
    }


    async function autoSaveEdits(event) {
      try {
        let response
        if(alreadyHasAutoSaveData) {
          response = await api.staging.update({belongsTo: scope.listItem.label, key: scope.listItem.key}, {data: scope.data})
        } else {
          response = await api.staging.create({belongsTo: scope.listItem.label, key: scope.listItem.key, data: scope.data, enabled: true, permission: 'editContent'})
          alreadyHasAutoSaveData = true
        }
        scope.data = response.value
      } catch(err) {
        console.log('Error saving extension data ', err);
      }

    }

    scope.$onRootScope('cms.publish', saveEdits)
    scope.$onRootScope('cms.publishChanges', saveEdits)
    scope.$onRootScope('cms.autoSave', autoSaveEdits)
    scope.$onRootScope('cms.resetDraft', removeAutoSaveData)
    scope.$onRootScope('cms.pullAutoSaveData', fetchAutoSaveData)

  }
}))
