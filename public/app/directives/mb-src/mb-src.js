

Vue.directive('mb-src', {
  params: [
    'size',
    'belongsTo',
    'backgroundPrefix'
  ],
  bind: function (value) {

    this.el.classList.add('v-mb-src')

    let element = $(this.el)

    let isImage = element.is('img') || element.find('img').length > 0

    function setImage() {

      if(!this.params.belongsTo || !this.params.belongsTo[this.expression]) {
        return false
      }
      let url = this.params.belongsTo[this.expression].url

      if(!url.includes('http://') && !url.includes('https://')) {
         url = url + (this.params.size || 'original') + '.jpg'
      }

      if(isImage) {
        element.attr('src', url);
        if(alt) {
          element.attr('alt', this.params.belongsTo[this.expression].alt);
        }
      } else {
        let backgroundUrl = this.params.backgroundPrefix? this.params.backgroundPrefix + ', url(' + url +')': 'url(' + url +')';
        element.css({
          'background-image': backgroundUrl
        });
      }
    }

    setImage = setImage.bind(this)

    setImage()

    if(!auth.currentUser) { return false }

    radio.$on('cms.updateView', result => {
      console.log('updateview');
      setImage()
    })
  }
})
