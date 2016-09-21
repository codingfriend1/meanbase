Vue.directive('mbChooseImage', {
  params: ['single', 'belongsTo'],
  twoWay: true,
  bind: function () {
    let gallerySlug = this.expression + "_" + Date.now()

    let single
    if(typeof this.params.single === 'undefined' ) {
      single = true
    } else {
      single = window.services.helpers.asBoolean(this.params.single)
    }

    this.el.addEventListener("click", (event) => {
      event.stopPropagation()
      if (!$(event.target).is('.v-mb-src') && !$(event.target).is('img')) { return };
      radio.$emit('cms.modalConfig', { single, gallerySlug })
      radio.$emit('cms.currentModal', 'mb-image-manager')
    })

    radio.$on('cms.choseImages', response => {
      if(response.gallerySlug === gallerySlug) {
        if(response.images) {
          this.set(response.images)
        } else {
          this.set({
            url: 'http://placehold.it/768x432'
          })
        }
        radio.$emit('cms.autosave')
      }
    })
  }
})
