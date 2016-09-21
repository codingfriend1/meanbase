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
  update: function(value) {
    if(auth.currentUser) {
      this.editor.setContent(value || "")
    } else {
      $(this.el).html(value)
    }
  },
  bind: function (value) {
    let syncDelay = 600
    let isSetup = false
    let config = this.params.single? singleLineText: multilineText

    // Instantiate Editor
    this.editor = new MediumEditor(this.el, config)
    if(!config.disableReturn) {
      $(this.el).mediumInsert({
        editor: this.editor
      })
    }

    function subscribe() {
      this.editor.setup()
      this.editor.subscribe('editableInput', _.debounce( (event, editable) => {
        // this.params.belongsTo[this.expression] = this.editor.getContent()
        this.set(this.editor.getContent())
        radio.$emit('cms.autosave')
      }, syncDelay))
      isSetup = true
    }

    subscribe = subscribe.bind(this)
    subscribe()

    radio.$on('cms.editMode', (event, value) => {
        if(value && !isSetup) {
          subscribe()
        } else if(!value) {
          this.set(this.editor.getContent())
          this.editor.unsubscribe('editableInput')
          $(this.el).html(this.el.value || "")
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
