
/**
 * The main component of the application. Contains all major features of meanbase.
 */

export default Vue.extend({

  template: require('./master.jade'),

  data: () => ({
    editMode: true,
    page: window.page,
    menus: {},
    currentUser: auth.currentUser,
    currentModal: undefined
  }),
  created: async function() {

    try {
      this.menus = await api.menus.find({})
    } catch(err) {
      toastr.warning('Something went wrong and we could not fetch the menus.')
    }

    radio.$on('cms.elementsChanged', () => {
      services.page.page = this.page
    })

    radio.$on('cms.updateTemplate', () => {
      this.page.template = template
    })

    radio.$on('cms.undoMoment', () => {
      services.page.undo()
      radio.$emit('cms.updateView')
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

    radio.$on('cms.removePage', () => {
      services.page.remove()
    })
  }
})
