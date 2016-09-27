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

  const sortableConfig = {
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

  let sortable = {}
  let activeElGroup

  sortable.menus = _.extend({}, sortableConfig, {
    group: 'menus',
    onStart: function (event) {
      dragging = true
      activeElGroup = menus
    },
    onEnd: function () {
      radio.$emit('cms.elementsChanged')
      dragging = false
    }
  })

  sortable.addOns = _.extend({}, sortableConfig, {
    group: 'lists',
    onStart: function (event) {
      dragging = true
      activeElGroup = page.lists
    },
    onEnd: function () {
      radio.$emit('cms.elementsChanged')
      dragging = false
    }
  })

  sortable.submenus = _.extend({}, sortableConfig, {
    group: 'sub-menus',
    ghostClass: "mb-sub-draggable-ghost",
    draggable: ".mb-sub-draggable",
    filter: ".ignore-sub-draggable, .medium-editor-placeholder:after",
    onStart: function (event) {
      activeElGroup = menus
      dragging = true
    },
    onEnd: function () {
      radio.$emit('cms.elementsChanged')
      dragging = false
    }
  })

  sortable.addOnLists = _.extend({}, sortableConfig, {
    group: 'extension-list',
    ghostClass: "mb-inner-draggable-ghost",
    draggable: ".mb-inner-draggable",
    filter: ".ignore-inner-draggable, .medium-editor-placeholder:after",
    onStart: function (event) {
      dragging = true
      activeElGroup = page.lists
    },
    onEnd: function () {
      radio.$emit('cms.elementsChanged')
      dragging = false
    }
  })

  sortable.trashcan = {
    group: {
      put: ['lists', 'extensions', 'menus', 'extension-list', 'sub-menus']
    },
    onAdd: function (event) {
      console.log('added');
      radio.$emit('cms.deleteTrashContent', activeElGroup)
    },
  }


  window.services.sortableConfig = {
    single: singleLineText,
    multi: multilineText,
    sortable: sortable
  }

})()
