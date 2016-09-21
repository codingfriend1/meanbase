const syncDelay = 600

Vue.directive('mb-text', {
  twoWay: true,
  params: ['single'],
  update: function(value) {
    if(auth.hasPermissionSync('editContent')) {
      this.editor.setContent(value || "")
    } else {
      $(this.el).html(value)
    }
  },
  bind: function (value) {

    if(!auth.hasPermissionSync('editContent')) { return false }

    let isSetup = false
    let config = this.params.single? window.services.sortableConfig.single: window.services.sortableConfig.multi

    // Instantiate Editor
    this.editor = new MediumEditor(this.el, config)
    if(!config.disableReturn) {
      $(this.el).mediumInsert({
        editor: this.editor
      })
    }

    // Update model when html is edited
    function subscribe() {
      this.editor.setup()
      this.editor.subscribe('editableInput', _.debounce( (event, editable) => {
        this.set(this.editor.getContent())
        radio.$emit('cms.autosave')
      }, syncDelay))
      isSetup = true
    }

    subscribe = subscribe.bind(this)
    subscribe()

    // When editmode changes toggle editability
    radio.$on('cms.editMode', (value) => {
      this.editMode = value
      if(value && !isSetup) {
        subscribe()
      } else if(!value) {
        this.editor.unsubscribe('editableInput')
        this.editor.destroy()
        isSetup = false
      }
    })
  },
  unbind: function () {
    this.editor.unsubscribe('editableInput')
    this.editor.destroy()
  }
})
