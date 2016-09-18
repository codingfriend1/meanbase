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
      _.debounce(service.save(value), 100)
    }
  })

  function setHTMLHeader() {
    document.title = _.get(_page, 'tabTitle')
    jQuery('meta[name=description]').attr('content', _.get(_page, 'description'))
  }

  function addHistory() {
    history.unshift(_page)

    if(history.length > 5) {
      history.length = 5
    }
  }

  // service.page.get()
  /**
   * Retrieves a page matching a url or one that matches the query
   * @param {object} query Optional - FeathersJS query
   * @return {Promise} Returns the page object
   */
  service.get = async function(query) {

    console.log('running get');

    if(!query) {
      query = {url: window.location.pathname}
    } else if (!query.url) {
      console.log('You must provide a url to get a page');
      return false
    }

    console.log("query", query);

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

  service.save = async function(data, addHistory) {

    if(!data) {
      toastr.warning('You must provide data to autosave.')
      return false
    }

    if(!_page) {
      toastr.warning('There is no page to update')
      return false
    }

    _page = _.merge({}, _page, data)

    try {
      await api.staging.update({belongsTo: 'meanbase-cms', key: _page.url}, { data })

      if(typeof addHistory !== 'boolean' && addHistory !== false) {
        addHistory()
      }

    } catch(err) {
      console.log('Error autosaving page: ', err)
    }


    setHTMLHeader()

  }

  service.undo = function() {
    if(history.length) {
      _page = history.shift()
      service.save(_page, false)
    } else {
      toastr.warning('There is no undo history to return to.')
    }
  }

  service.reset = async function() {

    if(!_.get(page, 'url')) {
      toastr.warning('Sorry, but we could not find a page link to reset.')
      return false
    }

    api.staging.delete({belongsTo: 'meanbase-cms', key: _page.url})
    history = []

    try {
      let result = await api.pages.find(query)
      _page = _.get(result, '0')
      setHTMLHeader()
    } catch(err) {
      console.log('Error resetting page: ', err);
    }

    return _page
  }

  service.remove = async function(url) {
    let query = url? {url: url}: {url: _page.url}

    history = []

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

  service.publish = async function() {
    if(_page.published) {
      _page.published = true
    }

    api.staging.delete({belongsTo: 'meanbase-cms', key: _page.url}).catch(err => {
      console.log('Could not delete the leftover page autosave data.');
    })

    try {
      _page = await api.pages.updateOne(_page._id, _page)
    } catch(err) {
      console.log('err', err);
    }
  }

  window.services.page = service

})()
