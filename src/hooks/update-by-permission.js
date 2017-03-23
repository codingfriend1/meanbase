import errors from 'feathers-errors'
import _ from 'lodash'

export default options => {
  return async hook => {

    if (!hook.params.provider) { return hook; }

    if(hook.type !== 'before') { throw Error('Update by Permission must be an before hook'); }

    let query = {}, permission = "";
    if(hook.id) {
      query._id = hook.id;
      console.log("hook.id", hook.id);
    } else if(hook.params.query && !_.isEmpty(hook.params.query)) {
      query = hook.params.query;
    } else if(hook.data) {
      permission = hook.data.permission || '';
      query = undefined
    }

    if(query) {
      if(hook.data && hook.data.permission && hook.params.user.permissions.indexOf(hook.data.permission) === -1) {
        throw new errors.Forbidden('You cannot change this data to have a permission you do not have.');
      }
      try {
        let result = await hook.app.service('custom').find({ query });
        if(result && result[0]) {
          if(result.length > 1) {
            for (var i = 0; i < result.length; i++) {
              if(hook.params.user.permissions.indexOf(result[i].permission) === -1) {
                throw new errors.Forbidden('Sorry but you do not have permission to edit some of those items');
              }
            }
            return hook;
          } else {
            if(hook.params.user.permissions.indexOf(result[0].permission) === -1) {
              throw new errors.Forbidden('Sorry but you do not have permission to edit that item');
            } else {
              return hook;
            }
          }
        }
      } catch(err) {
        console.log('Error fetching data from custom', err);
        throw err;
      }

    } else {
      if(hook.params.user.permissions.indexOf(permission) === -1) {
        throw new errors.Forbidden('Sorry you cannot create an item that you cannot access.');
      } else {
        return hook;
      }
    }
    // Use query or id to see what permission this item requires
    // If the item has hook data and no query or id then read the permission off of it
  }
}
