(() => {

  @mbService()

  class mbTextConfig {

    constructor($rootScope) {
      this.$rootScope = $rootScope

      this.singleline.toolbar.buttons = [
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
    }

    ImageSelector = MediumEditor.Extension.extend({
      name: 'image-selector',
      init: function () {
        this.button = this.document.createElement('button')
        this.button.classList.add('medium-editor-action')
        this.button.innerHTML = '<i class="fa fa-image"></i>'
        this.button.title = 'Choose an image'

        this.on(this.button, 'click', this.handleClick.bind(this))
      },

      getButton: function () {
        return this.button
      },

      handleClick: function (event) {
        var self = this
        this.base.saveSelection()
        imageModal.open({multiple: false}, function(image) {
          var div = document.createElement("div")

          div.innerHTML = `
            <div class="medium-insert-images">
              <figure contenteditable=\"false\" class="img-responsive">
                <img src="${image.small}" alt="${image.alt}" class=\"img-responsive\">
                <figcaption contenteditable=\"true\" class="medium-insert-caption-placeholder" data-placeholder="Type caption for image (optional)"></figcaption>
              <figure>
            </div>
          `
          // var imageToInsert = document.createElement("img")
          // imageToInsert.src = image.small
          // imageToInsert.alt = image.alt
          // imageToInsert.class = 'img-responsive'

          let imageToInsert = div






          // imageToInsert.className = 'img-responsive medium-editor-insert-images'
          self.base.restoreSelection()
          var tmp = document.createElement("div")
          tmp.appendChild(imageToInsert)
          self.base.pasteHTML(tmp.innerHTML)
        })
      }
    })

    AddIcon = MediumEditor.Extension.extend({
      name: 'add-icon',
      init: function () {
        this.button = this.document.createElement('button')
        this.button.classList.add('medium-editor-action')
        this.button.innerHTML = '<i class="fa fa-plug"></i>'
        this.button.title = 'Insert an icon'

        this.on(this.button, 'click', this.handleClick.bind(this))
      },

      getButton: function () {
        return this.button
      },

      handleClick: function (event) {
        var self = this
        self.base.pasteHTML('<choose-icon belongs-to="{}" property="icon"></choose-icon>')
        this.$rootScope.$emit('recompile-editor')
      }
    })

    multiline = {
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
          'image-selector'
        ],
        diffLeft: 25,
        diffTop: -10,
        forcePlainText: true,
        static: false,
        sticky: true,
        updateOnEmptySelection: true
      },
      extensions: {
        "image-selector": new this.ImageSelector(),
        // 'insert': new MediumEditorInsert()
      },
      // imageDragging: true,
      paste: {
        forcePlainText: true,
        cleanPastedHTML: true,
        cleanReplacements: [],
        cleanAttrs: ['style', 'dir'],
        cleanTags: ['meta']
      }
    }

    singleline = _.merge({}, this.multiline, {
      disableReturn: true,
      placeholder: {
        text: 'type here',
        hideOnClick: true
      },
    })
  }

})()
