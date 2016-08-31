angular.module('meanbaseApp').
  filter('htmlToPlainText', function() {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  }
);
