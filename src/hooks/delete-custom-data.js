import errors from 'feathers-errors'

export default type => {
  return async hook => {
    if (!hook.params.provider) { return hook; }

    console.log("hook.result", hook.result);

    console.log("type", type);

    if(!hook.result) { return hook; }

    let results = hook.result;
    if(!Array.isArray(hook.result)) {
      results = [hook.result];
    }

    for (var i = 0; i < results.length; i++) {
      console.log("results[i]", results[i]);
      if(type === 'themes') {
        hook.app.service('custom').remove({ query: {belongsTo: results[i].title} });
      } else if (type === 'extensions') {
        hook.app.service('custom').remove({ query: {belongsTo: results[i].name} });
      }
    }
    return hook;
  }
}
