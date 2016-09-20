(() => {

  let service = {}

  service.asBoolean = function(string) {
    if(typeof string === 'undefined') {
      return false
    }

    var bool
    bool = (function() {
      switch (false) {
        case string.toLowerCase() !== 'true':
          return true
        case string.toLowerCase() !== 'false':
          return false
      }
    })()
    if (typeof bool === "boolean") {
      return bool
    }
    return void 0
  }

  window.services.helpers = service
})()
