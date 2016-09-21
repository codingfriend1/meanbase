
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
    currentModal: undefined,
    imageManagerConfig: {
      multiple: false,
      alreadySelected: []
    },
    sortableConfig: {
      ghostClass: "mb-draggable-ghost",
      draggable: ".mb-draggable",
      delay: 140,
      filter: ".ignore-draggable, .medium-editor-placeholder:after",
      // onMove: function (evt) {
      //   return evt.related.className.indexOf('ignore-draggable') === -1;
      // },
      animation: 250,
      scroll: true,
      scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
      scrollSpeed: 10 // px
    }
  }),
  created: async function() {

    try {
      this.menus = await api.menus.find({})
    } catch(err) {
      toastr.warning('Something went wrong and we could not fetch the menus.')
    }

    // radio.$on('cms.elementsChanged', () => {
    //   services.page.page = this.page
    // })

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
    })

    radio.$on('cms.removePage', () => {
      services.page.remove()
    })

    radio.$on('cms.currentModal', component => {
      this.currentModal = component
    })

    radio.$on('cms.modalConfig', config => {
      this.modalConfig = config
    })


    let meanbaseFront = document.getElementById('mb-meanbase-front')

    let activeElGroup

    this.sortMenusConfig = _.extend({}, this.sortableConfig, {
      group: 'menus',
      onStart: function (event) {
        meanbaseFront.classList.add('in-drag-mode')
        activeElGroup = this.menus
      },
      onEnd: function () {
        radio.$emit('cms.elementsChanged')
        meanbaseFront.classList.remove('in-drag-mode')
      }
    })

    this.sortableLists = _.extend({}, this.sortableConfig, {
      group: 'lists',
      onStart: function (event) {
        meanbaseFront.classList.add('in-drag-mode')
        activeElGroup = this.page.lists
      },
      onEnd: function () {
        radio.$emit('cms.elementsChanged')
        meanbaseFront.classList.remove('in-drag-mode')
      }
    })

    this.subMenuList = _.extend({}, this.sortableConfig, {
      group: 'sub-menus',
      ghostClass: "mb-sub-draggable-ghost",
      draggable: ".mb-sub-draggable",
      filter: ".ignore-sub-draggable, .medium-editor-placeholder:after",
      onStart: function (event) {
        activeElGroup = this.menus
        meanbaseFront.classList.add('in-drag-mode')
      },
      onEnd: function () {
        radio.$emit('cms.elementsChanged')
        meanbaseFront.classList.remove('in-drag-mode')
      }
    })

    this.mbSortableExtensionList = _.extend({}, this.sortableConfig, {
      group: 'extension-list',
      ghostClass: "mb-inner-draggable-ghost",
      draggable: ".mb-inner-draggable",
      filter: ".ignore-inner-draggable, .medium-editor-placeholder:after",
      onStart: function (event) {
        meanbaseFront.classList.add('in-drag-mode')
        activeElGroup = this.page.lists
      },
      onEnd: function () {
        radio.$emit('cms.elementsChanged')
        meanbaseFront.classList.remove('in-drag-mode')
      }
    })

    this.trashCanDraggable = {
      group: {
        put: ['lists', 'extensions', 'menus', 'extension-list', 'sub-menus']
      },
      onAdd: function (event) {
        radio.$emit('cms.deleteTrashContent', activeElGroup)
      },
    }
  }
})
