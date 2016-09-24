Vue.directive('mb-icon', {
  twoWay: true,
  update: function(value) {
    if(_.isEmpty(value)) {
      value = {
        classes: 'fa fa-pencil example'
      }
      radio.$emit('cms.autosave')
    }

    if(window.editMode && !value.classes) {
      value.classes = 'fa fa-pencil example'
    } else if(!window.editMode && value.classes === 'fa fa-pencil example') {
      value.classes = ''
    }

    this.value = value
    this.el.className = value.classes
    this.set(this.value)
  },
  bind: function() {
    let config
    this.el.addEventListener('click', () => {
      radio.$emit('cms.modalConfig', {source: this.value})
      radio.$emit('cms.currentModal', 'mb-choose-icon')
    })
  }
})
