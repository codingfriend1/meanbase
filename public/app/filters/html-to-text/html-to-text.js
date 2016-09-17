Vue.filter('htmlToText', function (value) {
  return  value ? String(value).replace(/<[^>]+>/gm, '') : ''
})
