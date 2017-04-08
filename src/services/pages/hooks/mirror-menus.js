import errors from 'feathers-errors'
import _ from 'lodash'

async function interactMenuStaging(menu, cb) {
  if(!cb) { return false }
  let currentStaging = await this.service('staging').find({ query: {key: 'menus'} })
  currentStaging = currentStaging[0]
  if(_.get(currentStaging, 'data')) {

    let menudata = currentStaging.data

    _.each(menudata, (location_value, location_key) => {
      _.each(location_value, (current_menu, index) => {
        if(current_menu) {
          cb(current_menu, index, location_value)
        } else {
          location_value.splice(index, 1)
        }

      })
    })

    await this.service('staging').patch(null, {data: currentStaging.data}, { query: {key: 'menus'} } )
    return true
  } else {
    return true
  }
}

async function removeMenu(page) {
  if(_.get(page, 'url')) {

    try {
      let oldMenu = await this.service('menus').remove(null, { query: {url: page.url} })
      oldMenu = oldMenu[0]
      if(oldMenu) {
        interactMenuStaging = interactMenuStaging.bind(this)
        await interactMenuStaging(oldMenu, function(current_menu, index, location_value) {

          if(current_menu.url === oldMenu.url) {
            location_value.splice(index, 1)
          }

        })
        return true
      } else {
        return true
      }
      return true
    } catch(err) {
      console.log('Error removing menu', err);
      return false
    }
  }
}


export const deleteMenu = options => {
  return hook => {
    removeMenu = removeMenu.bind(hook.app)

    if(!hook.result) { return hook }
    if(Array.isArray(hook.result)) {
      _.each(hook.result, removeMenu)
      return hook
    } else {
      removeMenu(hook.result)
      return hook
    }
  }
}



async function addMenuToStaging(newMenu) {
  let currentStaging = await this.service('staging').find({ query: {key: 'menus'} })
  currentStaging = currentStaging[0]
  if(_.get(currentStaging, 'data.main') && Array.isArray(currentStaging.data.main)) {
    currentStaging.data.main.push(newMenu)
    await this.service('staging').patch(null, {data: currentStaging.data}, {query: {key: 'menus'} })
    return true
  } else {
    return true
  }
}

async function addMenu(page) {
  if(page && page.url && page.title && typeof page.title === 'string') {
    addMenuToStaging = addMenuToStaging.bind(this)

    let menu = {
      url: page.url,
      linkTo: page._id,
      title: page.title.replace(/<[^>]+>/gm, ''),
      group: 'main',
      position: 0,
      published: page.published
    }

    try {
      let newMenu = await this.service('menus').create(menu)
      if(newMenu) {
        await addMenuToStaging(newMenu)
        return true
      } else {
        return true
      }
    } catch(err) {
      console.log('Error creating page menu', err);
      return false
    }
  } else {
    return false
  }
}

export const createMenu = options => {
  return async hook => {
    addMenu = addMenu.bind(hook.app)

    if(!hook.result) { return hook }
    if(Array.isArray(hook.result)) {
      _.each(hook.result, addMenu)
      return hook
    } else {
      await addMenu(hook.result)
      return hook
    }
  }
}



async function updateMenuInStaging(menu) {
  interactMenuStaging = interactMenuStaging.bind(this)
  await interactMenuStaging(menu, function(current_menu, index, location_value) {
    if(_.get(current_menu, 'linkTo') === menu.linkTo) {
      current_menu.url = menu.url ? menu.url : current_menu.url
      current_menu.title = menu.title ? menu.title : current_menu.title
      current_menu.published = menu.published
    }
  })
}

async function patchMenu(hook, page) {
  if(_.get(page, '_id')) {
    updateMenuInStaging = updateMenuInStaging.bind(this)

    if(!page.title || !page.url || typeof page.title !== 'string') {
      return false
    }

    try {
      let found = await this.service('menus').find({query: {linkTo: page._id}})

      if(found[0]) {
        let changes = {url: page.url, published: page.published}

        if(hook.params.titleWasChanged) {
          changes.title = page.title.replace(/<[^>]+>/gm, '')
        }
        let menu = await this.service('menus').patch(null, changes, { query: {linkTo: page._id} })
        menu = menu[0]
        if(menu) {
          await updateMenuInStaging(menu)
          return true
        } else {
          return true
        }
      }
      return true
    } catch(err) {
      console.log('Error updating menu to reflect page', err);
      return false
    }
  } else {
    return false
  }
}



export const updateMenu = options => {
  return async hook => {

    const patchMenuBound = patchMenu.bind(hook.app, hook)

    if(!hook.result) { return hook }

    if(Array.isArray(hook.result)) {
      _.forEach(hook.result, patchMenuBound)
      return hook
    } else {
      await patchMenuBound(hook.result)
      return hook
    }
  }
}
