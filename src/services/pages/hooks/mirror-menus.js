import errors from 'feathers-errors'
import _ from 'lodash'

async function removeMenuFromStaging(oldMenu) {
  let currentStaging = await this.service('staging').find({ query: {key: 'menus'} })
  currentStaging = currentStaging[0]
  if(_.get(currentStaging, 'data')) {

    let menudata = currentStaging.data

    _.each(menudata, (location_value, location_key) => {
      _.each(location_value, (current_menu, index) => {
        if(_.get(current_menu, 'url') === oldMenu.url) {
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
    removeMenuFromStaging = removeMenuFromStaging.bind(this)

    try {
      let oldMenu = await this.service('menus').remove(null, { query: {url: page.url} })
      oldMenu = oldMenu[0]
      if(oldMenu) {
        await removeMenuFromStaging(oldMenu)
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
//
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
