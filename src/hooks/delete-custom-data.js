import errors from 'feathers-errors'

export default type => {
  return hook => {
    if (!hook.params.provider) { return hook; }

    if(!hook.result) { return hook; }

    let results = hook.result;
    if(!Array.isArray(hook.result)) {
      results = [hook.result];
    }

    for (var i = 0; i < results.length; i++) {
      if(type === 'theme') {
        hook.app.service('custom').remove(null, { query: {belongsTo: results[i].title} });
      } else if (type === 'extension') {
        hook.app.service('custom').remove(null, { query: {belongsTo: results[i].name} });
      }
    }
    return hook;
  }
}
