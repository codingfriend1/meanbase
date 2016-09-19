let multilineText = {
  buttonLabels: 'fontawesome',
  toolbar: {
    buttons: [
      'removeFormat',
      'bold',
      'italic',
      'anchor',
      'quote',
      'p',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'justifyLeft',
      'justifyCenter',
      'justifyRight',
      'orderedlist',
      'unorderedlist',
      // 'image-selector'
    ],
    diffLeft: 25,
    diffTop: -10,
    forcePlainText: true,
    static: false,
    sticky: true,
    updateOnEmptySelection: true
  },
  extensions: {
    // "image-selector": new ImageSelector(),
    // 'insert': new MediumEditorInsert()
  },
  paste: {
    forcePlainText: true,
    cleanPastedHTML: true,
    cleanReplacements: [],
    cleanAttrs: ['style', 'dir'],
    cleanTags: ['meta']
  }
}

let singleLineText = _.merge({}, multilineText, {
  disableReturn: true,
  placeholder: {
    text: 'type here',
    hideOnClick: true
  },
})

singleLineText.toolbar.buttons = [
  'bold',
  // 'italic',
  'anchor',
  'h1',
  'h2',
  'h3',
  'justifyLeft',
  'justifyCenter',
  'justifyRight'
]

Vue.directive('mb-text', {
  twoWay: true,
  params: ['single'],
  bind: function (value) {
    
    let syncDelay = 600
    let isSetup = false

    let config = this.params.single? singleLineText: multilineText

    var editor = new MediumEditor(this.el, config)

    if(!config.disableReturn) {
      $(this.el).mediumInsert({
        editor: editor
      })
    }

    if(!auth.currentUser) {
      editor.destroy()
      return false
    }

    function subscribe() {
      editor.setup()
      editor.subscribe('editableInput', _.debounce( (event, editable) => {
        // this.set(editor.getContent())
        value = editor.getContent()
        radio.$emit('cms.elementsChanged')
      }, syncDelay))
      isSetup = true
    }

    function destroy() {
      editor.unsubscribe('editableInput')
      this.el.html(this.value || "")
      editor.destroy()
      isSetup = false
    }

    subscribe()

    radio.$on('cms.updateView', shouldSave => {
      if(shouldSave) {
        this.set(editor.getContent())
      }
      this.el.html(this.value || "")
    })

    radio.$on('cms.editMode', function(event, value) {
        if(root.editMode && !isSetup) {
          subscribe()
        } else if(!this.editMode) {
          this.set(editor.getContent())
          destroy()
        }
    })


  },
  unbind: function () {
    editor.unsubscribe('editableInput')
    editor.destroy()
  }
})
