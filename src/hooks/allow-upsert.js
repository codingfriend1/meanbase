

import errors from 'feathers-errors'

export default options => {
  return hook => {
    if(hook.params) {
      hook.params = Object.assign({}, hook.params, {mongoose: {upsert: true} })
    }
  }
}
