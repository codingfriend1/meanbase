(() => {

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


  window.services.sortableConfig = {
    single: singleLineText,
    multi: multilineText
  }

})()
