Vue.component('mb-choose-add-on', {
  template: require('./mb-choose-add-on.jade'),
  props: ['modalConfig', 'close'],
  data: () => ({
    addOns: [],
    chosenAddOn: [],
    searchAddOn: {},
    findShared: '',
    showNewGroup: false,
    sync: false,
    syncGroups: [
      {
        key: "Please select an add-on to see it's groups"
      }
    ],
    syncGroup: undefined,

  }),
  methods: {
    close: function() {
      radio.$emit('cms.currentModal', undefined)
    },
    chooseAddon: async function(groupKey, newSyncGroup, sync) {

      let chosenAddon

      for (var i = 0; i < this.addOns.length; i++) {
        if(this.addOns[i].selected) {
          chosenAddon = this.addOns[i]
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
        chosenAddon.sync = true
        api.custom.create({belongsTo: chosenAddon.label, key: newSyncGroup, permission: 'editContent', value: {}, enabled: true})
      } else if(groupKey) {
        chosenAddon.syncGroup = groupKey.key
        if(chosenAddon.sync) {
          let stagingData = await api.staging.find({belongsTo: chosenAddon.label, key: groupKey.key})
          stagingData = stagingData[0]
          if(stagingData) {
            chosenAddon.data = stagingData.data
          } else {
            chosenAddon.data = groupKey.value
          }
        }
      }

      radio.$emit('cms.choseAddOn', this.modalConfig.area, chosenAddon)
      toastr.success('Add-on added')
      radio.$emit('cms.currentModal', undefined)

      for (var i = 0; i < this.addOns.length; i++) {
        if(this.addOns[i].selected) {
          this.addOns[i].selected = undefined
          break
        }
      }
    },
    toggleSelected: function(item) {
      for (var i = 0; i < this.addOns.length; i++) {
        this.addOns[i].selected = false
      }

      api.custom.find({belongsTo: item.label}).then(response => {
        if(response.length === 0) {
          this.createMain(item)
        } else {
          let foundMain = false
          for (var i = 0; i < response.length; i++) {
            if(response[i].key === 'main') {
              foundMain = true
              break
            }
          }

          if(!foundMain) {
            this.createMain(item)
          }
        }

        this.syncGroups = response
        this.syncGroup = this.syncGroups[0]
      })

      item.selected = !item.selected
    },
    createMain: function(item) {
      let mainItem = {belongsTo: item.label, key: 'main', permission: 'editContent', value: {}, enabled: true};
      api.custom.create(mainItem).then(createdMain => {
        this.syncGroups.unshift(createdMain)
        this.syncGroup = this.syncGroups[0]
      })
    }
  },
  created: function() {

    // this.syncGroup = this.syncGroups[0]


    (async () => {
      try {
        let addons = []

        let response = await api.themes.find({active: true})
        response = response[0]

        let foundExtensions = await api.extensions.find({active: true})

        if(response) {
          addons = response.extensions
        }

        addons = addons.concat(foundExtensions)

        for (var i = 0; i < addons.length; i++) {
          addons[i].selected = false
          addons[i].html = await $.get('../../../' + addons[i].html)
          if(!addons[i].html) {
            addons.splice(i, 1)
          }
        }

        this.addOns = this.addOns.concat(addons)
      } catch(err) {
        console.log('Error fetching add-ons', err)
      }
    })()
  }
})
