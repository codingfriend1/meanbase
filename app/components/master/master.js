
/**
 * The main component of the application. Contains all major features of meanbase.
 */

export default Vue.extend({

  template: require('./master.jade'),

  data: () => ({
    editMode: window.editMode,
    page: window.page,
    menus: {},
    dragging: false,
    currentUser: auth.currentUser,
    currentModal: undefined,
    imageManagerConfig: {
      multiple: false,
      alreadySelected: []
    },
    sortable: window.services.sortableConfig.sortable,
    trashCanDraggable: {}
  }),
  created: async function() {

    try {
      this.menus = await api.menus.find({})
    } catch(err) {
      toastr.warning('Something went wrong and we could not fetch the menus.')
    }

    radio.$on('cms.updatePage', page => {
      this.page = services.page.save(page)
    })

    radio.$on('cms.updateTemplate', () => {
      this.page.template = template
    })

    radio.$on('cms.undoMoment', () => {
      this.page = services.page.undo()
    })

    radio.$on('cms.deletePage', () => {
      services.page.remove()
    })

    radio.$on('cms.createPage', () => {
      services.page.create(url)
    })

    radio.$on('cms.togglePublish', () => {
      services.page.publish(!this.page.published)
    })

    radio.$on('cms.resetDraft', () => {
      services.page.reset()
      radio.$emit('cms.updateView')
    })

    radio.$on('cms.publishChanges', () => {
      services.page.publish()
    })

    radio.$on('cms.toggleEditMode', () => {
      this.editMode = !this.editMode
      window.editMode = !window.editMode
      radio.$emit('cms.editMode', this.editMode)
      radio.$emit('cms.autosave')
    })

    radio.$on('cms.removePage', () => {
      services.page.remove()
    })

    radio.$on('cms.currentModal', component => {
      this.currentModal = component
      if(!component) {
        radio.$emit('cms.autosave')
      }
    })

    radio.$on('cms.modalConfig', config => {
      this.modalConfig = config
    })

    radio.$on('cms.choseAddOn', (area, addOn) => {
      if(!this.page.extensions[area]) {
        Vue.set(this.page.extensions, area, [])
      }
      this.page.extensions[area].push(addOn)
      this.page = services.page.save(this.page)
    })

    (async () => {
      try {
        let response = await api.themes.find({active: true})
        response = response[0]

        let addons = []

        if(response) {
          addons = response.addons
        }

        for (var i = 0; i < addons.length; i++) {
          addons[i].html = await $.get("../../../" + addons[i].html)
          if(!addons[i].html) {
            addons.splice(i, 1)
          }
        }

        this.addonsOptions = $rootScope.addonsOptions.concat(addons)
      } catch(err) {
        console.log('Error fetching theme extensions', err)
      }
    })()

    (async () => {
      try {

        let foundExtensions = await api.extensions.find({active: true})

        for (var i = 0; i < foundExtensions.length; i++) {
          foundExtensions[i].html = await $.get("../../../" + foundExtensions[i].html)
          if(!foundExtensions[i].html) {
            foundExtensions.splice(i, 1)
          }
        }

        this.addonsOptions = $rootScope.addonsOptions.concat(foundExtensions)
      } catch(err) {
        console.log('Error fetching extensions', err)
      }
    })()
  }
})
