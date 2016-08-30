exports.isTitle = /^[A-Za-z0-9@:?&=.\/ _\-]*$/;

exports.isURI = /(((http|https|ftp):\/\/([\w-\d]+\.)+[\w-\d]+){0,1}((\/|#)[\w~,;\-\.\/?%&+#=]*))/;

exports.isFilePath = /^[0-9A-Za-z \/*_.\\\-]*$/;

exports.isCSSClass = /^[A-Za-z0-9_ \-*]*$/;

exports.isAnchorTarget = /^[_blank|_self|_parent|_top]*$/;

exports.isText = /.*/;

exports.isHTML = /.*/;
