import errors from 'feathers-errors'

export default options => {
  return hook => {
    if (!hook.params.provider) { return hook; }

    if(hook.type !== 'after') { throw Error('Filter by Permission or Restrict must be an after hook'); }

    if(!hook.params.user || !hook.params.user.permissions || hook.params.user.permissions.length === 0) {
      if(Array.isArray(hook.result)) {
        hook.result = hook.result.map(function(item) {
          if(item.enabled) { return item; } else { return undefined; }
        });
      } else {
        if(!hook.result.enabled) {
          hook.result = undefined;
        }
      }
    }

    if(hook.result) {
      if(Array.isArray(hook.result)) {
        hook.result = hook.result.map(function(item) {
          if(hook.params.user.permissions.indexOf(item.permission) > -1) {
            return item;
          } else if(item.enabled) {
            return item;
          }
        });
      } else {
        if(hook.params.user.permissions.indexOf(hook.result.permission) === -1) {
          if(!hook.result.enabled) {
            hook.result = undefined;
          }
        }
      }
    }
  }
}
