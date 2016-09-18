(() => {

  let service = {}

  let stagingData = {}

  let history = []

  let _page = {}

  Object.defineProperty(service, 'page', {
    get: function() {
      return _.clone(_page, true)
    },
    set: async function(value) {
      _page = value
      // return await service.save(value)
    }
  })

  // service.page.get()
  /**
   * Retrieves a page matching a url or one that matches the query
   * @param {object} query Optional - FeathersJS query
   * @return {Promise} Returns the page object
   */
  service.get = async function(query) {

    if(!query) {
      query = {url: window.location.pathname}
    } else if (!query.url) {
      console.log('You must provide a url to get a page');
      return false
    }

    try {
      let hasPermission = auth.hasPermissionSync('editContent')
      let result
      if(hasPermission) {
        result = await api.staging.find({belongsTo: 'meanbase-cms', url: query.url})
        result = _.get(result, '0.data')
      }

      if(!hasPermission || !result) {
        result = await api.pages.find(query)
        result = result[0]
      }

      _page = result
    } catch(err) {
      return false
    }

    return _page
  }

  service.save = async function(data) {

  }

  service.undo = async function() {

  }

  service.reset = async function() {

  }

  service.remove = async function(url) {
    let query = url? {url: url}: {url: _page.url}

    return Promise.all(
      api.pages.delete(query),
      api.staging.delete({belongsTo: 'meanbase-cms', key: query.url})
    )
  }

  service.create = async function(page) {

    if(!_.get(page, 'url')) {
      toastr.warning('You must supply a url to create a page')
      console.log('{url: url} must be set to create a page')
      return false
    }

    if(!_.get(page, 'template')) {
      console.log('It is recommended to provide a page template name when creating a page')
      return false
    }

    // Check that the page url doesn't already exist
    let alreadyExists = await api.pages.find({url: page.url})

    if(_.get(alreadyExists, '0')) {
      toastr.error('A page with that link already exists. Please choose a different link')
      return false
    }


    let { placeholderTitle, url } = convertUrlToTitle(page.url)

    // Prepare the template
    let newPage = {
      author: page.author || _.get(auth, 'currentUser.name'),
      editability: page.editability || _.get(auth, 'currentUser.role'),
      visibility: page.visibility || _.get(auth, 'currentUser.role'),
      url: url,
      tabTitle: page.tabTitle || placeholderTitle,
      title: page.title || placeholderTitle,
      template: page.template || 'home',
      summary: "",
      description: "",
      updated: Date.now()
    };

    let result
    try {
      result = await api.pages.create(page)
    } catch(err) {
      toastr.error("Sorry but there was an error and that page could not be created.")
      console.log('Could not create page: ', err);
      return false
    }
    return result
  }

  window.services.page = service

})()
