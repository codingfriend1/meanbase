

Vue.directive('mb-src', {
  params: [
    'size',
    'backgroundPrefix'
  ],
  update: function(value) {
    let url = _.get(value, 'url')
    if(!url) {
      url = 'http://placehold.it/768x432'
    }

    if(!url.includes('http://') && !url.includes('https://')) {
       url = url + (this.params.size || 'original') + '.jpg'
    }

    if(this.isImage) {
      this.element.attr('src', url);
      if(alt) {
        this.element.attr('alt', this.params.belongsTo[this.expression].alt);
      }
    } else {
      let backgroundUrl = this.params.backgroundPrefix? this.params.backgroundPrefix + ', url(' + url +')': 'url(' + url +')';
      this.element.css({
        'background-image': backgroundUrl
      });
    }
  },
  bind: function () {
    this.el.classList.add('v-mb-src')
    this.element = $(this.el)
    this.isImage = this.element.is('img') || this.element.find('img').length > 0
  }
})
