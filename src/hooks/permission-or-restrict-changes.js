import errors from 'feathers-errors';

export default (permissionName, options) => {
  return (hook) => {
    if (!hook.params.provider) { return hook; }

    if(!hook.params.user || (hook.params.user.permissions.indexOf(permissionName) === -1 && hook.params.user.permissions.indexOf('allPrivilages') === -1) ) {
      for (var i = 0; i < options.restrictOn.length; i++) {
        if(hook.data[options.restrictOn[i]] !== undefined && hook.data[options.restrictOn[i]] !== null) {
          return Promise.reject(new errors.Forbidden('You are not permitted to update the ' + options.restrictOn[i] + ' field.'));
        }
      }
      return Promise.resolve(hook);
    }
  };
}
