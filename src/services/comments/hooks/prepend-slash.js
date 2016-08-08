module.exports = options => {
  return (hook) => {
    if(hook.data && hook.data.url && hook.data.url.charAt(0) !== '/') {
      hook.data.url = '/' + hook.data.url;
    }

    if(hook.params.query && hook.params.query.url && hook.params.query.url.charAt(0) !== '/') {
      hook.params.query.url = '/' + hook.params.query.url;
    }
  }
}
