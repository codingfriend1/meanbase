(() => {

  const validators = {
    isTitle: "^[A-Za-z0-9@:?&=.\/ _\-]*$",
    isURI: "(((http|https|ftp):\\/\\/([\\w-\\d]+\\.)+[\\w-\\d]+){0,1}((\\/|#|\\?)[\\w~,\\-\\._\\/?%&+#=]*)?)",
    isFilePath: "^[0-9A-Za-z\\/*_.\\\-]*$",
    isCSSClass: "^[A-Za-z0-9_ *-]*$",
    isAnchorTarget: "^[_blank|_self|_parent|_top]*$",
    isEmail: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$",
    isText: "^$",
    isHTML: "^$"
  }

  // These error messages may be used to explain to the user why their input was invalid and match their corresponding regexes above
  const errorMessages = {
    isTitle: 'Many only contain letters, numbers, and these symbols ( @ : ? & = . _ - ).',
    isURI: "Must be a valid path, either a full address ('http://path.com') or a relative one '/path', '#hashPath'",
    isFilePath: 'Must contain only letters, numbers, /, *, _, ., \\, and -',
    isCSSClass: 'May only contain letters, numbers, _, -, and *',
    isAnchorTarget: 'Must be either _blank, _self, _parent, or _top',
    isEmail: 'Must be a valid email format',
    isText: 'Must be safe text',
    isHTML: 'Must be safe html',
    isRequired: "This field is required."
  }

  window.services.patterns = validators
  window.services.errors = errorMessages

})()
