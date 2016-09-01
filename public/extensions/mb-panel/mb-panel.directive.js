angular.module('meanbaseApp').directive('mbPanel', api => ({
  templateUrl: require('./mb-panel.html'),
  replace: true,
  link: async (scope, element, attrs) => {

    scope.data = {}
    let alreadyHasData = false
    try {
      let extensionData = await api.custom.find({belongsTo: 'mb-panel', key: scope.listItem.key})
      extensionData = extensionData[0]
      if(extensionData) {
        alreadyHasData = true
        scope.data = extensionData.value
      }
    } catch(err) {
      console.log('err', err);
    }

    async function saveEdits(event) {
      try {
        let response
        if(alreadyHasData) {
          response = await api.custom.update({belongsTo: 'mb-panel', key: scope.listItem.key}, {value: scope.data})
        } else {
          response = await api.custom.create({belongsTo: 'mb-panel', key: scope.listItem.key, value: scope.data, enabled: true, permission: 'editContent'})
          alreadyHasData = true
        }
        scope.data = response.value
      } catch(err) {
        console.log('Error saving extension data ', err);
      }

    }

    scope.$onRootScope('cms.publish', saveEdits)
    scope.$onRootScope('cms.publishChanges', saveEdits)

  }
}))
